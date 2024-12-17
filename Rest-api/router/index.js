const router = require('express').Router();
const users = require('./users');
const themes = require('./themes');
const posts = require('./posts');
const likes = require('./likes');
const test = require('./test');
const profiles = require('./users');
const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);
router.use('/themes', themes);

//my new route
router.use('/profiles', profiles);

router.use('/posts', posts);
router.use('/likes', likes);
router.use('/test', test);

module.exports = router;
