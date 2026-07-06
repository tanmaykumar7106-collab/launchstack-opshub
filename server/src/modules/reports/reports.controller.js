const { getReportsOverview } = require("./reports.service");

const getOverview = async (req, res) => {
    try {
        const report = await getReportsOverview(req.user._id);

        res.status(200).json({
            success: true,
            data: report,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getOverview,
};