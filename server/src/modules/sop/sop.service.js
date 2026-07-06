const SOP = require("./sop.model");

// CREATE SOP
const createSOP = async (sopData) => {
    return await SOP.create(sopData);
};

// GET ALL SOPs
const getAllSOPs = async (userId) => {
    return await SOP.find({ owner: userId }).sort({ createdAt: -1 });
};

// GET SOP BY ID
const getSOPById = async (sopId, userId) => {
    return await SOP.findOne({
        _id: sopId,
        owner: userId,
    });
};

// UPDATE SOP
const updateSOP = async (sopId, userId, data) => {
    return await SOP.findOneAndUpdate(
        {
            _id: sopId,
            owner: userId,
        },
        data,
        {
            new: true,
            runValidators: true,
        }
    );
};

// DELETE SOP
const deleteSOP = async (sopId, userId) => {
    return await SOP.findOneAndDelete({
        _id: sopId,
        owner: userId,
    });
};

module.exports = {
    createSOP,
    getAllSOPs,
    getSOPById,
    updateSOP,
    deleteSOP,
};