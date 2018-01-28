const rp = require('request-promise');
const aa = require('./apiCalls');

const options = {
    method: 'POST',
    uri: 'http://g006.labs.aprimo.com/api/oauth/create-native-token',
    headers: {
        'content-type': 'application/json',
        'client-id': 'OJP5T88X-OJP5',
        'Authorization': 'Basic YWRtaW46Y2E0NTk4YmU2NmVjNDI4OGE3ZmUzNjIyOWU1MWQ1NjQ='
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