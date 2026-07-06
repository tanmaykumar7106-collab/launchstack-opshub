const {
    createSOP,
    getAllSOPs,
    getSOPById,
    updateSOP,
    deleteSOP,
} = require("./sop.service");

// CREATE SOP
const create = async (req, res) => {
    try {
        const sop = await createSOP({
            ...req.body,
            owner: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "SOP created successfully",
            data: sop,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ALL SOPs
const getAll = async (req, res) => {
    try {
        const sops = await getAllSOPs(req.user._id);

        res.status(200).json({
            success: true,
            count: sops.length,
            data: sops,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET ONE SOP
const getOne = async (req, res) => {
    try {
        const sop = await getSOPById(req.params.id, req.user._id);

        if (!sop) {
            return res.status(404).json({
                success: false,
                message: "SOP not found",
            });
        }

        res.status(200).json({
            success: true,
            data: sop,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// UPDATE SOP
const update = async (req, res) => {
    try {
        const sop = await updateSOP(req.params.id, req.user._id, req.body);

        if (!sop) {
            return res.status(404).json({
                success: false,
                message: "SOP not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "SOP updated successfully",
            data: sop,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE SOP
const remove = async (req, res) => {
    try {
        const sop = await deleteSOP(req.params.id, req.user._id);

        if (!sop) {
            return res.status(404).json({
                success: false,
                message: "SOP not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "SOP deleted successfully",
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