const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            minlength: [3, "Name must be at least 3 characters"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address",
            ],
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false, // 🔐 never return password by default
        },

        preferences: {
            categories: {
                type: [String],
                default: [],
            },
            languages: {
                type: [String],
                default: [],
            },
        },

        readArticles: { type: [Object], default: [] }, // store articles marked as read

        favoriteArticles: { type: [Object], default: [] }, // store articles marked as favorite
    },
    {
        timestamps: true,
        strict: true, //  prevents extra fields from being saved
    },
);

module.exports = mongoose.model("User", userSchema);
