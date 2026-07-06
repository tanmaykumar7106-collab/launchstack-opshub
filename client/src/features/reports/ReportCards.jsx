export default function ReportCards({ totals }) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Clients</p>
                <h2 className="mt-2 text-3xl font-bold">{totals.clients}</h2>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Projects</p>
                <h2 className="mt-2 text-3xl font-bold">{totals.projects}</h2>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Tasks</p>
                <h2 className="mt-2 text-3xl font-bold">{totals.tasks}</h2>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Total Budget</p>
                <h2 className="mt-2 text-3xl font-bold">
                    ₹{Number(totals.totalBudget || 0).toLocaleString()}
                </h2>
            </div>
        </div>
    );
}