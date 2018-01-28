const msRestAzure = require('ms-rest-azure');
const DNSManagementClient = require("azure-arm-dns");
const computeManagementClient = require('azure-arm-compute');
const _ = require("lodash");
const xmlBuilder = require('xmlbuilder');
const mssql = require('mssql');

const sampleParameters = {
    tenant : 'd05954c1-36eb-40b2-8f23-7f2ce352faf6',
    clientId : 'a34df6e1-31e3-4adf-859b-4f21585f7ab7',
    clientSecret : 'oP+WG+A/2XlmoPX6hqn/DciZLUvVEj4N/0CgiOooYn4='
};
const cnameFilter = 'a699a1dc-bb60-4511-8e2e-1e841cfbe733.cloudapp.net.';
const subscriptionId = 'f3e2e7c5-21a3-4691-b121-da22a42359ad';
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

var recordsetPromise = msRestAzure.loginWithServicePrincipalSecret(sampleParameters.clientId, sampleParameters.clientSecret, sampleParameters.tenant).then((credentials) => {
    var client = new DNSManagementClient(credentials, subscriptionId);
    var options = {
        top: 500
    };
    return client.recordSets.listByDnsZone('network-DNS-non-prod-rg', 'icarus.aprimo.com', options);
});
var vmPromise = msRestAzure.loginWithServicePrincipalSecret(sampleParameters.clientId, sampleParameters.clientSecret, sampleParameters.tenant).then((credentials) => {
    var client = new computeManagementClient(credentials, subscriptionId);
    return client.virtualMachines.list('lab-16us1-00-icarus01-rg');
});

Promise.all([recordsetPromise, vmPromise]).then(function (results) {
    //console.log("One");
    console.log(results[0].length);
    var recordsets = _.filter(results[0], function(r) { return !_.isUndefined(r.cnameRecord); });
    var validRecordsets = _.filter(recordsets, function(r) { return r.cnameRecord.cname === cnameFilter; })
    var dsns = _(validRecordsets).map('name').value();
    var root = xmlBuilder.create('DataSources');
    _.forEach(dsns, function(dsn) {
      var item = root.ele('DataSource');
      item.att('name', dsn);
    });
    dataSourceXml = root.toString();
    //console.log(dataSourceXml);
  
    //console.log("Second");
    //console.log(results[1]);
    var vms = _(results[1]).map('name').value();
    var serversRoot = xmlBuilder.create('Servers');
    _.forEach(vms, function(vm) {
      var item = serversRoot.ele('Server');
      item.att('name', vm);
    });
    //console.log(serversRoot.toString());
    //console.log(serversRoot.end());
    serverXml = serversRoot.toString();
    //console.log(serverXml);

    console.log(results[1].length);
    var filtered = _.filter(results[1], function(vm) { return vm.tags.AppTier == serverType; });
    var vms = _(filtered).map('name').value();
    console.log('VMs in resource group:' + vms);
    console.log(filtered.length);
    //console.log(filtered);

    /* mssql.connect(config, function() {
      new mssql.Request()
      .input('ServerXml', mssql.Xml, serverXml)
      .input('DataSourceXml', mssql.Xml, dataSourceXml)
      .input('Tier', mssql.VarChar(5), 'leg')
      .execute('ServerDataSourceServiceMapping', (err, result) => {
          if(err) {
            console.log(err);
            new Error(err.toString());
          }
          console.log(result);
      });
    }); */

    /* mssql.connect(config).then(pool => {
        return pool.request()
          .input('ServerXml', mssql.Xml, serverXml)
          .input('DataSourceXml', mssql.Xml, dataSourceXml)
          .input('Tier', mssql.VarChar(5), serverType)
          .execute('dbo.ServerDataSourceServiceMapping');
      }).then(result => {
          console.log(result);
      }).catch(err => {
          console.log(err);
      }); */

  });
  