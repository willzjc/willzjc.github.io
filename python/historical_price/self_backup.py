import os,time,shutil,datetime,hashlib


def logprint(s,logfile=True):
    event=str(s)
    printstr = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')+': '+event
    print(printstr)
    if logfile:
        with open ('notebooks/archive/events.log','a') as f:
            f.write(printstr+'\n')
            f.close()

killswitch=False
duration=2

inputFile='cpi_model.ipynb'
prev_hash=None
while not killswitch:

    stamp=datetime.datetime.now().strftime('%Y-%m-%d.%H%M%S')
    status=('Polling: '+inputFile)
    openedFile = open(inputFile)
    readFile = openedFile.read()

    md5Hash = hashlib.md5(readFile)
    md5Hashed = md5Hash.hexdigest()

    sha1Hash = hashlib.sha1(readFile)
    sha1Hashed = sha1Hash.hexdigest()
    src = (os.getcwd()+'\\'+inputFile).replace('\\','/')
    dst = (os.getcwd() + '\\notebooks\\archive\\' + inputFile.split('.')[0]+'.'+stamp+'.'+inputFile.split('.')[1]).replace('\\', '/')
    # print src,dst
    if not prev_hash==None:
        if prev_hash == sha1Hashed:
            status='NO CHANGE'
            # logprint(status)
        else:
            status = 'Copying - Old Hash=[%s] \t New Hash=[%s]'%(prev_hash,sha1Hash) + src+'\tto\t'+dst
            logprint(status)
            shutil.copyfile(src,dst)
    prev_hash = sha1Hashed

    time.sleep(duration)