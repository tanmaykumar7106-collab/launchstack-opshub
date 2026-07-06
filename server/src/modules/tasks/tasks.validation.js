const validateTask = (req, res, next) => {
    const { project, title } = req.body;

    if (!project || !title) {
        return res.status(400).json({
            success: false,
            message: "Project and task title are required.",
        });
    }

    next();
};

module.exports = validateTask;