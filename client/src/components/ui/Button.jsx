export default function Button({
  children,
  onClick,
  className = "",
}) {
  return (
    <button
    onClick={onClick}
    className={`rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 ${className}`}
    >
    {children}
    </button>
  );
}