import api from "../api/axios";

// Get all tasks
export const getTasks = async () => {
    const res = await api.get("/tasks");
    return res.data;
};

// Create task
export const createTask = async (data) => {
    const res = await api.post("/tasks", data);
    return res.data;
};

// Update task
export const updateTask = async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data;
};

// Delete task
export const deleteTask = async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    return res.data;
};