import {GET_ORGANISATION_DETAIL,GET_ORGANISATIONS_SUMMARY} from "../config";
import {apiGet} from "../utils";

export const getOrganizationDetails=(query)=>{
    return new Promise((resolve,reject)=>{
        apiGet(GET_ORGANISATION_DETAIL+query).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error)
        })
    })   
};

export const getOrganizationUsers=(query)=>{
    return new Promise((resolve,reject)=>{
        apiGet(GET_ORGANISATION_DETAIL+query).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error)
        })
    })   
};

export const getSingleOrganizationSummary =(query)=>{
    return new Promise((resolve,reject)=>{
        apiGet(GET_ORGANISATIONS_SUMMARY+query).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error)
        })
    })
};