export default function EmptyState({
    title,
    description,
    action,
}) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
                📂
            </div>

            <h2 className="text-xl font-semibold">
                {title}
            </h2>

            <p className="mt-2 text-slate-500">
                {description}
            </p>

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}
        </div>
    );
}