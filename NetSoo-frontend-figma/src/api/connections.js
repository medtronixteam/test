// src/api/connections.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL; // Set this in .env.local

export async function getConnectionOAuthURL(token, oauthURLEndpoint) {
    try{
        const res = await fetch(oauthURLEndpoint, {
            method:'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        });

        console.log(oauthURLEndpoint, res);

        return res.json();
    }
    catch (error){
        console.error('Error getting all the connections:', error.message);
        throw error;
    }
}

export async function selectFacebookPage(token, facebookPageName) {
    try{
        console.log(facebookPageName);
        const res = await fetch(API_BASE + 'social-accounts/select-facebook-page/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                selected_page: facebookPageName,
              }),
        });

        console.log("res", res);
        return res.json();
    }
    catch (error){
        console.error('Error in selecting facebook page:', error.message);
        throw error;
    }
}

export async function getAllConnections(token) {
    try{
        const res = await fetch(`${API_BASE}/social-accounts/`, {
            method:'GET',
            headers: {
                Authorization: `Token ${token}`,
            },
        });


        return res.json();
    }
    catch (error){
        console.error('Error getting all the connections:', error.message);
        throw error;
    }
}



export async function deletePlatform(token, platform) {
    try{
        const res = await fetch(API_BASE + 'social-accounts/remove-platform/', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({
                platform: platform,
              }),
        });

        return res.json();
    }
    catch (error){
        console.error('Error in removing platform:', error.message);
        throw error;
    }
}