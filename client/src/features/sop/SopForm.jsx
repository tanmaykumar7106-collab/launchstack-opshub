import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const inputClass =
    "rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

export default function SopForm({
    form,
    setForm,
    editingSop,
    onSubmit,
    onCancel,
}) {
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Card>
            <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                {editingSop ? "Edit SOP" : "Add New SOP"}
            </h2>

            <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
                <input
                    name="title"
                    placeholder="SOP Title"
                    value={form.title}
                    onChange={handleChange}
                    className={inputClass}
                    required
                />

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option>Operations</option>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Support</option>
                    <option>Development</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>Other</option>
                </select>

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={inputClass}
                >
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Archived</option>
                </select>

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className={`${inputClass} md:col-span-2`}
                />

                <textarea
                    name="stepsText"
                    placeholder="Steps - write one step per line"
                    value={form.stepsText}
                    onChange={handleChange}
                    className={`${inputClass} md:col-span-2`}
                    rows={6}
                />

                <div className="flex gap-3 md:col-span-2">
                    <Button type="submit">
                        {editingSop ? "Update SOP" : "Save SOP"}
                    </Button>

                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Card>
    );
}