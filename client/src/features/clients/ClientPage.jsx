import { useEffect, useState } from "react";
import {
    getClients,
    createClient,
    updateClient,
    deleteClient,
} from "../../services/clients.service";

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
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    const handleDelete = async (clientId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this client?"
        );

        if (!confirmDelete) return;

        try {
            await deleteClient(clientId);
            fetchClients();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete client");
        }
    };

    if (loading) return <h2>Loading clients...</h2>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Clients</h1>
                    <p className="text-slate-500">Manage your business clients.</p>
                </div>

                <button
                    onClick={openCreateForm}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700"
                >
                    + Add Client
                </button>
            </div>

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
                            <button type="submit" className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700">
                                {editingClient ? "Update Client" : "Save Client"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingClient(null);
                                    setForm(initialForm);
                                }}
                                className="rounded-xl border px-5 py-2.5"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {clients.length === 0 ? (
                <p>No clients found.</p>
            ) : (
                <table className="w-full overflow-hidden rounded-xl border border-slate-300 bg-white">
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
                            <tr key={client._id} className="border-t">
                                <td className="p-3">{client.companyName}</td>
                                <td className="p-3">{client.contactPerson}</td>
                                <td className="p-3">{client.email}</td>
                                <td className="p-3">{client.status}</td>
                                <td className="flex gap-2 p-3">
                                    <button
                                        onClick={() => openEditForm(client)}
                                        className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-100"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(client._id)}
                                        className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}