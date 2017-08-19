const rp = require('request-promise');
const bb = require('bluebird');

var endPoints = [
    'https://qa4-rc.aprimo.com/api/users',
    'https://qa4-rc.aprimo.com/api/activities',
    'https://qa4-rc.aprimo.com/api/projects',
    'https://qa4-rc.aprimo.com/api/tasks'
];
var promiseStack = [];

const attackApis = function (accessToken) {
    var endpoint = endPoints[Math.floor(Math.random() * endPoints.length)];
    promiseStack.push(rp({
        'uri': endpoint,
        headers: {
            'Accept': 'application/json',
            'x-access-key': accessToken
        }
    }));

    bb.all(promiseStack)
    .then(function (response) {
        console.log(error);
    })
    .catch(function (error) {
        console.log(error);
    });
}

exports.attackApis = attackApis;
