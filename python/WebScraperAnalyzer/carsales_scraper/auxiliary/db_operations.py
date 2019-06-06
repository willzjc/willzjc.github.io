# import MySQLdb

class db_interface ():

    connection=None

    def __init__(self):
        self.create_connection()

    def is_number(self,s):
        try:
            float(s)
            return True
        except ValueError:
            return False

    def quote(self,s):
        if self.is_number(s):
            return str(s)
        else:
            return str("'" + s + "'")

    def create_connection(self):
        try:
            if self.connection==None:
                self.connection = MySQLdb.connect(host="localhost",  # your host, usually localhost
                                             user="root",  # your username
                                             port=3306,
                                             passwd="password",  # your password
                                             db="carsales")  # name of the data base
        except Exception as dbe:
            print 'Unable to get DB connection'

    def run_query(self,sql):
        cursor = self.connection.cursor()
        cursor.execute(sql)
        self.connection.commit()

    def save_update_df(self,df):
        
        print 'Saving to database'

        for index, row in df.iterrows():
            # print row
            db_interface.db_save_df(row)

    def db_save_df(self, df_array):
        # try:
        import pandas

        container={}
        metrics = ['id','title','link','make','model','series','transmission','age','age_rating','milage','milage_rating','price','price_rating']

        for metric in metrics:
            container[metric]=(df_array[metric])

        self.db_save(container['id'],container['title'],container['link'],container['make'],container['model'],container['series'],
                     container['transmission'],container['age'],container['age_rating'],container['milage'],container['milage_rating'],
                     container['price'],container['price_rating'])

        return 0
        # except Exception as e:
        #     print 'db_save_df() exception:',e

    def db_save(self, id, title, link, make, model,series, transmission, age, age_rating, milage, milage_rating, price, price_rating):

        cursor = self.connection.cursor()

        sql = "insert into cars (id, title, link, make, model,series, transmission, age, age_rating, milage, milage_rating, price, price_rating)" \
              + " values (" + ','.join(self.quote(s) for s in
                                       [id, title, link, make, model,series, transmission, age, age_rating, milage, milage_rating, price, price_rating]) + ")"

        sql_reinsert = sql + " ON DUPLICATE KEY UPDATE " \
                             " id=id, title=title, link=link, " \
                             " make='%s',series='%s', transmission='%s', age=%s, age_rating=%s, milage=%s, milage_rating=%s, price=%s, price_rating=%s, date_updated=now();" \
                            % (make,     series,      transmission,      age,    age_rating,    milage,    milage_rating,    price,    price_rating)

        try:
            cursor.execute(sql)
        except Exception as sql_e:
            entry_already_in_db = True
            cursor.execute(sql_reinsert)
            print 'Car : ' + title + ' (' + id + ') already exists in database!'
            return 1

        # Remove Duplicates
        cursor.execute('DELETE FROM cars WHERE rowid NOT IN (SELECT min(rowid) FROM cars GROUP BY id)')

        self.connection.commit()


        return 0