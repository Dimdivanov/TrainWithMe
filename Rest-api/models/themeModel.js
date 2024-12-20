const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const themeSchema = new mongoose.Schema(
    {
        themeName: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: String,
        },
        articleData: {
            type: String,
        },
        subscribers: [
            {
                type: ObjectId,
                ref: 'User',
            },
        ],
        username: {
            type: String,
        },
        userId: {
            type: ObjectId,
            ref: 'User',
        },
        posts: [
            {
                type: ObjectId,
                ref: 'Post',
            },
        ],
    },
    { timestamps: { createdAt: 'created_at' } }
);

module.exports = mongoose.model('Theme', themeSchema);
