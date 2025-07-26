from PlatformPoster.Platforms import FacebookPost, TwitterPost, YoutubePost,TiktokPost

class TaskDelegator:
    def __init__(self):
        self.platforms = {
            "facebook" : FacebookPost(),
            "youtube" : YoutubePost(),
            "tiktok" : TiktokPost(),
            "twitter" : TwitterPost()
        }

    def delegate(self, data):
        print(data)
        print(data["social_account_platform"])
        self.platforms[data['social_account_platform']].post(data)