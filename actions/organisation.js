import {
    GET_EXTERNAL_ORGANIZATION_URL,
    GET_INTERNAL_ORGANIZATION_URL,
    GET_ORGANISATIONS_SUMMARY,
    GET_ORGANISATIONS_SUMMARY_INTERNAL,
    GET_ORGANISATION_DETAIL,
    GET_ORGANISATIONS_SUMMARY_EXTERNAL} from "../config";

import {apiGet, apiPost, apiPut} from "../utils";

export const getExtenalOrganizations=()=>{
    return new Promise((resolve,reject)=>{
        apiGet(GET_EXTERNAL_ORGANIZATION_URL).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error)
        })
    })   
};

export const getInternalOrganizations=()=>{
    return new Promise((resolve,reject)=>{
        apiGet(GET_INTERNAL_ORGANIZATION_URL).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error)
        })
    })   
};

export const getOrganisationsSummary=()=>{
    return new Promise((resolve,reject)=>{
        apiGet(GET_ORGANISATIONS_SUMMARY).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error)
        })
    })   
};

export const getOrganisationsSummaryInternal=()=>{
    return new Promise((resolve,reject)=>{
        apiGet(GET_ORGANISATIONS_SUMMARY_INTERNAL).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error)
        })
    })   
};

export const getOrganisationsSummaryExternal=()=>{
    return new Promise((resolve,reject)=>{
        apiGet(GET_ORGANISATIONS_SUMMARY_EXTERNAL).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error)
        })
    })   
};

export const putEditOrganisation = (data, query) => {
    return new Promise((resolve,reject)=>{
        apiPut(GET_ORGANISATION_DETAIL + query, data).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error)
        })
    })
};

export const postCreateOrganisation = (data) => {
    return new Promise((resolve,reject)=>{
        apiPost(GET_ORGANISATION_DETAIL, data).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error)
        })
    })
};