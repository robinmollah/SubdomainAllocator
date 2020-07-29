const { Route53 } = require("aws-sdk");

/**
 * 
 * @param {string} id Hosted Zone ID of a domain
 */
function hostedZoneParam(id){
    return {
        HostedZoneId: id
    }
}

function maxItem(number, base){
    return {
        ...base,
        MaxItems: number + ""
    }
}

/**
 * @param {string} zoneId
 * @param {string} subdomain 
 * @param {string} ip_address 
 */
function CreateSubdomain(zoneId, subdomain, ip_address){
    let params = BasicChangeBatch(zoneId);
    let changeObject = getActionChange("CREATE");
    changeObject.ResourceRecordSet = getResourceRecordSet(subdomain, ip_address);
    params.ChangeBatch.Changes.push(changeObject);
    return params;
}


/**
 * @param {string} zoneId HostedZoneId of domain
 */
function BasicChangeBatch(zoneId){
    return {
        HostedZoneId: zoneId,
        ChangeBatch: {
            Changes: [
            ]
        }
    }
}

/**
 * 
 * @param {string} zoneId 
 * @param {string} subdomain 
 * @param {string} ip_address 
 */
function UpdateSubdomain(zoneId, subdomain, ip_address){
    let params = BasicChangeBatch(zoneId);
    let changeObject = getActionChange("UPSERT");
    changeObject.ResourceRecordSet = getResourceRecordSet(subdomain, ip_address);
    params.ChangeBatch.Changes.push(changeObject);
    return params;
}

/**
 * 
 * @param {string} subdomain 
 * @param {string} ip_address 
 * @return ResourceRecordSet object
 */
function getResourceRecordSet(subdomain, ip_address){
    return {
        Name: subdomain,
        ResourceRecords: [
            {
                Value: ip_address
            }
        ],
        TTL: 300,
        Type: "A"
    }
}

/**
 * 
 * @param {string} action "CREATE" | "UPSERT" | "DELETE"
 */
function getActionChange(action){
    return {Action: action, ResourceRecordSet: null};
}

/**
 * 
 * @param {string} subdomain 
 * @param {string} ip_address 
 */
function DeleteSubdomain(subdomain, ip_address){
    let params = BasicChangeBatch(zoneId);
    let changeObject = getActionChange("DELETE");
    changeObject.ResourceRecordSet = getResourceRecordSet(subdomain, ip_address);
    params.ChangeBatch.Changes.push(changeObject);
    return params;
}

module.exports.ParamsProvider = {
    baseParams: hostedZoneParam,
    maxItem: maxItem,
    createSubdomain: CreateSubdomain,
    updateSubdomain: UpdateSubdomain,
    deleteSubdomain: DeleteSubdomain
}