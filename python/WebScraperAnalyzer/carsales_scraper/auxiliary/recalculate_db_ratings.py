import statistics
import MySQLdb
import datetime
import MySQLdb


class data_rows():

    def __init__(self):
        self.ratings = []
        self.fields = []
        self.matrices = {}
        self.indices = []
        self.averages = {}
        self.stdevs = {}
        self.coefficients = {}

        list = []
        mean = None
        stdev = None
        label = None
        entry = {}
        rows = {}
        sets = []
        coefficient = 1
        ids = []
        links = []
        titles = []
        matrices = {}
        fields = []

        self.coefficients['age'] = 1.5
        self.coefficients['milage'] = 2
        self.coefficients['price'] = 3
        connection = None
        cursor=None

    def create_connection(self):

        self.connection = MySQLdb.connect(host="localhost",  # your host, usually localhost
                                     user="root",  # your username
                                     port=3306,
                                     passwd="password",  # your password
                                     db="carsales")  # name of the data base

    def is_number(self,s):
        try:

            if isinstance(s,datetime.datetime) or s == None:
                return False

            float(s)
            return True
        except ValueError:
            return False

    def quote(self,s):
        if self.is_number(s):
            return str(s)
        else:
            return str("'" + str(s) + "'")

    def print_data(self):
        for row in self.matrices:
            print ', '.join(str(rec) for rec in self.matrices[row])

    def add_field(self, field):
        if field not in self.fields:
            self.fields.append(field)

    def insert_tuple(self,id,set):

        exist=False

        if id in self.indices:
            exist=True
        self.matrices[id] = set

        return exist



    def insert_rating(self,rating):
        self.ratings.append(rating)

    def insert(self,row,key,value):
        if row in self.rows.keys():
            current_row= self.rows[key]
            current_row[key]=value
            self.rows[row]=current_row
        else:
            self.rows[row] = {key:value}

    def stdev_calc(self,key):
        if key in self.fields:
            valset=[]
            for i in self.matrices:
                # print i
                valset.append(self.matrices[i][self.fields.index(key)])

            stdev = statistics.stdev(valset)
            self.stdevs[key]=stdev
            return stdev
        else: return -1


    def avg_calc(self, key):
        if key in self.fields:
            valset = []
            for i in self.matrices:
                # print i
                valset.append(self.matrices[i][self.fields.index(key)])

            mean = statistics.mean(valset)
            self.averages[key] = mean
            return mean
        else:
            return -1

    def average_calc(self, key):
        return self.avg_calc(key)

    def mean_calc(self, key):
        return self.avg_calc(key)

    def recalc_metrics(self,metric):
        self.stdev_calc(metric)
        self.avg_calc(metric)

    def calc_rating(self, metric, record):
        return self.coefficients[metric]*(self.avg_calc(metric) - record[self.fields.index(metric)]) / self.stdevs[metric]

    def refresh_update_db(self):

        sqls=[]

        fields = self.fields[:]

        for metric in ['age','price','milage']:
            self.recalc_metrics(metric)

        for id in self.matrices.keys():

            sql = 'insert into cars ('
            record=self.matrices[id]

            sql = sql + ','.join(fields) + ') values ( ' + ','.join(self.quote(s) for s in record) + ' ) ' \
            + " ON DUPLICATE KEY UPDATE  id=id, title=title, link=link, make=make, age=%s, age_rating=%s, milage=%s, milage_rating=%s, price=%s, price_rating= %s, date_updated=now();"  \
                % (str(self.quote(record[fields.index('age')])),
                   str(str(self.calc_rating('age',record)),),
                   str(self.quote(record[fields.index('milage')])),
                   # str(self.quote(record[fields.index('milage_rating')])),
                   str(self.calc_rating('milage',record)),
                   str(self.quote(record[fields.index('price')])),
                   str(self.calc_rating('price', record)))

            sqls.append(sql)

        return sqls

    def execute(self,sql):
        if self.connection==None: self.create_connection()

        self.cursor=self.connection.cursor()

        self.cursor.execute(sql)
        self.connection.commit()


if __name__ == "__main__":

    records = data_rows()
    records.create_connection()
    # cursor = records.connection.cursor()

    # Select record
    sql = "select * from cars where make like %s" % ("'toyota'")
    sql = "select * from cars where make like 'Mazda' and title like '%sp25%' and transmission like '%Auto%'"
    records.execute(sql)

    # numfields = len(cursor.description)
    field_names = [i[0] for i in records.cursor.description]
    # print field_names
    records.fields = field_names

    records.coefficients['age']     = 1
    records.coefficients['milage']  = 2
    records.coefficients['price']   = 3.5

    for record in records.cursor:
        id = record[field_names.index('id')]
        records.insert_tuple(id, record)

    # records.print_data()
    print records.stdev_calc('age')
    records.execute(sql)

    for line in records.refresh_update_db():
        print line
        records.execute(line)
        # records.connection.commit()

