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

def copy_sub_category_dir(df,extpath,exclude_files = ['.py','template']):
    ## Recreate file in subfolder

    make=df.loc[0]['make'].lower().replace('/','_')
    model=df.loc[0]['model'].lower().replace('/','_')

    def copy_sub_dir_files(src,dst):
        NOTHING_HAPPENS=True

    target_path=extpath+'/'+make+'/'+model
    checkdir=(target_path+'/auxiliary/data').replace('//','/').replace(' ','_')
    checkdir=os.path.realpath(checkdir)
    if not os.path.exists(checkdir):
        # print 'Creating directory %s if not exist'%(target_path)
        print 'Target Path %s doesn\'t exist'%(target_path)
        mkdir_p(checkdir)

    for path in ['','/auxiliary/','/auxiliary/data/']:

        src=(extpath+'/'+path).replace('//','/')
        dst=os.path.realpath(target_path+'/'+path.replace('//','/')).replace(' ','_')

        # Get source file
        for file in os.listdir(src):
            rfile=os.path.realpath(src+file)
            if os.path.isfile(rfile):
                if any(s in rfile for s in exclude_files):
                    print 'Excluding: ',rfile
                    continue
                print 'copying %s to %s'%(rfile,dst)
                shutil.copy(rfile,dst)


def copy_sub_file(df,extpath,exclude_files = ['.py','template']):
    ## Recreate file in subfolder
    # print df.columns
    make=df.loc[0]['make'].lower().replace('/','_')
    model=df.loc[0]['model'].lower().replace('/','_')

    def copy_sub_dir_files(src,dst):
        NOTHING_HAPPENS=True

    target_path=extpath+'/'+make+'/'+model
    target_path=target_path.replace(' ','_')

    checkdir=(target_path+'/auxiliary/data').replace('//','/').replace(' ','_')
    checkdir=os.path.realpath(checkdir).replace('//','/')

    if not os.path.exists(checkdir):
        # print 'Creating directory %s if not exist'%(target_path)
        print 'Target Path %s doesn\'t exist'%(target_path)
        mkdir_p(checkdir)

    for path in ['']:

        src=(extpath+'/'+path).replace('//','/')
        dst=os.path.realpath(target_path+'/'+path.replace('//','/')).replace(' ','_')

        # Get source file
        for constituents in ['','/auxiliary','/auxiliary/data']:
            # mkdir_p(src+constituents)
            sourcepath=src+constituents
            sourcepath=sourcepath.replace('//','/')
            if os.path.exists(sourcepath):
                for file in os.listdir(sourcepath):
                    rfile=os.path.realpath(src+constituents+'/'+file)
                    if os.path.isfile(rfile):
                        if any(s in rfile for s in exclude_files):
                            print 'Excluding: ',rfile
                            continue
                        print 'copying %s to %s'%(rfile,dst+constituents+'/'+file)
                        if not os.path.exists(dst+constituents+'/'):
                            mkdir_p(dst+constituents+'/')
                        shutil.copy(rfile,dst+constituents+'/'+file)