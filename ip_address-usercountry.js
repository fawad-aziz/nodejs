const request = require('request');

request('http://usercountry.com/v1.0/json/107.216.161.59', (err, response, body) => {
    const result = JSON.parse(body);
    result.currency.code;
});
