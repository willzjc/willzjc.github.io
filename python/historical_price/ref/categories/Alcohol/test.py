#instantiation

import matplotlib.pyplot as plt
import pandas as pd
import os
import numpy as np
import scipy as sp

from StringIO import StringIO

import pandas as pd
from plotly.offline import download_plotlyjs, init_notebook_mode, iplot
from plotly.graph_objs import *
init_notebook_mode()

import cufflinks as cf
cf.go_offline() # required to use plotly offline (no account required).


def readfiles():

    bol_recursive=False
    df=None

    basepath=os.getcwd().replace('\\','/')+'/'
    print basepath

    files=[]

    for str_dirname, lst_subdirs, lst_files in os.walk(basepath):
        if not bol_recursive:
            while len(lst_subdirs) > 0:
                lst_subdirs.pop()
                for file in lst_files:
                    if '.csv' in file and not 'corr' in file and not 'fileread' in file:
                        with open(basepath+file,'rb') as f:
                            buffer=f.read()
                            files.append(buffer)
#                             print buffer
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
                linein=False
                if len(elements)>1 and not headermode and '0.00 USD,0.00 USD' not in line:
                    buffer.append(line)
                    linein=True
                # print f,linein,line

        # Read file stream CSV
        currentdf = pd.read_csv(StringIO('\n'.join(buffer)))

        # Replace Strings
        currentdf = currentdf.replace('\sUSD', '', regex=True).apply(pd.to_numeric, errors='ignore')
        try:
            if df==None:
                df=pd.DataFrame(columns=['date'])
                df['date'] = currentdf['Date']
        except Exception as e:
            # TODO
            do_nothing=True
#             print e
#             print 'Deal with this exception another time - likely some issue with comparing a NoneType to a DataFrame'

        # print currentdf.columns
        df[headers['Keywords']] = currentdf['Average Selling Price']

    df['combined']=0
    df.to_csv('fileread.csv')
    return df

df = readfiles()

# Filter outliers
for c in df.columns:
    if c not in ['date']:
        q = df[c].quantile(0.98)
        df[c] = df[df[c] < q][c]

df.iplot(x='date',y=[c for c in df.columns if c not in ['date'] ])

plt.show()