// src/api/ai-chat.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL; // Set this in .env.local


export async function fetchChatHistory(token) {
    console.log("Token", token);
    const res = await fetch(`${API_BASE}ai-chat/chat/`, {
        method:'GET',
        headers: {
            Authorization: `Token ${token}`,
        },
    });
    return res.json();
  }
  
  export async function sendMessageToAI(message, token) {
    const res = await fetch(`${API_BASE}ai-chat/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({ message }),
    });
    return res.json();
  }
  