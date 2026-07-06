export default function SopTable({ sops, onEdit, onDelete }) {
    if (sops.length === 0) {
        return <p>No SOPs found.</p>;
    }

    return (
        <table className="w-full rounded-xl border bg-white">
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
                    <tr key={sop._id} className="border-t">
                        <td className="p-3">{sop.title}</td>
                        <td className="p-3">{sop.category}</td>
                        <td className="p-3">{sop.status}</td>
                        <td className="p-3">{sop.steps?.length || 0}</td>
                        <td className="flex gap-2 p-3">
                            <button
                                onClick={() => onEdit(sop)}
                                className="rounded-lg border px-3 py-1 text-sm hover:bg-slate-100"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => onDelete(sop._id)}
                                className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}