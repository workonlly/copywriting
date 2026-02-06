"use client";
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

// Initialize connection to backend using environment variable
const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_UR ;
const socket = io(BACKEND_URL);

export default function ChatWindow({ currentUserId, receiverId }: any) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user=localStorage.getItem("chat_receiver_id");
    const roomid = uuidv4();
    // 1. Join my private channel to hear "doorbell" rings
    socket.emit("join_room", roomid);

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
  }, []);

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
        await fetch(`${BACKEND_URL}/chat/send`, {
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
    <div className="flex flex-col h-[500px] border-2 border-violet-200 rounded-2xl bg-gradient-to-b from-white to-violet-50/30 shadow-xl shadow-violet-500/10">
       {/* Chat Area */}
       <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-violet-50/20 to-white">
         {messages.map((msg, i) => {
           const isMe = msg.user_id === currentUserId;
           return (
             <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"} animate-slideIn`}>
               <div className={`p-4 rounded-2xl max-w-[70%] text-sm font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                 isMe 
                   ? "bg-gradient-to-br from-violet-500 to-violet-600 text-white rounded-br-sm" 
                   : "bg-white border-2 border-violet-100 text-gray-800 rounded-bl-sm hover:border-violet-200"
               }`}>
                 {msg.conversation}
               </div>
             </div>
           );
         })}
         <div ref={messagesEndRef} />
       </div>
       
       {/* Input Area */}
       <form onSubmit={sendMessage} className="p-4 border-t-2 border-violet-100 bg-white rounded-b-2xl flex gap-3 items-center shadow-inner">
         <input 
           value={input} 
           onChange={e => setInput(e.target.value)} 
           className="flex-1 border-2 border-violet-200 rounded-full px-5 py-3 text-sm font-medium bg-gradient-to-r from-white to-violet-50/50 focus:outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-200/50 focus:shadow-lg transition-all duration-300 placeholder:text-gray-400"
           placeholder="Type a message..."
         />
         <button 
           type="submit"
           className="bg-gradient-to-br from-violet-500 to-violet-600 text-white w-12 h-12 rounded-full font-bold hover:from-violet-600 hover:to-violet-700 hover:scale-110 hover:shadow-lg hover:shadow-violet-500/50 active:scale-95 transition-all duration-300 flex items-center justify-center"
         >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
           </svg>
         </button>
       </form>

       {/* CSS Animations */}
       <style jsx>{`
         @keyframes slideIn {
           from {
             opacity: 0;
             transform: translateY(10px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }

         .animate-slideIn {
           animation: slideIn 0.3s ease-out;
         }
       `}</style>
    </div>
  );
}