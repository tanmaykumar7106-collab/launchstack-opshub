import { useEffect, useState } from "react";
import { getReportsOverview } from "../../services/reports.service";

import ReportCards from "./ReportCards";
import StatusCharts from "./StatusCharts";

const initialReport = {
    totals: {
        clients: 0,
        projects: 0,
        tasks: 0,
        totalBudget: 0,
    },
    completion: {
        completedProjects: 0,
        completedTasks: 0,
    },
    breakdowns: {
        clientsByStatus: [],
        projectsByStatus: [],
        tasksByStatus: [],
    },
};

export default function ReportsPage() {
    const [report, setReport] = useState(initialReport);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            const res = await getReportsOverview();
            setReport(res.data || initialReport);
        } catch (err) {
            console.error("Reports error:", err);
            setReport(initialReport);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <h2>Loading reports...</h2>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Reports</h1>
                <p className="text-slate-500">
                    Analytics overview of your operations.
                </p>
            </div>

            <ReportCards totals={report.totals} />

            <StatusCharts breakdowns={report.breakdowns} />

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold">
                    Completion Summary
                </h2>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">
                            Completed Projects
                        </p>
                        <h3 className="text-2xl font-bold">
                            {report.completion.completedProjects}
                        </h3>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">
                            Completed Tasks
                        </p>
                        <h3 className="text-2xl font-bold">
                            {report.completion.completedTasks}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}