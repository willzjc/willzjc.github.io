import os

f=open('currencies','r')
ccylist=f.read().split('\n')
f.close()
ccypairs=[]
for c1 in sorted(ccylist):
    for c2 in ccylist:
        if not c1==c2:
            ccypairs.append(str(c1)+str(c2))


ccypairs.insert(0,'keywords')
print '\n'.join(ccypairs)

f = open('ccy_pairs.csv','w')
f.write('\n'.join(ccypairs))
f.close()
