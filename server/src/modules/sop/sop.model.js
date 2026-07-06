const mongoose = require("mongoose");

const sopSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            enum: [
                "Operations",
                "Sales",
                "Marketing",
                "Support",
                "Development",
                "HR",
                "Finance",
                "Other",
            ],
            default: "Operations",
        },

        description: {
            type: String,
            default: "",
        },

        steps: {
            type: [String],
            default: [],
        },

        status: {
            type: String,
            enum: ["Draft", "Published", "Archived"],
            default: "Draft",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("SOP", sopSchema);