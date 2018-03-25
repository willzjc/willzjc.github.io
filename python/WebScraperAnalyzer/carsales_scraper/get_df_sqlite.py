import pandas as pd
import pandas as pd
import sqlite3
import os
# pd.read_sql('auxiliary/my_db.sqlite')
conn = sqlite3.connect("auxiliary/my_db.sqlite")
# df = pd.read_sql_query("select * from cars where model like 'Camry' and age > 2 and price < 15000 and age < 18;", conn)
df = pd.read_sql_query("select * from cars where model like '911%'", conn)
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
# extpath=extpath.replace('\\','/')
# base='willzjc.github.io'
# real_path=os.path.realpath(extpath)
# final_path = None
# # Reconstruct path
# if base in real_path:
#     segmented_paths=real_path.split(base)
#     final_path = real_path[0] + '/' + base + '/web/scatterplot_table/'
#
# extpath=final_path
# extpath=extpath.replace('\\','/')

print '%s = %s'%(extpath,os.path.realpath(extpath))
extpath=os.path.realpath(extpath).replace('\\','/')+'/'
for i,t in enumerate(lines): print i,t
out='\n'.join(lines)

with open (extpath+'data.csv','w') as f:
    f.write(out)
    f.close()