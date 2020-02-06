import * as organisation from "./organisation";
import * as organisationDetails from "./organisationDetail";
import * as userDetails from "./userDetails";
import * as sso from "./sso"

export default{
    ...organisation,
    ...organisationDetails,
    ...userDetails,
    ...sso
}