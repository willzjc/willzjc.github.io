import numpy
import numpy as np
import pandas
import pandas as pd
import os
fname='output_matrix/all_ccy_combined/combined.csv'
f = open(fname)
lines = f.read().split()
f.close()
am = numpy.loadtxt(fname, dtype=np.dtype('U25'), comments='#',
              delimiter=',', converters=None, skiprows=0, usecols=None, unpack=False, ndmin=0)

unique_ccy = numpy.unique([x[0:3] for x in am[0,1:]])
ccy1 = [x[0:3] for x in am[0,1:]]
ccy2 = [x[3:6] for x in am[0,1:]]

print len(unique_ccy)
r_ccypairs = [x[0:3] for x in am[0,1:]]
df=pandas.DataFrame(am)

pf=pandas.read_csv(fname)

COLUMN_FILTER = 'USDMXN'
ROW_FILTER = 2017


# print pf[pf['date'].str.contains(str(ROW_FILTER))][COLUMN_FILTER]       # Get row and column

# print pf[pf['date'].str.contains(str(ROW_FILTER))]

with pd.option_context('display.max_rows', None, 'display.max_columns', 4):
    print(pf[pf['date'].str.contains(str(ROW_FILTER))])

# print pf.query('column_name == USDMXN | column_name2 == PLNCAD')
