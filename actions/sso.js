import { GET_COUNTRIES, GET_ORGANISATIONS_TYPES, GET_PERSONAL_ADVISORS, GET_LICENCES} from "../config";
import {apiGet} from "../utils";

export const getCountries=()=>{
	return new Promise((resolve,reject)=>{
		apiGet(GET_COUNTRIES).then(response=>{
			resolve(response);
		}).catch(error=>{
			reject(error)
		})
	})
};

export const getOrganisationTypes=()=>{
	return new Promise((resolve,reject)=>{
		apiGet(GET_ORGANISATIONS_TYPES).then(response=>{
			resolve(response);
		}).catch(error=>{
			reject(error)
		})
	})
};

export const getPersonalAdvisors=()=>{
	return new Promise((resolve,reject)=>{
		apiGet(GET_PERSONAL_ADVISORS).then(response=>{
			resolve(response);
		}).catch(error=>{
			reject(error)
		})
	})
};

export const getLicences=()=>{
	return new Promise((resolve,reject)=>{
		apiGet(GET_LICENCES).then(response=>{
			resolve(response);
		}).catch(error=>{
			reject(error)
		})
	})
};
