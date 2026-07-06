import api from "../api/axios";

// Get all clients
export const getClients = async () => {
const res = await api.get("/clients");
return res.data;
};

// Create client
export const createClient = async (data) => {
const res = await api.post("/clients", data);
return res.data;
};

// Update client
export const updateClient = async (id, data) => {
const res = await api.put(`/clients/${id}`, data);
return res.data;
};

// Delete client
export const deleteClient = async (id) => {
const res = await api.delete(`/clients/${id}`);
return res.data;
};