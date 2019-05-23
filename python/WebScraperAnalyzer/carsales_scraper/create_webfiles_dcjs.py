import shutil
import datetime
import pandas as pd
import sqlite3
import os
import csv
from auxiliary.file_ops import *


def cleandb_create_all(dcjs_csv_outpath):
    conn_clean = sqlite3.connect("auxiliary/my_db.sqlite")
    cursor = conn_clean.execute('DELETE FROM cars WHERE rowid NOT IN (SELECT min(rowid) FROM cars GROUP BY id)')
    conn_clean.commit()

    conn = sqlite3.connect("auxiliary/my_db.sqlite")
    cursor = conn.execute('select * from cars order by sum_rating DESC')

    with open(dcjs_csv_outpath, 'wb') as f:
        writer = csv.writer(f)
        writer.writerow([description[0] for description in cursor.description])

        writer.writerows(cursor)

def copy_to_dcjs_path(dcjs_csv_outpath):
    dcjs_web_dir_csv_outpath='../../../../willzjc.github.io/web/reference/dcjs_value/web/'
    print '%s = %s'%(dcjs_web_dir_csv_outpath,os.path.realpath(dcjs_web_dir_csv_outpath))
    dcjs_web_dir_csv_outpath=dcjs_web_dir_csv_outpath+'/data.csv'
    shutil.copy(dcjs_csv_outpath,dcjs_web_dir_csv_outpath)

def run_create_all():
    dcjs_csv_outpath = 'output/dcjs_data.csv'
    cleandb_create_all(dcjs_csv_outpath)
    copy_to_dcjs_path(dcjs_csv_outpath)

if __name__ =='__main__': 
    run_create_all()
