const { userModel, tokenBlacklistModel } = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');

const bsonToJson = (data) => {
    return JSON.parse(JSON.stringify(data));
};
const removePassword = (data) => {
    const { password, __v, ...userData } = data;
    return userData;
};

function register(req, res, next) {
    const { email, username, password, rePassword, type } = req.body;

    console.log('from server: ', req.body);

    return userModel
        .create({ email, username, password, type })
        .then((createdUser) => {
            createdUser = bsonToJson(createdUser);
            createdUser = removePassword(createdUser);

            const token = utils.jwt.createToken({ id: createdUser._id });
            if (process.env.NODE_ENV === 'production') {
                res.cookie(authCookieName, token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                });
            } else {
                res.cookie(authCookieName, token, { httpOnly: true });
            }
            res.status(200).send(createdUser);
        })
        .catch((err) => {
            if (err.name === 'MongoError' && err.code === 11000) {
                let field = err.message.split('index: ')[1];
                field = field.split(' dup key')[0];
                field = field.substring(0, field.lastIndexOf('_'));

                res.status(409).send({ message: `This ${field} is already registered!` });
                return;
            }
            next(err);
        });
}

function login(req, res, next) {
    const { email, password } = req.body;

    userModel
        .findOne({ email })
        .then((user) => {
            return Promise.all([user, user ? user.matchPassword(password) : false]);
        })
        .then(([user, match]) => {
            if (!match) {
                res.status(401).send({ message: 'Wrong email or password' });
                return;
            }
            user = bsonToJson(user);
            user = removePassword(user);

            const token = utils.jwt.createToken({ id: user._id });

            if (process.env.NODE_ENV === 'production') {
                res.cookie(authCookieName, token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                });
            } else {
                res.cookie(authCookieName, token, { httpOnly: true });
            }
            res.status(200).send(user);
        })
        .catch(next);
}

function logout(req, res) {
    const token = req.cookies[authCookieName];

    tokenBlacklistModel
        .create({ token })
        .then(() => {
            res.clearCookie(authCookieName).status(204).send({ message: 'Logged out!' });
        })
        .catch((err) => res.send(err));
}
//get all users testing
function getProfilesInfo(req, res, next) {
    userModel
        .find({}, { password: 0, __v: 0 }) // Exclude password and __v fields
        .then((users) => {
            res.status(200).json(users); // Send the array of users
        })
        .catch(next); // Pass errors to the next middleware
}
//find user by name
function getSpecificProfile(req, res, next) {
    const { username } = req.params;

    userModel
        .findOne({ username }, { password: 0, __v: 0 })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found!' });
            }
            res.status(200).json(user);
        })
        .catch(next);
}

function getProfileInfo(req, res, next) {
    const { _id: userId } = req.user;

    userModel
        .findOne({ _id: userId }, { password: 0, __v: 0 }) //finding by Id and returning without password and __v
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(next);
}

function editProfileInfo(req, res, next) {
    const { _id: userId } = req.user;
    const { username, email, imageUrl, bio } = req.body;

    userModel
        .findOneAndUpdate(
            { _id: userId },
            { username, email, imageUrl, bio },
            { runValidators: true, new: true }
        )
        .then((x) => {
            res.status(200).json(x);
        })
        .catch(next);
}

module.exports = {
    login,
    register,
    logout,
    getProfileInfo,
    editProfileInfo,
    getProfilesInfo,
    getSpecificProfile,
};
