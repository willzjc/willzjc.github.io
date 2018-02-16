import pandas as pd
import pandas as pd
import sqlite3
# pd.read_sql('auxiliary/my_db.sqlite')
conn = sqlite3.connect("auxiliary/my_db.sqlite")
# df = pd.read_sql_query("select * from cars where model like 'Camry' and age > 2 and price < 15000 and age < 18;", conn)
df = pd.read_sql_query("select * from cars where model like '3%0z'", conn)
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
extpath='../../../willzjc.github.io/scatterplot_table/'

for i,t in enumerate(lines): print i,t
out='\n'.join(lines)

with open (extpath+'data.csv','w') as f:
    f.write(out)
    f.close()