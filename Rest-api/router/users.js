const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { auth } = require('../utils');

router.get('/profile', auth(), authController.getProfileInfo);
router.put('/profile', auth(), authController.editProfileInfo);

//my new routes for trainers page
router.get('/profiles/all', authController.getProfilesInfo);
router.get('/profiles/:username', authController.getSpecificProfile);

module.exports = router;
