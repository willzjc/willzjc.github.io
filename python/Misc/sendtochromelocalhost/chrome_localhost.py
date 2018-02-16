import os, sys
path=sys.argv[1]
runarg=path.replace("C:\\local\\apps\\wamp64\\www\\",'localhost/').replace('\\','/')
os.system("\"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe\" " + runarg)
