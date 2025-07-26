// src/api/posts.js
const API_BASE = process.env.NEXT_PUBLIC_API_URL; // Set this in .env.local

export async function addPost(token, platformPosts, imageUrls, videoUrls) {
    try {
      const res = await fetch(`${API_BASE}/posts/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          platform_posts: platformPosts,
          selected_images_urls: imageUrls,
          selected_videos_urls: videoUrls,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        // Handle multi-status or validation errors from the backend
        const error = data?.message || 'Failed to add post';
        console.error('API error:', data);
        throw new Error(error);
      }
  
      return data; // contains "message" and "created" keys
    } catch (error) {
      // Handle fetch/network or JSON parsing errors
      console.error('Network or unexpected error:', error);
      throw new Error(error.message || 'An unexpected error occurred while adding the post');
    }
  }
  


export async function getPosts(token) {
    try {
      const res = await fetch(`${API_BASE}/posts/all/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        }
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        // Handle multi-status or validation errors from the backend
        const error = data?.message || 'Failed to get posts';
        console.error('API error:', data);
        throw new Error(error);
      }
  
      return data; // contains "message" and "created" keys
    } catch (error) {
      // Handle fetch/network or JSON parsing errors
      console.error('Network or unexpected error:', error);
      throw new Error(error.message || 'An unexpected error occurred while getting the posts');
    }
}


export async function getUploadSignature(token)
{
    try {
        const res = await fetch(`${API_BASE}/posts/get-upload-signature/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          }
        });
    
        const data = await res.json();
    
        if (!res.ok) {
          // Handle multi-status or validation errors from the backend
          const error = data?.message || 'Failed to get upload signature';
          console.error('API error:', data);
          throw new Error(error);
        }
    
        return data; // contains "message" and "created" keys
      } catch (error) {
        // Handle fetch/network or JSON parsing errors
        console.error('Network or unexpected error:', error);
        throw new Error(error.message || 'An unexpected error occurred while getting the upload signature');
      }
}


export async function uploadMedia(token, mediaObjects, mediaType)
{
  let secureUrls = [];
  for (const mediaObject of mediaObjects){
    const uploadSignature = await getUploadSignature(token);
    const {signature, timestamp, api_key, cloud_name, folder} = uploadSignature;
    if (!signature || !timestamp || !api_key || !cloud_name || !folder) {
      throw new Error('Missing required upload parameters.');
    }

    const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/${mediaType}/upload`; // Adjust for video/raw if needed
    
    const formData = new FormData();
    formData.append('file', mediaObject.file);
    formData.append('api_key', api_key);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('folder', folder);

    try {
      const response = await fetch(cloudinaryUploadUrl, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Cloudinary upload error:', errorData);
        throw new Error(errorData.error?.message || 'Cloudinary upload failed.');
      }
  
      const uploadResult = await response.json();
      secureUrls.push(uploadResult["secure_url"]);
    } catch (error) {
      console.error('Error during Cloudinary upload:', error);
      throw error;
    }
  }

  return secureUrls;
}