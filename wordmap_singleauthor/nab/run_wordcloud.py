
import inputtext,operator
word_string = inputtext.word_string
#
# wordcount={}
#
# for word in word_string.split():
#     if word not in wordcount:
#         wordcount[word] = 1
#     else:
#         wordcount[word] += 1
#
# # for k,v in wordcount.items():
# #     print k, v
#
# sorted_wordlist = sorted(wordcount.items(), key=operator.itemgetter(1),reverse=True)
# # for k,v in wordcount.items():
# #     print k, v
# type
# for x in sorted_wordlist:
#     print x
# # print '\n'.join(sorted_wordlist)

from os import path
from scipy.misc import imread
import matplotlib.pyplot as plt
import random
import pandas

from wordcloud import WordCloud, STOPWORDS

text = word_string
# wordcloud = WordCloud(font_path='/Library/Fonts/Verdana.ttf',
#                       relative_scaling = 1.0,
#                       stopwords = {'to', 'of','the','in','and','for','as','that','is','this','these','by','from','were'
#                       ,'we','they','them','my','me','me','your','no','be',
#                                    'yes no where not be or we my i me an a from were will by'} # set or space-separated string
#                       ).generate(text)
stopwords = ['to', 'of','the','in','and','for','as','that','is','this','these','by','from','were'
                      ,'we','they','them','my','me','me','your','no','be','will'
                                  ]

wc=WordCloud()
words=wc.process_text(text)
sorted_wordlist = sorted(words.items(), key=operator.itemgetter(1),reverse=False)

for index, item in enumerate(sorted_wordlist):
    if item[0] not in stopwords:
        print item[0],item[1]