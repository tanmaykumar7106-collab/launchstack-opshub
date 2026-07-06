const validateProject = (req, res, next) => {
    const { client, projectName } = req.body;

    if (!client || !projectName) {
        return res.status(400).json({
            success: false,
            message: "Client and project name are required.",
        });
    }

    next();
};

module.exports = validateProject;