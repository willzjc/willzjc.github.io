import shutil
import datetime
import pandas as pd
import sqlite3
import os
import csv
from auxiliary.file_ops import *

dcjs_csv_outpath='auxiliary/dcjs_data.csv'

def run_create_all(dcjs_csv_outpath):
    conn = sqlite3.connect("auxiliary/my_db.sqlite")
    cursor = conn.execute('select * from cars')

    with open(dcjs_csv_outpath, 'wb') as f:
        writer = csv.writer(f)
        writer.writerow([description[0] for description in cursor.description])

        writer.writerows(cursor)

def run_copy_to_dcjs_path(dcjs_csv_outpath):
    dcjs_web_dir_csv_outpath='../../../../willzjc.github.io/web/reference/dcjs_value/web/'
    print '%s = %s'%(dcjs_web_dir_csv_outpath,os.path.realpath(dcjs_web_dir_csv_outpath))
    dcjs_web_dir_csv_outpath=dcjs_web_dir_csv_outpath+'/data.csv'
    shutil.copy(dcjs_csv_outpath,dcjs_web_dir_csv_outpath)

if __name__ =='__main__':

    run_create_all(dcjs_csv_outpath)
    run_copy_to_dcjs_path(dcjs_csv_outpath)