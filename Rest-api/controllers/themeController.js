const { themeModel, postModel, userModel } = require('../models');

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

    userModel
        .findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            themeModel
                .create({
                    themeName,
                    username: user.username,
                    userId,
                    subscribers: [userId],
                    imageUrl,
                    articleData,
                })
                .then((theme) => {
                    res.status(200).json(theme);
                })
                .catch(next);
        })
        .catch(next);
}

//added delete theme only if authorized
function deleteTheme(req, res, next) {
    const { themeId } = req.params; // themeId is passed from the route parameter
    const { _id: userId } = req.user; // User's ID from the authenticated session

    // Step 1: Find the theme to check if it exists
    themeModel
        .findById(themeId)
        .then((theme) => {
            // If theme does not exist, return a 404 error
            if (!theme) {
                return res.status(404).json({ message: 'Theme not found' });
            }

            // Step 2: Check if the authenticated user is the owner of the theme
            if (theme.userId.toString() !== userId.toString()) {
                return res
                    .status(403)
                    .json({ message: 'You are not authorized to delete this theme' });
            }

            // Step 3: If the user is authorized, delete the theme and clean up related references
            Promise.all([
                themeModel.findByIdAndDelete(themeId), // Delete the theme
                userModel.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { posts: themeId } } // Remove the theme reference from the user's list
                ),
                postModel.updateMany(
                    { themeId: themeId },
                    { $pull: { posts: themeId } } // Optionally remove the theme reference from posts
                ),
            ])
                .then(([deletedTheme]) => {
                    res.status(200).json({
                        message: 'Theme deleted successfully',
                        deletedTheme,
                    });
                })
                .catch(next);
        })
        .catch(next); // Catch any database errors and pass them to error handler
}

// find user articles
function getUserArticles(req, res, next) {
    const { userId } = req.params;

    themeModel
        .find({ userId })
        .then((themes) => {
            if (!themes || themes.length === 0) {
                return res.status(404).json({ message: 'No themes found for this user' });
            }
            res.status(200).json(themes);
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
    deleteTheme,
    getUserArticles,
};
