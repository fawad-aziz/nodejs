const rp = require('request-promise');
const shuffle = require('shuffle-array');
const _ = require('lodash');

const endPoints = [
    'url1',
    'url2'
];
let promiseStack = [];
let token;

const attackApis = function (accessToken) {
    token = accessToken;
    setInterval(function (accessToken) {
        callApi(token);
    }, 1000);
};

function callApi(accessToken) {
    let urls = shuffle.pick(endPoints, { 'picks' : 2});
    _.each(urls, function (endpoint) {
        promiseStack.push(rp({
            'uri': endpoint,
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': accessToken
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

exports.attackApis = attackApis;
