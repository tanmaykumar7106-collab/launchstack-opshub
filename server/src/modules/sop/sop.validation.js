const validateSOP = (req, res, next) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            success: false,
            message: "SOP title is required.",
        });
    }

    next();
};

module.exports = validateSOP;