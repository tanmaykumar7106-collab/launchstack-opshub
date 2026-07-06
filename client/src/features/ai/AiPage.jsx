import { useState } from "react";
import {
    generateSOP,
    generateTasks,
    generateEmail,
} from "../../services/ai.service";

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

    const handleGenerateSOP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const res = await generateSOP(sopForm);
            setResult(res.data);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to generate SOP");
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
            alert(err.response?.data?.message || "Failed to generate tasks");
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
            alert(err.response?.data?.message || "Failed to generate email");
        } finally {
            setLoading(false);
        }
    };

    const renderResult = () => {
        if (!result) {
            return (
                <p className="text-slate-500">
                    Generated output will appear here.
                </p>
            );
        }

        if (activeTool === "sop") {
            return (
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{result.title}</h3>
                    <p className="text-slate-600">{result.description}</p>

                    <ol className="list-decimal space-y-2 pl-5">
                        {result.steps?.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            );
        }

        if (activeTool === "tasks") {
            return (
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold">
                        Tasks for {result.projectName}
                    </h3>

                    <div className="space-y-2">
                        {result.tasks?.map((task, index) => (
                            <div
                                key={index}
                                className="rounded-xl border bg-slate-50 p-3"
                            >
                                <p className="font-medium">{task.title}</p>
                                <p className="text-sm text-slate-500">
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
                <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{result.subject}</h3>
                    <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm">
                        {result.body}
                    </pre>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="grid gap-6 xl:grid-cols-3">
            <div className="space-y-6 xl:col-span-1">
                <div>
                    <h1 className="text-3xl font-bold">AI Assistant</h1>
                    <p className="text-slate-500">
                        Generate SOPs, tasks and client emails.
                    </p>
                </div>

                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                    <div className="grid gap-2">
                        <button
                            onClick={() => {
                                setActiveTool("sop");
                                setResult(null);
                            }}
                            className={`rounded-xl px-4 py-3 text-left ${activeTool === "sop"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 hover:bg-slate-200"
                                }`}
                        >
                            Generate SOP
                        </button>

                        <button
                            onClick={() => {
                                setActiveTool("tasks");
                                setResult(null);
                            }}
                            className={`rounded-xl px-4 py-3 text-left ${activeTool === "tasks"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 hover:bg-slate-200"
                                }`}
                        >
                            Break Project Into Tasks
                        </button>

                        <button
                            onClick={() => {
                                setActiveTool("email");
                                setResult(null);
                            }}
                            className={`rounded-xl px-4 py-3 text-left ${activeTool === "email"
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 hover:bg-slate-200"
                                }`}
                        >
                            Draft Client Email
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

                            <button className="w-full rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700">
                                {loading ? "Generating..." : "Generate SOP"}
                            </button>
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

                            <button className="w-full rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700">
                                {loading ? "Generating..." : "Generate Tasks"}
                            </button>
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

                            <button className="w-full rounded-xl bg-blue-600 p-3 text-white hover:bg-blue-700">
                                {loading ? "Generating..." : "Generate Email"}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-2">
                <h2 className="mb-4 text-xl font-semibold">AI Output</h2>
                {renderResult()}
            </div>
        </div>
    );
}