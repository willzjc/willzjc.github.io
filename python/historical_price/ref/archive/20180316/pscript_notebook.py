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

df=pd.read_csv('ref/allcpi')

df['date']=pd.to_datetime(df['date'])
print df

