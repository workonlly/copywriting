"use client";
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

// Initialize connection to backend
const socket = io("http://localhost:4000");

export default function ChatWindow({ currentUserId, receiverId }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentUserId) return;

    // 1. Join my private channel to hear "doorbell" rings
    socket.emit("join_room", currentUserId);

    // 2. Listen for incoming messages
    const handleMessage = (newMessage: any) => {
      // Logic: Is this message for the chat I am looking at right now?
      // (Either I sent it, or the person I'm looking at sent it)
      if (newMessage.user_id === receiverId || newMessage.user_id === currentUserId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("receive_message", handleMessage);
    socket.on("message_sent", handleMessage);

    return () => {
      socket.off("receive_message");
      socket.off("message_sent");
    };
  }, [currentUserId, receiverId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 3. Send via HTTP (The Fast Producer)
    try {
        const token = localStorage.getItem("token"); // Get auth token
        await fetch("http://localhost:4000/chat/send", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ 
                conversant_id: receiverId, 
                message: input 
            }),
        });
        
        setInput(""); // Clear input immediately
    } catch (err) {
        console.error("Failed to send", err);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border border-gray-300 rounded-lg bg-white shadow-lg">
       {/* Chat Area */}
       <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
         {messages.map((msg, i) => {
           const isMe = msg.user_id === currentUserId;
           return (
             <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
               <div className={`p-3 rounded-lg max-w-[70%] text-sm ${isMe ? "bg-violet-600 text-white rounded-br-none" : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"}`}>
                 {msg.conversation}
               </div>
             </div>
           );
         })}
         <div ref={messagesEndRef} />
       </div>
       
       {/* Input Area */}
       <form onSubmit={sendMessage} className="p-3 border-t bg-white flex gap-2">
         <input 
           value={input} 
           onChange={e => setInput(e.target.value)} 
           className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-violet-500"
           placeholder="Type a message..."
         />
         <button className="bg-violet-600 text-white w-10 h-10 rounded-full font-bold hover:bg-black transition-colors">
           ➤
         </button>
       </form>
    </div>
  );
}