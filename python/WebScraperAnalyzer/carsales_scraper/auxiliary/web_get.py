import os
import datetime
import re
import urllib2
import ssl

localfile='output/local_url_cache.html'

def download_webpage(url, overwrite,use_local_copy):
    global localfile
    content = None

    if use_local_copy:
        content = open(localfile,'r').read()
        print 'Using local cached copy at: ',localfile
    else:

	
	# For when running behind a company proxy (self signed ssl certificates)
	# Ignores warning as html pages are not run by a browser when scraped

	ctx = ssl.create_default_context()
	ctx.check_hostname = False
	ctx.verify_mode = ssl.CERT_NONE


        f = urllib2.urlopen(url=url,context=ctx)
        content = f.read()

        f = open(localfile, 'w')
        f.write(content +'\n')
        f.close()

    return content


def scrape_url(url, overwrite=False, use_local_copy=False):
    from lxml import etree
    tree = etree.HTML(download_webpage(url,overwrite,use_local_copy))
    return tree

