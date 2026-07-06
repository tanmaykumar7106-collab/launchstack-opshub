const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },

        projectName: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "Planning",
                "In Progress",
                "Review",
                "Completed",
                "On Hold",
            ],
            default: "Planning",
        },

        priority: {
            type: String,
            enum: [
                "Low",
                "Medium",
                "High",
                "Critical",
            ],
            default: "Medium",
        },

        budget: {
            type: Number,
            default: 0,
        },

        startDate: {
            type: Date,
        },

        endDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Project", projectSchema);