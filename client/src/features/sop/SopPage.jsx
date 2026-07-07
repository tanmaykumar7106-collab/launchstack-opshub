import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getSOPs,
    createSOP,
    updateSOP,
    deleteSOP,
} from "../../services/sop.service";

import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";

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
                toast.success("SOP updated successfully");
            } else {
                await createSOP(payload);
                toast.success("SOP created successfully");
            }

            setForm(initialSopForm);
            setEditingSop(null);
            setShowForm(false);
            fetchSops();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to save SOP");
        }
    };

    const handleDelete = async (sopId) => {
        if (!window.confirm("Are you sure you want to delete this SOP?")) return;

        try {
            await deleteSOP(sopId);
            toast.success("SOP deleted successfully");
            fetchSops();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete SOP");
        }
    };

    if (loading) {
        return (
            <h2 className="text-slate-700 dark:text-slate-300">
                Loading SOPs...
            </h2>
        );
    }

    return (
        <Page>
            <PageHeader
                title="SOP Library"
                subtitle="Create and manage standard operating procedures."
                buttonText="+ New SOP"
                onButtonClick={openCreateForm}
            />

            {showForm && (
                <SopForm
                    form={form}
                    setForm={setForm}
                    editingSop={editingSop}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingSop(null);
                        setForm(initialSopForm);
                    }}
                />
            )}

            <SopTable
                sops={sops}
                onEdit={openEditForm}
                onDelete={handleDelete}
                onCreate={openCreateForm}
            />
        </Page>
    );
}