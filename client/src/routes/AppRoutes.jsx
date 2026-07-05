import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";

import DashboardPage from "../features/dashboard/DashboardPage";
import LoginPage from "../features/auth/LoginPage";
import SignupPage from "../features/auth/SignupPage";

import ClientPage from "../features/clients/ClientPage";
import ProjectPage from "../features/projects/ProjectPage";
import TaskPage from "../features/tasks/TaskPage";
import SopPage from "../features/sop/SopPage";
import AiPage from "../features/ai/AiPage";
import WorkspacePage from "../features/workspace/WorkspacePage";
import ReportsPage from "../features/reports/ReportsPage";
import SettingsPage from "../features/settings/SettingsPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route element={<AppLayout />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/clients" element={<ClientPage />} />
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="/sop" element={<SopPage />} />
                <Route path="/ai" element={<AiPage />} />
                <Route path="/workspace" element={<WorkspacePage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}