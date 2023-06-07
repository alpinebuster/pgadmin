import os
import re

if __name__ == '__main__':
    include_dir = os.popen('pg_config --includedir').read().rstrip()
    version = os.popen('pg_config --version').read().rstrip()

    keywords_file = open('keywords.py', 'w')

    keywords_file.write('# ScanKeyword function for ' + version)
    keywords_file.write('\n\ndef ScanKeyword(key):')
    keywords_file.write('\n    keywordDict = {\n')

    idx = 0

    with open(include_dir + "/postgresql/server/parser/kwlist.h", "rb") as ins:

        pattern = re.compile(r'"([^"]+)",\s*[^,]*\s*,\s*(.*)$')
        keyword_types = [
            'UNRESERVED_KEYWORD', 'COL_NAME_KEYWORD',
            'TYPE_FUNC_NAME_KEYWORD', 'RESERVED_KEYWORD'
        ]

        for line in ins:
            line = line.decode().rstrip()
            if line[0:11] == 'PG_KEYWORD(' and line[-1] == ')':
                match = pattern.match(line[11:-1])
                if idx != 0:
                    keywords_file.write(", ")
                else:
                    keywords_file.write("        ")
                keywords_file.write(
                    '"' + match.group(1) + '": ' +
                    str(keyword_types.index(match.group(2)))
                )
                idx += 1
    keywords_file.write('\n        }\n')
    keywords_file.write(
        '    return (key in keywordDict and keywordDict[key]) or None')
