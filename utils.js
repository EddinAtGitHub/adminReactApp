import axios from "axios";
import qs from "query-string";
import { API_BASE_URL } from "./config";

export function isLoggedIn() {
	let session = getFromStorage("scopeOne-login");
	return session && session.token;
}

export function getHeaders() {
	let user = getUser();
	return {
		Authorization: `Bearer ${(user && user.token) || null}`
	};
}

export function getUser() {
	if (window && window.localStorage) {
		return window.localStorage.getObject("scopeOne-login");
	}
	return null;
}

export function saveUser(value) {
	if (window && window.localStorage) {
		return window.localStorage.saveObject("scopeOne-login", value);
	}
	return null;
}

export function saveToStorage(key, value) {
	if (window && window.localStorage) {
		window.localStorage.saveObject(key, value);
	}
}

export function removeFromStorage(key) {
	if (window && window.localStorage) {
		window.localStorage.removeItem(key);
	}
}

export function getFromStorage(key) {
	if (window && window.localStorage) {
		return window.localStorage.getObject(key);
	}
	return null;
}

export function generateUrl(path) {
	if (path.includes("http")) {
		return path;
	}
	return API_BASE_URL + path;
}

export function apiReq(endPoint, data, method, headers, requestOptions = {}) {
	return new Promise((res, rej) => {
		headers = {
			...getHeaders(),
			...headers
		};
		if (method === "get" || method === "delete") {
			data = {
				...requestOptions,
				params: data,
				paramsSerializer: function(params) {
					return qs.stringify(params, { arrayFormat: "repeat" });
				},
				headers
			};
		}

		axios[method](endPoint, data, { headers })
			.then(result => {
				let { data } = result;

				if (data.status === false) {
					return rej(data);
				}

				return res(data);
			})
			.catch(err => {
				return rej(err);
			});
	});
}

export function apiPost(endPoint, data, headers = {}) {
	return apiReq(generateUrl(endPoint), data, "post", headers);
}

export function apiDelete(endPoint, data, headers = {}) {
	return apiReq(generateUrl(endPoint), data, "delete", headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
	return apiReq(generateUrl(endPoint), data, "get", headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
	return apiReq(generateUrl(endPoint), data, "put", headers);
}

export function desc(a, b, orderBy) {
	switch (orderBy) {

		case "address":{

			if(b.address&&a.address){
				if (b[orderBy].country.name < a[orderBy].country.name) {
					return -1;
				}
				if (b[orderBy].country.name > a[orderBy].country.name) {
					return 1;
				}
			}
			return 0;
		}

		default: {
			if (b[orderBy] < a[orderBy]) {
				return -1;
			}
			if (b[orderBy] > a[orderBy]) {
				return 1;
			}
			return 0;
		}
	}
}

export function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

export function getSorting(order, orderBy) {
	return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

export function showMaxString(val) {
	if(val.length>19){
		return val.substr(0,19)+"..."
	}
	return val;
}

export function getStatusColorClass(val){

	switch (val.toUpperCase()){
		case "ACTIVE":{
			return "status-color-green"
		}
		case "DISABLED":{
			return "status-color-red"
		}
		default:{
			return ""
		}
	}
}