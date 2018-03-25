
mapping={
    '0' : 6 ,
    '1' : 2 ,
    '2' : 5 ,
    '3' : 5 ,
    '4' : 4 ,
    '5' : 5 ,
    '6' : 6 ,
    '7' : 4 ,
    '8' : 7 ,
    '9' : 6 }
# print mapping['1']

def getdashes(input):
    str_input=str(input)
    total=0
    for c in str_input:
        total+=mapping[c]
    return total

# print getdashes(12134)


import itertools
def printSetSum(max):
    superset=set([])
    rangeset=range(1,max+1)
    maxlength=len(rangeset)
    total=0
    for i in range(1,maxlength+1):
        for a in itertools.combinations(rangeset.__iter__(), i):
            print a
            for b in a: total+=b
    print total

# printSetSum(3)

import datetime
def getPrevDay(d):
    currentdate=None
    datestr=str(d)
    values=datestr.split(' ')
    datestr=' '.join([t.rjust(2,'0') for t in values])
    print datestr

    datestr=' '.join(values)
    try:
        currentdate=datetime.datetime.strptime(datestr,'%m %d %Y')
    except Exception as e:
        print e

    currentdate = currentdate - datetime.timedelta(hours=24)

    return currentdate.strftime('%m %d %Y')

print getPrevDay('1 1 1988')