export default function SectionTitle({
    children,
}) {
    return (
        <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">
            {children}
        </h2>
    );
}