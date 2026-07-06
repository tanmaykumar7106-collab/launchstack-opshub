const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require("./tasks.service");

// CREATE TASK
const create = async (req, res) => {
    try {
        const task = await createTask({
            ...req.body,
            owner: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL TASKS
const getAll = async (req, res) => {
    try {
        const tasks = await getAllTasks(req.user._id);

        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ONE TASK
const getOne = async (req, res) => {
    try {
        const task = await getTaskById(req.params.id, req.user._id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE TASK
const update = async (req, res) => {
    try {
        const task = await updateTask(req.params.id, req.user._id, req.body);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE TASK
const remove = async (req, res) => {
    try {
        const task = await deleteTask(req.params.id, req.user._id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
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