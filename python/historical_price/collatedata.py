import os
import pandas as pd
import numpy as np

import plotly
import plotly.plotly as py
import plotly.graph_objs as go
import plotly.figure_factory as FF


import matplotlib.pyplot as plt



def drawdf(df):

    df=df.replace('\sUSD','',regex=True).apply(pd.to_numeric, errors='ignore')
    df[u'Date']=pd.to_datetime(df[u'Date'])
    df=df.set_index(pd.DatetimeIndex(df[u'Date']))

    df = df.resample('M').mean()
    print df
    print df.columns
    print df[u'Average Selling Price']
    # df=df.groupby(pd.TimeGrouper('5Min')).sum()



    # print df
    # sample_data_table = FF.create_table(df.head())
    # py.iplot(sample_data_table, filename='sample-data-table')
    #
    # trace1 = go.Scatter(
    #                     x=df.index.values, y=df[u'Total Sales'], # Data
    #                     mode='lines', name='Total Sales' # Additional options
    #                    )
    # trace2 = go.Scatter(x=df.index.values, y=df[u'Average Selling Price'], mode='lines', name='avg' )
    # trace3 = go.Scatter(x=df.index.values, y=df[u'Items Sold'], mode='lines', name='sold')
    #
    # layout = go.Layout(title='Plot from csv data',
    #                    plot_bgcolor='rgb(230, 230,230)')
    #
    # fig = go.Figure(data=[trace2], layout=layout)
    #
    # # Plot data in the notebook
    # py.iplot(fig, filename='simple-plot-from-csv')
    # import matplotlib.pyplot as plt

    # plt.figure();
    df.plot(y='Average Selling Price',use_index=True)
    plt.show()

def readfiles():
    basepath=os.getcwd() + '\\' + ref + '\\'
    for f1,f2,f3 in os.walk():
        print f3

def main():
    # df = pd.read_csv('data_dogfood.csv')
    # df = pd.read_csv('data_milkpowder.csv')
    # drawdf(df)
    readfiles()

if __name__ == "__main__":
    main()