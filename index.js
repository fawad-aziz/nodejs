const rp = require('request-promise');
const aa = require('./apiCalls');

const options = {
    method: 'POST',
    uri: 'url',
    headers: {
        'content-type': 'application/json',
        'client-id': 'clientid',
        'Authorization': 'auth'
    },
    json: true
};
rp(options)
    .then(function (token) {
        aa.attackApis(token.accessToken);
    })
    .catch(function (error) {
        console.log(error);
    });
