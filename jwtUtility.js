const jwt = require('json-web-token');

const secret = 'EB39488B-CEA5-4B11-837C-521D11F8760C';

const payload = {
  "DSN": "TeamEpicWin_g023",
  "UID": "1",
  "CID": "1",
  "DB": "2",
  "DomainId": "1",
  "LID": "1",
  "TID": "43",
  "GM": "",
  "UserRights": "685,102,1",
  "UT": "1",
  "dam-uid": "00000000-0000-0000-0000-000000000000",
  "dam-tenant": "g023",
  "ver": "1.2.1",
  "client_id": "marketing-ops",
  "iss": "self",
  "aud": "http://g023.labs.aprimo.com/",
  "exp": 1516451267,
  "nbf": 1516391267
};

// encode 
jwt.encode(secret, payload, function (err, token) {
    if (err) {
      console.error(err.name, err.message);
    } else {
      process.stdout.write(token);
    }
});

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJEU04iOiJMb2FkSW1wYWN0UkMiLCJVSUQiOiIxMzMiLCJDSUQiOiIxIiwiREIiOiIyIiwiRG9tYWluSWQiOiIxIiwiTElEIjoiMSIsIlRJRCI6IjQzIiwiR00iOiI4MDUiLCJVc2VyUmlnaHRzIjoiMSw1LDYsNyw4LDksMTMsMTUsMTYsMTcsMTksMjAsMjIsMjMsMjUsMjYsMjgsMjksMzEsMzIsMzQsMzUsMzcsMzgsNTAsNTEsNTIsNTMsNTQsNTUsNTcsNTgsNTksNjAsNjEsNjIsNjcsNzIsNzYsODEsODIsODQsODUsODcsODgsOTAsOTEsOTMsOTQsOTgsOTksMTAwLDEwMSwxMDIsMTAzLDEwNCwxMDUsMTA2LDExNSwxMTYsMTE4LDExOSwxMjEsMTIyLDEyMywxMjQsMTI3LDEyOCwxMjksMTMwLDEzMSwxMzIsMTMzLDEzNywxMzgsMTM5LDE0MCwxNDEsMTQyLDE0MywxNDQsMTQ1LDE0NiwxNDcsMTQ4LDE0OSwxNTEsMTUyLDE1MywxNTQsMTU3LDE1OCwxNTksMTYwLDE2MSwxNjIsMTYzLDE2NCwxNjUsMTY2LDE2NywxNjksMTcwLDE3MSwxNzUsMTc2LDE3NywxNzgsMTc5LDE4MCwxODEsMTgyLDE4MywxODQsMTg1LDE4NywxODgsMTg5LDE5MCwxOTEsMzAwLDMwMSwzMDIsMzAzLDMwNCwzMDYsMzA3LDMwOCwzMDksMzEwLDMxMSwzMTIsMzEzLDMxNCwzMTUsMzE2LDMxNywzMTgsMzE5LDMyMCwzMjEsMzI0LDMyNSwzMjcsMzI4LDMyOSwzMzAsMzMxLDMzMiwzMzMsMzM1LDMzNiwzMzcsMzM4LDMzOSwzNDAsMzQxLDM0NCwzNDUsMzQ2LDM0NywzNDgsMzQ5LDM1MCwzNTEsMzUyLDM1Myw2MzUsNjM2LDYzNyw2MzgsNjM5LDY0MCw2NDEsNjQyLDY0Myw2NDQsNjQ1LDY0Niw2NTAsNjUxLDY1Miw2NTMsNjU0LDY1NSw2NTYsNjU3LDY1OCw2NTksNjYwLDY2MSw2NjIsNjYzLDY2NCw2NjUsNjY2LDY2Nyw2NjgsNjY5LDY3MCw2NzEsNjcyLDY3Myw2NzQsNjc1LDY3Niw2NzcsNjc4LDY3OSw2ODAsNjgxLDY4Miw2ODMsNjg0LDY4NSwxMDA2LDEyMDAsMTIwMSIsIlVUIjoiMSIsIkFUIjoiMCIsImlzcyI6InNlbGYiLCJhdWQiOiJodHRwOi8vd3d3LmFwcmltby5jb20vIiwiZXhwIjoxNTA1OTAwMzIyLCJuYmYiOjE1MDU4MzU1MjJ9.RPV95dfkmy7Wrxp1xksu8Fr7P5ndQVkp7o8rpLmkHFc";

// decode 
jwt.decode(secret, token, function (err, decodedPayload, decodedHeader) {
    if (err) {
      //console.error(err.name, err.message);
    } else {
      //console.log(decodedPayload, decodedHeader);
    }
});
