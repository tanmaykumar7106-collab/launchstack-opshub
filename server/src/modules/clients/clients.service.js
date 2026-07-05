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
const getAllClients = async (userId, query) => {
const {
    search = "",
    status,
    page = 1,
    limit = 10,
    sort = "-createdAt",
} = query;

const filter = {
    owner: userId,
};

if (search) {
    filter.$or = [
    {
        companyName: {
        $regex: search,
        $options: "i",
        },
    },
    {
        contactPerson: {
        $regex: search,
        $options: "i",
        },
    },
    {
        email: {
        $regex: search,
        $options: "i",
        },
    },
    ];
}

if (status) {
    filter.status = status;
}

const clients = await Client.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(Number(limit));

const total = await Client.countDocuments(filter);

return {
    clients,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
};
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