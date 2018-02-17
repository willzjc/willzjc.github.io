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



if sys.version_info[0] < 3:
    from StringIO import StringIO
else:
    from io import StringIO

def drawdf(df):


    #Normalize DF First

    df['combined']=0
    for eachitem in df.columns:
        if not 'date' in eachitem:
            df[eachitem] = (df[eachitem] - df[eachitem].mean()) / (df[eachitem].std())
            # df[eachitem]= df[eachitem] * 1.5

            df['combined']=df['combined']+df[eachitem]

    # Get Total Rating based on average of
    df['avg']=df[[c for c in df.columns[1:]]].mean(axis=1)

    # df=df.replace('\sUSD','',regex=True).apply(pd.to_numeric, errors='ignore')
    # df['dateindex']=pd.to_datetime(df['date'])
    df['date']=pd.to_datetime(df['date'])
    df=df.set_index(pd.DatetimeIndex(df['date']))


    cpi=pd.read_csv('ref/AUCPI',delimiter='\t')
    cpi['date']=pd.to_datetime(cpi['date'])

    # Timeshift
    timeshift=31+62
    cpi['date'] = cpi['date'] - datetime.timedelta(days=(timeshift))

    cpi=cpi.set_index(pd.DatetimeIndex(cpi['date']))

    print cpi

    # Normalize CPI
    # index = pd.date_range(cpi['date'].max(),cpi['date'].min())
    # index = pd.date_range(cpi['date'])
    # values = pd.Series(cpi.values, index=index)

    # Read above link about the different Offset Aliases, S=Seconds
    # resampled_values = values.resample('2.5D')
    # cpi.diff()  # compute the difference between each point!


    cpi['CPI'] = (cpi['CPI'] - cpi['CPI'].mean()) / (cpi['CPI'].std())






    # xnew = np.linspace(df['combined'].min(), df['combined'].max(), 300)  # 300 represents number of points to make between T.min and T.max

    # power_smooth = spline(df['date'], df['combined'], xnew)

    # plt.plot(xnew, power_smooth)
    # plt.show()

    ##### Concat both tables #####
    print type(df),type(cpi)
    result=pd.concat([cpi,df],axis=1, join='inner')

    ##### Massaging Data #####
    cpi = cpi.resample('D')
    df = df.resample('M').mean()
    df = df.resample('D')
    result=result.resample('D')

    result = result.interpolate(method='cubic')

    # df.plot(kind='bar')
    # df['bad_rate'].plot(secondary_y=True)

    #### PLOTTING SECTION #####
    # cpi=cpi.interpolate(method='cubic')
    # tsint.plot()
    # tsint.plot(y='combined', use_index=True)
    # tsint.plot()
    # ax = cpi.plot(y='CPI', use_index=True, kind='bar')
    # tsint.plot.line(ax=ax,y='avg',use_index=True,secondary_y=True,kind='line')
    # cpi_s.plot(ax=ax)
    # result.plot(y='avg',kind='bar')
    # result.plot(y='CPI',secondary_y=True)
    result.plot(y=['avg','CPI'])
    plt.show()

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

def main():
    df=readfiles()
    drawdf(df)

if __name__ == "__main__":
    main()