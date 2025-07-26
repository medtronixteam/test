// src/api/subscription.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL; // Set this in .env.local


export async function subscribeUser(token, lookupKey) {
    try {
        const response = await fetch(`${API_BASE}/subscriptions/create-checkout-session/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                "lookupKey" : lookupKey
            }),
        });

        return response.json();
    }
    catch (error)
    {
        console.error('Subscription error:', error.message);
        throw error;
    }
}