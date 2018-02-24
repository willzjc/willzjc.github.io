# Load Libraries for offline use

import os  # Fundamental file management libraries

import numpy as np  # Base Array library used by Pandas
import pandas as pd  # Pandas Matrix library

import scipy as sp  # Required as the baseline data science module

from StringIO import StringIO  # Formulating a string as a filestream

import plotly.tools as tls  # Auxiliary Tools

from plotly.offline import download_plotlyjs, init_notebook_mode, iplot
# plotly for offline use (i.e. no service fee)

from plotly.graph_objs import *  # Different chart types

init_notebook_mode()  # Notebook

import cufflinks as cf  # Bridge from DataFrames to Plotly

cf.go_offline()  # Required to use plotly offline (no account required).

from sklearn import preprocessing  # For natrix normalization

categorybasepath = os.getcwd()
if 'historical_price' not in categorybasepath:
    categorybasepath = categorybasepath + '/' + 'willzjc.github.io/python/historical_price/ref/categories/'
else:
    categorybasepath = categorybasepath.split('historical_price')[0] + 'historical_price/ref/categories/'

categorybasepath = categorybasepath.replace('\\', '/')
categories = list(
    set([x[0].replace(categorybasepath + '\\', '').split('categories')[1].replace('/', '').split('\\')[0].strip()
         for x in os.walk(categorybasepath)]))

categories = [c for c in categories if (
        'ipynb_checkpoints' not in c and
        'Misc' not in c and not 'archive' in c
)]

print '\n'.join([x for x in categories if len(x) > 0])


# Reads files
global category, basepath


def readfiles(categorybasepath):
    global category, basepath
    bol_recursive = False
    df = None
    global category
    category = 'Clothing and footwear'
    category = 'Food and non-alcoholic beverages'
    category = 'Furnitures'
    category = 'Alcohol'
    basepath = categorybasepath + '/' + category + '/'

    files = []

    for str_dirname, lst_subdirs, lst_files in os.walk(basepath):
        if not bol_recursive:
            while len(lst_subdirs) >= 0:

                for file in lst_files:
                    if '.csv' in file and not 'corr' in file and not 'fileread' in file:
                        #                         print 'Reading:',file
                        with open(basepath + file, 'rb') as f:
                            buffer = f.read()
                            files.append(buffer)
                            f.close()

                if len(lst_subdirs) > 0:
                    lst_subdirs.pop()
                    if len(lst_subdirs) == 0:
                        break
                else:
                    break

    for f in files:

        headers = {}
        buffer = []
        headermode = True
        for line in f.split('\n'):
            if headermode and 'Date,' in line:
                headermode = False
            elements = line.strip().split(',')
            if len(elements) < 3 and len(elements) > 1:  # filter out header info
                headers[elements[0].strip()] = elements[1].strip()
            else:
                linein = False
                if len(elements) > 1 and not headermode and '0.00 USD,0.00 USD' not in line:
                    buffer.append(line)
                    linein = True
                # print f,linein,line

        # Read file stream CSV
        currentdf = pd.read_csv(StringIO('\n'.join(buffer)))

        # Replace Strings
        currentdf = currentdf.replace('\sUSD', '', regex=True).apply(pd.to_numeric, errors='ignore')
        try:
            if df == None:
                df = pd.DataFrame(columns=['date'])
                df['date'] = currentdf['Date']
        except Exception as e:
            # TODO
            do_nothing = True

        df[headers['Keywords']] = currentdf['Average Selling Price']
        df[headers['Keywords'] + "_sales"] = currentdf['Total Sales']
        df[headers['Keywords'] + "_weighting"] = currentdf['Total Sales'] / currentdf['Average Selling Price']

    return df


df = readfiles(categorybasepath)
original_df = df.copy()

df_summary = df.copy()

print '============================'
df_summary = df_summary.sum()[[c for c in df_summary.columns if 'date' not in c]].astype(int)
print df_summary
# dfst=pd.DataFrame(columns=['category','avg_price'])

# for category in [c for c in df_summary.columns if (not 'weight' in c and not 'sales'  in c)]:
# #     value=df_summary.loc[df_summary[category]]
#     print df_summary[category].columns
#     print value
#     dfst.loc[len(dfst)]=[category,value]

