var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlAd = require('../controllers/ad');
var ctrlCity = require('../controllers/city');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// ad operations
router.post('/save_ad', ctrlAd.save);
router.post('/update_ad', ctrlAd.update);
router.post('/delete_ad', ctrlAd.delete);
router.get('/get_ads', ctrlAd.getAll);

// city operations
router.post('/save_city', ctrlCity.save);
router.get('/get_cities', ctrlCity.getAll);

module.exports = router;
