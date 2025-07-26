// src/api/auth.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL; // Set this in .env.local

export async function getAllConversationMessages(token, conversation_id) {
  try {
    const response = await fetch(`${API_BASE}/message-inbox/get-all-conversation-messages/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
        conversation_id: conversation_id,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || 'Failed in fetching conversation messages');
    }

    console.log("Successfully fetched conversation data");
    return response.json();
  } catch (error) {
    console.error('Error fetching messages for conversation:', error.message);
    throw error;
  }
}

export async function sendMessage(token, recipient_id, message) {
    try {
        const response = await fetch(`${API_BASE}/message-inbox/send-message/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            recipient_id: recipient_id,
            message : message
            }),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.detail || 'Failed sending message');
          }
      
          console.log("Successfully fetched conversation data");
          return response.json();
    } catch (error)
    {
        console.error("Error in sending message: ", error);
        throw error;
    }
}