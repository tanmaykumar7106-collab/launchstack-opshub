import { useState } from "react";
import {
    generateSOP,
    generateTasks,
    generateEmail,
} from "../../services/ai.service";

import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";

export default function AiPage() {
    const [activeTool, setActiveTool] = useState("sop");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

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

    const resetResult = (tool) => {
        setActiveTool(tool);
        setResult(null);
    };

    const handleGenerateSOP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const res = await generateSOP(sopForm);
            setResult(res.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to generate SOP");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateTasks = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const res = await generateTasks(taskForm);
            setResult(res.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to generate tasks");
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const res = await generateEmail(emailForm);
            setResult(res.data);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to generate email");
        } finally {
            setLoading(false);
        }
    };

    const renderResult = () => {
        if (!result) {
            return (
                <div className="rounded-2xl border border-dashed bg-slate-50 p-10 text-center">
                    <p className="text-slate-500">
                        Generated AI output will appear here.
                    </p>
                </div>
            );
        }

        if (activeTool === "sop") {
            return (
                <div className="space-y-4">
                    <div>
                        <h3 className="text-2xl font-semibold">{result.title}</h3>
                        <p className="mt-2 text-slate-600">{result.description}</p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-5">
                        <h4 className="mb-3 font-semibold">Steps</h4>
                        <ol className="list-decimal space-y-2 pl-5">
                            {result.steps?.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            );
        }

        if (activeTool === "tasks") {
            return (
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">
                        Tasks for {result.projectName}
                    </h3>

                    <div className="grid gap-3">
                        {result.tasks?.map((task, index) => (
                            <div
                                key={index}
                                className="rounded-xl border bg-slate-50 p-4"
                            >
                                <p className="font-medium">{task.title}</p>
                                <p className="mt-1 text-sm text-slate-500">
                                    {task.priority} • {task.status}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (activeTool === "email") {
            return (
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">{result.subject}</h3>

                    <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-6">
                        {result.body}
                    </pre>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="space-y-8">
            <PageHeader
                title="AI Assistant"
                subtitle="Generate SOPs, task breakdowns, and client-ready emails."
            />

            <div className="grid gap-6 xl:grid-cols-3">
                <div className="space-y-6 xl:col-span-1">
                    <div className="rounded-2xl border bg-white p-4 shadow-sm">
                        <div className="grid gap-2">
                            <button
                                onClick={() => resetResult("sop")}
                                className={`rounded-xl px-4 py-3 text-left font-medium transition ${activeTool === "sop"
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-100 hover:bg-slate-200"
                                    }`}
                            >
                                📝 Generate SOP
                            </button>

                            <button
                                onClick={() => resetResult("tasks")}
                                className={`rounded-xl px-4 py-3 text-left font-medium transition ${activeTool === "tasks"
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-100 hover:bg-slate-200"
                                    }`}
                            >
                                📋 Break Project Into Tasks
                            </button>

                            <button
                                onClick={() => resetResult("email")}
                                className={`rounded-xl px-4 py-3 text-left font-medium transition ${activeTool === "email"
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-100 hover:bg-slate-200"
                                    }`}
                            >
                                📧 Draft Client Email
                            </button>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-white p-6 shadow-sm">
                        {activeTool === "sop" && (
                            <form onSubmit={handleGenerateSOP} className="space-y-4">
                                <input
                                    placeholder="Topic e.g. Client Onboarding"
                                    value={sopForm.topic}
                                    onChange={(e) =>
                                        setSopForm({ ...sopForm, topic: e.target.value })
                                    }
                                    className="w-full rounded-xl border p-3"
                                    required
                                />

                                <select
                                    value={sopForm.category}
                                    onChange={(e) =>
                                        setSopForm({ ...sopForm, category: e.target.value })
                                    }
                                    className="w-full rounded-xl border p-3"
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

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Generating..." : "Generate SOP"}
                                </Button>
                            </form>
                        )}

                        {activeTool === "tasks" && (
                            <form onSubmit={handleGenerateTasks} className="space-y-4">
                                <input
                                    placeholder="Project name"
                                    value={taskForm.projectName}
                                    onChange={(e) =>
                                        setTaskForm({
                                            ...taskForm,
                                            projectName: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border p-3"
                                    required
                                />

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Generating..." : "Generate Tasks"}
                                </Button>
                            </form>
                        )}

                        {activeTool === "email" && (
                            <form onSubmit={handleGenerateEmail} className="space-y-4">
                                <input
                                    placeholder="Client name"
                                    value={emailForm.clientName}
                                    onChange={(e) =>
                                        setEmailForm({
                                            ...emailForm,
                                            clientName: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border p-3"
                                    required
                                />

                                <input
                                    placeholder="Purpose e.g. project proposal"
                                    value={emailForm.purpose}
                                    onChange={(e) =>
                                        setEmailForm({
                                            ...emailForm,
                                            purpose: e.target.value,
                                        })
                                    }
                                    className="w-full rounded-xl border p-3"
                                    required
                                />

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Generating..." : "Generate Email"}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-2">
                    <h2 className="mb-4 text-xl font-semibold">AI Output</h2>
                    {renderResult()}
                </div>
            </div>
        </div>
    );
}