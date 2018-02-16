import pandas as pd
import pandas as pd
import sqlite3
# pd.read_sql('auxiliary/my_db.sqlite')
conn = sqlite3.connect("auxiliary/my_db.sqlite")
conn.execute("delete from cars where model like 'Camry';")
conn.commit()