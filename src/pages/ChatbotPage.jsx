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
import styles from "../styles/ChatBot.module.css";

function ChatBot() {
    const promptInputRef = useRef(null);
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);

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

    useEffect(() => {
        promptInputRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newMessage = { role: "user", content: prompt };
        const newMessages = [...messages, newMessage];

        try {
            const completion = await getChatCompletion(newMessages);
            const assistantMessage = {
                role: "assistant",
                content: completion.choices[0].message.content,
            };

            const updatedMessages = [...newMessages, assistantMessage];
            if (currentChatId) {
                await updateChat(currentChatId, [newMessage, assistantMessage]);
            } else {
                const newChat = await createChat(
                    updatedMessages,
                    prompt.substring(0, 30) + "..."
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
        <main className={styles.mainContainer}>
            {/* history.. */}
            <section className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <BsWindowSidebar className={styles.icon} />
                    <h1 className={styles.title}>Chatbot</h1>
                    <div className={styles.iconsContainer}>
                        <IoIosSearch className={styles.icon} />
                        <FaRegPenToSquare
                            className={`${styles.icon} ${styles.newChatIcon}`}
                            onClick={handleNewChat}
                        />
                    </div>
                </div>

                {/* PREVIOUS CHATS */}
                <div className={styles.chatsList}>
                    {chats.map((chat) => (
                        <div
                            key={chat._id}
                            className={`${styles.chatItem} ${currentChatId === chat._id ? styles.activeChat : ""
                                }`}
                            onClick={() => handleChatSelect(chat._id)}
                        >
                            <span className={styles.chatTitle}>{chat.title}</span>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteChat(chat._id);
                                }}
                                className={styles.deleteButton}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.userInfo}>
                    <CiUser className={styles.userIcon} />
                    <h3 className={styles.userName}>User</h3>
                </div>
            </section>

            {/* conversation */}
            <section className={styles.chatContainer}>
                <h2 className={styles.chatHeader}>Chat</h2>
                <div className={styles.messagesContainer}>
                    {messages.map((message, idx) => (
                        <div
                            key={idx}
                            className={`${styles.message} ${message.role === "user"
                                ? styles.userMessage
                                : styles.botMessage
                                }`}
                        >
                            {message.role === "user" ? (
                                <>
                                    <div className={styles.messageContent}>
                                        {message.content}
                                    </div>
                                    <CiUser className={styles.messageIcon} />
                                </>
                            ) : (
                                <>
                                    <LuBot className={styles.messageIcon} />
                                    <div className={styles.messageContentRight}>
                                        {message.content}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} className={styles.inputForm}>
                    <input
                        ref={promptInputRef}
                        type="text"
                        className={styles.promptInput}
                        placeholder="Type your message..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.submitButton}>
                        Send
                    </button>
                </form>
            </section>
        </main>
    );
}

export default ChatBot;