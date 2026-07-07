import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ content }) {
    return (
        <div
            className="
        prose
        prose-slate
        max-w-none
        dark:prose-invert

        prose-headings:font-bold
        prose-headings:text-slate-900
        dark:prose-headings:text-white

        prose-p:text-slate-700
        dark:prose-p:text-slate-300

        prose-strong:text-slate-900
        dark:prose-strong:text-white

        prose-li:text-slate-700
        dark:prose-li:text-slate-300

        prose-code:rounded
        prose-code:bg-slate-100
        prose-code:px-1
        prose-code:py-0.5

        dark:prose-code:bg-slate-800

        prose-pre:rounded-xl
        prose-pre:bg-slate-900
        "
        >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}