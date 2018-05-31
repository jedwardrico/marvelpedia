const vision = require('@google-cloud/vision');
const crypto = require('crypto');
const path = require('path');

const host = 'http://gateway.marvel.com/v1/public';
const ts = Date.now();
const keys = `${ts}${process.env.MARVEL_KEY}${process.env.MARVEL_ID}`;
const hash = crypto.createHash('md5').update(keys).digest("hex");
const auth = `ts=${ts}&apikey=${process.env.MARVEL_ID}&hash=${hash}`;

const client = new vision.ImageAnnotatorClient({ 
  keyFilename: path.join(__dirname, '../marvel_lookup.json')
});


module.exports = {
  host,
  ts,
  keys,
  hash,
  auth,
  client
}