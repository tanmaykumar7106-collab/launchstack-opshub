import { useState } from "react";
import toast from "react-hot-toast";
import { Sparkles } from "lucide-react";

import {
    generateSOP,
    generateTasks,
    generateEmail,
} from "../../services/ai.service";

import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";

import AIActionTabs from "./components/AIActionTabs";
import AIInput from "./components/AIInput";
import AIOutput from "./components/AIOutput";

export default function AiPage() {
    const [activeTool, setActiveTool] = useState("sop");
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState("");

    const [sopForm, setSopForm] = useState({
        topic: "",
        category: "Operations",
    });

    const [taskForm, setTaskForm] = useState({
        projectName: "",
    });

    const [emailForm, setEmailForm] = useState({
        clientName: "",
        purpose: "",
    });

    const handleToolChange = (tool) => {
        setActiveTool(tool);
        setOutput("");
    };

    const handleGenerateSOP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setOutput("");

        try {
            const res = await generateSOP(sopForm);
            const data = res.data;

            const markdown = data.description || "";
            setOutput(markdown);

            toast.success("SOP generated successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to generate SOP");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateTasks = async (e) => {
        e.preventDefault();
        setLoading(true);
        setOutput("");

        try {
            const res = await generateTasks(taskForm);
            const data = res.data;

            const markdown = `# Task Plan for ${data.projectName}

${data.tasks
                    ?.map(
                        (task, index) =>
                            `${index + 1}. **${task.title}**  
   - Priority: ${task.priority}  
   - Status: ${task.status}`
                    )
                    .join("\n\n")}`;

            setOutput(markdown);

            toast.success("Tasks generated successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to generate tasks");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setOutput("");

        try {
            const res = await generateEmail(emailForm);
            const data = res.data;

            const markdown = `# ${data.subject}

${data.body}`;

            setOutput(markdown);

            toast.success("Email generated successfully");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to generate email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Page>
            <PageHeader
                title="LaunchStack AI Copilot"
                subtitle="Generate SOPs, task plans, and professional client emails using local AI."
            />

            <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg dark:border-blue-900">
                <div className="flex items-center gap-3">
                    <Sparkles size={28} />

                    <div>
                        <h2 className="text-2xl font-bold">
                            AI-powered business operations
                        </h2>

                        <p className="mt-1 text-blue-100">
                            Turn rough ideas into structured SOPs, task plans, and client-ready emails.
                        </p>
                    </div>
                </div>
            </div>

            <AIActionTabs
                activeTool={activeTool}
                onChange={handleToolChange}
            />

            <div className="grid gap-6 xl:grid-cols-5">
                <div className="xl:col-span-2">
                    <AIInput
                        activeTool={activeTool}
                        loading={loading}
                        sopForm={sopForm}
                        setSopForm={setSopForm}
                        taskForm={taskForm}
                        setTaskForm={setTaskForm}
                        emailForm={emailForm}
                        setEmailForm={setEmailForm}
                        onGenerateSOP={handleGenerateSOP}
                        onGenerateTasks={handleGenerateTasks}
                        onGenerateEmail={handleGenerateEmail}
                    />
                </div>

                <div className="xl:col-span-3">
                    {output ? (
                        <AIOutput output={output} />
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
                            <Sparkles
                                size={36}
                                className="mx-auto mb-4 text-blue-600 dark:text-blue-400"
                            />

                            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                                Your AI output will appear here
                            </h3>

                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                Choose a tool, enter your details, and let LaunchStack AI generate a structured result.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Page>
    );
}