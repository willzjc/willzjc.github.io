import os
import datetime
import re
import urllib

localfile='output/local_url_cache.html'

def download_webpage(url, overwrite,use_local_copy):
    global localfile
    content = None

    if use_local_copy:
        content = open(localfile,'r').read()
        print 'Using local cached copy at: ',localfile
    else:

        authinfo = urllib.request.HTTPBasicAuthHandler()

        proxy_support = urllib.request.ProxyHandler({"http": "AUR\\srv-fx-proxy:GyDNH42Nw79q@sparpxyapp.aur.national.com.au:8080"})

        # build a new opener that adds authentication and caching FTP handlers
        opener = urllib.request.build_opener(proxy_support, authinfo,
                                             urllib.request.CacheFTPHandler)

        # install it
        urllib.request.install_opener(opener)

        f = urllib.urlopen(url)
        content = f.read()

        f = open(localfile, 'w')
        f.write(content +'\n')
        f.close()

    return content


def scrape_url(url, overwrite=False, use_local_copy=False):
    from lxml import etree
    tree = etree.HTML(download_webpage(url,overwrite,use_local_copy))
    return tree

