import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { useTheme } from "@/context/ThemeContext";

function transform(data = []) {
    return data.map((item) => ({
        name: item._id || "Unknown",
        count: item.count,
    }));
}

export default function DashboardCharts({
    projectStatus = [],
    taskStatus = [],
}) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const chartColors = {
        bar: isDark ? "#60a5fa" : "#2563eb",
        grid: isDark ? "#334155" : "#e2e8f0",
        axis: isDark ? "#cbd5e1" : "#475569",
        tooltipBg: isDark ? "#0f172a" : "#ffffff",
        tooltipBorder: isDark ? "#334155" : "#cbd5e1",
    };

    const projectData = transform(projectStatus);
    const taskData = transform(taskStatus);

    const renderChart = (data) => (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid
                    stroke={chartColors.grid}
                    strokeDasharray="3 3"
                />

                <XAxis dataKey="name" stroke={chartColors.axis} />

                <YAxis allowDecimals={false} stroke={chartColors.axis} />

                <Tooltip
                    contentStyle={{
                        backgroundColor: chartColors.tooltipBg,
                        border: `1px solid ${chartColors.tooltipBorder}`,
                        borderRadius: 12,
                        color: isDark ? "#fff" : "#000",
                    }}
                />

                <Bar
                    dataKey="count"
                    fill={chartColors.bar}
                    radius={[8, 8, 0, 0]}
                />
            </BarChart>
        </ResponsiveContainer>
    );

    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Card>
                <SectionTitle>Project Status</SectionTitle>
                <div className="h-72">{renderChart(projectData)}</div>
            </Card>

            <Card>
                <SectionTitle>Task Status</SectionTitle>
                <div className="h-72">{renderChart(taskData)}</div>
            </Card>
        </div>
    );
}