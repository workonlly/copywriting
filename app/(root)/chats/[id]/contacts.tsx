"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import io, { Socket } from 'socket.io-client';
import { jwtDecode } from "jwt-decode"; // Make sure to npm install jwt-decode

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export default function ChatWindow() {
  const params = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  
  // State for IDs & Auth
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string>("");
  
  // State for Recharge
  const [isExpired, setIsExpired] = useState(false);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);

  // Refs (Crucial for performance)
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ----------------------------------------------------------------
  // 1. INITIALIZATION (Run ONCE on mount)
  // ----------------------------------------------------------------
  useEffect(() => {
    // A. Setup Socket (Singleton - prevents multiple connections)
    if (!socketRef.current) {
      socketRef.current = io(BACKEND_URL, {
        transports: ['websocket'], // Force fast transport
        autoConnect: false         // Wait until we have IDs
      });

      // Socket connection event handlers
      socketRef.current.on("connect", () => {
        console.log("✅ Socket connected:", socketRef.current?.id);
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("❌ Socket connection error:", error.message);
      });

      socketRef.current.on("disconnect", (reason) => {
        console.log("🔌 Socket disconnected:", reason);
      });
    }

    // B. Get User Info from Token & Storage
    const token = localStorage.getItem("token");
    const storedReceiver = localStorage.getItem("chat_receiver_id");
    
    // Use URL param as fallback if localStorage is empty
    const receiverIdFromUrl = params?.id as string;
    const finalReceiverId = storedReceiver || receiverIdFromUrl;
    
    console.log("🔍 Initializing chat with receiver:", finalReceiverId, "(from:", storedReceiver ? "localStorage" : "URL", ")");
    setReceiverId(finalReceiverId);

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        // Supports both 'id' and 'user_id' formats
        const userId = decoded.user_id || decoded.id;
        setCurrentUserId(userId);
        console.log("Current User ID:", userId);
      } catch (e) {
        console.error("Invalid Token", e);
      }
    }

    // Cleanup when leaving page
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  // ----------------------------------------------------------------
  // 2. FETCH HISTORY & CHECK RECHARGE STATUS
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!receiverId || !currentUserId) return;

    console.log("📡 Fetching chat history for receiver:", receiverId);
    
    // Clear messages when switching users
    setMessages([]);
    setRoomId("");

    const initChat = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Fetch Conversation Logic
        const res = await fetch(`${BACKEND_URL}/conversation/conversation/${receiverId}`, {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        });
        
        if (!res.ok) {
          console.error("Failed to fetch conversation:", res.status);
          return;
        }

        const json = await res.json();
        const data = Array.isArray(json) ? json : [];

        console.log("💬 Loaded messages:", data.length);

        // Filter out metadata-only records (where conversation is null)
        const actualMessages = data.filter((msg: any) => msg.conversation !== null && msg.conversation !== undefined);
        
        console.log("💬 Actual messages with content:", actualMessages.length);

        // A. Set Room ID
        // If chat exists, use DB Room ID. If not, generate one (min_max).
        let activeRoomId = "";
        if (data.length > 0) {
           activeRoomId = data[0].room_id;
           
           // B. CHECK RECHARGE EXPIRY (Logic applied here)
           // Assuming the backend sends 'recharge_expires_at' in the first row
           const expiresAt = data[0].recharge_expires_at; 
           if (expiresAt) {
             setExpiryDate(expiresAt);
             if (new Date() > new Date(expiresAt)) {
               setIsExpired(true);
             }
           }
        } else {
           activeRoomId = [currentUserId, parseInt(receiverId!)].sort((a, b) => a - b).join("_");
        }

        setRoomId(activeRoomId);
        
        // Sort messages by timestamp (oldest first)
        const sortedMessages = actualMessages.sort((a: any, b: any) => {
          const timeA = new Date(a.created_at).getTime();
          const timeB = new Date(b.created_at).getTime();
          return timeA - timeB;
        });
        
        setMessages(sortedMessages);
        console.log("🏠 Room ID set to:", activeRoomId);

      } catch (err) {
        console.error("Failed to load chat", err);
      }
    };

    initChat();
  }, [receiverId, currentUserId]);

  // ----------------------------------------------------------------
  // 3. SOCKET CONNECTION & LISTENER
  // ----------------------------------------------------------------
  useEffect(() => {
    if (!roomId || !socketRef.current) return;

    const socket = socketRef.current;

    // Connect & Join specific room
    if (!socket.connected) {
      console.log("🔌 Connecting socket...");
      socket.connect();
    }
    
    console.log("🚪 Joining room:", roomId);
    socket.emit("join_room", roomId);

    // Error Listener (e.g., "Plan Expired" from server)
    socket.on("error_message", (data) => {
        alert(data.message);
        setIsExpired(true);
    });

    // Message Listener
    const handleReceive = (newMessage: any) => {
        console.log("📨 Received message:", newMessage);
        if (newMessage.room_id === roomId) {
            // Add message only if it's not already in the list (prevent duplicates)
            setMessages((prev) => {
              const isDuplicate = prev.some(msg => 
                msg.created_at === newMessage.created_at && 
                msg.sender_id === newMessage.sender_id
              );
              
              if (!isDuplicate) {
                return [...prev, newMessage];
              }
              return prev;
            });
        }
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
      socket.off("error_message");
    };
  }, [roomId]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // ----------------------------------------------------------------
  // 4. ACTIONS (Send & Recharge)
  // ----------------------------------------------------------------
  
  const handleRecharge = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BACKEND_URL}/conversation/recharge`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ room_id: roomId })
        });
        
        const data = await res.json();
        if (res.ok) {
            alert("Recharge Successful! You can chat for 24 hours.");
            setIsExpired(false);
            setExpiryDate(data.data.recharge_expires_at); // Update frontend state
        } else {
            alert("Recharge failed");
        }
    } catch (err) {
        console.error(err);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !roomId || !currentUserId) {
      console.warn("⚠️ Cannot send: missing data", { input: !!input, roomId, currentUserId });
      return;
    }

    // Double check expiry before sending
    if (isExpired) {
        alert("Your plan has expired. Please recharge.");
        return;
    }

    const timestamp = new Date().toISOString();

    const payload = {
      room_id: roomId,
      sender_id: currentUserId,
      receiver_id: receiverId,
      chat_recharge: !isExpired, // Pass status
      conversation: { 
        [timestamp]: {
          message: input,
          sender_id: currentUserId
        }
      },
      created_at: timestamp
    };

    console.log("📤 Sending message:", payload);

    // Optimistic Update
    setMessages((prev) => [...prev, payload]);
    setInput(""); 

    // Send via Socket
    socketRef.current?.emit("send_message", payload);
  };

  return (
    <div className="flex flex-col h-full border border-violet-200 sm:border-2 rounded-lg sm:rounded-2xl shadow-xl overflow-hidden">
       {/* Chat Area */}
       <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-6 space-y-2 sm:space-y-3 md:space-y-4 bg-white">
         {messages.length === 0 ? (
           <div className="flex items-center justify-center h-full text-gray-400">
             <p className="text-center text-xs sm:text-sm md:text-base">
               No messages yet.<br />
               <span className="text-[10px] sm:text-xs md:text-sm">Start the conversation!</span>
             </p>
           </div>
         ) : (
           messages.map((msg, i) => {
             // Debug: Log the message structure
             if (i === 0) console.log("📩 Message structure:", JSON.stringify(msg, null, 2));
             
             let messageText = "Message Error";
             let messageSenderId = msg.sender_id || msg.user_id;
             
             // Handle different conversation formats
             if (typeof msg.conversation === 'string') {
                 messageText = msg.conversation;
             } else if (msg.conversation && typeof msg.conversation === 'object') {
                 // If it's an object with timestamp keys
                 const values = Object.values(msg.conversation);
                 if (values.length > 0) {
                   const firstValue = values[0];
                   
                   // Check if value is an object with message and sender_id (NEW FORMAT)
                   if (typeof firstValue === 'object' && firstValue !== null && 'message' in firstValue) {
                     messageText = (firstValue as any).message;
                     messageSenderId = (firstValue as any).sender_id || messageSenderId;
                   } else if (typeof firstValue === 'string') {
                     // Old format: just text
                     messageText = firstValue;
                   }
                 }
             } else if (msg.message) {
                 // Fallback: check if there's a 'message' field
                 messageText = msg.message;
             } else if (msg.text) {
                 // Fallback: check if there's a 'text' field
                 messageText = msg.text;
             }
             
             // If still error, show what we have
             if (messageText === "Message Error") {
               console.error("❌ Cannot parse message:", JSON.stringify(msg, null, 2));
             }

             const isMe = messageSenderId === currentUserId;

             return (
               <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"} animate-slideIn`}>
                 <div className={`p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl max-w-[85%] sm:max-w-[75%] md:max-w-[70%] text-xs sm:text-sm font-medium shadow-sm ${
                   isMe 
                     ? "bg-violet-600 text-white rounded-br-sm" 
                     : "bg-gray-100 text-gray-800 rounded-bl-sm"
                 }`}>
                   {messageText}
                 </div>
               </div>
             );
           })
         )}
         <div ref={messagesEndRef} />
       </div>
       
       {/* Input Area or Recharge Button */}
       <div className="p-2 sm:p-3 md:p-4 border-t bg-white rounded-b-lg sm:rounded-b-2xl">
         {isExpired ? (
            <div className="flex flex-col items-center gap-2 p-2 bg-red-50 rounded-lg">
                <p className="text-red-600 font-semibold text-xs sm:text-sm">Your chat session has expired.</p>
                <button 
                    onClick={handleRecharge}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 sm:py-2 px-3 sm:px-4 rounded-full transition text-xs sm:text-sm"
                >
                    Recharge for 24 Hours
                </button>
            </div>
         ) : (
            <form onSubmit={sendMessage} className="flex gap-2 sm:gap-3">
                <input 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    className="flex-1 border rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-violet-500"
                    placeholder="Type a message..."
                />
                <button type="submit" className="bg-violet-600 text-white p-2 sm:p-2.5 md:p-3 rounded-full hover:bg-violet-700 transition shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </form>
         )}
       </div>
    </div>
  );
}