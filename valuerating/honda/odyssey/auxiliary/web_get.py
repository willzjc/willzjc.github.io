import os
import datetime
import re

localfile = 'output/local_url_cache.html'


def download_webage(url, overwrite, use_local_copy):
    global localfile
    content = None

    if use_local_copy:
        content = open(localfile, 'r').read()
        print 'Using local cached copy at: ', localfile
    else:
        import urllib
        f = urllib.urlopen(url)
        content = f.read()

        f = open(localfile, 'w')
        f.write(content + '\n')
        f.close()

    return content


def scrape_url(url, overwrite=False, use_local_copy=False):
    from lxml import etree
    tree = etree.HTML(download_webage(url, overwrite, use_local_copy))
    return tree
