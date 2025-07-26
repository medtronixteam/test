from Common.logger import netsoo_logger

class TwitterPost:
    def __init__(self):
        pass

    def post(self, data):
        netsoo_logger.info(f"Posting to X (formerly Twitter): {data}")