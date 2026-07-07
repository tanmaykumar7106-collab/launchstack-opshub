import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function formatData(data = []) {
    return data.map((item) => ({
        status: item._id || "Unknown",
        count: item.count,
    }));
}

export default function StatusCharts({ breakdowns }) {
    const projectsData = formatData(breakdowns.projectsByStatus);
    const tasksData = formatData(breakdowns.tasksByStatus);

    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">
                    Projects by Status
                </h2>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={projectsData}>
                            <XAxis dataKey="status" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">
                    Tasks by Status
                </h2>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={tasksData}>
                            <XAxis dataKey="status" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}