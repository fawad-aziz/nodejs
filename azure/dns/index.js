'use strict';

var _ = require('lodash');
var adal = require('adal-node');
var request = require('request');
var xmlBuilder = require('xmlbuilder');
var mssql = require('mssql');


var AuthenticationContext = adal.AuthenticationContext;

function turnOnLogging() {
  var log = adal.Logging;
  log.setLoggingOptions(
  {
    level : log.LOGGING_LEVEL.VERBOSE,
    log : function(level, message, error) {
      console.log(message);
      if (error) {
        console.log(error);
      }
    }
  });
}

var tenantId = 'd05954c1-36eb-40b2-8f23-7f2ce352faf6';
var authorityHostUrl = 'https://login.windows.net';
var clientId = 'a34df6e1-31e3-4adf-859b-4f21585f7ab7';
var clientSecret = 'oP+WG+A/2XlmoPX6hqn/DciZLUvVEj4N/0CgiOooYn4=';
var subscriptionId = '3a0b2801-2ab5-4b2d-8ce7-426aa48f826f';
var resourceGroup = 'network-DNS-prod-rg';
var dnsZone = 'labs.aprimo.com';
var cnameFilter = 'a699a1dc-bb60-4511-8e2e-1e841cfbe733.cloudapp.net.';
var sqlServerName = 'l16icarus.database.windows.net';
var sqlServerDatabase = 'l16001Central002';
var sqlServerUser = 'DBA';
var sqlServerUserPassword = 'svhGY7L3$seDaSY';
var serverResourceGroup = 'prod-16au1-01-base-rg';
var serverXml = '';
var dataSourceXml = '';

var config = {
  user: sqlServerUser,
  password: sqlServerUserPassword,
  server: sqlServerName,
  database: sqlServerDatabase,
  options: {
      encrypt: true
  }
};

var authorityUrl = authorityHostUrl + '/' + tenantId;

var resource = 'https://management.azure.com/';

turnOnLogging();


var authenticate = (cb) => {
    var context = new AuthenticationContext(authorityUrl);

    context.acquireTokenWithClientCredentials(resource, clientId, clientSecret, function(err, res) {
      if (err) {
          return cb(err);
      } else {
          return cb(null, res.accessToken);
      }
    });
};

authenticate((err, accessToken) => {
  if (err) {
    console.log(err);
    new Error(err.toString());
  }

  const options = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    json: true,
    url: `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.Network/dnsZones/${dnsZone}/CNAME?$top=1000&api-version=2017-09-01`
  };

  request.get(options, (err, res, body) => {
    if (err) {
      console.log(err);
      new Error(err.toString());
    }

    if (res.statusCode !== 200) {
      console.log(body);
      new Error(err.toString());
    }

    var recordsets = _.filter(body.value, function(r) { return !_.isUndefined(r.properties.CNAMERecord); });
    var validRecordsets = _.filter(recordsets, function(r) { return r.properties.CNAMERecord.cname === cnameFilter; })
    var dsns = _(validRecordsets).map('name').value();
    var root = xmlBuilder.create('DataSources');
    _.forEach(dsns, function(dsn) {
      var item = root.ele('DataSource');
      item.att('name', dsn);
    });
    dataSourceXml = root.end({ pretty: true });
  });
});

authenticate((err, accessToken) => {
  if (err) {
      console.log(err);
      new Error(err.toString());
  }

  var options = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    json: true,
    url: `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${serverResourceGroup}/providers/Microsoft.Compute/virtualmachines?api-version=2017-12-01`
  };

  request.get(options, (err, res, body) => {
    if (err) {
      console.log(err);
      new Error(err.toString());
    }

    if (res.statusCode !== 200) {
      console.log(body);
      new Error(err.toString());
    }

    var vms = _(body.value).map('name').value();
    var serversRoot = xmlBuilder.create('Servers');
    _.forEach(vms, function(vm) {
      var item = serversRoot.ele('Server');
      item.att('name', vm);
    });
    serverXml = serversRoot.end({ pretty: true });

    mssql.connect(config, function() {
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
    });
  });
});
