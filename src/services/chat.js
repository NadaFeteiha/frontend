import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = API_URL;

// Create a new chat
export async function createChat(messages, title) {
    const res = await axios.post("/api/chat", { messages, title });
    return res.data;
}

// Get all chats
export async function getChats() {
    const res = await axios.get("/api/chat/");
    return res.data;
}

// Get a specific chat
export async function getChat(chatId) {
    const res = await axios.get(`/api/chat/${chatId}`);
    return res.data;
}

// Update a chat
export async function updateChat(chatId, messages, title) {
    const res = await axios.patch(`/api/chat/${chatId}`, {
        messages,
        title,
    });
    return res.data;
}

// Delete a chat
export async function deleteChat(chatId) {
    await axios.delete(`/api/chat/${chatId}`);
}
