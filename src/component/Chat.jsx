import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {createSocketConnection} from "../utils/socket.js";
import {useSelector} from "react-redux";

const Chat = () => {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector((state) => state.user);
    const userId = user?._id;

    useEffect(() => {
        if(!userId) return;
        const socket = createSocketConnection();
        socket.emit("joinChat", { firstName:user.firstName,chatId ,userId});

        socket.on("messageReceived", ({ firstName, text }) => {
           setMessages((prevMessages) => [
            ...prevMessages,
            {
                id: Date.now(),
                text,
                sender: firstName === user.firstName ? "me" : "other",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            },
        ]);

        });

        return () => {
            socket.disconnect();
        };
    }, [chatId,userId]);
    
    const handleSendMessage = () => {
        if(!user) return;
        if(!newMessage.trim()) return;
        const socket = createSocketConnection();
        socket.emit("sendMessage", { 
            firstName:user.firstName,
            chatId,
            userId,
            text:newMessage
        });
        setNewMessage("");
    };


    return (
        <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto bg-base-300 shadow-2xl rounded-3xl overflow-hidden border border-base-200 mt-4 mb-4">
            {/* Chat Header */}
            <div className="bg-base-200 p-4 border-b border-base-100 flex items-center gap-4">
                <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                        <span className="text-xs">ID</span>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-lg">User {chatId.slice(-4)}</h2>
                    <div className="flex items-center gap-1">
                        <span className="badge badge-success badge-xs"></span>
                        <span className="text-xs text-base-content/60">Online</span>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-base-300 to-base-200">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat ${msg.sender === "me" ? "chat-end" : "chat-start"}`}>
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={msg.sender === "me" ? "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                            </div>
                        </div>
                        <div className="chat-header opacity-50 text-xs mb-1 mx-1">
                            {msg.sender === "me" ? "You" : "Them"}
                            <time className="text-xs opacity-50 ml-2">{msg.time}</time>
                        </div>
                        <div className={`chat-bubble shadow-md ${msg.sender === "me" ? "chat-bubble-primary" : "chat-bubble-secondary"}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-base-300 border-t border-base-200">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        className="input input-bordered flex-1 bg-base-100 focus:outline-none focus:border-primary border-2"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="btn btn-primary px-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                    onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;