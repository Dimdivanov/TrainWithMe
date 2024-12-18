const { themeModel } = require('../models');
const { newPost } = require('./postController');

function getThemes(req, res, next) {
    themeModel
        .find()
        .populate('userId')
        .then((themes) => res.json(themes))
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel
        .findById(themeId)
        .populate({
            path: 'posts',
            populate: {
                path: 'userId',
            },
        })
        .then((theme) => res.json(theme))
        .catch(next);
}

function createTheme(req, res, next) {
    const { themeName, imageUrl, articleData } = req.body;
    const { _id: userId } = req.user;
    console.log('FROM SERVER', themeName, imageUrl, articleData);

    themeModel
        .create({ themeName, userId, subscribers: [userId], imageUrl, articleData })
        .then((theme) => {
            res.status(200).json(theme);
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel
        .findByIdAndUpdate(
            { _id: themeId },
            { $addToSet: { subscribers: userId } },
            { new: true }
        )
        .then((updatedTheme) => {
            res.status(200).json(updatedTheme);
        })
        .catch(next);
}

module.exports = {
    getThemes,
    createTheme,
    getTheme,
    subscribe,
};
