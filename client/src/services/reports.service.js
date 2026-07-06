import api from "../api/axios";

export const getReportsOverview = async () => {
    const res = await api.get("/reports/overview");
    return res.data;
};