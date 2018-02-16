import plotly
import plotly.plotly as py
import plotly.figure_factory as ff
import pandas as pd

import datetime
import MySQLdb
import mpld3 as mpld3
import pandas
import plotly

def main():

    query= "select * from cars where date_created > '%s' and make like 'toyota'" % datetime.datetime(2018,1,1).isoformat()

    connection = MySQLdb.connect(host="localhost",  # your host, usually localhost
                                 user="root",  # your username
                                 port=3306,
                                 passwd="password",  # your password
                                 db="carsales")  # name of the data base

    df = pandas.read_sql(query, con=connection)
    # Rearrangement of 2 last columns (shuffs datestamps to the front)
    columns = df.columns.tolist()
    columns = columns[0:2] + columns[-2:] + columns[2:-2]
    columns.remove('link')
    columns.insert(1, 'link')
    df = df[columns]

    # Recalculate Ratings based on STD
    for metric in ['age','milage','price']:
        df[metric + '_std'] = df[metric].std()
        df[metric + '_mean'] = df[metric].mean()
        df[metric + '_rating'] = (df[metric + '_mean'] - df['age']) / df[metric + '_std']

    # Do the same arithmetic operation to each and single row!!!
    df['sum_rating'] = df['age_rating'] + df['milage_rating'] + df['price_rating']

    # Sort by sum of all ratings
    df=df.sort_values(by=['sum_rating'],ascending=False)

    cleanup = True
    if cleanup:
        # Removal of columns
        for metric in ['age','milage','price']:
            df=df.drop([metric + '_std'],  axis=1)
            df=df.drop([metric + '_mean'], axis=1)


    plotly.tools.set_credentials_file(username='willzjc', api_key='DpkRIry2P3D3akyb8hLC')
    table = ff.create_table(df)
    py.iplot(table, filename='pandas_table')

if __name__ == "__main__":
    main()


