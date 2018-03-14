# Load Libraries for offline use
# EDit 2018031400
import os  # Fundamental file management libraries

import numpy as np  # Base Array library used by Pandas
import pandas as pd  # Pandas Matrix library

import scipy as sp  # Required as the baseline data science module

try:
    from StringIO import StringIO  # Formulating a string as a filestream
except ImportError:
    from io import StringIO

import plotly.tools as tls  # Auxiliary Tools

from plotly.offline import download_plotlyjs, init_notebook_mode, iplot
# plotly for offline use (i.e. no service fee)

from plotly.graph_objs import *  # Different chart types

init_notebook_mode()  # Notebook

import cufflinks as cf  # Bridge from DataFrames to Plotly

cf.go_offline()  # Required to use plotly offline (no account required).

from sklearn import preprocessing  # For natrix normalization

# import seaborn as sns                             # For gradient color scales

from IPython.display import display, HTML  # Formatting for Dataframes


START_OFFSET=-99
END_OFFSET=0
### Formatting
pd.options.display.float_format = '{:,.2f}'.format

categorybasepath=os.getcwd()
if 'historical_price' not in categorybasepath:
    categorybasepath = categorybasepath +'/'+ 'willzjc.github.io/python/historical_price/ref/categories/'
else:
    categorybasepath = categorybasepath.split('historical_price')[0] + 'historical_price/ref/categories/'


categorybasepath=categorybasepath.replace('\\','/')
categories=list(set([x[0].replace(categorybasepath+'\\','').split('categories')[1].replace('/','').split('\\')[0].strip()
                     for x in os.walk(categorybasepath)]))

categories = [c for c in categories if (
              'ipynb_checkpoints' not in c and
              'Misc' not in c and not 'archive' in c
    )]

# print '\n'.join([x for x in categories if len(x)>0])

# Reads files

global category, basepath


def readfiles(categorybasepath):
    global category, basepath
    bol_recursive = False
    df = None
    global category

    category = 'Food and non-alcoholic beverages'
    category = 'Furnitures'
    #     category='Alcohol'
    #     category='Clothing and footwear'
    basepath = categorybasepath + '/' + category + '/'

    files = []
    items_dict = {}

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

    init_ran = False

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
        #         try:
        #             if df==None:
        #                 df=pd.DataFrame(columns=['date'])
        #                 df['date'] = currentdf['Date']
        #         except Exception as e:
        #             # TODO
        #             do_nothing=True
        item_name = headers['Keywords']
        #         print item_name
        df = pd.DataFrame(columns=['date'])
        df[item_name] = currentdf['Average Selling Price']
        df[item_name + "_sales"] = currentdf['Total Sales']
        df[item_name + "_weighting"] = currentdf['Total Sales'] / currentdf['Average Selling Price']
        df['date'] = currentdf['Date']
        df['date'] = pd.to_datetime(df['date'])
        df['dateindex'] = df['date'].copy()
        df = df.set_index(df['dateindex'])
        if not init_ran:
            items_dict[item_name] = df
            init_ran = True
        else:

            if item_name in items_dict:
                i_df = items_dict[item_name]
                i_df = pd.concat([i_df, df])
                items_dict[item_name] = i_df.copy()

            else:
                items_dict[item_name] = df.copy()

    # initialize df
    df = items_dict[items_dict.keys()[0]]
    display(df.head())

    for i, item in enumerate(items_dict, start=0):
        if i >= 1:
            tdf = items_dict[item]
            # joins existing df with new (1 item per df)
            tdf = tdf.drop(columns=['date'])  # removes date to avoid dup columns
            df = pd.concat([df, tdf], axis=1, join_axes=[df.index], join='inner')
    df = df.drop(columns=['dateindex'])

    grouped = df.groupby(level=0)  #### Removing duplicates
    df = grouped.last()

    return df


df = readfiles(categorybasepath)
raw_df = df.copy()
print('length of list: %s' % (len(df)))
show_offset = 2
# df.reset_index()
print('showing head')
display(df.head(show_offset))
print('showing tail')
display(df.tail(show_offset))