import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
    getClients,
    createClient,
    updateClient,
    deleteClient,
} from "../../services/clients.service";

import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
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
                toast.success("Client updated successfully");
            } else {
                await createClient(form);
                toast.success("Client created successfully");
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
            toast.success("Client deleted successfully");
            fetchClients();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to delete client");
        }
    };

    if (loading) {
        return <h2 className="text-slate-700 dark:text-slate-300">Loading clients...</h2>;
    }

    return (
        <Page>
            <PageHeader
                title="Clients"
                subtitle="Manage all your business clients."
                buttonText="+ New Client"
                onButtonClick={openCreateForm}
            />

            {showForm && (
                <Card>
                    <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                        {editingClient ? "Edit Client" : "Add New Client"}
                    </h2>

                    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                        <input
                            name="companyName"
                            placeholder="Company Name"
                            value={form.companyName}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            required
                        />

                        <input
                            name="contactPerson"
                            placeholder="Contact Person"
                            value={form.contactPerson}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            required
                        />

                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            required
                        />

                        <input
                            name="phone"
                            placeholder="Phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            required
                        />

                        <input
                            name="website"
                            placeholder="Website"
                            value={form.website}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />

                        <input
                            name="industry"
                            placeholder="Industry"
                            value={form.industry}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        >
                            <option value="Lead">Lead</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>

                        <textarea
                            name="notes"
                            placeholder="Notes"
                            value={form.notes}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 md:col-span-2 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        />

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
                </Card>
            )}

            {clients.length === 0 ? (
                <EmptyState
                    title="No Clients Yet"
                    description="Add your first client to start managing projects."
                    action={<Button onClick={openCreateForm}>+ New Client</Button>}
                />
            ) : (
                <Card className="p-0">
                    <table className="w-full overflow-hidden">
                        <thead className="bg-slate-100 dark:bg-slate-800">
                            <tr>
                                <th className="p-3 text-left text-slate-700 dark:text-slate-300">
                                    Company
                                </th>
                                <th className="p-3 text-left text-slate-700 dark:text-slate-300">
                                    Contact
                                </th>
                                <th className="p-3 text-left text-slate-700 dark:text-slate-300">
                                    Email
                                </th>
                                <th className="p-3 text-left text-slate-700 dark:text-slate-300">
                                    Status
                                </th>
                                <th className="p-3 text-left text-slate-700 dark:text-slate-300">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {clients.map((client) => (
                                <tr
                                    key={client._id}
                                    className="border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                                >
                                    <td className="p-3 font-medium text-slate-900 dark:text-white">
                                        {client.companyName}
                                    </td>
                                    <td className="p-3 text-slate-600 dark:text-slate-400">
                                        {client.contactPerson}
                                    </td>
                                    <td className="p-3 text-slate-600 dark:text-slate-400">
                                        {client.email}
                                    </td>
                                    <td className="p-3">
                                        <StatusBadge status={client.status} />
                                    </td>
                                    <td className="flex gap-2 p-3">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => openEditForm(client)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => handleDelete(client._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            )}
        </Page>
    );
}