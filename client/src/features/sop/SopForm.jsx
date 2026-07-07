const initialSopForm = {
    title: "",
    category: "Operations",
    description: "",
    stepsText: "",
    status: "Draft",
};

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
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">
                {editingSop ? "Edit SOP" : "Add New SOP"}
            </h2>

            <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
                <input
                    name="title"
                    placeholder="SOP Title"
                    value={form.title}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
                    required
                />

                <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="rounded-xl border p-3"
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
                    className="rounded-xl border p-3"
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
                    className="rounded-xl border p-3 md:col-span-2"
                />

                <textarea
                    name="stepsText"
                    placeholder="Steps - write one step per line"
                    value={form.stepsText}
                    onChange={handleChange}
                    className="rounded-xl border p-3 md:col-span-2"
                    rows={6}
                />

                <div className="flex gap-3 md:col-span-2">
                    <button
                        type="submit"
                        className="rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700"
                    >
                        {editingSop ? "Update SOP" : "Save SOP"}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setForm(initialSopForm);
                            onCancel();
                        }}
                        className="rounded-xl border px-5 py-2.5"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}