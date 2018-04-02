import json
import datetime
import pandas as pd
import sqlite3
import os
from auxiliary.file_ops import *

def run_create_all():
    conn = sqlite3.connect("auxiliary/my_db.sqlite")
    res=conn.execute('select distinct model from cars')

    for r in res:
        model=r[0]
        pd.read_sql('select * from cars where model =\'%s\''%(model))
        create_web_files()

    # df = pd.read_sql_query("select * from cars where model like 'Camry' and age > 2 and price < 15000 and age < 18;", conn)
    # run_create_scatterplot_from_model(conn)


def create_web_files(df, weightings=None,
                     extpath='C:/local/apps/wamp64/www/github/willzjc.github.io/valuerating/', prediction_model=None,
                     USE_LOCAL_COPY=False
                     ):
    if (USE_LOCAL_COPY):
        df = pd.read_pickle('auxiliary/data/last_run.pk')
    if weightings is None:
        # defaults
        weightings = {
            'age': 1,
            'milage': 2,
            'price': 3
        }

    summarylist = {}
    for metric in ['age', 'milage', 'price', 'sum_rating', 'price_difference']:
        summarylist[metric + '_max'] = float(df[metric].max())
        summarylist[metric + '_min'] = float(df[metric].min())
    currentyear = int(datetime.datetime.now().strftime('%Y'))
    data_average_price = {}
    data_average_milage = {}

    df_price_by_year_count = df.groupby('age', as_index=False)['price'].count()

    dfs = pd.DataFrame(df.groupby(['age'], as_index=False).agg(
        {'price': ['mean', 'std', 'count'], 'milage': ['mean', 'std'], 'sum_rating': 'first'}))
    dfs['year'] = int(datetime.datetime.now().strftime('%Y')) - dfs['age'].astype(int)
    # dfs['avg_price_label'] = '{label: "'+ (dfs['year'] + '(' + dfs['price']['count'] + ')' )  +'", value: ' + dfs['price']['mean'] + ' }'
    # dfs['avg_price_label'] = '{label: "'+ (dfs['year']  )  +'", value: ' + dfs['price']['mean'] + ' }'

    for metric in ['price', 'milage']:
        for index, r in enumerate(df.groupby('age', as_index=False)[metric].mean().iterrows()):

            model_age = r[1]['age']
            model_year = str(int(currentyear - model_age))
            val = int(r[1][metric])
            summarylist[model_year + '_' + metric + '_mean'] = val
            count = (int(df_price_by_year_count.loc[df_price_by_year_count['age'] == model_age]['price']))
            count_label = str(int(df_price_by_year_count.loc[df_price_by_year_count['age'] == model_age]['price']))
            # count_label=df_price_by_year_count.loc(df_price_by_year_count[model_age]['price']
            year_label = model_year + ' (' + count_label + ')'
            dfstd = df.loc[df['age'] == (model_age)].std()

            if 'price' in metric:
                data_average_price[model_year] = '{label: "' + year_label + '", value: ' + str(val) + ' }'
            else:
                data_average_milage[model_year] = '{label: "' + year_label + '", value: ' + str(val) + ' }'

    with open(extpath + '' + 'index_template.html', 'r') as fr:
        bf = fr.read()
        # for k in data_average_price.keys():
        #     dataset = data_average_price[k]
        replacetxt = """
        average_prices = [
			""" + ',\n\t\t\t'.join(
            [data_average_price[key] for key in sorted(data_average_price.iterkeys(), reverse=True)]) + """ 

            ];
        """
        # print replacetxt
        bf = bf.replace('//replaceprice', replacetxt)

        replacetxt = """
        average_milages = [ 
		""" + ',\n\t\t\t'.join(
            [data_average_milage[key] for key in sorted(data_average_milage.iterkeys(), reverse=True)]) + """ 
            ];
        """
        # print replacetxt
        bf = bf.replace('//replacemilage', replacetxt)

        with open(extpath + 'index.html', 'w') as fw:
            fw.write(bf)
            fw.close()

        fr.close()

    for metric in weightings.keys():
        summarylist[metric + '_weight'] = weightings[metric]

    # File Saving
    # Saves as CSV firstly
    repo = df['model'][0]
    datestr = datetime.datetime.now().strftime('%Y-%m-%dH%H_%M_%S')

    df.to_pickle('auxiliary/data/models/' + repo + '.pk')
    df.to_pickle('auxiliary/data/history/' + datestr + '.pk')
    df.to_pickle('auxiliary/data/' + 'last_run' + '.pk')

    df.to_csv('output/records.csv')

    with sqlite3.connect('auxiliary/my_db.sqlite') as cnx:
        df.to_sql('cars', cnx, if_exists='append')

    for path in ['output/records.json', extpath + 'auxiliary/data/records.json']:
        with open(path, 'w') as f:
            j = json.loads(df.to_json(orient='records'))
            f.write(json.dumps(j, indent=4, separators=(',', ': ')))
            f.close()

    for path in ['output/summary.json', extpath + 'auxiliary/data/summary.json']:
        with  open(path, 'w') as f:
            f.write(json.dumps(summarylist, indent=4, separators=(',', ': ')))
            f.close()

        with  open(path, 'w') as f:
            f.write(json.dumps(summarylist, indent=4, separators=(',', ': ')))
            f.close()

    #################################################
    # This step saves to the Webpage

    with  open('output/titles.csv', 'w') as f:
        f.write(','.join(df.columns.tolist()))
        f.close()

    for path in ['output/summary.json', extpath + 'auxiliary/data/summary.json']:
        with  open(path, 'w') as f:
            f.write(json.dumps(summarylist, indent=4, separators=(',', ': ')))
            f.close()

        with  open(path, 'w') as f:
            f.write(json.dumps(summarylist, indent=4, separators=(',', ': ')))
            f.close()

    copy_sub_category_dir(extpath=extpath, df=df)

    copy_sub_file(df=df,extpath=extpath)

if __name__ =='__main__':
    # run_create_scatterplot_from_model(model=model)
    run_create_all()
