const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
{
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },

    companyName: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
    },

    contactPerson: {
    type: String,
    required: [true, "Contact person is required"],
    trim: true,
    },

    email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    },

    phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    },

    website: {
    type: String,
    trim: true,
    default: "",
    },

    industry: {
    type: String,
    trim: true,
    default: "",
    },

    status: {
    type: String,
    enum: ["Lead", "Active", "Inactive"],
    default: "Lead",
    },

    notes: {
    type: String,
    trim: true,
    default: "",
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("Client", clientSchema);