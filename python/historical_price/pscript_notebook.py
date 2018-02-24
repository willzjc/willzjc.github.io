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

# Worked out mean and sum
# df['sum']=df[[x for x in df.columns if x not in ['date']]].sum(axis=1)   # Sum is useless at this stage given prices are not noralized

def getColumns(df,exclude_cols=None):
    if not exclude_cols==None:
        exclude_cols.append('date')
    else:
        exclude_cols=['date']
    return [x for x in df.columns if x not in exclude_cols]


pricecolumns = [c for c in df.columns if (not 'date' in c and not 'sales' in c and 'weight' not in c)]
salescolumns = [c for c in df.columns if (not 'date' in c and 'sales' in c and not 'weight' in c)]
weighcolumns = [c for c in df.columns if (not 'date' in c and not 'sales' in c and 'weight' in c)]

# df['mean']=df[pricecolumns].mean(axis=1)

print pricecolumns
print salescolumns
print weighcolumns

df.iplot(columns=pricecolumns,title="<b>Price of items</b><br>Outliers not removed - boundary and scaling problems")
df.iplot(columns=salescolumns,title="<b>Sales revenue of items</b><br>Outliers not filtered")
df.iplot(columns=weighcolumns,title="<b>Units Sold</b><br>Outliers not filtered")

#### Percentiel threshold
percentile = 0.95

for c in df.columns:
    if c not in ['date']:
        q = df[c].quantile(percentile)
        df[c] = df[df[c] < q][c]

df.iplot(y=getColumns(df), title='<b>Outliers Filtered</b><br>Period bucketing frequency unaltered')


# Resampling and interpolate

def plotinterpolate(df, columns=None):

    sample_columns=df.columns

    if not columns == None:
        sample_columns = list(columns)
        if 'date' not in sample_columns:
            sample_columns.append('date')

    ndf = df.copy()[sample_columns]

    indexer = 'date'  # Only do this when the column date exists, set index column as date
    if indexer in df.columns:
        ndf['date'] = pd.to_datetime(df['date'])
        ndf = ndf.set_index(pd.DatetimeIndex(df['date']))

    ndf = ndf.resample('M').mean()
    ndf = ndf.resample('D')
    tsint = ndf.interpolate(method='cubic')
    return tsint


# interpolate, spine-smooth, and then plot

plotinterpolate(df, pricecolumns).iplot(
    title='<b>Price - Normalized data</b><br>Interpolated and bucketing interval set to 1 month')
plotinterpolate(df, salescolumns).iplot(
    title='<b>Revenue - Normalized data</b><br>Interpolated and bucketing interval set to 1 month')
plotinterpolate(df, weighcolumns).iplot(
    title='<b>Items Sold - Normalized data</b><br>Interpolated and bucketing interval set to 1 month')

##### Make a copy of variables first
input_df = df.copy()
input_df = input_df.interpolate(method='linear', axis=0).ffill().bfill()

##### Normalization for price #######

# norm_columns = pricecolumns + weighcolumns             # Noramlize both price and weighting
norm_columns = []  # Noramlize both price and weighting

for c in (pricecolumns + weighcolumns):
    if not 'date' in c:
        norm_columns.append(c)

x = input_df[norm_columns].values  # returns a numpy array
min_max_scaler = preprocessing.MinMaxScaler()  # Scaling
x_scaled = min_max_scaler.fit_transform(x)  # Fits curve
ndf = pd.DataFrame(x_scaled)

#### Normalized Values
ndf['date'] = pd.to_datetime(input_df['date'])
ndf = ndf.set_index(pd.DatetimeIndex(input_df['date']))

#### Fixes up columns
ndf = ndf.drop(columns=['date'])
ndf.columns = (norm_columns)

### Assign weighting based on sales
for product in pricecolumns:
    if product not in ['mean','date']:
        ndf[product] = ndf[product] * ndf[product + "_weighting"]  # Weighting Calculation
        ndf = ndf.drop(columns=[product + "_weighting"])

ndf['mean'] = ndf[pricecolumns].mean(axis=1)

ndf = plotinterpolate(ndf)  # Interpolate first
fig = tls.make_subplots(rows=2, cols=1, shared_xaxes=True)  # Sub Plotting, specify how many charts

# for col in [c for c in getColumns(ndf) if c not in ['mean']]:
for col in pricecolumns:
    fig.append_trace({'x': ndf.index, 'y': ndf[col], 'type': 'scatter', 'name': col}, 1, 1)
for col in ['mean']:
    fig.append_trace({'x': ndf.index, 'y': ndf[col], 'type': 'bar', 'name': col}, 2, 1)

fig.layout.title = 'Weighted Normalized prices chart in comparison to mean price'
iplot(fig)
