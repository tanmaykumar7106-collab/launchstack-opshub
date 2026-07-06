const Project = require("./projects.model");

const createProject = async (projectData) => {
    return await Project.create(projectData);
};

const getAllProjects = async (userId) => {
    return await Project.find({ owner: userId })
        .populate("client", "companyName contactPerson email")
        .sort({ createdAt: -1 });
};

const getProjectById = async (projectId, userId) => {
    return await Project.findOne({
        _id: projectId,
        owner: userId,
    }).populate("client", "companyName contactPerson email");
};

const updateProject = async (projectId, userId, data) => {
    return await Project.findOneAndUpdate(
        { _id: projectId, owner: userId },
        data,
        { new: true, runValidators: true }
    ).populate("client", "companyName contactPerson email");
};

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