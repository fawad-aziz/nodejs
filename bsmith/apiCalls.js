const rp = require('request-promise');
const shuffle = require('shuffle-array');
const _ = require('lodash');
const Promise = require('bluebird');
const spawn = require('child_process').spawn;

let promiseStack = [];
let token;

const attackApis = function (accessToken) {
    token = accessToken;
    setInterval(function (accessToken) {
        loadTestApi(token, 'http://localhost/api/create-native-token', 100);
    }, 500);
};

function loadTestApi(accessToken, endpoint, rps) {
    var cnt = 0;
    var urls = [];
    for(var i = 0; i < rps; i++) {
        urls.push(endpoint);
    }
    Promise.map(urls, function (endpoint) {
        rp({
            'uri': endpoint,
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': accessToken
            },
            json: true,
            simple: false
        }).then(function (response) {
            cnt++;
            console.log(cnt + ': OK');
            console.log(response);
        }).catch(function (error) {
            cnt++;
            console.log(cnt + ': ' + error.statusCode);
        });
    });
};

exports.attackApis = attackApis;