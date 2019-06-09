const crypto = require('crypto');
var args = process.argv.slice(2);
//console.log('args: ', args);

const secret = 'aavoni-99';
const hash = crypto.createHmac('sha256', secret)
                   .update(args[0])
                   .digest('hex');
console.log(hash);