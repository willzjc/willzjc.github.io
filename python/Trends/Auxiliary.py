import os
import re

def sanitize_name(value):
    """
    Normalizes string, converts to lowercase, removes non-alpha characters,
    and converts spaces to hyphens.
    """
    # import unicodedata
    # value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore')
    value = re.sub('[^\w\s-]', '', value).strip().lower()
    value = re.sub('[-\s]+', '-', value)

    return value


def create_if_required(path):
    if not os.path.exists(path):
        if '/' in path:
            paths = path.split('/')
            up_level = '/'.join(paths[:-1])
            create_if_required(up_level)

        os.mkdir(path)


