# Load Libraries for offline use
# Edit 20180316-01
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



#####################################################################
# Variables

metrics = items = pricecolumns = salescolumns = weighcolumns = None


#####################################################################
# Functions

def getExcelDf(xlfile='ref/archive/AU CPI Rates - Categorical Drilldown - 640105.xlsx',
            tab='Data1'):
    # xlfile='ref/archive/AU CPI Rates - Categorical Drilldown - 640105.xlsx'
    # xlfile='ref/archive/AU CPI rates - Official - 20180218.xls.xlsx'
    xl = pd.ExcelFile(xlfile)
    return xl.parse(tab)

def getCPI(basepath='ref/categories/Food and non-alcoholic beverages'):
    # Read AUCPI file
    cpi = pd.read_csv(basepath + '/AUCPI', delimiter=',')

    cpi_category = cpi.columns[1]
    cpi = cpi.rename(columns={cpi_category: 'CPI'})

    title = '<b>CPI - %s</b><br>Obtain CPI for the next step, including each point\'s derivative' % (cpi_category)

    cpi['diff'] = cpi.CPI.diff()  # Calculating difference from previous year
    cpi['diff'] = 100 * cpi['diff'] / ((cpi['CPI'] + cpi['CPI'].shift(-1)) / 2)
    # cpi['diff']=cpi.CPI
    cpi.index = cpi['date']
    return cpi

def getProducts(basepath='ref/categories/Food and non-alcoholic beverages'):
    # Reads files

    def readfiles(categorybasepath):
        global category, basepath
        bol_recursive = False
        df = None
        global category

        category = 'Food and non-alcoholic beverages'
        category = 'Furnitures'
        category = 'Alcohol'
        category = 'Clothing and footwear'
        basepath = categorybasepath + '/' + category + '/'

        files = []
        items_dict = {}

        for str_dirname, lst_subdirs, lst_files in os.walk(basepath):
            if not bol_recursive:
                while len(lst_subdirs) >= 0:

                    for file in lst_files:
                        # filter out non data files
                        if '.csv' in file and not 'corr' in file and not 'fileread' in file:
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
                    headers[elements[0].strip().strip(':')] = elements[1].strip()
                else:
                    linein = False
                    # do not start interpreting data until the first row of data occurs
                    if len(elements) > 1 and not headermode and '0.00 USD,0.00 USD' not in line:
                        buffer.append(line)
                        linein = True

            # Read file stream CSV
            currentdf = pd.read_csv(StringIO('\n'.join(buffer)))

            # Replace Strings
            currentdf = currentdf.replace('\sUSD', '', regex=True).apply(pd.to_numeric, errors='ignore')

            # Categorically segregating buying format
            item_name = '%s' % (headers['Keywords'])
            if 'Listing Format' in headers:
                item_name = item_name + ' ' + headers['Listing Format']

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
        print('Verifying that dataframe can be initialized for %s...'%(category))
        # display(df.head(1))

        for i, item in enumerate(items_dict, start=0):
            if i >= 1:
                tdf = items_dict[item]

                tdf = tdf.drop_duplicates(subset=['date'], keep='last')  # Remove duplicates

                tdf = tdf.drop(columns=['date'])  # removes date to avoid dup columns

                df = pd.concat([df, tdf], axis=1, join_axes=[df.index],
                               join='inner')  # joins existing df with new (1 item per df)
        df = df.drop(columns=['dateindex'])

        grouped = df.groupby(level=0)  #### Removing duplicates
        df = grouped.last()

        return df

    categorybasepath = os.getcwd()
    if 'historical_price' not in categorybasepath:
        categorybasepath = categorybasepath + '/' + 'willzjc.github.io/python/historical_price/ref/categories/'
    else:
        categorybasepath = categorybasepath.split('historical_price')[0] + 'historical_price/ref/categories/'

    categorybasepath = categorybasepath.replace('\\', '/')
    categories = list(
        set([x[0].replace(categorybasepath + '\\', '').split('categories')[1].replace('/', '').split('\\')[0].strip()
             for x in os.walk(categorybasepath)]))

    df = readfiles(categorybasepath)
    raw_df = df.copy()
    print('Summary Statistics\nLength of list: %s' % (len(df)))
    show_offset = 2
    # df.reset_index()
    # print('Beginning of DataFrame')
    # display(df.head(show_offset))
    # print('End of DataFrame')
    # display(df.tail(show_offset))
    return df


#######################################################################################################
#                                           Data Enrichment                                           #
#######################################################################################################

def enrichVariables(df):
    series_summary = df.copy()

    series_summary=series_summary.sum()[[c for c in series_summary.columns if 'date' not in c]].astype(int)
    dfs=pd.DataFrame(series_summary,columns=['value'])

    # Get all row names which are metrics
    metrics=[]
    ml=list(filter(lambda x: keyword in x, dfs.index.values) for keyword in ['sales','weigh'])
    for l in ml: metrics=metrics+l

    # Get all rows which are base values
    items=list(set(dfs.index.values) -  set(metrics))

    # Getting column names of the different dimensions
    pricecolumns = [c for c in df.columns if (not 'date' in c and not 'sales' in c and     'weight' not in c)]
    salescolumns = [c for c in df.columns if (not 'date' in c and     'sales' in c and not 'weight' in c)]
    weighcolumns = [c for c in df.columns if (not 'date' in c and not 'sales' in c and     'weight' in c)]

    return metrics,items,pricecolumns, salescolumns,weighcolumns

def getSummary(dfs):
    global pricecolumns
    if pricecolumns == None:
        metrics, items, pricecolumns, salescolumns, weighcolumns = enrichVariables(dfs)

    transformed_df=pd.DataFrame(columns=['item','avg_price','units_sold','revenue'])

    for i,item in enumerate(set(items)):                                    # Transform information to a new summary frame
        avg_price  = item
        units_sold = item +'_'+'weighting'
        revenue    = item +'_'+'sales'
        transformed_df.loc[len(transformed_df)] = [item
           ,dfs.loc[dfs.index.isin([avg_price])]['value'][0]
           ,dfs.loc[dfs.index.isin([units_sold])]['value'][0]
           ,dfs.loc[dfs.index.isin([revenue])]['value'][0]
          ]


    # transformed_df=transformed_df.set_index('item')
    transformed_df=transformed_df.sort_values(by=['revenue'],ascending=False)
    transformed_df['avg_price']=transformed_df['revenue'] / transformed_df['units_sold']

    # Aggregating for Total
    total_df = pd.DataFrame(transformed_df[filter(lambda x: 'item' not in x, transformed_df.columns)].sum(),columns=['total']).astype(int)

    total_df.loc[len(total_df)]=len(items)
    total_df.index.values[len(total_df)-1] = 'Category Count'

    #Formatting
    for c in ['units_sold']:
        transformed_df[c]=transformed_df[c].map('{:,}'.format)

    for c in ['revenue','avg_price']:
        transformed_df[c]=transformed_df[c].map('${:,.0f}'.format)

    # Final formatting
    total_df['total']=total_df['total'].map('{:,}'.format)
    return transformed_df,total_df



if __name__ == "__main__":

    price_df=getProducts()
    cpi_df=getCPI()

    df=price_df.copy()
    transformed_df,total_df = getSummary(df)
    # Printing Summary
    print('Aggregate Stats of categories')
    #Display Categorical Summary
    display(HTML(transformed_df.to_html(index=False)))
    print('\n\nTotal of all')
    #Display Total Aggregate Summary
    display(total_df)

