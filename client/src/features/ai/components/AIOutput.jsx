import {
    Copy,
    Download,
    Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

import MarkdownRenderer from "./MarkdownRenderer";

export default function AIOutput({
    output,
}) {
    if (!output) return null;

    const copyOutput = async () => {
        await navigator.clipboard.writeText(output);
        toast.success("Copied to clipboard");
    };

    const downloadMarkdown = () => {
        const blob = new Blob([output], {
            type: "text/markdown",
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "launchstack-ai-output.md";

        a.click();

        URL.revokeObjectURL(url);

        toast.success("Downloaded");
    };

    return (
        <Card className="mt-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Sparkles
                        className="text-blue-600"
                        size={22}
                    />

                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        AI Response
                    </h2>
                </div>

                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={copyOutput}
                    >
                        <Copy size={16} />
                    </Button>

                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={downloadMarkdown}
                    >
                        <Download size={16} />
                    </Button>
                </div>
            </div>

            <MarkdownRenderer content={output} />
        </Card>
    );
}