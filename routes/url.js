const express = require("express");
const router = express.Router();
const {generateURL,redirectURL,getAnalytics} = require('../controllers/url')

// router.get('/test',gethtml)

router.post('/',generateURL)
router.get('/:shortId',redirectURL)
router.get('/analytics/:shortId',getAnalytics)



module.exports = router