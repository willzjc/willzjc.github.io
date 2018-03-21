# Load Libraries for offline use
# Edit 20180316-01
import os  # Fundamental file management libraries

import numpy as np  # Base Array library used by Pandas
import pandas as pd  # Pandas Matrix library

import scipy as sp  # Required as the baseline data science module

# Load Libraries for offline use
# Edit 20180317-02
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

# Dataframe addon
import qgrid

import ipywidgets as widgets  # Jupyter Widgets
import random


#####################################################################
# Variables

# metrics = None
# items = None
# pricecolumns = None
# salescolumns = None
# weighcolumns = None
# cpi_category = None

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
    return cpi, cpi_category


def getProducts(basepath='ref/categories/Food and non-alcoholic beverages'):
    # Reads files

    def readfiles(basepath):

        if basepath[-1] != '/':
            basepath = basepath + '/'

        bol_recursive = False
        df = None
        # global category

        category = basepath.split('/')[-2]

        # category = 'Food and non-alcoholic beverages'
        # category = 'Furnitures'
        # category = 'Alcohol'
        # category = 'Clothing and footwear'
        # basepath = categorybasepath + '/' + category + '/'

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
            # print f
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
        # print items_dict.keys()
        # print items_dict
        df = items_dict[items_dict.keys()[0]]
        print('Verifying that dataframe can be initialized for: %s...' % (category))
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
        set([x[0].replace(categorybasepath + '\\', '').split('categories')[1].replace('/', '').split('\\')[
                 0].strip()
             for x in os.walk(categorybasepath)]))
    # print basepath
    # df = readfiles(categorybasepath)
    df = readfiles(basepath)
    raw_df = df.copy()
    print('Dataframe Matrix Initialized: Row Length of matrix: %s' % (len(df)))
    show_offset = 2
    # df.reset_index()
    # display(df.head(show_offset))
    # display(df.tail(show_offset))
    return df


#######################################################################################################
#                                           Data Enrichment                                           #
#######################################################################################################

def enrichVariables(df):
    series_summary = df.copy()
    series_summary = series_summary.sum()[[c for c in series_summary.columns if 'date' not in c]].astype(int)
    dfs = pd.DataFrame(series_summary, columns=['value'])

    # Get all row names which are metrics
    metrics = []
    ml = list(filter(lambda x: keyword in x, dfs.index.values) for keyword in ['sales', 'weigh'])
    for l in ml:
        metrics = metrics + l

    # Get all rows which are base values
    items = list(set(dfs.index.values) - set(metrics))

    # Getting column names of the different dimensions
    pricecolumns = [c for c in df.columns if (not 'date' in c and not 'sales' in c and 'weight' not in c)]
    salescolumns = [c for c in df.columns if (not 'date' in c and 'sales' in c and not 'weight' in c)]
    weighcolumns = [c for c in df.columns if (not 'date' in c and not 'sales' in c and 'weight' in c)]

    return dfs, metrics, items, pricecolumns, salescolumns, weighcolumns


def getSummary(df):
    # # Get the sum of all items
    global metrics, items, pricecolumns, salescolumns, weighcolumns

    dfs, metrics, items, pricecolumns, salescolumns, weighcolumns = enrichVariables(df)

    transformed_df = pd.DataFrame(columns=['item', 'avg_price', 'units_sold', 'revenue'])

    for i, item in enumerate(set(items)):  # Transform information to a new summary frame

        avg_price = item
        units_sold = item + '_' + 'weighting'
        revenue = item + '_' + 'sales'
        transformed_df.loc[len(transformed_df)] = [item
            , dfs.loc[dfs.index.isin([avg_price])]['value'][0]
            , dfs.loc[dfs.index.isin([units_sold])]['value'][0]
            , dfs.loc[dfs.index.isin([revenue])]['value'][0]
                                                   ]

    # transformed_df=transformed_df.set_index('item')
    transformed_df = transformed_df.sort_values(by=['revenue'], ascending=False)
    transformed_df['avg_price'] = transformed_df['revenue'] / transformed_df['units_sold']

    # Aggregating for Total
    total_df = pd.DataFrame(transformed_df[filter(lambda x: 'item' not in x, transformed_df.columns)].sum(),
                            columns=['total']).astype(int)

    total_df.loc[len(total_df)] = len(items)
    total_df.index.values[len(total_df) - 1] = 'Category Count'

    # Formatting
    for c in ['units_sold']:
        transformed_df[c] = transformed_df[c].map('{:,}'.format)

    for c in ['revenue', 'avg_price']:
        transformed_df[c] = transformed_df[c].map('${:,.0f}'.format)

    # Final formatting
    total_df['total'] = total_df['total'].map('{:,}'.format)
    return transformed_df, total_df


# Interpolates every column of a dataframe that can be interolated
# Also sets date as an index
def interpolateDF(df, columns=None, frequency='M'):
    sample_columns = df.columns

    if not columns == None:
        sample_columns = list(columns)

    ndf = df.copy()[sample_columns]

    indexer = 'date'  # Only do this when the column date exists, set index column as date
    if indexer in df.columns:
        ndf['date'] = pd.to_datetime(df['date'])
        ndf = ndf.set_index(pd.DatetimeIndex(df['date']))

    ndf = ndf.resample(frequency).mean()
    ndf = ndf.resample('D')
    tsint = ndf.interpolate(method='cubic')
    return tsint


# Plotting two types of charts
def plotdouble(df, metric1, metric2, color1='orange', color2='green', title=''):
    fig1 = df.iplot(columns=[metric1], kind='bar', asFigure=True, width=0.1, color=color1)
    fig2 = df.iplot(columns=[metric2], kind='line', secondary_y=[metric2], asFigure=True, colors=color2, width=5)
    fig2['data'].extend(fig1['data'])
    fig2.layout.title = title

    return fig2


# Return a dataframe that has been scaled / normalized
def normalizeDF(combined_frame, replaceval=2):  # normalize scales
    # type: (pandas.DataFrame, int) -> pandas.DataFrame
    """

    :rtype: DataFrame
    """

    idf = combined_frame.copy()

    # combined_frame = combined_frame.fillna(value=combined_frame.mean ())  # remove NaN entries
    method = 'spline'
    idf = idf.interpolate(method=method  # interpolate missing points
                          , limit_direction='both'
                          , order=1
                          # , limit=2048
                          )

    if 'date' in idf.columns:
        idf = idf.drop(columns=['date'])

    x = idf.values  # returns a numpy array
    min_max_scaler = preprocessing.MinMaxScaler()  # Scaling
    x_scaled = min_max_scaler.fit_transform(x)  # Fits curve
    new_frame = pd.DataFrame(x_scaled)  # nfcpi curve

    new_frame.columns = idf.columns  # puts original column names back

    new_frame = new_frame.set_index(pd.DatetimeIndex(combined_frame.index))  # puts original index back

    new_frame[new_frame == replaceval] = np.NaN
    # new_frame = new_frame - 0.5

    return new_frame


def decorateText(t):
    return t.replace('_', ' ').title()


# Get column names which are metrics
def getMetricColumns(df):
    pricecolumns = [s for s in df.columns if not any(xs in s for xs in ['sales', 'weigh', 'date', 'mean'])]

    weighcolumns = [s for s in df.columns if any(xs in s for xs in ['weigh'])
                    and not any(xs in s for xs in ['date', 'mean'])]
    salescolumns = [s for s in df.columns if any(xs in s for xs in ['sales'])
                    and not any(xs in s for xs in ['date', 'mean'])]

    return pricecolumns, weighcolumns, salescolumns


# Average Weighted Means function
def get_mean_weighted_rating(normalized_df_input, original_df_input):
    pricecolumns, weighcolumns, salescolumns = getMetricColumns(normalized_df_input)

    this_df = normalized_df_input[pricecolumns].copy()
    original_df = original_df_input.copy()


    original_df = original_df.set_index('date')

    # Get New Weighted Rating column names
    weighted_rating_columns = map(lambda x: x.replace('weighting', 'weighted_rating'), weighcolumns)
    n2df = pd.concat([this_df, original_df[weighcolumns]], join_axes=[this_df.index], axis=1)
    #     n2df[weighcolumns] = n2df[weighcolumns].apply(np.log)             # Assign weighting based on sales

    #     weig    hted_rating_columns = map (lambda x: x.replace ('sales', 'weighted_rating'), salescolumns)
    #     n2df = pd.concat([normalized_df,original_df[salescolumns]],join_axes=[normalized_df.index],axis=1)

    # Logarithmic weighting
    #     n2df[salescolumns] = n2df[salescolumns].apply(np.log)             # Assign weighting based on sales

    # display(n2df.head(1))
    # Attenuate weightings (logarithmic weighting)
    #     n2df[weighcolumns].resample('M').mean().iplot()
    #     n2df[weighcolumns].resample('M').mean().iplot()
    # Multiply item pricing by item
    for item in pricecolumns:
        n2df[item + "_weighted_rating"] = (n2df[item] * original_df[item + '_weighting'])
    #         n2df[item+"_weighted_rating"] = (n2df[item] * n2df[item+'_sales'])

    # Obtain numerator (all of multiplied constituents)
    n2df['numerator'] = n2df[weighted_rating_columns].sum(axis=1)

    # Sum of multiplied average weighting constituents
    n2df['denominator'] = original_df[weighcolumns].sum(axis=1)

    # Logarithmic Weighted Average Mean
    n2df['weighted_mean'] = n2df['numerator'] / n2df['denominator']
    n2df['mean'] = n2df['weighted_mean']

    n2df['total_revenue'] = original_df[salescolumns].sum(axis=1)
    n2df['total_sold'] = original_df[weighcolumns].sum(axis=1)
    #     n2df= n2df.resample('20D').mean()
    #     n2df= n2df.resample('D')
    #     n2df= n2df.interpolate(method='cubic')
    n2df = n2df.drop(columns=weighted_rating_columns)

    return n2df


#### CPI df comparisons
def compareCPIMetrics(
        price_df, cpi_df, cpi_metric='diff', price_metric='mean'
        , title='', frequency='M', getRollingMean=False,cpi_category='',rolling_freq=None,normalize=True
):
    # initialize frames
    if rolling_freq==None:
        rolling_freq=frequency
    graph_ndf = (price_df.copy())

    if title == '':
        title = '<b>CPI %s vs %s</b><br>%s Interval' % (cpi_metric, price_metric, frequency)

    # Add metrics on the pricing axis
    # Rolling Average
    price_metrics = [price_metric]
    if getRollingMean:
        metric_name=decorateText(price_metric+(('_rolling (%s)')%(rolling_freq)))
        graph_ndf[[metric_name]] = graph_ndf[['total_revenue']].rolling(rolling_freq).mean()
        price_metrics = price_metrics + [metric_name]

    # Rename Metric names


    icpi = cpi_df.copy()
    cpivsprice_df = pd.concat([icpi[[
        cpi_metric
    ]].resample('1D').interpolate(type='cubic')
                                  ,
                               graph_ndf[price_metrics].copy().resample(frequency).mean().resample('1D').interpolate(
                                   type='cubic')
                               #  , graph_ndf[['mean']].copy().rolling('90D').mean().rename({'mean':'rollingavg'})
                               #  , graph_ndf[['mean']]
                               ], axis=1, join='inner')
    if normalize==True:
        cpivsprice_df = normalizeDF(cpivsprice_df)

    return cpivsprice_df
    # cpivsprice_df = cpivsprice_df.rename(columns={'mean': 'Average Weighted Price'})
    # cpivsprice_df.iplot(title='<b>CPI delta vs Weighted Price</b><br>%s' % (cpi_category))
    # iplot(plotdouble(cpivsprice_df,'diff','total_revenue'))


#### CPI df comparisons
def plotCompareCPIMetrics(
        price_df, cpi_df, cpi_metric='diff', price_metric='mean'
        , title='', frequency='M', getRollingMean=True, cpi_category='',rolling_freq=None, interpolate=False
        ,normalize=False
):
    graph_df = compareCPIMetrics(
        price_df, cpi_df, cpi_metric=cpi_metric, price_metric=price_metric
        , title='', frequency=frequency,getRollingMean=getRollingMean,cpi_category='',rolling_freq=rolling_freq
        ,normalize=normalize)


    if interpolate:
        graph_df=interpolateDF(graph_df)
    if title == '':
        title = '<b>CPI %s vs %s</b><br>%s - %s Interval' % (
            cpi_metric, decorateText(price_metric), decorateText(cpi_category), frequency)
    title = title.replace('CPI CPI', 'CPI Index')  # Replace regular tracks
    title = title.replace('Mean', 'Weighted Mean Price')  # Replace regular tracks
    title = decorateText(title)

    superset=graph_df.columns
    metrics2_cpi  = [cpi_metric]
    metrics1_mean = list(set(superset) - set(metrics2_cpi))

    # Plotting two types of charts
    def quickGetDouble(df, metrics1_mean, metrics2_cpi, color1='orange', color2='green', title=''):

        # Mean scaling
        rolling_mean_column = [x for x in metrics1_mean if 'roll' in x.lower()]
        mean_columns = list(set(metrics1_mean) - set(rolling_mean_column))
        fig1_mean = df.iplot(columns=mean_columns, kind='line', asFigure=True, width=3, color='orange',dash='dot')

        # Rolling Mean scaling
        df[rolling_mean_column]=df[mean_columns].rolling('90D').mean()
        fig2_rolling = df.iplot(columns=rolling_mean_column, kind='line', asFigure=True, width=3, color='purple')

        # CPI scaling
        fig3_cpi = df.iplot(columns=metrics2_cpi, kind='line', secondary_y=metrics2_cpi, asFigure=True, colors='green', width=5)
        fig3_cpi['data'].extend(fig1_mean['data'])
        fig3_cpi['data'].extend(fig2_rolling['data'])
        fig3_cpi.layout.title = title

        # print '!!!!!!!!!!!!!!!!!!!!!!!!!!!',rolling_mean_column,mean_columns,metrics2_cpi
        return fig3_cpi

    # Give normalized graph polarity

    graph_df = graph_df - 0.5
    # Plotly plot graph

    if not normalize:
        iplot(quickGetDouble(graph_df, metrics1_mean, metrics2_cpi, color1='orange', color2='green', title=title))
    else:

        graph_df.iplot(title=title)
    return graph_df


#### Percentile threshold
def filter_percentile(df, percentile=0.90):
    if percentile < 1:
        for c in df.columns:
            if c not in ['date']:
                q = df[c].quantile(percentile)
                df[c] = df[df[c] < q][c]
    return df


def plot_final(icpi, normalized_prices, recalc_correlation=False, optimum_timeshift=0, show_corr=True
               , show_cpi_curve=False, show_offset=True, cpi_metric='diff', correlation_matrx=None
               , category=''
               ):
    if optimum_timeshift != 0:
        scdf = correlation_matrx.copy()
        highest_offset_row = scdf.loc[scdf['offset'] > -388].loc[scdf['offset'] < 55].sort_values(['correlation'],
                                                                                                  ascending=False).head(
            n=1)
        optimum_timeshift = highest_offset_row['offset'].values[0].astype(int)

    bar_label = 'CPI % Change'
    original_curve = 'Predictor'
    new_curve = 'Time Shifted Predictor'

    # normalized_prices[['mean']].iplot(title='Title Test NDF')

    data1_cpi = icpi.copy()[cpi_metric]  # CPI change %
    data1_cpi = data1_cpi.to_frame()
    data1_cpi = data1_cpi.rename(columns={cpi_metric: bar_label})

    # First Shift the actual curve
    data2_normalized_prices = normalized_prices.copy().shift(-optimum_timeshift)[
        'mean'].to_frame()  # Shifted Price Curve
    data2_normalized_prices = data2_normalized_prices.rename(columns={'mean': new_curve})
    data2_normalized_prices = data2_normalized_prices[data2_normalized_prices[new_curve].notnull()]

    data3_original_prices = normalized_prices.copy()['mean'].to_frame()  # Prices
    data3_original_prices = data3_original_prices.rename(columns={'mean': original_curve})
    # data3_original_prices[[original_curve]].iplot()
    # normalized_prices.copy()['mean'].to_frame().iplot()
    h_offset_corr = 0

    if recalc_correlation:
        h_offset_corr = data2_normalized_prices[new_curve].corr(icpi[cpi_metric])
    elif show_corr:
        h_offset_corr = highest_offset_row['correlation'].values  # Correlation

    # Combining Frames
    combined_frame = pd.concat(
        [data1_cpi, data2_normalized_prices, data3_original_prices[original_curve]]
        #         map(normalize_df,[data1_cpi,data2_normalized_prices,data3_original_prices[original_curve]])
        , axis=1)  # Combined
    #     combined_frame=pd.concat([data1_cpi,data2_normalized_prices],axis=1)      # Combined
    #     combined_frame=normalize_df(combined_frame) # normalize dataframe

    title = '<b> %s </b><br>Interval: Monthly' % (category)
    if show_offset:
        title = '%s\t Offset: %s' % (title, optimum_timeshift)

    if show_corr:
        title = '%s\t Correlation: %s' % (title, round(h_offset_corr, 2))

    title = title + '\t\tCPI Metric: %s' % (cpi_metric)

    color1 = 'orange'
    color2 = 'green'

    # Comparing a substring of 1 list to another list
    # Lambda combined with any()
    # combined_frame.iplot(columns=filter(lambda x: not any(n in x for n in ['diff','CPI']), combined_frame.columns))
    #     combined_frame=combined_frame.resample('W').mean().interpolate(kind='spine')
    combined_frame = combined_frame.resample('W').mean()

    fig1 = combined_frame.iplot(columns=[bar_label], kind='bar', asFigure=True, width=5, color=color1)

    fig2 = combined_frame.iplot(columns=[original_curve]
                                , kind='line', secondary_y=[original_curve]
                                , asFigure=True, colors=['green'], width=5, dash='dot'
                                )

    fig3 = combined_frame.iplot(columns=[new_curve]
                                , kind='line', secondary_y=[new_curve]
                                , asFigure=True, colors=['purple'], width=5
                                )

    fig2['data'].extend(fig1['data'])
    fig3['data'].extend(fig2['data'])
    fig3.layout.title = title
    iplot(fig3)


# Adds deltas, date indexes, and interpolates delta
def enrichCPI(df):
    cpi = df.copy()
    # Workout CPI delta
    cpi['diff'] = cpi.CPI.diff()  # Calculating difference from previous year
    cpi['diff'] = 100 * cpi['diff'] / ((cpi['CPI'] + cpi['CPI'].shift(-1)) / 2)

    # Datetime index, resample, and then interpolate CPI
    cpi = cpi.set_index(pd.DatetimeIndex(cpi.index))  # sets index as the date for prices
    cpi = cpi.resample('D').mean()  # also time serializes dataframe so as to allow concatenation
    cpi.CPI = cpi.CPI.interpolate(type='spline', limit_direction='both', order=1)

    cpi['diff'] = 0
    cpi['diff'] = cpi.CPI.diff()  # Calculating difference from previous period
    cpi[['diff']] = cpi[['diff']].interpolate(type='spline', limit_direction='both', order=1)

    # Filter out null
    cpi = cpi[cpi['diff'].notnull()]
    return cpi

def quickPlotCPIvPrice(basepath):
    price_df = getProducts(basepath)
    cpi_df, cpi_category = getCPI(basepath)
    df = price_df.copy()
    input_cpi = enrichCPI(cpi_df.copy())

    percentile = 0.98
    df = filter_percentile(df, percentile)

    frequency = 'M'

    pricecolumns,weighcolumns, salescolumns = getMetricColumns(df)
    # Show Price (interlolated to 1M)
    title = '<b>Average Price ($)</b><br>Outliers not filtered<br>Interpolated and bucketing interval set to: <i>%s</i>' % (
        frequency)
    interpolateDF(df, columns=pricecolumns, frequency=frequency).iplot(title=title)

    # Show Units Sold (interlolated to 1M)
    title = "<b>Units Sold</b><br>Outliers not filtered"
    interpolateDF(df, columns=weighcolumns, frequency=frequency).iplot(title=title)

    # Show Sales Revenue (interlolated to 1M)
    title = "<b>Sales revenue of items ($)</b><br>Outliers not filtered"
    interpolateDF(df, columns=salescolumns, frequency=frequency).iplot(title=title)

    # Plotting of CPI
    title = '<b>CPI - %s</b><br>Obtain CPI for the next step, including each point\'s derivative' % (
        decorateText(cpi_category))
    iplot(plotdouble(input_cpi, 'diff', 'CPI', title=title))

    # if
    # graph_ndf = normalizeDF(df)
    grapg_df=df
    grapg_df = get_mean_weighted_rating(normalized_df_input=grapg_df, original_df_input=df)

    graph_frequency = '14D'
    rolling_freq = '90D'
    # graph_ndf[['total_revenue_rolling']] = graph_ndf[['total_revenue']].rolling(graph_frequency).mean()

    cpi_vs_price = plotCompareCPIMetrics(grapg_df, input_cpi, cpi_metric='CPI',
                                         frequency=graph_frequency, cpi_category=cpi_category, getRollingMean=True,
                                         rolling_freq=rolling_freq)

    cpidelta_vs_price = plotCompareCPIMetrics(grapg_df, input_cpi, cpi_metric='diff',
                                              frequency=graph_frequency, cpi_category=cpi_category, getRollingMean=True,
                                              rolling_freq=rolling_freq)

    cpidelta_vs_total_revenue = plotCompareCPIMetrics(grapg_df, input_cpi, cpi_metric='diff'
                                                      , price_metric='total_revenue', frequency=graph_frequency,
                                                      cpi_category=cpi_category, getRollingMean=True,
                                                      rolling_freq=rolling_freq)

    cpi_vs_total_revenue = plotCompareCPIMetrics(grapg_df, input_cpi, cpi_metric='CPI', price_metric='total_revenue'
                                                 , frequency=graph_frequency, cpi_category=cpi_category,
                                                 getRollingMean=True, rolling_freq=rolling_freq)

if __name__ == "__main__":

    price_df = getProducts('ref/categories/Food - Chocolate')
    cpi_df, cpi_category = getCPI('ref/categories/Food - Chocolate')

    # price_df = getProducts()  ## Initiation of variables
    # cpi_df, cpi_category = getCPI()
    df = price_df.copy()
    cpi = enrichCPI(cpi_df.copy())

    transformed_df, total_df = getSummary(df)
    # Printing Summary
    print('Aggregate Stats of categories')
    # Display Categorical Summary
    # display (HTML (transformed_df.to_html (index=False)))
    print('\n\nTotal of all')
    # Display Total Aggregate Summary
    display(total_df)

    percentile = 0.98
    df = filter_percentile(df, percentile)
    ndf = normalizeDF(df)
    ndf = get_mean_weighted_rating(normalized_df_input=ndf, original_df_input=df)

    # cpi_vs_price = plotCompareCPIMetrics(ndf, cpi, cpi_metric='CPI', frequency='3M', cpi_category=cpi_category)

    cpidelta_vs_revenue = plotCompareCPIMetrics(
        ndf, cpi, cpi_metric='diff', price_metric='total_revenue', frequency='90D', cpi_category=cpi_category)
