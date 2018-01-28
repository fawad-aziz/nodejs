const rp = require('request-promise');
const shuffle = require('shuffle-array');
const _ = require('lodash');
const Promise = require('bluebird');

const options = {
    method: 'GET',
    uri: 'https://excelsiorauto1-rc.aprimo.com/api/attachments/10701/versions/10401/annotations/61223',
    headers: {
        'content-type': 'application/json',
        'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJEU04iOiJleGNlbHNpb3JhdXRvMSIsIlVJRCI6IjExMSIsIkNJRCI6IjEiLCJEQiI6IjIiLCJEb21haW5JZCI6IjEiLCJMSUQiOiIxIiwiVElEIjoiNDMiLCJHTSI6IiIsIlVzZXJSaWdodHMiOiIxMjAwLDY2NCw2NjMsNjYyLDY2MSw2NjAsNjU5LDY1OCw2NTcsNjU2LDY1NSw2NTQsNjUzLDY1Miw2NTEsNjUwLDY0Niw2NDUsNjQ0LDY0Myw2NDIsNjQxLDY0MCw2MzksNjM4LDYzNyw2MzYsNjM1LDM1MywzNTIsMzUxLDM1MCwzNDksMzQ4LDM0NywzNDYsMzQ1LDM0NCwzNDEsMzQwLDMzOSwzMzgsMzM3LDMzNiwzMzUsMzMzLDMzMiwzMzEsMzMwLDMyOSwzMjgsMzI3LDMyMSwzMjAsMzE5LDMxOCwzMTcsMzE2LDMxNSwzMTQsMzEzLDMxMiwzMTEsMzA5LDMwOCwzMDYsMzAzLDMwMCwxOTEsMTkwLDE4OSwxODgsMTg3LDE4NSwxODQsMTgzLDE4MiwxODEsMTgwLDE3OSwxNzgsMTc3LDE3NiwxNzUsMTcxLDE3MCwxNjksMTY3LDE2NiwxNjUsMTY0LDE2MywxNjIsMTYxLDE2MCwxNTksMTU4LDE1NywxNTQsMTUzLDE1MiwxNTEsMTQ5LDE0OCwxNDcsMTQ2LDE0NSwxNDQsMTQzLDE0MiwxNDEsMTQwLDEzOSwxMzgsMTM3LDEzMywxMzIsMTMxLDEzMCwxMjksMTI4LDEyNywxMjQsMTIzLDEyMiwxMjEsMTE5LDExOCwxMTYsMTE1LDEwNiwxMDUsMTA0LDEwMywxMDIsMTAxLDEwMCw5OSw5OCw5NCw5Myw5MSw5MCw4OCw4Nyw4NSw4NCw4Miw4MSw3Niw3Miw2Nyw2Miw2MSw2MCw1OSw1OCw1Nyw1NSw1NCw1Myw1Miw1MSw1MCwzOCwzNywzNSwzNCwzMiwzMSwyOSwyOCwyNiwyNSwyMywyMiwyMCwxOSwxNywxNiwxNSwxMyw5LDgsNyw2LDUsMSIsIlVUIjoiMSIsImlzcyI6InNlbGYiLCJhdWQiOiJodHRwOi8vd3d3LmFwcmltby5jb20vIiwiZXhwIjoxNTEwMjgzNzgwLCJuYmYiOjE1MTAxOTczODB9.riSzeZ8NfKKyizJsTNuzkBFrqe36_9Hk7213mQczgo4'
    },
    json: true
};
var endpoint = 'https://excelsiorauto1-rc.aprimo.com/api/attachments/10701/versions/10401/annotations/61223';
var cnt = 0;
var urls = [];
for(var i = 0; i < 200; i++) {
    urls.push(endpoint);
}
//rp(options)
//    .then(function (response) {
//        console.log(response);
//    })
//    .catch(function (error) {
//        console.log("error" + error);
//    });

    Promise.map(urls, function (endpoint) {
        rp({
            'uri': endpoint,
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJEU04iOiJleGNlbHNpb3JhdXRvMSIsIlVJRCI6IjExMSIsIkNJRCI6IjEiLCJEQiI6IjIiLCJEb21haW5JZCI6IjEiLCJMSUQiOiIxIiwiVElEIjoiNDMiLCJHTSI6IiIsIlVzZXJSaWdodHMiOiIxMjAwLDY2NCw2NjMsNjYyLDY2MSw2NjAsNjU5LDY1OCw2NTcsNjU2LDY1NSw2NTQsNjUzLDY1Miw2NTEsNjUwLDY0Niw2NDUsNjQ0LDY0Myw2NDIsNjQxLDY0MCw2MzksNjM4LDYzNyw2MzYsNjM1LDM1MywzNTIsMzUxLDM1MCwzNDksMzQ4LDM0NywzNDYsMzQ1LDM0NCwzNDEsMzQwLDMzOSwzMzgsMzM3LDMzNiwzMzUsMzMzLDMzMiwzMzEsMzMwLDMyOSwzMjgsMzI3LDMyMSwzMjAsMzE5LDMxOCwzMTcsMzE2LDMxNSwzMTQsMzEzLDMxMiwzMTEsMzA5LDMwOCwzMDYsMzAzLDMwMCwxOTEsMTkwLDE4OSwxODgsMTg3LDE4NSwxODQsMTgzLDE4MiwxODEsMTgwLDE3OSwxNzgsMTc3LDE3NiwxNzUsMTcxLDE3MCwxNjksMTY3LDE2NiwxNjUsMTY0LDE2MywxNjIsMTYxLDE2MCwxNTksMTU4LDE1NywxNTQsMTUzLDE1MiwxNTEsMTQ5LDE0OCwxNDcsMTQ2LDE0NSwxNDQsMTQzLDE0MiwxNDEsMTQwLDEzOSwxMzgsMTM3LDEzMywxMzIsMTMxLDEzMCwxMjksMTI4LDEyNywxMjQsMTIzLDEyMiwxMjEsMTE5LDExOCwxMTYsMTE1LDEwNiwxMDUsMTA0LDEwMywxMDIsMTAxLDEwMCw5OSw5OCw5NCw5Myw5MSw5MCw4OCw4Nyw4NSw4NCw4Miw4MSw3Niw3Miw2Nyw2Miw2MSw2MCw1OSw1OCw1Nyw1NSw1NCw1Myw1Miw1MSw1MCwzOCwzNywzNSwzNCwzMiwzMSwyOSwyOCwyNiwyNSwyMywyMiwyMCwxOSwxNywxNiwxNSwxMyw5LDgsNyw2LDUsMSIsIlVUIjoiMSIsImlzcyI6InNlbGYiLCJhdWQiOiJodHRwOi8vd3d3LmFwcmltby5jb20vIiwiZXhwIjoxNTEwMjgzNzgwLCJuYmYiOjE1MTAxOTczODB9.riSzeZ8NfKKyizJsTNuzkBFrqe36_9Hk7213mQczgo4'
            },
            json: true,
            simple: false
        }).then(function (response) {
            cnt++;
            console.log(cnt + ': OK');
            //console.log(response);
        }).catch(function (error) {
            cnt++;
            console.log(cnt + ': ' + error.statusCode);
        });
    });