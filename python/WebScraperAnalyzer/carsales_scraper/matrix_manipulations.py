# Updated 20180121 9:26 PM
import datetime
import json
import pandas as pd
import sqlite3
import sqlite3
import shutil
from pandas.io import sql
from auxiliary.file_ops import *
from create_webfiles_table import *
import errno
import os


def calculate_analytics(df,weightings=None):

    if weightings is None:
        # defaults
        weightings = {
            'age': 1,
            'milage': 2,
            'price': 3
        }

    # Recalculate Ratings based on STD
    for metric in ['age','milage','price']:
        df[metric + '_std'] = df[metric].std()
        df[metric + '_mean'] = df[metric].mean()
        df[metric + '_rating'] = (df[metric + '_mean'] - df[metric]) / df[metric + '_std']



    # Do the mass arithmetic operation to each row with one SINGLE command... wow!
    df['sum_rating'] = weightings['age']    * df['age_rating']  \
                     + weightings['milage'] * df['milage_rating'] \
                     + weightings['price']  * df['price_rating']

    # Sort by sum of all ratings
    df=df.sort_values(by=['sum_rating'],ascending=False)

    cleanup = True
    if cleanup:
        # Removal of columns
        for metric in ['age','milage','price']:
            df=df.drop([metric + '_std'],  axis=1)
            df=df.drop([metric + '_mean'], axis=1)



    # Force inserts a column called 'row_count' into dtaframe
    if 'row_count' in df:
        df=df.drop(columns=['row_count'])
    df.insert(0, 'row_count', range(1, len(df)+1))

    prediction_model=None
    try:
        import statsmodels.api as sm        # Required for regression prediction

        # print df
        df_X=df[['milage','age']]           # Choose variables
        df_X=sm.add_constant(df_X)          # Add constant
        df_y=df.price                       # Choose target

        prediction_model=sm.OLS(df_y.astype(float),df_X.astype(float)).fit()
        df['market_price'] = ((df['milage'] * prediction_model.params['milage']) + (df['age'] * prediction_model.params['age']) + prediction_model.params['const']).astype(int)

        df['price_difference'] =  (df['market_price']-df['price']).astype(int)

        print prediction_model.summary()

    except Exception as e:
        print len(df)
        df['market_price'] = df['price']
        df['price_difference'] = 0
        print e
    return df,prediction_model



def recalculate_ratings(db_save=False,create_webfiles_table=True
    ,model=None):

    conn_clean = sqlite3.connect("auxiliary/my_db.sqlite")
    cursor = conn_clean.execute('DELETE FROM cars WHERE rowid NOT IN (SELECT min(rowid) FROM cars GROUP BY id)')
    conn_clean.commit()

    conn = sqlite3.connect("auxiliary/my_db.sqlite")

    res = conn.execute('select distinct model from cars')

    for r in res:
        model = r[0]
        df = pd.read_sql('select * from cars where model =\'%s\'' % (model),conn)

        # cursor = conn.execute('select * from cars order by sum_rating DESC')
        #
        # df = pd.read_sql(query, con=db_interface.connection)
        # Rearrangement of 2 last columns (shuffs datestamps to the front)
        columns = df.columns.tolist()
        columns = columns[0:2] + columns[-2:] + columns[2:-2]
        columns.remove('link')
        columns.insert(1, 'link')

        # See coefficients below
        weightings = {
            'age': 1,
            'milage': 2,
            'price':3
        }

        df = df[columns]    # Rearrange columns
        df = calculate_analytics(df,weightings)

        # Saves to db
        if db_save:
            dostuff=True


        # Creates files for tables
        if create_webfiles_table:
            create_web_files(df, weightings)

if __name__ == "__main__":
    recalculate_ratings(db_save=True,create_webfiles_table=False)