const router = require('express').Router();

router.use('/characters', require('./characters'));
router.use('/comics', require('./comics'));
router.use('/creators', require('./creators'));
router.use('/events', require('./events'));
router.use('/series', require('./series'));
router.use('/stories', require('./stories'));

module.exports = router;