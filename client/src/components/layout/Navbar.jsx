import { Bell, Search } from "lucide-react";

export default function Navbar() {
return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-6">

    <div className="relative w-96">

        <Search
        size={18}
        className="absolute left-3 top-3 text-slate-400"
        />

        <input
        placeholder="Search..."
        className="w-full rounded-xl border py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

    </div>

    <div className="flex items-center gap-6">

        <Bell className="cursor-pointer text-slate-600" />

        <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            LS
        </div>

        <div>

            <p className="font-medium">
            Welcome
            </p>

            <p className="text-xs text-slate-500">
            Admin
            </p>

        </div>

        </div>

    </div>

    </header>
);
}