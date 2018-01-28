const rp = require('request-promise');
const shuffle = require('shuffle-array');
const _ = require('lodash');
const Promise = require('bluebird');
const spawn = require('child_process').spawn;

var endPoints = [
    'http://localhost:58832/apple',
    'http://localhost:58832/apples',
    'http://localhost:58832/apple',
    'http://localhost:58832/apples'
];
let promiseStack = [];
let token;

const attackApis = function (accessToken) {
    token = accessToken;
    setInterval(function (accessToken) {
        //callApi(token);
        //callApiRequestPromise(token, 5);
        //loadTestApi(token, 'http://aprimo.test.com/api/system-types', 5);
        loadTestApi(token, 'http://g006.labs.aprimo.com/api/system-types', 5);
    }, 500);
};

function callApi(accessToken) {
    let urls = shuffle.pick(endPoints, { 'picks' : 2});
    _.each(urls, function (endpoint) {
        promiseStack.push(rp({
            'uri': endpoint,
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': 'accessToken'
            },
            json: true
        }));
    });

    Promise.all(promiseStack)
        .then(function (response) {
            console.log('call');
        })
        .catch(function (error) {
            console.log('error');
        });
};

function callApiRequestPromise(accessToken, pickCount) {
    var cnt = 0;
    if (pickCount > endPoints.length) {
        pickCount = endPoints.length;
    }

    let urls = shuffle.pick(endPoints, { 'picks' : pickCount });
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
        }).then(function (response, statusCode) {
            cnt++;
            console.log(cnt + ': OK');
        }).catch(function (error) {
            cnt++;
            console.log(cnt + ': ' + error.statusCode);
        });
    });
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

function loadTestApiWithChildProcess(accessToken, endpoint, rps) {
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
        }).then(function (response, statusCode) {
            cnt++;
            console.log(cnt + ': OK');
        }).catch(function (error) {
            cnt++;
            console.log(cnt + ': ' + error.statusCode);
        });
    });
};

exports.attackApis = attackApis;
