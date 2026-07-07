const Client = require("../clients/clients.model");
const Project = require("../projects/projects.model");
const Task = require("../tasks/tasks.model");

const groupByStatus = async (Model, userId) => {
    return await Model.aggregate([
        { $match: { owner: userId } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
};

const getDashboardStats = async (userId) => {
    const clients = await Client.countDocuments({ owner: userId });
    const projects = await Project.countDocuments({ owner: userId });
    const tasks = await Task.countDocuments({ owner: userId });

    const totalBudgetResult = await Project.aggregate([
        { $match: { owner: userId } },
        { $group: { _id: null, totalBudget: { $sum: "$budget" } } },
    ]);

    const recentProjects = await Project.find({ owner: userId })
        .populate("client", "companyName")
        .sort({ createdAt: -1 })
        .limit(5);

    const upcomingTasks = await Task.find({
        owner: userId,
        dueDate: { $exists: true, $ne: null },
        status: { $ne: "Done" },
    })
        .populate("project", "projectName")
        .sort({ dueDate: 1 })
        .limit(5);

    return {
        clients,
        projects,
        tasks,
        sops: 0,
        totalBudget: totalBudgetResult[0]?.totalBudget || 0,
        projectStatus: await groupByStatus(Project, userId),
        taskStatus: await groupByStatus(Task, userId),
        recentProjects,
        upcomingTasks,
    };
};

module.exports = {
    getDashboardStats,
};