import {GET_ORGANISATION_DETAIL} from "../config";
import {apiGet} from "../utils";

export const getUserDetails=(query)=>{
    return new Promise((resolve,reject)=>{
        apiGet(GET_ORGANISATION_DETAIL+query).then(response=>{
            resolve(response);
        }).catch(error=>{
            reject(error)
        })
    })   
}
