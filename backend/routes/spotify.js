const express = require('express');
const router = express.Router();
const SpotifyController = require('../controllers/SpotifyController');

router.get('/authorize', SpotifyController.authorize);
router.get('/callback', SpotifyController.callback);

module.exports = router;