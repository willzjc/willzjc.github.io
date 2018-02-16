from pytrends.request import TrendReq
import time
import os
from random import randint
import pandas as pd

# Add your Gmail username to the google_username variable and your Gmail password to the google_password variable.
google_username = "willzjc5"
google_password = "Doremi123"
connector = TrendReq(google_username, google_password)

# This script downloads a series of CSV files from Google Trends. Please specify a filepath for where you'd like these files to be stored in the below variable.
path = ""

# Specify the filename of a CSV with a list of keywords in the variable, keyordcsv. The CSV should be one column, with header equal to Keywords (case sensitive).
keywordcsv = "g10_ccy.csv"
keywords = pd.read_csv(keywordcsv)

# Downloads and Calculate Slope:
keywordlist = pd.DataFrame(columns=["keyword","slope"])
for index, row in keywords.iterrows():
    print("Downloading Keyword #" + str(index),[row[0]])
    payload = {'geo': 'US', 'q': [row[0]]}
    kw_list = ['bitcoin', 'Ethereum', 'IOTA', 'Ripple', 'DASH']

    # kw_list=[row[0]]
    # connector.
    pd.build_payload(kw_list, cat=0, timeframe='today 1-m', geo='', gprop='')
    csvname = (path + '/regular_data/' + str(index) + '_' + sanitize_name(row[0]) + '.csv')

    result = pd.interest_over_time()
    time.sleep(randint(5, 10))
    pd.save_csv(path, str(index))
    csvname = str(index)+".csv"
    trenddata = pd.read_csv(csvname, skiprows=4, names=['date', 'values'])
    keyword = trenddata['values'].loc[[0]][0]
    trenddata = trenddata.ix[1:]
    trenddata['keyword'] = keyword
    trenddata.rename(columns={'values': 'trends'}, inplace=True)
    trenddata['trends'] = pd.to_numeric(trenddata['trends'], errors='coerce')
    trenddata['date'] = trenddata['date'].str.extract('(^[0-9]{4}\-[0-9]{2}\-[0-9]{2}) \-.*')
    trenddata = trenddata.dropna()
    trenddata['date'] = pd.to_datetime(trenddata['date'])
    trenddata['year'] = pd.DatetimeIndex(trenddata['date']).year
    trenddata['month'] = pd.DatetimeIndex(trenddata['date']).month
    trenddata['day'] = pd.DatetimeIndex(trenddata['date']).day

    maxyear = trenddata['year'].max()
    grouped = trenddata.groupby(['year']).mean()

    def slope_formula(xone, yone, xtwo, ytwo):
        return (ytwo-yone)/(xtwo-xone)

    maxyear = trenddata['year'].max()
    grouped = trenddata.groupby(['year']).mean()
    slope = slope_formula(1,float(grouped.loc[grouped.index==maxyear-2]['trends']),
                          2,float(grouped.loc[grouped.index==maxyear-1]['trends']))
    keywordlist = keywordlist.append({'keyword':keyword,'slope':slope}, ignore_index=True)
    os.remove(csvname)

# Specify a csv filename to output the slope values.
keywordlist.to_csv("trends_slope.csv", sep=",", encoding="utf-8", index=False)

print("Slope calculation and CSV export complete.")