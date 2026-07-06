const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require("./projects.service");

// CREATE PROJECT
const create = async (req, res) => {
    try {
        const project = await createProject({
            ...req.body,
            owner: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: project,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL PROJECTS
const getAll = async (req, res) => {
    try {
        const projects = await getAllProjects(req.user._id);

        res.status(200).json({
            success: true,
            count: projects.length,
            data: projects,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ONE PROJECT
const getOne = async (req, res) => {
    try {
        const project = await getProjectById(req.params.id, req.user._id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.status(200).json({
            success: true,
            data: project,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE PROJECT
const update = async (req, res) => {
    try {
        const project = await updateProject(
            req.params.id,
            req.user._id,
            req.body
        );

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Project updated successfully",
            data: project,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE PROJECT
const remove = async (req, res) => {
    try {
        const project = await deleteProject(req.params.id, req.user._id);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Project deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    update,
    remove,
};