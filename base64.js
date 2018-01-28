let b64Buffer = new Buffer("ADMIN:ca4598be66ec4288a7fe36229e51d564");
let b64 = b64Buffer.toString('base64');
console.log(b64);
let asciiBuffer = new Buffer('bG9hZHVzZXI0OTpjZjRhYTExMjM2OTY0YThhYWFkYzE2NWEzYTc1OGQxNQ==', 'base64');
let ascii = asciiBuffer.toString('ascii');
console.log(ascii);