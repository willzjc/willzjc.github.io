import datetime, os
import pandas as pd

# os.chdir('/Users/zijianchen/PycharmProjects/github/webgit/willzjc.github.io/timeline/gantt/hour')

offset = 0
s = ''
with open('tasks', 'rb') as f:
    s = f.read()
    f.close()
st = datetime.datetime.strptime('27-01-2018 10:10', '%d-%m-%Y %H:%M')
out = ''
with open('template.html', 'rb') as t:
    out = t.read()
    t.close()
content = []
prevstage = ''

template = """ ,{ "text": "%s", "start_date": "%s", "duration": %s, "parent": %s }"""
stage_template = """ ,{ "text": "%s", "start_date": "%s", "duration": %s, id: %s } """

# df=pd.DataFrame(columns=['stage','task','duration','start','parent'])
parentid = 1
idthis = 1
prevstage = ''
for a in s.split('\n'):
    items = a.split('\t')
    stage = items[0]

    text = items[1]

    duration = float(items[2]) / 60
    offset = offset + int(duration)

    startdate = (st + datetime.timedelta(minutes=offset)).strftime('%d-%m-%Y %H:%M')

    parent = parentid

    if not prevstage == stage:
        content.append(stage_template % (str(stage), str(startdate), str(duration), idthis))
        content.append(template % (text, str(startdate), str(duration), parent))

        parentid = idthis
    else:
        print text
        content.append(template % (text, str(startdate), str(duration), parent))
    idthis += 1

    prevstage = stage

with open('index.html', 'w') as f:
    f.write(out.replace('//replacetasks', '\n\t\t\t'.join(content)))
    f.close()
