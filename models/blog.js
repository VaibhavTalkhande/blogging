const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [2, "Title must be at least 2 characters long"]
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        minlength: [2, "Content must be at least 2 characters long"]
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Creator is required"],
        minlength: [2, "Creator must be at least 2 characters long"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

}, { timestamps: true });

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
