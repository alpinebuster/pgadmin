import os
import sys

if sys.version_info < (3, 4):
    raise Exception('This application must be run under Python 3.4 or later.')

import builtins

root = os.path.dirname(os.path.realpath(__file__))
if sys.path[0] != root:
    sys.path.insert(0, root)

# Ensure the global server mode is set.
builtins.SERVER_MODE = True

import config

# When running it as a WSGI application, directory for the configuration file
# must present.
if not os.path.exists(os.path.dirname(config.SQLITE_PATH)):
    raise Exception(
        """
Required configuration file is not present!
Please run setup.py first!"""
    )

from pgAdmin import app as application
