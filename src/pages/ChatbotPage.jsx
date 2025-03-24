import { useState, useRef, useEffect } from "react";
import { getChatCompletion } from "../services/groq";
import { CiUser } from "react-icons/ci";
import { LuBot } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { FaRegPenToSquare } from "react-icons/fa6";
import { BsWindowSidebar } from "react-icons/bs";
import {
    getChats,
    getChat,
    createChat,
    updateChat,
    deleteChat,
} from "../services/chat";

function ChatBot() {
    const promptInputRef = useRef(null); // ref for text input

    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);

    // Fetch all chats on component mount
    useEffect(() => {
        const fetchChats = async () => {
            try {
                const allChats = await getChats();
                setChats(allChats);
            } catch (error) {
                console.error("Failed to fetch chats:", error);
            }
        };
        fetchChats();
    }, []);

    // Focus on input
    useEffect(() => {
        promptInputRef.current.focus();
    }, []);

    /**
     * Handle Form Submit
     * @param {*} e
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMessage = {
            role: "user",
            content: prompt,
        };

        const newMessages = [...messages, newMessage];

        try {
            // Get AI response
            const completion = await getChatCompletion(newMessages);
            const assistantMessage = {
                role: "assistant",
                content: completion.choices[0].message.content,
            };

            const updatedMessages = [...newMessages, assistantMessage];

            if (currentChatId) {
                // Update existing chat
                await updateChat(currentChatId, [newMessage, assistantMessage]);
            } else {
                // Create new chat
                const newChat = await createChat(
                    updatedMessages,
                    prompt.substring(0, 30) + "..." // Use first 30 chars of prompt as title
                );
                setCurrentChatId(newChat._id);
                setChats([newChat, ...chats]);
            }

            setMessages(updatedMessages);
            setPrompt("");
        } catch (error) {
            console.error("Error processing chat:", error);
        }
    };

    const handleChatSelect = async (chatId) => {
        try {
            const chat = await getChat(chatId);
            setMessages(chat.messages);
            setCurrentChatId(chatId);
        } catch (error) {
            console.error("Error loading chat:", error);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        setCurrentChatId(null);
    };

    const handleDeleteChat = async (chatId) => {
        try {
            await deleteChat(chatId);
            setChats(chats.filter((chat) => chat._id !== chatId));
            if (currentChatId === chatId) {
                setMessages([]);
                setCurrentChatId(null);
            }
        } catch (error) {
            console.error("Error deleting chat:", error);
        }
    };

    return (
        <main className='flex bg-indigo-900 text-white h-screen'>
            {/* LEFT CHATS SECTION  */}
            <section className='flex flex-col flex-1 border p-5 bg-neutral-800'>
                <div className='flex justify-between items-center mb-5'>
                    <BsWindowSidebar size={24} />
                    <h1 className='text-center text-xl font-bold text-orange-500'>
                        Chatbot
                    </h1>
                    <div className='flex items-center gap-5'>
                        <IoIosSearch size={24} />
                        <FaRegPenToSquare
                            size={24}
                            onClick={handleNewChat}
                            className='cursor-pointer hover:text-orange-500'
                        />
                    </div>
                </div>
                {/* PREVIOUS CHATS */}
                <div className='flex-1 overflow-y-auto'>
                    {chats.map((chat) => (
                        <div
                            key={chat._id}
                            className={`p-2 border rounded-md mb-2 cursor-pointer hover:bg-neutral-700 flex justify-between items-center
                ${currentChatId === chat._id ? "bg-neutral-700" : ""}`}
                            onClick={() => handleChatSelect(chat._id)}
                        >
                            <span className='truncate'>{chat.title}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteChat(chat._id);
                                }}
                                className='text-red-500 hover:text-red-700'
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
                <div className='flex items-center mb-5 mt-auto'>
                    <CiUser size={32} className='border rounded-full p-1 mr-2' />
                    <h3 className='text-center text-xl font-bold text-orange-500'>
                        User
                    </h3>
                </div>
            </section>

            {/* RIGHT CHAT SECTION  */}
            <section className='flex flex-col flex-3 border bg-neutral-900'>
                <h2 className='mb-5 text-center text-xl font-bold bg-neutral-800 p-3 w-full'>
                    Chat
                </h2>
                <div className='p-5'>
                    <div className=''>
                        {messages.map((message, idx) => {
                            return (
                                <div key={idx} className='flex items-center mb-5'>
                                    {message.role === "user" ? (
                                        <CiUser size={32} className='border rounded-full p-1' />
                                    ) : (
                                        <LuBot size={32} className='border rounded-full p-1' />
                                    )}
                                    <div className='ml-2'>{message.content}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className='flex justify-between w-full mt-auto p-3'
                >
                    <input
                        ref={promptInputRef}
                        type='text'
                        className='border w-full p-1 rounded-lg'
                        placeholder='Prompt'
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                    />
                    <input
                        type='submit'
                        className='ml-2 border p-2 rounded-lg hover:bg-orange-500 hover:text-bold hover:cursor-pointer'
                    />
                </form>
                <i className='text-center'>
                    Chatbot can make mistakes. Check important info.
                </i>
            </section>
        </main>
    );
}

export default ChatBot;