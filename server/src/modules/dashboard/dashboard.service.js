const Client = require("../clients/clients.model");
const Project = require("../projects/projects.model");

const getDashboardStats = async (userId) => {
    const clients = await Client.countDocuments({ owner: userId });
    const projects = await Project.countDocuments({ owner: userId });

    const recentProjects = await Project.find({ owner: userId })
        .populate("client", "companyName")
        .sort({ createdAt: -1 })
        .limit(5);

    return {
        clients,
        projects,
        tasks: 0,
        sops: 0,
        recentProjects,
    };
};

module.exports = {
    getDashboardStats,
};