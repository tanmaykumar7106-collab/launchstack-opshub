import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboard.service";

import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";

import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";
import RecentProjects from "./RecentProjects";
import UpcomingTasks from "./UpcomingTasks";

const initialDashboard = {
    clients: 0,
    projects: 0,
    tasks: 0,
    totalBudget: 0,
    projectStatus: [],
    taskStatus: [],
    recentProjects: [],
    upcomingTasks: [],
};

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState(initialDashboard);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await getDashboardStats();

            setDashboard({
                clients: res.data?.clients || 0,
                projects: res.data?.projects || 0,
                tasks: res.data?.tasks || 0,
                totalBudget: res.data?.totalBudget || 0,
                projectStatus: res.data?.projectStatus || [],
                taskStatus: res.data?.taskStatus || [],
                recentProjects: res.data?.recentProjects || [],
                upcomingTasks: res.data?.upcomingTasks || [],
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <Page>
            <PageHeader
                title="Dashboard"
                subtitle="Welcome back, Lucky. Here's what's happening today."
            />

            <DashboardCards dashboard={dashboard} />

            <DashboardCharts
                projectStatus={dashboard.projectStatus}
                taskStatus={dashboard.taskStatus}
            />

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <RecentProjects projects={dashboard.recentProjects} />
                <UpcomingTasks tasks={dashboard.upcomingTasks} />
            </div>
        </Page>
    );
}