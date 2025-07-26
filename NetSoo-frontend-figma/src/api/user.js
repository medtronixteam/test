const API_BASE = process.env.NEXT_PUBLIC_API_URL; // Set this in .env.local

export async function getUserInfo() {
    localStorage.getItem("accessToken");
}