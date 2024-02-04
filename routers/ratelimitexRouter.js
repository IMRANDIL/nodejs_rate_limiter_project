const { exampleRateLimitController } = require('../controllers/ratelimitController');

const router = require('express').Router();



router.get('/test-rate-limit', exampleRateLimitController)



module.exports = router;