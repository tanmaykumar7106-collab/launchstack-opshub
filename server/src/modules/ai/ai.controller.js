const {
    generateSOPContent,
    generateTaskBreakdown,
    generateClientEmail,
} = require("./ai.service");

// Generate SOP
const generateSOP = async (req, res) => {
    try {
        const result = await generateSOPContent(req.body);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Generate Project Tasks
const generateTasks = async (req, res) => {
    try {
        const result = await generateTaskBreakdown(req.body);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Generate Client Email
const generateEmail = async (req, res) => {
    try {
        const result = await generateClientEmail(req.body);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    generateSOP,
    generateTasks,
    generateEmail,
};