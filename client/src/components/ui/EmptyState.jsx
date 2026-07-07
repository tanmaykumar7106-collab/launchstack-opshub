import { Inbox } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
    icon: Icon = Inbox,
    title,
    description,
    action,
}) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-slate-800">
                <Icon
                    size={30}
                    className="text-blue-600 dark:text-blue-400"
                />
            </div>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                {title}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-slate-500 dark:text-slate-400">
                {description}
            </p>

            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}