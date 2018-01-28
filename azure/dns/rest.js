const msRestAzure = require('ms-rest-azure');
const DNSManagement = require("azure-arm-dns");
const _ = require("lodash");
const RecordSets = DNSManagement.RecordSets;
const Promise = require('bluebird');


var sampleParameters = {
    tenant : 'd05954c1-36eb-40b2-8f23-7f2ce352faf6',
    clientId : 'a34df6e1-31e3-4adf-859b-4f21585f7ab7',
    clientSecret : 'oP+WG+A/2XlmoPX6hqn/DciZLUvVEj4N/0CgiOooYn4='
};
var cnameFilter = 'a699a1dc-bb60-4511-8e2e-1e841cfbe733.cloudapp.net.';

// Interactive Login
// It provides a url and code that needs to be copied and pasted in a browser and authenticated over there. If successful, 
// the user will get a DeviceTokenCredentials object.
/* msRestAzure.loginWithServicePrincipalSecret(sampleParameters.clientId, sampleParameters.clientSecret, sampleParameters.tenant).then((credentials) => {
    let client = new DNSManagement(credentials, '3a0b2801-2ab5-4b2d-8ce7-426aa48f826f');
    //let recordsets = new RecordSets(client);
    var options = {
        top: 500
    };
    return client.recordSets.listByDnsZone('network-DNS-prod-rg', 'labs.aprimo.com', options);
    //return client.zones.list();
}).then((recordSets) => {
    console.log('List of zones:');
    console.log(recordSets.length);
    //console.log(recordSets[5]);
    var cnames = _.filter(recordSets, function(r) { return !_.isUndefined(r.cnameRecord); });
    var validCNames = _.filter(cnames, function(r) { return r.cnameRecord.cname === cnameFilter; })
    console.log(validCNames);
    //console.dir(recordSets, {depth: null, colors: true});
}).catch((err) => {
    console.log('An error ocurred');
    console.dir(err, {depth: null, colors: true});
}); */

var recordsetPromise1 = msRestAzure.loginWithServicePrincipalSecret(sampleParameters.clientId, sampleParameters.clientSecret, sampleParameters.tenant).then((credentials) => {
    let client = new DNSManagement(credentials, '3a0b2801-2ab5-4b2d-8ce7-426aa48f826f');
    //let recordsets = new RecordSets(client);
    var options = {
        top: 1
    };
    return client.recordSets.listByDnsZone('network-DNS-prod-rg', 'labs.aprimo.com', options);
    //return client.zones.list();
});
var recordsetPromise2 = msRestAzure.loginWithServicePrincipalSecret(sampleParameters.clientId, sampleParameters.clientSecret, sampleParameters.tenant).then((credentials) => {
    let client = new DNSManagement(credentials, '3a0b2801-2ab5-4b2d-8ce7-426aa48f826f');
    //let recordsets = new RecordSets(client);
    var options = {
        top: 2
    };
    return client.recordSets.listByDnsZone('network-DNS-prod-rg', 'rc.aprimo.com', options);
    //return client.zones.list();
});

Promise.all([recordsetPromise1, recordsetPromise2]).then(function (recordset1) {
    console.log("One");
    console.log(recordset1[0]);
    console.log("Second");
    console.log(recordset1[1]);
});