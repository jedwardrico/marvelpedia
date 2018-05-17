const router = require('express').Router();
const crypto = require('crypto');
const axios = require('axios');

const host = 'http://gateway.marvel.com/v1/public';
const ts = Date.now();
const keys = `${ts}${process.env.MARVEL_KEY}${process.env.MARVEL_ID}`;
const hash = crypto.createHash('md5').update(keys).digest("hex");
const auth = `ts=${ts}&apikey=${process.env.MARVEL_ID}&hash=${hash}`;

router.get(`/:database`, (req,res) => {
  axios.get(`${host}/${req.params.database}?${auth}`)
    .then(response => res.send(response.data.data.results))
    .catch(err => console.log(err))
})

router.get(`/:database/search/:search`, (req,res) => {
  axios.get(`${host}/${req.params.database}?${auth}&${req.params.search}`)
  .then(response => res.send(response.data.data.results))
  .catch(err => console.log(err))
})

router.get(`/:database/:id`, (req,res) => {
  console.log(req.params.database, req.params.id)
  axios.get(`${host}/${req.params.database}/${req.params.id}?${auth}`)
  .then(response => res.send(response.data.data.results))
  .catch(err => console.log(err))
})

module.exports = router;