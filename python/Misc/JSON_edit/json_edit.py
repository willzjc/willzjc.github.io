import json, random

json_data = open('input.json').read()
data = json.loads(json_data)
random.seed()
for key in data:
    if 'values' in key:
        for nodekey in data[key]:
            # print type(nodekey)
            nodekey['price'] = str(random.randint(0, 10))

print (json.dumps(data, indent=4))
