export const API_BASE_URL="http://localhost:8080";
export const GET_EXTERNAL_ORGANIZATION_URL=API_BASE_URL+"/api/sso/organisations?scopeOrganisationType=EXTERNAL";
export const GET_INTERNAL_ORGANIZATION_URL=API_BASE_URL+"/api/sso/organisations?scopeOrganisationType=INTERNAL";
export const GET_ORGANISATION_DETAIL=API_BASE_URL+"/api/sso/organisations";
export const GET_ORGANISATIONS_SUMMARY=API_BASE_URL+"/api/sso/organisations-summary";
export const GET_ORGANISATIONS_SUMMARY_EXTERNAL=API_BASE_URL+"/api/sso/organisations-summary?scopeOrganisationType=EXTERNAL";
export const GET_ORGANISATIONS_SUMMARY_INTERNAL=API_BASE_URL+"/api/sso/organisations-summary?scopeOrganisationType=INTERNAL";
export const GET_COUNTRIES = API_BASE_URL + "/api/sso/config/countries";
export const GET_ORGANISATIONS_TYPES = API_BASE_URL + "/api/sso/config/organisationtypes";
export const GET_PERSONAL_ADVISORS = API_BASE_URL + "/api/sso/users?userType=PERSONAL_ADVISOR";
export const GET_LICENCES = "/api/sso/licences";