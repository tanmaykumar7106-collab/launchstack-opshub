import { useEffect, useState } from "react";
import {
    getSOPs,
    createSOP,
    updateSOP,
    deleteSOP,
} from "../../services/sop.service";

import SopForm from "./SopForm";
import SopTable from "./SopTable";

const initialSopForm = {
    title: "",
    category: "Operations",
    description: "",
    stepsText: "",
    status: "Draft",
};

export default function SopPage() {
    const [sops, setSops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingSop, setEditingSop] = useState(null);
    const [form, setForm] = useState(initialSopForm);

    useEffect(() => {
        fetchSops();
    }, []);

    const fetchSops = async () => {
        try {
            const res = await getSOPs();
            setSops(res.data || []);
        } catch (err) {
            console.error("Error fetching SOPs:", err);
            setSops([]);
        } finally {
            setLoading(false);
        }
    };

    const openCreateForm = () => {
        setEditingSop(null);
        setForm(initialSopForm);
        setShowForm(true);
    };

    const openEditForm = (sop) => {
        setEditingSop(sop);
        setForm({
            title: sop.title || "",
            category: sop.category || "Operations",
            description: sop.description || "",
            stepsText: sop.steps?.join("\n") || "",
            status: sop.status || "Draft",
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            title: form.title,
            category: form.category,
            description: form.description,
            status: form.status,
            steps: form.stepsText
                .split("\n")
                .map((step) => step.trim())
                .filter(Boolean),
        };

        try {
            if (editingSop) {
                await updateSOP(editingSop._id, payload);
            } else {
                await createSOP(payload);
            }

            setForm(initialSopForm);
            setEditingSop(null);
            setShowForm(false);
            fetchSops();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to save SOP");
        }
    };

    const handleDelete = async (sopId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this SOP?"
        );

        if (!confirmDelete) return;

        try {
            await deleteSOP(sopId);
            fetchSops();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete SOP");
        }
    };

    if (loading) return <h2>Loading SOPs...</h2>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">SOP Library</h1>
                    <p className="text-slate-500">
                        Create and manage standard operating procedures.
                    </p>
                </div>

                <button
                    onClick={openCreateForm}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
                >
                    + New SOP
                </button>
            </div>

            {showForm && (
                <SopForm
                    form={form}
                    setForm={setForm}
                    editingSop={editingSop}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingSop(null);
                    }}
                />
            )}

            <SopTable
                sops={sops}
                onEdit={openEditForm}
                onDelete={handleDelete}
            />
        </div>
    );
}