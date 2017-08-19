const rp = require('request-promise');
const aa = require('./apiCalls');

const options = {
    method: 'POST',
    uri: 'https://qa4-rc.aprimo.com/api/oauth/create-native-token',
    headers: {
        'content-type': 'application/json',
        'client-id': 'L4AIEHMR-FJSP',
        'Authorization': 'Basic YWRtaW46ZDAzMTQ0MDRiNjIyNDRlOWJmZWFkZWJhOTY1ZTU4NDc='
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
