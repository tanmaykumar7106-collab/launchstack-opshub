const Project = require("./projects.model");

// CREATE PROJECT
const createProject = async (projectData) => {
    return await Project.create(projectData);
};

// GET ALL PROJECTS
const getAllProjects = async (userId) => {
    return await Project.find({ owner: userId })
        .populate("client", "companyName contactPerson email")
        .sort({ createdAt: -1 });
};

// GET PROJECT BY ID
const getProjectById = async (projectId, userId) => {
    return await Project.findOne({
        _id: projectId,
        owner: userId,
    }).populate("client", "companyName contactPerson email");
};

// UPDATE PROJECT
const updateProject = async (projectId, userId, data) => {
    return await Project.findOneAndUpdate(
        {
            _id: projectId,
            owner: userId,
        },
        data,
        {
            new: true,
            runValidators: true,
        }
    ).populate("client", "companyName contactPerson email");
};

// DELETE PROJECT
const deleteProject = async (projectId, userId) => {
    return await Project.findOneAndDelete({
        _id: projectId,
        owner: userId,
    });
};

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
};