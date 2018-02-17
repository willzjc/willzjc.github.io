import os
import pandas as pd
import numpy as np
import datetime
import plotly
import plotly.plotly as py
import plotly.graph_objs as go
import plotly.figure_factory as FF
import sys

import matplotlib.pyplot as plt

from scipy.interpolate import spline
from matplotlib import dates as mdatesX
if sys.version_info[0] < 3:
    from StringIO import StringIO
else:
    from io import StringIO



def readfiles():

    bol_recursive=False
    df=pd.DataFrame(columns=['date'])

    basepath=os.getcwd().replace('\\','/') + '/' + 'ref' + '/'
    print basepath

    files=[]

    for str_dirname, lst_subdirs, lst_files in os.walk(basepath):
        if not bol_recursive:
            while len(lst_subdirs) > 0:
                lst_subdirs.pop()
                for file in lst_files:
                    if '.csv' in file:
                        with open(basepath+file,'rb') as f:
                            files.append(f.read())
                            f.close()

    for f in files:

        headers = {}
        buffer=[]
        headermode = True
        for line in f.split('\n'):
            if headermode and 'Date,' in line:
                headermode=False
            elements=line.strip().split(',')
            if len(elements) < 3 and len(elements) > 1:         # filter out header info
                headers[elements[0].strip()]=elements[1].strip()
            else:
                if len(elements)>1 and not headermode:
                    buffer.append(line)

        # Read file stream CSV
        currentdf = pd.read_csv(StringIO('\n'.join(buffer)))

        # Replace Strings
        currentdf = currentdf.replace('\sUSD', '', regex=True).apply(pd.to_numeric, errors='ignore')
        try:
            df['date'] = currentdf['Date']
        except:
            # TODO
            print 'Deal with this exception another time'

        df[headers['Keywords']] = currentdf['Average Selling Price']


    # df['combined']=0

    return df

df=readfiles()

print df