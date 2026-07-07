import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import StatusBadge from "@/components/ui/StatusBadge";

export default function SopTable({ sops, onEdit, onDelete, onCreate }) {
    if (sops.length === 0) {
        return (
            <EmptyState
                title="No SOPs Yet"
                description="Create your first standard operating procedure."
                action={<Button onClick={onCreate}>+ New SOP</Button>}
            />
        );
    }

    return (
        <table className="w-full overflow-hidden rounded-xl border bg-white">
            <thead className="bg-slate-100">
                <tr>
                    <th className="p-3 text-left">Title</th>
                    <th className="p-3 text-left">Category</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Steps</th>
                    <th className="p-3 text-left">Actions</th>
                </tr>
            </thead>

            <tbody>
                {sops.map((sop) => (
                    <tr key={sop._id} className="border-t hover:bg-slate-50">
                        <td className="p-3 font-medium">{sop.title}</td>
                        <td className="p-3">{sop.category}</td>
                        <td className="p-3">
                            <StatusBadge status={sop.status} />
                        </td>
                        <td className="p-3">{sop.steps?.length || 0}</td>
                        <td className="flex gap-2 p-3">
                            <Button size="sm" variant="secondary" onClick={() => onEdit(sop)}>
                                Edit
                            </Button>

                            <Button size="sm" variant="danger" onClick={() => onDelete(sop._id)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}