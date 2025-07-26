from Common.logger import netsoo_logger
import requests
import tempfile

import requests
from google.oauth2.credentials import Credentials
import googleapiclient.discovery
import json
from googleapiclient.http import MediaFileUpload

API_URL = "https://api.appnetsoo.com/api/v1/social-accounts/api-creds"
API_KEY = "abcdefghijkl"

class YoutubePost:
    def __init__(self):
        pass

    def download_video(self, video_url):
        """Download the video from Cloudinary and save it as a temp file."""
        response = requests.get(video_url, stream=True)
        if response.status_code != 200:
            netsoo_logger.error(f"❌ Failed to download video: {video_url}")
            return None

        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
        with open(temp_file.name, "wb") as f:
            for chunk in response.iter_content(1024):
                f.write(chunk)

        netsoo_logger.info(f"✅ Video downloaded: {temp_file.name}")
        return temp_file.name  # Return the local file path

    def get_youtube_token(self, user_id):
        """Fetch YouTube OAuth token from Django API using API Key."""
        headers = {"X-API-KEY": API_KEY}
        response = requests.get(f"{API_URL}?user_id={user_id}", headers=headers)

        if response.status_code == 200:
            return response.json()
        else:
            netsoo_logger.error("❌ Failed to get YouTube token:", response.json())
            return None

    def get_youtube_service(self):
        """Use retrieved token to authenticate YouTube API."""
        if not self.token_data:
            return None

        # Load client.json (Google OAuth credentials)
        with open("secrets/google_client_secret.json", "r") as client_file:
            client_info = json.load(client_file)["web"]

        credentials = Credentials(
            token=self.token_data["access_token"],
            refresh_token=self.token_data["refresh_token"],
            token_uri=client_info["token_uri"],
            client_id=client_info["client_id"],
            client_secret=client_info["client_secret"],
            scopes=["https://www.googleapis.com/auth/youtube.upload"]
        )

        return googleapiclient.discovery.build("youtube", "v3", credentials=credentials)

    def post(self, data):
        """Upload video to YouTube."""
        user_id = data["user_id"]
        self.token_data = self.get_youtube_token(user_id)
        self.youtube = self.get_youtube_service()

        if not self.youtube:
            netsoo_logger.error("❌ YouTube API service not initialized.")
            return None
        
        video_file_path = self.download_video(data["media_url"])
        request_body = {
            "snippet": {
                "title": data["title"],
                "description": data["description"],
                "tags": data.get("tags", []),
                "categoryId": "22"  # People & Blogs category
            },
            "status": {
                "privacyStatus": data.get("privacy_status", "private")
            }
        }

        try:
            media = MediaFileUpload(video_file_path, chunksize=-1, resumable=True)
            request = self.youtube.videos().insert(
                part="snippet,status",
                body=request_body,
                media_body=media  # Cloudinary URL
            )
            response = request.execute()

            video_id = response.get("id")
            netsoo_logger.info(f"✅ Video posted: https://www.youtube.com/watch?v={video_id}")
            return video_id

        except googleapiclient.errors.HttpError as e:
            netsoo_logger.error(f"❌ YouTube Upload Failed: {e}")
            return None


if __name__ == "__main__":
    ytp = YoutubePost()

    data = {"title" : "Test Title", "description" : "This a a description", "user_id" : "1", "medial_url" : "https://res.cloudinary.com/dpynlgyfi/video/upload/v1742159322/train_yylqer.mkv"}

    ytp.post(data)