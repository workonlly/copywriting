"use client";
import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
  time: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey! Is the assignment still available?", sender: 'them', time: "10:00 AM" },
    { id: 2, text: "Yes, I'm looking for someone to help with the React part.", sender: 'me', time: "10:02 AM" },
    { id: 3, text: "Cool, I can handle that. What's the deadline?", sender: 'them', time: "10:05 AM" },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="flex h-full bg-white text-black font-sans border-t border-gray-200">
      

      {/* 2. Main Chat Window */}
      <main className="flex-1 flex flex-col">

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] p-3 rounded-sm text-sm shadow-sm border ${
                msg.sender === 'me' 
                  ? 'bg-black text-white border-black' 
                  : 'bg-white text-black border-gray-200'
              }`}>
                <p>{msg.text}</p>
                <span className={`text-[9px] block mt-1 text-right font-bold uppercase ${
                  msg.sender === 'me' ? 'text-violet-500' : 'text-gray-400'
                }`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 border-2 border-black p-3 rounded-sm focus:outline-none focus:border-violet-500 text-sm"
            />
            <button 
              onClick={sendMessage}
              className="bg-violet-500 text-black border-2 border-black px-6 py-2 font-black uppercase text-sm rounded-sm hover:bg-black hover:text-white transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatInterface;