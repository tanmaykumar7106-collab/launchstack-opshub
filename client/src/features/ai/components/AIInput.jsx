import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

export default function AIInput({
    activeTool,
    loading,
    sopForm,
    setSopForm,
    taskForm,
    setTaskForm,
    emailForm,
    setEmailForm,
    onGenerateSOP,
    onGenerateTasks,
    onGenerateEmail,
}) {
    return (
        <Card>
            {activeTool === "sop" && (
                <form onSubmit={onGenerateSOP} className="space-y-4">
                    <input
                        placeholder="Topic e.g. Client Onboarding"
                        value={sopForm.topic}
                        onChange={(e) =>
                            setSopForm({ ...sopForm, topic: e.target.value })
                        }
                        className={inputClass}
                        required
                    />

                    <select
                        value={sopForm.category}
                        onChange={(e) =>
                            setSopForm({ ...sopForm, category: e.target.value })
                        }
                        className={inputClass}
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
                        {loading ? "Generating SOP..." : "Generate SOP"}
                    </Button>
                </form>
            )}

            {activeTool === "tasks" && (
                <form onSubmit={onGenerateTasks} className="space-y-4">
                    <input
                        placeholder="Project name e.g. Website Redesign"
                        value={taskForm.projectName}
                        onChange={(e) =>
                            setTaskForm({ ...taskForm, projectName: e.target.value })
                        }
                        className={inputClass}
                        required
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Planning Tasks..." : "Generate Tasks"}
                    </Button>
                </form>
            )}

            {activeTool === "email" && (
                <form onSubmit={onGenerateEmail} className="space-y-4">
                    <input
                        placeholder="Client name"
                        value={emailForm.clientName}
                        onChange={(e) =>
                            setEmailForm({ ...emailForm, clientName: e.target.value })
                        }
                        className={inputClass}
                        required
                    />

                    <input
                        placeholder="Purpose e.g. project proposal"
                        value={emailForm.purpose}
                        onChange={(e) =>
                            setEmailForm({ ...emailForm, purpose: e.target.value })
                        }
                        className={inputClass}
                        required
                    />

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Writing Email..." : "Generate Email"}
                    </Button>
                </form>
            )}
        </Card>
    );
}