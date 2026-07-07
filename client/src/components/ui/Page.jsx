export default function Page({
    children,
}) {
    return (
        <div className="space-y-8 text-slate-900 dark:text-slate-100">
            {children}
        </div>
    );
}