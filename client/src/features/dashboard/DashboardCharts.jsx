import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

function transform(data = []) {
    return data.map((item) => ({
        name: item._id || "Unknown",
        count: item.count,
    }));
}

export default function DashboardCharts({ projectStatus = [], taskStatus = [] }) {
    const projectData = transform(projectStatus);
    const taskData = transform(taskStatus);

    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Card>
                <SectionTitle>Project Status</SectionTitle>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={projectData}>
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card>
                <SectionTitle>Task Status</SectionTitle>

                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={taskData}>
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}