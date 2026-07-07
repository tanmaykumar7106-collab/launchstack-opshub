import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";

export default function ClientTable({
    clients,
    onEdit,
    onDelete,
    onCreate,
}) {
    if (clients.length === 0) {
        return (
            <EmptyState
                title="No Clients Yet"
                description="Add your first client to start managing projects."
                action={
                    <Button onClick={onCreate}>
                        + New Client
                    </Button>
                }
            />
        );
    }

    return (
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
                        <td className="p-3 font-medium">
                            {client.companyName}
                        </td>

                        <td className="p-3">
                            {client.contactPerson}
                        </td>

                        <td className="p-3">
                            {client.email}
                        </td>

                        <td className="p-3">
                            <StatusBadge status={client.status} />
                        </td>

                        <td className="flex gap-2 p-3">
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => onEdit(client)}
                            >
                                Edit
                            </Button>

                            <Button
                                size="sm"
                                variant="danger"
                                onClick={() => onDelete(client._id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}