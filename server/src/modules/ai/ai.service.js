const generateSOPContent = async ({ topic, category }) => {
    return {
        title: `${topic} SOP`,
        category: category || "Operations",
        description: `Standard operating procedure for ${topic}.`,
        steps: [
            `Understand the objective of ${topic}`,
            "Collect required information and resources",
            "Follow the defined workflow step by step",
            "Review output for quality and accuracy",
            "Document results and improvements",
        ],
    };
};

const generateTaskBreakdown = async ({ projectName }) => {
    return {
        projectName,
        tasks: [
            {
                title: `Plan ${projectName}`,
                priority: "High",
                status: "Todo",
            },
            {
                title: `Design workflow for ${projectName}`,
                priority: "Medium",
                status: "Todo",
            },
            {
                title: `Implement ${projectName}`,
                priority: "High",
                status: "Todo",
            },
            {
                title: `Test ${projectName}`,
                priority: "Medium",
                status: "Todo",
            },
            {
                title: `Deploy ${projectName}`,
                priority: "High",
                status: "Todo",
            },
        ],
    };
};

const generateClientEmail = async ({ clientName, purpose }) => {
    return {
        subject: `Regarding ${purpose}`,
        body: `Hello ${clientName},

I hope you are doing well.

I am writing to discuss ${purpose}. We would be happy to support you with a structured and professional approach.

Please let us know a convenient time to connect and discuss the next steps.

Best regards,
LaunchStack OpsHub Team`,
    };
};

module.exports = {
    generateSOPContent,
    generateTaskBreakdown,
    generateClientEmail,
};