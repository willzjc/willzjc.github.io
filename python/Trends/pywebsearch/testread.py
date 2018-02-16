import numpy as np

a = np.load('numpy.result.npy')
index=0
c=[]
b=[]
for l in a:

    if index >= 6:
        c.append(list(b))
        index=0
        # print c
        b=[]
    data=(l.replace('"',''))
    if (len(data) > 75  and index==4):
        data=(data[:75] + '..')
    else:
        data

    b.append(data )
    index+=1

print 'Currency,Date,Year,Rating,Newsinfo,Weblink'
for l in c:
    print str('"' + '\",\"'.join(l) + '"')
