import { useState, useEffect, useRef } from "react";
import { FaComments, FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    sender: "user" | "bot";
    text: string;
}

const WHATSAPP_NUMBER = "+1234567890"; 

const fallbackResponses = [
    "Sorry, I don't understand.",
    "Please ask something related to visas or job placement.",
    "I'm here to help with visa and job-related questions!",
];

const ChatWidget = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { sender: "bot", text: "Hello! How can we help you today?" },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const isFallback = (text: string) =>
        fallbackResponses.some((fallback) => text.toLowerCase().includes(fallback.toLowerCase()));

    const sendMessage = async () => {
        if (!input.trim()) return;

        setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
        const userInput = input;
        setInput("");

        try {
            const res = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userInput }),
            });
            const data = await res.json();

            setMessages((msgs) => [...msgs, { sender: "bot", text: data.response }]);
        } catch (err) {
            setMessages((msgs) => [
                ...msgs,
                { sender: "bot", text: "Sorry, something went wrong. Please try again later." },
            ]);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                title="Chat agent"
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 left-6 btn btn-primary btn-circle z-50 shadow-lg"
            >
                <FaComments size={24} />
            </button>

            {/* Chat Panel with animation */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-20 left-6 w-80 bg-base-100 border border-gray-300 rounded-lg shadow-lg flex flex-col z-50"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h4 className="font-bold text-primary">Chat with us</h4>
                            <button
                                aria-label="Close chat"
                                onClick={() => setOpen(false)}
                                className="btn btn-ghost btn-sm"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-64">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`chat ${msg.sender === "user" ? "chat-end" : "chat-start"
                                        }`}
                                >
                                    <div
                                        className={`chat-bubble ${msg.sender === "user" ? "chat-bubble-primary" : "chat-bubble-info"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* WhatsApp fallback button */}
                        {messages.length > 0 &&
                            isFallback(messages[messages.length - 1].text) && (
                                <div className="p-4 border-t border-gray-200">
                                    <a
                                        href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-success btn-block gap-2"
                                    >
                                        <FaWhatsapp size={20} />
                                        Contact Agent on WhatsApp
                                    </a>
                                </div>
                            )}

                        {/* Input */}
                        <div className="p-4 border-t border-gray-200">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="input input-bordered w-full"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatWidget;
