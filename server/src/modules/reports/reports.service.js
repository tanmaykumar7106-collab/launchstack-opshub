const Client = require("../clients/clients.model");
const Project = require("../projects/projects.model");
const Task = require("../tasks/tasks.model");

const groupByStatus = async (Model, userId) => {
    return await Model.aggregate([
        { $match: { owner: userId } },
        { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
};

const getReportsOverview = async (userId) => {
    const clients = await Client.countDocuments({ owner: userId });
    const projects = await Project.countDocuments({ owner: userId });
    const tasks = await Task.countDocuments({ owner: userId });

    const completedProjects = await Project.countDocuments({
        owner: userId,
        status: "Completed",
    });

    const completedTasks = await Task.countDocuments({
        owner: userId,
        status: "Done",
    });

    const budgetResult = await Project.aggregate([
        { $match: { owner: userId } },
        { $group: { _id: null, totalBudget: { $sum: "$budget" } } },
    ]);

    const totalBudget = budgetResult[0]?.totalBudget || 0;

    return {
        totals: {
            clients,
            projects,
            tasks,
            totalBudget,
        },
        completion: {
            completedProjects,
            completedTasks,
        },
        breakdowns: {
            clientsByStatus: await groupByStatus(Client, userId),
            projectsByStatus: await groupByStatus(Project, userId),
            tasksByStatus: await groupByStatus(Task, userId),
        },
    };
};

module.exports = {
    getReportsOverview,
};