const Task = require("./tasks.model");

// CREATE TASK
const createTask = async (taskData) => {
    return await Task.create(taskData);
};

// GET ALL TASKS
const getAllTasks = async (userId) => {
    return await Task.find({ owner: userId })
        .populate("project", "projectName status")
        .sort({ createdAt: -1 });
};

// GET TASK BY ID
const getTaskById = async (taskId, userId) => {
    return await Task.findOne({
        _id: taskId,
        owner: userId,
    }).populate("project", "projectName status");
};

// UPDATE TASK
const updateTask = async (taskId, userId, data) => {
    return await Task.findOneAndUpdate(
        {
            _id: taskId,
            owner: userId,
        },
        data,
        {
            new: true,
            runValidators: true,
        }
    ).populate("project", "projectName status");
};

// DELETE TASK
const deleteTask = async (taskId, userId) => {
    return await Task.findOneAndDelete({
        _id: taskId,
        owner: userId,
    });
};

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};