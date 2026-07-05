const Client = require("./clients.model");

// ======================
// CREATE CLIENT
// ======================
const createClient = async (clientData) => {
return await Client.create(clientData);
};

// ======================
// GET ALL CLIENTS
// ======================
const getAllClients = async (userId) => {
return await Client.find({ owner: userId }).sort({ createdAt: -1 });
};

// ======================
// GET CLIENT BY ID
// ======================
const getClientById = async (clientId, userId) => {
return await Client.findOne({
    _id: clientId,
    owner: userId,
});
};

// ======================
// UPDATE CLIENT
// ======================
const updateClient = async (clientId, userId, data) => {
return await Client.findOneAndUpdate(
    {
    _id: clientId,
    owner: userId,
    },
    data,
    {
    new: true,
    runValidators: true,
    }
);
};

// ======================
// DELETE CLIENT
// ======================
const deleteClient = async (clientId, userId) => {
return await Client.findOneAndDelete({
    _id: clientId,
    owner: userId,
});
};

module.exports = {
createClient,
getAllClients,
getClientById,
updateClient,
deleteClient,
};