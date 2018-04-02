import os
import shutil
import errno





def mkdir_p(path):
    try:
        os.makedirs(path)
    except OSError as exc:  # Python >2.5
        if exc.errno == errno.EEXIST and os.path.isdir(path):
            pass
        else:
            raise

def copy_sub_category_dir(df,extpath):
    ## Recreate file in subfolder

    make=df.loc[0]['make'].lower()
    model=df.loc[0]['model'].lower()

    def copy_sub_dir_files(src,dst):
        NOTHING_HAPPENS=True

    target_path=extpath+'/'+make+'/'+model
    checkdir=(target_path+'/auxiliary/data').replace('//','/')
    checkdir=os.path.realpath(checkdir)
    if not os.path.exists(checkdir):
        # print 'Creating directory %s if not exist'%(target_path)
        print 'Target Path %s doesn\'t exist'%(target_path)
        mkdir_p(checkdir)

    for path in ['','/auxiliary/','/auxiliary/data/']:

        src=(extpath+'/'+path).replace('//','/')
        dst=os.path.realpath(target_path+'/'+path.replace('//','/'))

        # Get source file
        for file in os.listdir(src):
            rfile=os.path.realpath(src+file)
            if os.path.isfile(rfile):
                print 'copying %s to %s'%(rfile,dst)
                shutil.copy(rfile,dst)


def copy_sub_file(df,extpath,exclude_files = ['.py','template']):
    ## Recreate file in subfolder
    # print df.columns
    make=df.loc[0]['make'].lower()
    model=df.loc[0]['model'].lower()

    def copy_sub_dir_files(src,dst):
        NOTHING_HAPPENS=True

    target_path=extpath+'/'+make+'/'+model
    checkdir=(target_path+'/auxiliary/data').replace('//','/')
    checkdir=os.path.realpath(checkdir)
    if not os.path.exists(checkdir):
        # print 'Creating directory %s if not exist'%(target_path)
        print 'Target Path %s doesn\'t exist'%(target_path)
        mkdir_p(checkdir)

    for path in ['']:

        src=(extpath+'/'+path).replace('//','/')
        dst=os.path.realpath(target_path+'/'+path.replace('//','/'))

        # Get source file
        for file in os.listdir(src):
            rfile=os.path.realpath(src+file)
            if os.path.isfile(rfile):
                if any(s in rfile for s in exclude_files):
                    print 'Excluding: ',rfile
                    continue
                print 'copying %s to %s'%(rfile,dst)
                shutil.copy(rfile,dst)