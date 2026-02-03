import { useParams } from "react-router-dom";
import { useState } from "react";

const Chat = () => {
    const { chatId } = useParams();
    const [messages, setMessages] = useState([
        { id: 1, text: "Hey! How's it going?", sender: "other", time: "12:45" },
        { id: 2, text: "Pretty good! Just working on this chat UI.", sender: "me", time: "12:46" },
        { id: 3, text: "It looks awesome already!", sender: "other", time: "12:46" },
    ]);
    const [newMessage, setNewMessage] = useState("");

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
                    <button className="btn btn-primary px-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;