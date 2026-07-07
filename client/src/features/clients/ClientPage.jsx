import { useEffect, useState } from "react";
import {
    getClients,
    createClient,
    updateClient,
    deleteClient,
} from "../../services/clients.service";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";

const initialForm = {
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    industry: "",
    status: "Lead",
    notes: "",
};

export default function ClientPage() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const res = await getClients();
            setClients(res.data || res.clients || []);
        } catch (err) {
            console.error("Error fetching clients:", err);
            setClients([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const openCreateForm = () => {
        setEditingClient(null);
        setForm(initialForm);
        setShowForm(true);
    };

    const openEditForm = (client) => {
        setEditingClient(client);
        setForm({
            companyName: client.companyName || "",
            contactPerson: client.contactPerson || "",
            email: client.email || "",
            phone: client.phone || "",
            website: client.website || "",
            industry: client.industry || "",
            status: client.status || "Lead",
            notes: client.notes || "",
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingClient) {
                await updateClient(editingClient._id, form);
            } else {
                await createClient(form);
            }

            setForm(initialForm);
            setEditingClient(null);
            setShowForm(false);
            fetchClients();
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        }
    };

    const handleDelete = async (clientId) => {
        if (!window.confirm("Are you sure you want to delete this client?")) return;

        try {
            await deleteClient(clientId);
            fetchClients();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete client");
        }
    };

    if (loading) return <h2>Loading clients...</h2>;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Clients"
                subtitle="Manage all your business clients."
                buttonText="+ New Client"
                onButtonClick={openCreateForm}
            />

            {showForm && (
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold">
                        {editingClient ? "Edit Client" : "Add New Client"}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                        <input name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} className="rounded-xl border p-3" required />
                        <input name="contactPerson" placeholder="Contact Person" value={form.contactPerson} onChange={handleChange} className="rounded-xl border p-3" required />
                        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="rounded-xl border p-3" required />
                        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="rounded-xl border p-3" required />
                        <input name="website" placeholder="Website" value={form.website} onChange={handleChange} className="rounded-xl border p-3" />
                        <input name="industry" placeholder="Industry" value={form.industry} onChange={handleChange} className="rounded-xl border p-3" />

                        <select name="status" value={form.status} onChange={handleChange} className="rounded-xl border p-3">
                            <option value="Lead">Lead</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        <textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} className="rounded-xl border p-3 md:col-span-2" />

                        <div className="flex gap-3 md:col-span-2">
                            <Button type="submit">
                                {editingClient ? "Update Client" : "Save Client"}
                            </Button>

                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingClient(null);
                                    setForm(initialForm);
                                }}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            )}

            {clients.length === 0 ? (
                <EmptyState
                    title="No Clients Yet"
                    description="Add your first client to start managing projects."
                    action={<Button onClick={openCreateForm}>+ New Client</Button>}
                />
            ) : (
                <table className="w-full overflow-hidden rounded-xl border bg-white">
                    <thead className="bg-slate-100">
                        <tr>
                            <th className="p-3 text-left">Company</th>
                            <th className="p-3 text-left">Contact</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clients.map((client) => (
                            <tr key={client._id} className="border-t hover:bg-slate-50">
                                <td className="p-3 font-medium">{client.companyName}</td>
                                <td className="p-3">{client.contactPerson}</td>
                                <td className="p-3">{client.email}</td>
                                <td className="p-3">
                                    <StatusBadge status={client.status} />
                                </td>
                                <td className="flex gap-2 p-3">
                                    <Button size="sm" variant="secondary" onClick={() => openEditForm(client)}>
                                        Edit
                                    </Button>

                                    <Button size="sm" variant="danger" onClick={() => handleDelete(client._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}