const router = require('express').Router();
const axios = require('axios');
const { host, auth } = require('../serverUtils');

router.get(`/:database`, (req,res) => {
  console.log(req.params.database)
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