import { useEffect, useState } from "react";
import { getClients } from "../../services/clients.service";

export default function ClientPage() {
const [clients, setClients] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    fetchClients();
}, []);

const fetchClients = async () => {
    try {
    const res = await getClients();
    setClients(res.data);
    } catch (err) {
    console.error(err);
    } finally {
    setLoading(false);
    }
};

if (loading) {
    return <h2>Loading clients...</h2>;
}

return (
    <div>
    <h1 className="mb-6 text-3xl font-bold">
        Clients
    </h1>

    {clients.length === 0 ? (
        <p>No clients found.</p>
    ) : (
        <table className="w-full border">
        <thead>
            <tr className="bg-slate-100">
            <th className="p-3 text-left">Company</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Status</th>
            </tr>
        </thead>

        <tbody>
            {clients.map((client) => (
            <tr key={client._id} className="border-t">
                <td className="p-3">{client.companyName}</td>
                <td className="p-3">{client.contactPerson}</td>
                <td className="p-3">{client.email}</td>
                <td className="p-3">{client.status}</td>
            </tr>
            ))}
        </tbody>
        </table>
    )}
    </div>
);
}