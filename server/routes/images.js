const router = require('express').Router();
const vision = require('@google-cloud/vision');
const { client } = require('../serverUtils');

router.post('/upload', function (req, res, next) {
 
  const decoded = req.body.img.replace('data:image/jpeg;base64,','')
  
  const request = {
    image: { content: decoded }
  };

  client.webDetection(request)
  .then(results => {
    const webDetection = results[0].webDetection;
    res.send({ names: webDetection.webEntities })
  })
  .catch(err => res.send( { message: err.message }))

});

module.exports = router;