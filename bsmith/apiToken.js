const rp = require('request-promise');
const shuffle = require('shuffle-array');
const _ = require('lodash');
const Promise = require('bluebird');

const endpoint = 'http://g088.labs.aprimo.com/api/oauth/create-native-token';
const options = {
    method: 'POST',
    uri: endpoint,
    headers: {
        'content-type': 'application/json',
        'client-id': '6KNHD5GP-DOB3',
        'Authorization': 'Basic YWRtaW46ODMzZWQ2MjRkNWUwNGIxMWJhODhmYjlkMmM0MjFiNDc='
    },
    json: true
};

const rps = 20;
var cnt = 0;
var urls = [];
for(var i = 0; i < rps; i++) {
    urls.push(endpoint);
}

Promise.map(urls, function (url) {
    rp(options).then(function (response) {
        cnt++;
        console.log(cnt + ': OK');
        console.log(response);
    }).catch(function (error) {
        cnt++;
        console.log(cnt + ': ' + error);
    });
});