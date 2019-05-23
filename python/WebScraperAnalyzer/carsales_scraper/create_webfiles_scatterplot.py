import pandas as pd
import sqlite3
from auxiliary.file_ops import *

def run_create_all():
    conn = sqlite3.connect("auxiliary/my_db.sqlite")
    res=conn.execute('select distinct model from cars')
    for r in res:
        run_create_scatterplot_from_model(r[0])

    # df = pd.read_sql_query("select * from cars where model like 'Camry' and age > 2 and price < 15000 and age < 18;", conn)
    # run_create_scatterplot_from_model(conn)

def run_create_scatterplot_from_model(model):
    # pd.read_sql('auxiliary/my_db.sqlite')
    conn = sqlite3.connect("auxiliary/my_db.sqlite")

    # df = pd.read_sql_query("select * from cars where model like 'Camry' and age > 2 and price < 15000 and age < 18;", conn)

    df = pd.read_sql_query("select * from cars where model like '%s'"%(model), conn)
    # print df
    lines=[]
    lines.append('model,description,metric,metric_code,value,rating,link')
    for r in df.iterrows():
        rowvals=r[1]

        for metric in ['price','milage','age']:
            lines.append( ','.join([
                # rowvals['title']
                # ,rowvals['make'] +' ' +rowvals['series']
                rowvals['id']
                # ,rowvals['model']
                ,rowvals['model'] + ' - ' + rowvals['title']
                ,metric
                ,metric
                ,str(int(rowvals[metric]))
                , str(("%.2f" % rowvals['sum_rating']))
                ,rowvals['link']
            ])
            )
    extpath='../../../../willzjc.github.io/web/scatterplot_table/'
    print '%s = %s'%(extpath,os.path.realpath(extpath))
    extpath=os.path.realpath(extpath).replace('\\','/')+'/'
    for i,t in enumerate(lines): print i,t
    out='\n'.join(lines)

    with open (extpath+'data.csv','w') as f:
        f.write(out)
        f.close()

    copy_sub_file(df=df,extpath=extpath)

if __name__ =='__main__':
    model='rs7'
    # run_create_scatterplot_from_model(model=model)
    run_create_all()
