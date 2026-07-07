import { useEffect, useState } from "react";
import { getReportsOverview } from "../../services/reports.service";

import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";

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

    if (loading) {
        return (
            <h2 className="text-slate-700 dark:text-slate-300">
                Loading reports...
            </h2>
        );
    }

    return (
        <Page>
            <PageHeader
                title="Reports"
                subtitle="Analytics overview of your business operations."
            />

            <ReportCards totals={report.totals} />

            <StatusCharts breakdowns={report.breakdowns} />

            <Card>
                <SectionTitle>Completion Summary</SectionTitle>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-950">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Completed Projects
                        </p>
                        <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                            {report.completion.completedProjects}
                        </h3>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-5 dark:bg-slate-950">
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Completed Tasks
                        </p>
                        <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                            {report.completion.completedTasks}
                        </h3>
                    </div>
                </div>
            </Card>
        </Page>
    );
}