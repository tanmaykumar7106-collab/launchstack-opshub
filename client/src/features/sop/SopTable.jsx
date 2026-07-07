import Card from "@/components/ui/Card";
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
        <Card className="p-0">
            <table className="w-full overflow-hidden">
                <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                        <th className="p-3 text-left text-slate-700 dark:text-slate-300">
                            Title
                        </th>
                        <th className="p-3 text-left text-slate-700 dark:text-slate-300">
                            Category
                        </th>
                        <th className="p-3 text-left text-slate-700 dark:text-slate-300">
                            Status
                        </th>
                        <th className="p-3 text-left text-slate-700 dark:text-slate-300">
                            Steps
                        </th>
                        <th className="p-3 text-left text-slate-700 dark:text-slate-300">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {sops.map((sop) => (
                        <tr
                            key={sop._id}
                            className="border-t border-slate-200 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                        >
                            <td className="p-3 font-medium text-slate-900 dark:text-white">
                                {sop.title}
                            </td>
                            <td className="p-3 text-slate-600 dark:text-slate-400">
                                {sop.category}
                            </td>
                            <td className="p-3">
                                <StatusBadge status={sop.status} />
                            </td>
                            <td className="p-3 text-slate-600 dark:text-slate-400">
                                {sop.steps?.length || 0}
                            </td>
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
        </Card>
    );
}