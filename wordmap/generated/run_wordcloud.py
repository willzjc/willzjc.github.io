from wordcloud import WordCloud, STOPWORDS

import sys

import TweetScan
import operator
import tweepy
import pandas as pd
from textblob import TextBlob
global sentimentquery, sentimentcount, previewcount

reload(sys)
sys.setdefaultencoding('utf8')

def main():

    api = TweetScan.TwitterClient()

    # calling function to get tweets
    query="quantitative easing"
    sentimentcount=40

    messages_matrix = pd.DataFrame(columns=['user','upper_user','message','time','sentiment'])

    for tweet_info in tweepy.Cursor(api.api.search, q=query, lang= 'en', tweet_mode='extended').items(400):

        if 'retweeted_status' in dir(tweet_info):
            tweet = tweet_info.retweeted_status.full_text
        else:
            tweet = tweet_info.full_text
        # api.clean_tweet(tweet_info.user.name).encode('utf-8').replace('\"', '\'').
        user = ''.join([i if ord(i) < 128 else ' ' for i in api.clean_tweet(tweet_info.user.name)])
        user = user.strip()
        upper_user=user.upper()
        message=api.clean_tweet(tweet).encode('utf-8').replace('\"','\'')
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

    text = '\n'.join(messages_matrix['message'].replace(':',' '))

    stopwords = ['to', 'of','the','in','and','for','as','that','is','this','these','by','from','were','we','they','them','my','me','me','your','no','be','will','https'
                 ,query]

    wc=WordCloud()
    words=wc.process_text(text)
    sorted_wordlist = sorted(words.items(), key=operator.itemgetter(1),reverse=True)

    f=open('index_template.js','r')
    fbuffer=f.read()
    f.close()

    positives = []
    negatives = []
    for index,item in messages_matrix.iterrows():
        append_item=(item['upper_user'] + ': ' + item['message'])
        sentiment = item['sentiment']
        if sentiment > 0:
            positives.append(append_item)
        elif sentiment < 0:
            negatives.append(append_item)
        else:
            negatives.append(append_item)


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

    for index, item in enumerate(sorted_wordlist):
        if item[0].lower() not in stopwords:
            word = item[0]
            if ' ' in word:
                word = word.split(' ')[0]
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

            t=block.replace('word', word).replace('x999', rand1).replace('y999', str(rand2)).replace('regex',word.lower()).encode("utf-8")
            listwords.append(t)
        if index > 40:
            break

    fbuffer=fbuffer.replace('//replacedatatopics',',\n'.join(listwords))

    existing_authors=messages_matrix['user']
    listauthors=[]

    author=""" "indexname": { name: "longname", title: "titlename" } """

    for index, item in messages_matrix.iterrows():
        a=item['upper_user']
        t = author.replace('indexname',a.upper())
        t = t.replace('longname', a)
        t = t.replace('titlename',item['time'].strftime('%Y-%m-%d'))
        listauthors.append(t)

    fbuffer=fbuffer.replace('//replacespeaker',',\n'.join(listauthors))

    out=open('index.js','w')
    out.write(fbuffer)
    out.close()


if __name__ == "__main__":
    main()