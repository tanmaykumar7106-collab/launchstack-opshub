const OLLAMA_URL =
    process.env.OLLAMA_URL || "http://localhost:11434/api/generate";

const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3:latest";

const callOllama = async (prompt) => {
    const response = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: OLLAMA_MODEL,
            prompt,
            stream: false,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to connect to Ollama");
    }

    const data = await response.json();
    return data.response;
};

const generateSOPContent = async ({ topic, category }) => {
    const prompt = `
You are a senior business operations consultant.

Generate a professional Standard Operating Procedure in clean Markdown only.

Topic: ${topic}
Category: ${category || "Operations"}

Use this exact structure:

# ${topic} SOP

## Purpose
Write a clear purpose.

## Scope
Explain where this SOP applies.

## Responsibilities
- Role 1:
- Role 2:

## Procedure
1. Step one
2. Step two
3. Step three
4. Step four
5. Step five

## Checklist
- [ ] Checklist item
- [ ] Checklist item
- [ ] Checklist item

## Best Practices
- Practical tip
- Practical tip

Keep it professional, concise, and business-ready.
`;

    const result = await callOllama(prompt);

    return {
        title: `${topic} SOP`,
        category: category || "Operations",
        description: result,
        steps: [],
    };
};

const generateTaskBreakdown = async ({ projectName }) => {
    const prompt = `
You are a senior project manager.

Create a practical project task plan in clean Markdown only.

Project: ${projectName}

Use this exact structure:

# Task Plan for ${projectName}

## Phase 1: Planning
- Task:
- Priority:
- Status: Todo

## Phase 2: Design
- Task:
- Priority:
- Status: Todo

## Phase 3: Development
- Task:
- Priority:
- Status: Todo

## Phase 4: Testing
- Task:
- Priority:
- Status: Todo

## Phase 5: Deployment
- Task:
- Priority:
- Status: Todo

Generate 8 to 12 realistic tasks.
Keep priorities as Low, Medium, High, or Critical.
`;

    const result = await callOllama(prompt);

    return {
        projectName,
        tasks: [
            {
                title: result,
                priority: "Medium",
                status: "Todo",
            },
        ],
    };
};

const generateClientEmail = async ({ clientName, purpose }) => {
    const prompt = `
You are a professional business communication assistant.

Write a polished client email in clean Markdown only.

Client Name: ${clientName}
Purpose: ${purpose}

Use this structure:

# Email Draft

## Subject
Write a short professional subject.

## Body
Dear ${clientName},

Write a clear, polite, professional email.

End with:

Best regards,  
LaunchStack OpsHub Team

Keep the tone professional, friendly, and concise.
`;

    const result = await callOllama(prompt);

    return {
        subject: `Regarding ${purpose}`,
        body: result,
    };
};

module.exports = {
    generateSOPContent,
    generateTaskBreakdown,
    generateClientEmail,
};