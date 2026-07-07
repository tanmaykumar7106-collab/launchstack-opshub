import api from "../api/axios";

export const generateSOP = async (data) => {
    const res = await api.post("/ai/sop", data);
    return res.data;
};

export const generateTasks = async (data) => {
    const res = await api.post("/ai/tasks", data);
    return res.data;
};

export const generateEmail = async (data) => {
    const res = await api.post("/ai/email", data);
    return res.data;
};