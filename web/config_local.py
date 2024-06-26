from config import *

# Debug mode
DEBUG = True

# App mode
SERVER_MODE = True

# Enable the test module
MODULE_BLACKLIST.remove('test')

# Log
CONSOLE_LOG_LEVEL = DEBUG
FILE_LOG_LEVEL = DEBUG

DEFAULT_SERVER = '127.0.0.1'

UPGRADE_CHECK_ENABLED = True

# Use a different config DB for each server mode.
if SERVER_MODE == False:
    SQLITE_PATH = os.path.join(
        DATA_DIR,
        'pgadmin-desktop.db'
    )
else:
    SQLITE_PATH = os.path.join(
        DATA_DIR,
        'pgadmin-server.db'
    )
