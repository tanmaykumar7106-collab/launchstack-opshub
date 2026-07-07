import api from "../api/axios";

export const getSOPs = async () => {
    const res = await api.get("/sop");
    return res.data;
};

export const createSOP = async (data) => {
    const res = await api.post("/sop", data);
    return res.data;
};

export const updateSOP = async (id, data) => {
    const res = await api.put(`/sop/${id}`, data);
    return res.data;
};

export const deleteSOP = async (id) => {
    const res = await api.delete(`/sop/${id}`);
    return res.data;
};