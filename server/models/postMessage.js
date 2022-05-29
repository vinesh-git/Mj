import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    code: Object,
    creator: String,
    name: String,
    tags: [String],
    description: String,
    mode: String,
    files: [Object],
    likes: {
        type: [String],
        default: [],
    },
    // likeCount: {
    //     type: Number,
    //     default: 0,
    // },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;