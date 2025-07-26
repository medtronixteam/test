"use client";
import { createContext, useContext, useState, useEffect } from "react";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken"); // Allow token to be passed or read from localStorage
    if (!token) {
      return;
    }

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/posts/all/", {
          headers: { Authorization: `Token ${token}` }
        }
      );
      const data = await res.json();
      setUserPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (postData) => {
    try {
      const res = await fetch("/api/v1/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add Authorization if needed
        },
        body: JSON.stringify(postData),
      });
      const newPost = await res.json();
      setUserPosts((prev) => [...prev, newPost]);
    } catch (err) {
      console.error("Failed to add post", err);
    }
  };

  const deletePost = async (postId) => {
    try {
      await fetch(`/api/v1/posts/${postId}/`, {
        method: "DELETE",
      });
      setUserPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const editPost = async (postId, updatedData) => {
    try {
      const res = await fetch(`/api/v1/posts/${postId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const updatedPost = await res.json();
      setUserPosts((prev) =>
        prev.map((post) => (post.id === postId ? updatedPost : post))
      );
    } catch (err) {
      console.error("Failed to update post", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{ userPosts, loading, fetchPosts, addPost, deletePost, editPost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => useContext(PostContext);
