"""Server Group helper utilities"""
import os
import json

CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))
with open(CURRENT_PATH + "/servers_group_test_data.json") as data_file:
    test_cases = json.load(data_file)
