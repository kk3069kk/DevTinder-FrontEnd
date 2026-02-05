import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createSocketConnection } from "../utils/socket.js";
import { useSelector } from "react-redux";
import apiClient from "../utils/apiClient.js";

const Chat = () => {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [receiver, setReceiver] = useState(null);
    const user = useSelector((state) => state.user);
    const userId = user?._id;
    const socketRef = useRef(null);
    const scrollRef = useRef(null);

    // Auto-scroll to bottom whenever messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!chatId) return;
            try {
                const response = await apiClient.get(`/chat/${chatId}`);

                // Identify the receiver from participants
                const chat = response?.data;
                const otherUser = chat?.participants?.find(p => String(p._id || p) !== String(userId));
                if (otherUser) setReceiver(otherUser);

                // Normalize messages from API to ensure they have the correct fields
                const normalizedMessages = (response?.data?.messages || []).map(msg => {
                    const getSenderId = (m) => {
                        const s = m.userId || m.senderId || m.sender;
                        if (!s) return null;
                        // Handle if s is a Mongoose object with _id, or just a string ID
                        return typeof s === "object" ? (s._id || s.id || String(s)) : String(s);
                    };

                    const sId = getSenderId(msg);

                    return {
                        ...msg,
                        id: msg._id || Math.random(),
                        senderId: sId,
                        firstName: msg.firstName || msg.sender?.firstName,
                        photoUrl: msg.photoUrl || msg.sender?.photoUrl,
                        time: msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "..."
                    };
                });

                setMessages(normalizedMessages);
            } catch (error) {
                console.error("Error: ", error.message);
            }
        };

        fetchMessages();
    }, [chatId, userId]);


    useEffect(() => {
        if (!userId || !chatId) return;

        // Use the ref to ensure only one connection exists
        if (!socketRef.current) {
            socketRef.current = createSocketConnection();
        }

        const socket = socketRef.current;
        socket.emit("joinChat", { firstName: user?.firstName, chatId, userId });

        socket.on("messageRecieved", (payload) => {
            console.log("DEBUG: messageRecieved payload:", payload);
            const { firstName, text, photoUrl } = payload;

            // Try to find a sender ID in the payload
            const rawS = payload.userId || payload.senderId || payload.sender;
            const incomingSenderId = typeof rawS === "object" ? (rawS._id || rawS.id || String(rawS)) : String(rawS);

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: Date.now() + Math.random(),
                    text,
                    senderId: incomingSenderId,
                    firstName,
                    photoUrl,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                },
            ]);
        });

        return () => {
            if (socket) {
                socket.off("messageRecieved");
                socket.disconnect();
                socketRef.current = null;
            }
        };
    }, [chatId, userId, user?.firstName]);

    const handleSendMessage = () => {
        if (!user || !socketRef.current) return;
        if (!newMessage.trim()) return;

        socketRef.current.emit("sendMessage", {
            firstName: user.firstName,
            chatId,
            userId,
            text: newMessage
        });
        setNewMessage("");
    };


    return (
        <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto bg-base-300 shadow-2xl rounded-3xl overflow-hidden border border-base-200 mt-4 mb-4">
            {/* Chat Header */}
            <div className="bg-base-200 p-4 border-b border-base-100 flex items-center gap-4">
                <div className="avatar">
                    <div className="rounded-full w-12 border-2 border-primary">
                        <img
                            src={receiver?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                            alt="Receiver"
                        />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-lg">{receiver?.firstName ? `${receiver.firstName} ${receiver.lastName || ""}` : `User ${chatId.slice(-4)}`}</h2>
                    <div className="flex items-center gap-1">
                        <span className="badge badge-success badge-xs"></span>
                        <span className="text-xs text-base-content/60">Online</span>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-base-300 to-base-200 scroll-smooth"
            >
                {messages.map((msg) => {
                    // Force strings and check for null/undefined to avoid false positives
                    const sId = msg.senderId ? String(msg.senderId) : null;
                    const uId = userId ? String(userId) : null;

                    const isMe = (sId && uId && sId === uId) ||
                        (!sId && msg.firstName && user?.firstName && msg.firstName === user.firstName);

                    console.log(`DEBUG Render [${msg.text?.slice(0, 10)}]: sId=${sId}, uId=${uId}, isMe=${isMe}`);

                    return (
                        <div key={msg.id} className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full border border-base-content/10 shadow-sm">
                                    <img
                                        src={isMe ? user?.photoUrl : (msg.photoUrl || receiver?.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp")}
                                        alt="Avatar"
                                        onError={(e) => {
                                            e.target.src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="chat-header opacity-50 text-xs mb-1 mx-1">
                                {isMe ? (user?.firstName || "You") : (msg.firstName || receiver?.firstName || "Them")}
                                <time className="text-xs opacity-50 ml-2">{msg.time}</time>
                            </div>
                            <div className={`chat-bubble shadow-md ${isMe ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
                                {msg.text}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-base-300 border-t border-base-200">
                <form
                    className="flex gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }}
                >
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="input input-bordered flex-1 bg-base-100 focus:outline-none focus:border-primary border-2"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary px-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;