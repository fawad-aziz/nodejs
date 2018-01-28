const msRestAzure = require('ms-rest-azure');
const DNSManagementClient = require("azure-arm-dns");
const computeManagementClient = require('azure-arm-compute');
const _ = require("lodash");
const xmlBuilder = require('xmlbuilder');
const mssql = require('mssql');

const tenantId = 'd05954c1-36eb-40b2-8f23-7f2ce352faf6';
const clientId = 'a34df6e1-31e3-4adf-859b-4f21585f7ab7';
const clientSecret = 'oP+WG+A/2XlmoPX6hqn/DciZLUvVEj4N/0CgiOooYn4=';

const cnameFilter = 'a699a1dc-bb60-4511-8e2e-1e841cfbe733.cloudapp.net.';
const subscriptionId = '3a0b2801-2ab5-4b2d-8ce7-426aa48f826f';
const config = {
    user: 'DBA',
    password: 'svhGY7L3$seDaSY',
    server: 'l16icarus.database.windows.net',
    database: 'l16001Central002',
    options: {
        encrypt: true
    }
};
const serverType = 'leg';

var serverTypes = [
  { 'typeName' : 'leg',  'typeValue': 1 },
  { 'typeName' : 'ap',  'typeValue': 2 },
  { 'typeName' : 'ap',  'typeValue': 3 },
  { 'typeName' : 'wf',  'typeValue': 4 },
  { 'typeName' : 'ca',  'typeValue': 5 },
  { 'typeName' : 'no',  'typeValue': 6 },
  { 'typeName' : 'se',  'typeValue': 7 }
];

var serverTypeValue = _.head(_(_.filter(serverTypes, function (s) { return s.typeName == serverType })).map('typeValue').value());
console.log(serverTypeValue);

var registeredVms = [];
console.log("Registered servers response");
mssql.connect(config).then(pool => {
  return pool.request().query('select * from Server');
}).then(result => {
    //console.log(JSON.stringify(result));
    var filtered = _.filter(result, function (v) {
      //console.log(v.ServerTypeId);
      return v.ServerTypeId == serverTypeValue;
    });
    console.log(filtered);
    registeredVms = _(filtered).map('Name').value();
    mssql.close();
    console.log('Registered VMs:' + registeredVms);
}).catch(err => {
    console.log(err);
    tl.setResult(tl.TaskResult.Failed, err.message);
});

/* var recordsetPromise = msRestAzure.loginWithServicePrincipalSecret(clientId, clientSecret, tenantId).then((credentials) => {
  var client = new DNSManagementClient(credentials, subscriptionId);
  var options = {
      top: 500
  };
  return client.recordSets.listByDnsZone('network-DNS-prod-rg', 'labs.aprimo.com', options);
});

var vmPromise = msRestAzure.loginWithServicePrincipalSecret(clientId, clientSecret, tenantId).then((credentials) => {
  var client = new computeManagementClient(credentials, subscriptionId);
  return client.virtualMachines.list('prod-16au1-01-base-rg');
});

Promise.all([recordsetPromise, vmPromise]).then(function (results) {
  console.log("Datasource response from promise");
  var recordsets = _.filter(results[0], function(r) { return !_.isUndefined(r.cnameRecord); });
  var validRecordsets = _.filter(recordsets, function(r) { return r.cnameRecord.cname === cnameFilter; })
  var dsns = _(validRecordsets).map('name').value();
  var datasourcesRoot = xmlBuilder.create('DataSources');
  _.forEach(dsns, function(dsn) {
    var item = datasourcesRoot.ele('DataSource');
    item.att('name', dsn);
  });
  var dataSourceXml = datasourcesRoot.toString();
  console.log('Datasource XML:' + dataSourceXml);

  console.log('Server response from promise');
  console.log('Subscription Id: ' + subscriptionId);
  console.log('filter servers for type ' + serverType);
  console.log('vm length ' + results[1].length);
  var filtered = _.filter(results[1], function(vm) { return vm.tags.AppTier == serverType; });
  console.log('Filtered vms count ' + filtered.length);
  var vms = _(filtered).map('name').value();
  console.log('VMs in resource group:' + vms);
  
  var toBeExcluded = _.difference(registeredVms, vms);
  console.log('Servers to be excluded:' + toBeExcluded);
  var serversRoot = xmlBuilder.create('Servers');
  _.forEach(toBeExcluded, function(vm) {
    var item = serversRoot.ele('Server');
    item.att('name', vm);
  });
  var serverXml = serversRoot.toString();
  console.log('Server XML:' + serverXml);

  mssql.connect(config).then(pool => {
    console.log('Executing stored proc');
    return pool.request()
      .input('ServerXml', mssql.Xml, serverXml)
      .input('DataSourceXml', mssql.Xml, dataSourceXml)
      .execute('dbo.RemoveServerDataSourceServiceMapping');
  }).then(result => {
      console.log(result);
      mssql.close();
  }).catch(err => {
      console.log(err);
  });

  mssql.on('error', err => {
    console.log(err);
    tl.setResult(tl.TaskResult.Failed, err.message);
  });
}).catch(function (err) {
  console.log(err);
  new Error(err.toString());
});
 */