import { useEffect, useState } from "react";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../../services/tasks.service";
import { getProjects } from "../../services/projects.service";

import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import PageHeader from "@/components/ui/PageHeader";

const initialTaskForm = {
    project: "",
    title: "",
    description: "",
    status: "Todo",
    priority: "Medium",
    dueDate: "",
};

export default function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [form, setForm] = useState(initialTaskForm);

    useEffect(() => {
        fetchData();
    }, []);

    const formatDateForInput = (date) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    const fetchData = async () => {
        try {
            const [taskRes, projectRes] = await Promise.all([
                getTasks(),
                getProjects(),
            ]);

            setTasks(taskRes.data || []);
            setProjects(projectRes.data || []);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    const openCreateForm = () => {
        setEditingTask(null);
        setForm(initialTaskForm);
        setShowForm(true);
    };

    const openEditForm = (task) => {
        setEditingTask(task);

        setForm({
            project: task.project?._id || task.project || "",
            title: task.title || "",
            description: task.description || "",
            status: task.status || "Todo",
            priority: task.priority || "Medium",
            dueDate: formatDateForInput(task.dueDate),
        });

        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingTask) {
                await updateTask(editingTask._id, form);
            } else {
                await createTask(form);
            }

            setForm(initialTaskForm);
            setEditingTask(null);
            setShowForm(false);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to save task");
        }
    };

    const handleDelete = async (taskId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) return;

        try {
            await deleteTask(taskId);
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete task");
        }
    };

    if (loading) return <h2>Loading tasks...</h2>;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Tasks"
                subtitle="Manage tasks linked to your projects."
                buttonText="+ New Task"
                onButtonClick={openCreateForm}
            />

            {showForm && (
                <TaskForm
                    form={form}
                    setForm={setForm}
                    projects={projects}
                    editingTask={editingTask}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingTask(null);
                        setForm(initialTaskForm);
                    }}
                />
            )}

            <TaskTable
                tasks={tasks}
                onEdit={openEditForm}
                onDelete={handleDelete}
                onCreate={openCreateForm}
            />
        </div>
    );
}