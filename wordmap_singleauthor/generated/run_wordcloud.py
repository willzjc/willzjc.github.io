from wordcloud import WordCloud, STOPWORDS
import inputtext, operator
import TweetScan
import tweepy
import pandas as pd
from textblob import TextBlob
global sentimentquery, sentimentcount, previewcount

def main():

    api = TweetScan.TwitterClient()

    # calling function to get tweets
    query="quantitative easing"
    sentimentcount=40

    messages_matrix = pd.DataFrame(columns=['user','upper_user','message','time','sentiment'])

    for tweet_info in tweepy.Cursor(api.api.search, q=query, lang= 'en', tweet_mode='extended').items(50):

        if 'retweeted_status' in dir(tweet_info):
            tweet = tweet_info.retweeted_status.full_text
        else:
            tweet = tweet_info.full_text

        user = api.clean_tweet(tweet_info.user.name).encode('utf-8').replace('\"','\'')
        upper_user=user.upper()
        message=api.clean_tweet(tweet).encode('utf-8').replace('\"','\'')
        time=tweet_info.created_at
        sentiment = TextBlob(api.clean_tweet(message))

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

    stopwords = ['to', 'of','the','in','and','for','as','that','is','this','these','by','from','were','we','they','them','my','me','me','your','no','be','will'
                 ,query]

    wc=WordCloud()
    words=wc.process_text(text)
    sorted_wordlist = sorted(words.items(), key=operator.itemgetter(1),reverse=True)

    f=open('index_template.js','r')
    fbuffer=f.read()
    f.close()

    # replace speeches
    user_and_message= (messages_matrix['upper_user'] + ': ' + messages_matrix['message'])

    replacetext=str('\n'.join([', \"' + x + '\"' for x in user_and_message]))
    fbuffer=fbuffer.replace('//replacespeech', replacetext)

    # replace sorted list
    block="""    }, {
            name: "word",
            re: /\\b(regex)\\b/gi,
            x: x999,
            y: y999
            """
    from random import randint

    listwords=[]
    existing=[]
    for index, item in enumerate(sorted_wordlist):
        if item[0] not in stopwords:
            word=item[0]
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
        if index > 15:
            break

    fbuffer=fbuffer.replace('//replacedatatopics','\n'.join(listwords))

    existing_authors=messages_matrix['user']
    listauthors=[]

    #replace authors
    author="""
            "indexname": {
                name: "longname",
                title: "NA"
            },
    """

    for a in existing_authors:
        t = author.replace('indexname',a.upper())
        t = t.replace('longname', a)
        listauthors.append(t)

    fbuffer=fbuffer.replace('//replacespeaker','\n'.join(listauthors))

    out=open('index.js','w')
    out.write(fbuffer)
    out.close()


if __name__ == "__main__":
    main()