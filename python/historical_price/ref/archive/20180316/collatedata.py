import os
import pandas as pd
import numpy as np
import datetime

import sys

import matplotlib.pyplot as plt

from scipy.interpolate import spline
from matplotlib import dates as mdates
import matplotlib
# matplotlib.use('Qt5Agg')

if sys.version_info[0] < 3:
    from StringIO import StringIO
else:
    from io import StringIO


def plotinterpolate(df,**kwargs):
    ndf = df.resample('M').mean()
    ndf = ndf.resample('D')
    tsint = ndf.interpolate(method='cubic')
    return tsint.plot(**kwargs)

def drawdf(df,draw_plot=True,product='unknown',analysis_mode=False):

    #Normalize DF First

    df['combined']=0

    for eachitem in df.columns:
        if not 'date' in eachitem:
            df[eachitem] = (df[eachitem] - df[eachitem].mean()) / (df[eachitem].std())
            df['combined']=df['combined']+df[eachitem]

    # Get Total Rating based on average of
    df['average_sell_price']=df[[c for c in df.columns[1:]]].mean(axis=1)


    plotinterpolate(df.set_index(pd.DatetimeIndex(df['date'])).resample('3M').mean())


    # plt.title()
    figtitle='3Month index plot'
    fig = plt.gcf().canvas.set_window_title(figtitle)


    # plot with all members
    # df.set_index(pd.DatetimeIndex(df['date'])).resample('M').plot()

    # df=df.replace('\sUSD','',regex=True).apply(pd.to_numeric, errors='ignore')
    # df['dateindex']=pd.to_datetime(df['date'])
    df['date']=pd.to_datetime(df['date'])
    df=df.set_index(pd.DatetimeIndex(df['date']))

    cpi=pd.read_csv('ref/AUCPI',delimiter='\t')

    print cpi

    cpi['date']=pd.to_datetime(cpi['date'])

    cpi['CPI'] = (cpi['CPI'] - cpi['CPI'].mean()) / (cpi['CPI'].std())

    # Timeshift
    timeshift=30
    print cpi
    print df
    templatecpi=cpi.copy()
    templatedf = df.copy()
    # for timeshift in [0,30,60,90,120]:
    corrs={}
    corrslist=[]
    rng=range(-150,150)

    mapping_df = pd.read_csv('correl.csv')
    if not analysis_mode:
        rng=[
            # 116,
            # 13,
            # 31,
            # 2,
            # 57,
            # 1,
            # 144,
            # 123,
            # 24,
            # 181,
            116
        ]

    for timeshift in rng:
        title="Category:" + product + " \nTimeshift: " + str(timeshift) \
              + '. Correlation: ' \
              + str(mapping_df.loc[mapping_df['offset'] == timeshift][product].values[0]) \
              + '\n Total Correlation: ' \
              + str(mapping_df.loc[mapping_df['offset']== timeshift]['total'].values[0])
        cpi=templatecpi.copy()
        df=templatedf.copy()


        cpi['date'] = cpi['date'] - datetime.timedelta(days=(timeshift))
        cpi=cpi.set_index(pd.DatetimeIndex(cpi['date']))

        # Normalize CPI
        # index = pd.date_range(cpi['date'].max(),cpi['date'].min())
        # index = pd.date_range(cpi['date'])
        # values = pd.Series(cpi.values, index=index)

        # Read above link about the different Offset Aliases, S=Seconds
        # resampled_values = values.resample('2.5D')
        # cpi.diff()  # compute the difference between each point!
        # df.plot(y='average_sell_price',title=title)


        plotinterpolate(df,y='average_sell_price', title=title) # simply plot average sell price only
        # ax = cpi.plot(y='CPI')
        ax = plotinterpolate(cpi,y='CPI')


        # df.resample('M').mean().plot(y='average_sell_price',ax=ax,title=title)
        plotinterpolate(df.resample('M').mean(),y='average_sell_price',ax=ax,title=title)
        figtitle = 'CPI vs Average Selling Price of Item'
        fig = plt.gcf().canvas.set_window_title(figtitle)

        # xnew = np.linspace(df['combined'].min(), df['combined'].max(), 300)  # 300 represents number of points to make between T.min and T.max

        # power_smooth = spline(df['date'], df['combined'], xnew)

        # plt.plot(xnew, power_smooth)


        ##### Concat both tables #####
        combined_df=pd.concat([cpi,df],axis=1, join='inner')
        # print type(df),type(cpi)

        # ##### Massaging Data #####
        # ### resample
        # df = df.resample('M').mean()
        # df = df.resample('M')
        # df = df.resample('D')
        # # ### interpolate
        # df= df.interpolate(method='cubic')

        # df.plot(kind='bar')
        # df['bad_rate'].plot(secondary_y=True)

        # #### PLOTTING SECTION #####
        # df = df.resample('M').mean()
        # df = df.resample('D')
        # tsint = df.interpolate(method='cubic')
        # cpi=cpi.interpolate(method='cubic')
        # tsint.plot()
        # tsint.plot(y=['combined','average_sell_price'], use_index=True)
        # tsint.plot()
        # ax = cpi.plot(y='CPI', use_index=True,color='r',legend=True)
        # tsint.plot.line(ax=ax,y='average_sell_price',use_index=True,secondary_y=True,legend=True)
        # cpi_s.plot(ax=ax)
        # result.plot(y='average_sell_price',kind='bar')
        # result.plot(y='CPI',secondary_y=True)
        corr=combined_df.CPI.corr(combined_df.average_sell_price)
        corrs[timeshift]=corr
        corrslist.append(corr)


        if draw_plot:
            f, axarr = plt.subplots(2)

            combined_df['positive']=combined_df['average_sell_price'] > 0

            datefmt = mdates.DateFormatter('%Y-%m-%d')

            axarr[0].format_xdata = datefmt
            axarr[1].format_xdata = datefmt

            axarr[0].xaxis.set_major_formatter(datefmt)
            axarr[1].xaxis.set_major_formatter(datefmt)

            # combined_df.CPI.plot(ax=axarr[1], legend=True)
            plotinterpolate(combined_df,ax=axarr[1], legend=True,y=[c for c in combined_df.columns if c in ('CPI')])
            # combined_df.average_sell_price.plot(legend=True, ax=axarr[0]
            #  ,color=combined_df.positive.map({True: 'g', False: 'r'}),title=title)

            combined_df.average_sell_price.plot(legend=True, ax=axarr[0], kind='bar'
                                                , color=combined_df.positive.map({True: 'g', False: 'r'}), title=title)

            figtitle = 'Bar(AVG Price) vs Price'

            fig = plt.gcf().canvas.set_window_title(figtitle)

            # py.iplot([{
            #     'x': combined_df.index,
            #     'y': combined_df[col],
            #     'name': col
            # } for col in combined_df.columns if 'date' not in col ], filename='cufflinks-simple-line')

    if analysis_mode:
        cdf=None
        correlation_pickle='correl.pickle'

        if os.path.exists(correlation_pickle):
            cdf=pd.read_pickle(correlation_pickle)
            if not product in cdf.columns:
                cdf[product]=corrslist

        else:
            cdf=pd.DataFrame(columns=['offset',product])

            cdf['offset']=range(-150,150)
            cdf[product] = corrslist
            # for k in corrs.keys():
            #     cdf[k] = corrs[k]

        cdf.to_pickle(correlation_pickle)
        cdf['total']=0
        for c in cdf.columns:
            if ('offset' not in c) and 'total' not in c:
                cdf['total']=cdf['total']+cdf[c]



        cdf.to_csv('correl.csv')

        print cdf

    if draw_plot:
        plt.gcf().autofmt_xdate()
        plt.show()

def readfiles():

    bol_recursive=False
    df=None

    basepath=os.getcwd().replace('\\','/') + '/' + 'ref' + '/'
    print basepath

    files=[]

    for str_dirname, lst_subdirs, lst_files in os.walk(basepath):
        if not bol_recursive:
            while len(lst_subdirs) > 0:
                lst_subdirs.pop()
                for file in lst_files:
                    if '.csv' in file and not 'corr' in file:
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
            print e
            print 'Deal with this exception another time - likely some issue with comparing a NoneType to a DataFrame'

        # print currentdf.columns
        df[headers['Keywords']] = currentdf['Average Selling Price']

    df['combined']=0
    df.to_csv('fileread.csv')
    return df

def main():

    plt.cla()  # Clear axis
    plt.clf()  # Clear figure
    plt.close()  # Close a figure window
    plt.close('all') #close all

    df=readfiles()
    init_df=df.copy()
    drawdf(df,draw_plot=True,product='alcohol',analysis_mode=False)

    init_df['datetime'] = pd.to_datetime(init_df['date'])
    init_df=init_df.set_index(pd.DatetimeIndex(init_df['date']))

    # init_df.set_index('date')

    print init_df.resample('3M').mean


if __name__ == "__main__":
    main()