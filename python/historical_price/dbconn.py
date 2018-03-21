import sqlite3,datetime,time

db = sqlite3.connect('ref/cpi.db')
cursor=db.cursor()

unix_time = int(time.time())
datestr = str(datetime.datetime.fromtimestamp(unix_time).strftime('%Y-%m-%d %H:%M:%S'))

r = cursor.execute(("select * from cpi_categories where date > '2017-05-01'"))
names = [description[0] for description in cursor.description]
print names
for l in r:
    print l