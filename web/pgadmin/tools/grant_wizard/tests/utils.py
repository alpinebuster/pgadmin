import os
import json

file_name = os.path.basename(__file__)
CURRENT_PATH = os.path.dirname(os.path.realpath(__file__))
with open(CURRENT_PATH + "/grant_wizard_test_data.json") as data_file:
    test_cases = json.load(data_file)
