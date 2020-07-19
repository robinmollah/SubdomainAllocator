const AWS = require("aws-sdk");
const ParamsProvider = require('./ParamsProvider').ParamsProvider;
const route53 = new AWS.Route53();

/**
 * Get domain names of hosted zones
 * @param {string} domain optional
 * @param {function} callback function to be called after retrieving
 */
function getDomains(callback, domain = null){
  var params = {
      MaxItems: '5',
      DNSName: domain
  };
  route53.listHostedZonesByName(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else  {
      for(var domain of data.HostedZones){
        callback(domain);
      }
    }
  });
}

/**
 * @param {string} domain 
 * @param {function} callback to be called with the hosted id of the domain
 */
function getIdOfDomain(domain, callback){
  if(!domain){
    throw "Domain is not provided.";
    return null;
  }
  const params = {
    MaxItems: '1',
    DNSName: domain
  };
  route53.listHostedZonesByName(params, function(err, data){
    if(err){
      console.log(err, err.stack);
    } else {
      callback(data.HostedZones[0].Id);
    }
  });
}

function createSubdomain(subdomain, ip_address){
  const { domain, sub } = extractDomain(subdomain);

  getIdOfDomain(domain, function(zoneId){
    let params = ParamsProvider.createSubdomain(zoneId, subdomain, ip_address);

    route53.changeResourceRecordSets(params, function(err, data){
      if(err){
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    })
  });

}

/**
 * Extract domain and sub from a full subdomain
 * @param {string} subdomain 
 */
function extractDomain(subdomain){
  let tldIndex = subdomain.lastIndexOf('.');
  let tld = subdomain.substring(tldIndex);

  let tldMinus = subdomain.substring(0, tldIndex);
  subdomain = tldMinus;

  let domain = tldMinus.substring(tldMinus.lastIndexOf('.')+1);
  domain = domain + tld;

  subdomain = subdomain.substring(0, subdomain.indexOf("."));

  return {domain: domain, 
          sub: subdomain};
}

/**
 * Get records of the specified domain
 * @param {string} domain 
 */
function getRecords(domain){
  getIdOfDomain(domain, function (hostedZoneId){
    let params = ParamsProvider.baseParams(hostedZoneId);
    console.log("Params", params);

    route53.listResourceRecordSets(params, function(err, data){
      if(err) console.log(err, err.stack);
      else {
        console.log(JSON.stringify(data));
      }
    })
  })
}

function updateSubdomain(){

}

function deleteSubdomain(){
  
}

module.exports.getDomains = getDomains;
module.exports.getIdOfDomain = getIdOfDomain;

module.exports.getRecords = getRecords;

module.exports.createSubdomain = createSubdomain;
module.exports.updateSubdomain = updateSubdomain;
module.exports.deleteSubdomain = deleteSubdomain;