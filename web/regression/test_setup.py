import json
import os


CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))

try:
    with open(CURRENT_PATH + '/test_config.json') as data_file:
        config_data = json.load(data_file)
except Exception as exception:
    with open(CURRENT_PATH + '/test_config.json.in') as data_file:
        config_data = json.load(data_file)
