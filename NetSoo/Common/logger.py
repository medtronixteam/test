import logging
import sys
from logging.handlers import RotatingFileHandler

class ColoredFormatter(logging.Formatter):
    """Formatter that adds color to log messages."""

    COLOR_CODES = {
        'DEBUG': '\033[94m',  # Blue
        'INFO': '\033[92m',   # Green
        'WARNING': '\033[93m',# Yellow
        'ERROR': '\033[91m',  # Red
        'CRITICAL': '\033[91m\033[1m' # Bold Red
    }
    RESET_CODE = '\033[0m'

    def format(self, record):
        log_color = self.COLOR_CODES.get(record.levelname, '')
        message = super().format(record)
        return f"{log_color}{message}{self.RESET_CODE}"

class Logger(logging.Logger):
    def __init__(self, level=logging.DEBUG):
        super().__init__("NetsooLogger", level) # call the super class init method
        handler = logging.StreamHandler(sys.stdout)
        handler.setLevel(level)
        # formatter = ColoredFormatter('%(asctime)s - %(name)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s')
        formatter = ColoredFormatter('[%(asctime)s] - [%(levelname)10s] [%(pathname)30s:%(lineno)4s] %(message)s', 
                                    '%Y-%m-%d %H:%M:%S')
        handler.setFormatter(formatter)
        self.addHandler(handler)


        # self.logger = logging.getLogger()
        # self.logger.setLevel(level)

        # # Create handler
        # handler = logging.StreamHandler(sys.stdout) # Use sys.stdout for correct coloring on all platforms
        # handler.setLevel(level)
        # print(ConfigManager.LOGGING_CONFIG)
        # # Create formatter and add to handler
        # formatter = ColoredFormatter(ConfigManager.LOGGING_CONFIG["logs_format"], ConfigManager.LOGGING_CONFIG["timestamp_format"])
        # handler.setFormatter(formatter)

        # # Add handler to logger
        # self.logger.addHandler(handler)

netsoo_logger = Logger(logging.DEBUG)


if __name__ == "__main__":
    netsoo_logger.debug("DEBUG LOG")
    netsoo_logger.info("INFO LOG")
    netsoo_logger.warning("WARN LOG")
    netsoo_logger.error("ERROR LOG")