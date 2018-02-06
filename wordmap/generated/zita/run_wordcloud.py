from wordcloud import WordCloud, STOPWORDS

import sys

import enchant
import TweetScan
import operator
import tweepy
import pandas as pd
from textblob import TextBlob
global sentimentquery, sentimentcount, previewcount

reload(sys)
sys.setdefaultencoding('utf8')

def hasNumbers(inputString):
    return any(char.isdigit() for char in inputString)

def main():

    api = TweetScan.TwitterClient()

    # calling function to get tweets
    query = "Zita"
    sentimentcount = 400

    messages_matrix = pd.DataFrame(columns=['user','upper_user','message','time','sentiment'])

    for tweet_info in tweepy.Cursor(api.api.search, q=query + ' -filter:retweets', lang= 'en', tweet_mode='extended').items(sentimentcount):

        # if (not tweet_info.retweeted) and ('RT @' not in tweet_info.text):
            if 'retweeted_status' in dir(tweet_info):
                tweet = tweet_info.retweeted_status.full_text
            else:
                tweet = tweet_info.full_text
            # api.clean_tweet(tweet_info.user.name).encode('utf-8').replace('\"', '\'').
            user = ''.join([i if ord(i) < 128 else ' ' for i in api.clean_tweet(tweet_info.user.name)])
            user = user.strip().replace('\"','')
            upper_user=user.upper()
            message=api.clean_tweet(tweet).encode('utf-8').replace('\"','\'').replace("_"," ")
            time=tweet_info.created_at
            cleantweet=' '.join( ''.join([i if ord(i) < 128 else ' ' for i in api.clean_tweet(message)]).split())
            txblob = TextBlob(cleantweet)
            # print 'attempting: ', ' '.join(''.join([i if ord(i) < 128 else ' ' for i in api.clean_tweet(message)])).split()
            sentiment = txblob.sentiment.polarity

            messages_matrix.loc[len(messages_matrix)] = [
                user,
                upper_user,
                message,
                time,
                sentiment
            ]
#########################
    print messages_matrix


    stopwords = [query.lower(),'amp','https','to', 'of','the','in','and','for','as','that','is','this','these','by','from','were','we','they','them','my','me','me','your','no','be','will','https','for','co','really','said','say','via']

    if ' ' in query:
        for q in query.split(' '):
            stopwords.append(q)

    stoppatterns = ['http']


    f=open('index_template.js','r')
    fbuffer=f.read()
    f.close()

    positives = []
    negatives = []
    for index,item in messages_matrix.iterrows():
        append_item=(item['upper_user'] + ': ' + item['message'] +'\\n')
        sentiment = item['sentiment']
        if sentiment > 0:
            positives.append(append_item)
        elif sentiment < 0:
            negatives.append(append_item)
        # else:
        #     negatives.append(append_item)


    print 'positives = ',len(positives)
    positivetext=str('\n'.join([', \"' + x + '\"' for x in positives]))
    fbuffer=fbuffer.replace('//replacedemocrats', positivetext)

    print 'negatives = ', len(negatives)
    negativetext=str('\n'.join([', \"' + x + '\"' for x in negatives]))
    fbuffer=fbuffer.replace('//replacerepublicans', negativetext)

    block="""       { name: "word", re: /\\b(regex)\\b/gi, x: x999, y: y999 }"""
    from random import randint

    listwords=[]
    existing=[]

    ##############################################

    inserted_words=[]

    text = '\n'.join(messages_matrix['message'].replace(':',' '))

    wordtext = '\n'.join(positives + negatives)
    wc=WordCloud()
    words=wc.process_text(wordtext)
    sorted_wordlist = sorted(words.items(), key=operator.itemgetter(1),reverse=True)
    with open('output/words.txt','w') as wt:
        wt.write(wordtext)
        wt.close()
    english_vocab = enchant.Dict("en_US")

    for index, item in enumerate(sorted_wordlist):

        word = item[0]
        if ' ' in word:
            word = word.split(' ')[0]

        # checks if split word is actually not a string of gibberish
        # is_actually_word = english_vocab.check(word)
        is_actually_word=True

        if not hasNumbers(word) and is_actually_word  \
                and word.lower() not in stopwords \
                and word.lower() not in inserted_words:


            combo=''
            rand1 = str(randint(1, 888))
            rand2 = str(randint(1, 888))
            while combo=='':
                combo = rand1 + rand2
                if combo not in existing:
                    existing.append(combo)
                else:
                    combo=''
                    rand1 = str(randint(1, 888))
                    rand2 = str(randint(1, 888))

            # Inserted words
            inserted_words.append(word.lower())

            t=block.replace('word', word).replace('x999', rand1).replace('y999', str(rand2)).replace('regex',word.lower()).encode("utf-8")
            listwords.append(t)
        if index > 30:
            break

    print inserted_words

    fbuffer=fbuffer.replace('//replacedatatopics',',\n'.join(listwords))

    existing_authors=messages_matrix['user']
    listauthors=[]

    author=""" "indexname": { name: "longname", title: "titlename" } """

    for index, item in messages_matrix.iterrows():
        a=item['upper_user']
        t = author.replace('indexname',a.upper())
        t = t.replace('longname', a)
        t = t.replace('titlename','Date: ' + item['time'].strftime('%d %b %Y') + ' Rating: ' + str("%.3f" % item['sentiment']) )
        listauthors.append(t)

    fbuffer=fbuffer.replace('//replacespeaker',',\n'.join(listauthors))

    out=open('index.js','w')
    out.write(fbuffer)
    out.close()


    #### Main index page update ####
    f = open('index_template.html','r')
    fbuffer = f.read()
    f.close()

    # Adds query info back to index.html
    fbuffer = fbuffer.replace('a Twitter Query',': ' + query)

    # Adds positive/negatie tweet count
    fbuffer = fbuffer.replace('pnumber', str(len(positives)))
    fbuffer = fbuffer.replace('nnumber', str(len(negatives)))

    out=open('index.html','w')
    out.write(fbuffer)
    out.close()

if __name__ == "__main__":
    main()