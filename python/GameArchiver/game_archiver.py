import zipfile
import os
import hashlib
import datetime
import shutil
import time
import zlib

basepath="C:/Users/Will-AMD/Saved Games/Tyranny"


def md5(fname):
    hash_md5 = hashlib.md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()

checksums={}
current_checksums={}
datechecksums={}

def zip(src, dst):

    zf = zipfile.ZipFile("%s.zip" % (dst), "w", zipfile.ZIP_DEFLATED)
    zf.write(src, src.split('/')[-1])

    if os.path.isfile(dst) and 'zip' not in dst:
        os.remove(dst)


    zf.close()

def backup(source,target=None):

    targetfile=source.split('/')[-1]
    savepath=basepath+'/'+'archives'

    if not (os.path.isdir(savepath)):
        os.mkdir(savepath)

    datetimestr=datetime.datetime.now().strftime("%Y-%m-%d.%H.%M.%S ")
    if target == None:
            target = savepath +'/'+ datetimestr + targetfile

    logLine = datetimestr + " - Archiving",source,target
    print logLine

    with open('saves.log','a') as f:
        f.writelines(logLine)

    zip(source,target)

# def read_check_sums(checksumfile):
#     if os._exists(checksumfile):
#         with open('checksumfile','r') as cf:
#             for line in cf:
#                 print line
def loadchecksums():

    if os.path.isfile('checksum_records'):
        f = open('checksum_records')
        for line in f.readlines():
            if len(line.strip())>2:
                values = line.split(',')
                checksum=values[1]
                date=values[0]
                savepath=values[2]
                checksums[checksum]=savepath
                datechecksums[checksum]=date

def recordchecksums():
    loadchecksums()
    f = open('checksum_records','w')
    line=''
    for checksum in checksums.keys():
        line = line +  (','.join([datechecksums[checksum],checksum,checksums[checksum]])).replace('\n','') + '\n'
        # print "writing:",line
    print line
    f.write(line)
    f.close()

def scanpath(firstrun=False):
    files = (file for file in os.listdir(basepath) if os.path.isfile(os.path.join(basepath, file)))
    for f in files:
        currentfile = basepath + '/' + f
        currentchecksum = md5(currentfile)
        current_checksums[currentchecksum] = currentfile
        if currentchecksum not in checksums.keys():
            if not firstrun :
                if ('DotNetZip' not in currentfile and 'tmp' not in currentfile):
                    print "Backing up:", currentfile
                    backup(currentfile)
                    checksums[currentchecksum] = currentfile
                    datechecksums[currentchecksum]=datetime.datetime.now().strftime("%Y-%m-%d.%H.%M.%S")
                    recordchecksums()

loadchecksums()
scanpath(True)
while(True):
    scanpath()
    # print 'Sleep - ' + datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    time.sleep(1)
