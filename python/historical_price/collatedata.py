import os
import pandas as pd
import numpy as np

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

    # df=df.replace('\sUSD','',regex=True).apply(pd.to_numeric, errors='ignore')
    # df['dateindex']=pd.to_datetime(df['date'])
    df['date']=pd.to_datetime(df['date'])
    df=df.set_index(pd.DatetimeIndex(df['date']))

    # xnew = np.linspace(df['total'].min(), df['total'].max(), 300)  # 300 represents number of points to make between T.min and T.max

    # power_smooth = spline(df['date'], df['total'], xnew)

    # plt.plot(xnew, power_smooth)
    # plt.show()

    df = df.resample('M').mean()



    # # Actually Drawing

    tsres = df.resample('D')
    tsint = tsres.interpolate(method='cubic')

    tsint.plot()
    tsint.plot(y='total', use_index=True)
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

    df['total']=0
    for eachitem in df.columns:


        if not 'date' in eachitem:
            df[eachitem] =\
                (df[eachitem] - df[eachitem].mean()) / (df[eachitem].max() - df[eachitem].min())
            df['total']=df[eachitem]+df['total']
            
    return df

def main():
    df=readfiles()
    drawdf(df)

if __name__ == "__main__":
    main()