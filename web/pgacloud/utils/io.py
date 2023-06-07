import datetime
import json
import sys


def debug(message):
    """ Print a debug message """
    now = datetime.datetime.now()

    print('[{}]: {}'.format(now.strftime("%H:%M:%S"), message),
          file=sys.stderr)


def error(message):
    """ Print an error message and exit """
    debug(message)

    output({'error': message})

    sys.exit(1)


def output(data):
    """ Dump JSON output from a dict """
    print(json.dumps(data))
