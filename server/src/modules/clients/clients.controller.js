const {
createClient,
getAllClients,
getClientById,
updateClient,
deleteClient,
} = require("./clients.service");

// ======================
// CREATE CLIENT
// ======================
const create = async (req, res) => {
try {
    const client = await createClient({
    ...req.body,
    owner: req.user._id,
    });

    res.status(201).json({
    success: true,
    message: "Client created successfully",
    data: client,
    });
} catch (error) {
    res.status(400).json({
    success: false,
    message: error.message,
    });
}
};

// ======================
// GET ALL CLIENTS
// ======================
const getAll = async (req, res) => {
try {
    const clients = await getAllClients(req.user._id);

    res.status(200).json({
    success: true,
    count: clients.length,
    data: clients,
    });
} catch (error) {
    res.status(500).json({
    success: false,
    message: error.message,
    });
}
};

// ======================
// GET CLIENT BY ID
// ======================
const getOne = async (req, res) => {
try {
    const client = await getClientById(req.params.id, req.user._id);

    if (!client) {
    return res.status(404).json({
        success: false,
        message: "Client not found",
    });
    }

    res.status(200).json({
    success: true,
    data: client,
    });
} catch (error) {
    res.status(500).json({
    success: false,
    message: error.message,
    });
}
};

// ======================
// UPDATE CLIENT
// ======================
const update = async (req, res) => {
try {
    const client = await updateClient(
    req.params.id,
    req.user._id,
    req.body
    );

    if (!client) {
    return res.status(404).json({
        success: false,
        message: "Client not found",
    });
    }

    res.status(200).json({
    success: true,
    message: "Client updated successfully",
    data: client,
    });
} catch (error) {
    res.status(500).json({
    success: false,
    message: error.message,
    });
}
};

// ======================
// DELETE CLIENT
// ======================
const remove = async (req, res) => {
try {
    const client = await deleteClient(req.params.id, req.user._id);

    if (!client) {
    return res.status(404).json({
        success: false,
        message: "Client not found",
    });
    }

    res.status(200).json({
    success: true,
    message: "Client deleted successfully",
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