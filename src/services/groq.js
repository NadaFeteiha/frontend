import Groq from 'groq-sdk';

// Creates a Groq sdk instance
const groq = new Groq({
    apiKey: import.meta.env.VITE_GROQ_API_KEY,
    dangerouslyAllowBrowser: true
});

/**
 * Get Chat Completion
 * @description sends arrays of message to Groq API
 * @param {*} messages 
 * @returns 
 */
export async function getChatCompletion(messages) {
    try {
        const completion = await groq.chat.completions.create({
            messages: messages,
            model: "llama-3.3-70b-versatile"
        });

        if (!completion) {
            throw new Error("Error generating chat completion.");
        }

        return completion;
    } catch (e) {
        console.error(e.message)
    }
}