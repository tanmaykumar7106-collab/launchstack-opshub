const Client = require("../clients/clients.model");

const getDashboardStats = async (userId) => {
    const clients = await Client.countDocuments({ owner: userId });

    return {
        clients,
        projects: 0,
        tasks: 0,
        sops: 0,
    };
};

module.exports = {
    getDashboardStats,
};