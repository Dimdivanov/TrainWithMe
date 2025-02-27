const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { themeController, postController } = require('../controllers');

// middleware that is specific to this router
//route to get all themes
router.get('/', themeController.getThemes);
router.post('/', auth(), themeController.createTheme);

router.get('/:themeId', themeController.getTheme);
router.post('/:themeId', auth(), postController.createPost);
router.put('/:themeId', auth(), themeController.subscribe);
//get all user articles router added
router.get('/user/:userId/articles', auth(), themeController.getUserArticles);
//delete theme router added
router.delete('/:themeId/delete', auth(), themeController.deleteTheme);

router.put('/:themeId/posts/:postId', auth(), postController.editPost);
router.delete('/:themeId/posts/:postId', auth(), postController.deletePost);
// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router;
