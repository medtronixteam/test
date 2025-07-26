// src/api/auth.js

const API_BASE = process.env.NEXT_PUBLIC_API_URL; // Set this in .env.local

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${API_BASE}/token/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      throw new Error(errorData?.detail || 'Login failed');
    }

    const data = await response.json();
    const newToken = data.auth_token;

    // // Store token in localStorage
    // localStorage.setItem('accessToken', newToken);
    // localStorage.setItem("isAuthenticated", "true");

    console.log("Login successful, token:", newToken);
    return data;
  } catch (error) {
    console.error('Login error:', error.message);
    // localStorage.removeItem("accessToken"); // Clear token on login failure
    // localStorage.removeItem("isAuthenticated");
    // Optionally call setUserFromContext(null) or fetchUserFromContext() without token
    throw error;
  }
}

export async function logoutUser() {
  console.log("Logging out");
  localStorage.removeItem("accessToken");
  localStorage.setItem("isAuthenticated", false);
}


export async function registerUser(email, password, first_name, last_name) {
  try {
    const response = await fetch(`${API_BASE}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, first_name, last_name}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("registerUser", errorData);
      throw new Error(errorData?.password || 'Registration failed');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error;
  }
}

export async function activateUser(uid, token){
  try {
    const response = await fetch(`${API_BASE}/users/activation/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, token}),
    });

    console.log("activateUser", response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || 'Account could not be activated');
    }

    return true;
  } catch (error) {
    console.error('Activation error:', error.message);
    throw error;
  }
}


export async function forgotPassword(email){
  try {
    console.log(JSON.stringify({ email}));
    const response = await fetch(`${API_BASE}/users/reset_password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email}),
    });

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || 'Something went wrong. Make sure the email exists.');
    }

    return true;
  } catch (error) {
    console.error('Recovery error:', error.message);
    throw error;
  }
}


export async function resetForgottenPassword(uid, token, new_password) {
  try {
    const response = await fetch(`${API_BASE}/users/reset_password_confirm/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, token, new_password}),
    });

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || 'Something went wrong when changing password.');
    }

    return true;
  } catch (error) {
    console.error('Password could not be changed:', error.message);
    throw error;
  }
}