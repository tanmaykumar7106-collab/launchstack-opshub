{
    dashboard.recentProjects.length === 0 ? (
        <p className="text-slate-500">No recent projects yet.</p>
    ) : (
    <div className="space-y-3">
        {dashboard.recentProjects.map((project) => (
            <div
                key={project._id}
                className="flex items-center justify-between rounded-lg border p-3"
            >
                <div>
                    <p className="font-medium">{project.projectName}</p>
                    <p className="text-sm text-slate-500">
                        {project.client?.companyName || "No Client"}
                    </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {project.status}
                </span>
            </div>
        ))}
    </div>
)
}