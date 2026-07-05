import Card from "./Card";

export default function StatCard({
title,
value,
icon: Icon,
color,
}) {
return (
    <Card className="transition hover:-translate-y-1 hover:shadow-md">

    <div className="flex items-center justify-between">

        <div>

        <p className="text-sm text-slate-500">
            {title}
        </p>

        <h2 className="mt-2 text-3xl font-bold">
            {value}
        </h2>

        </div>

        <div
        className={`rounded-xl p-3 ${color}`}
        >
        <Icon
            size={24}
            className="text-white"
        />
        </div>

    </div>

    </Card>
);
}