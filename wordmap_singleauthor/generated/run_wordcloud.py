from wordcloud import WordCloud, STOPWORDS
import inputtext, operator
import TweetScan

global sentimentquery, sentimentcount, previewcount

def main():

    api = TweetScan.TwitterClient()

    # calling function to get tweets
    sentimentquery="quantitative easing"
    sentimentcount=40
    tweets = api.get_tweets(query=sentimentquery, count=sentimentcount)

    for tweet in tweets:
        print tweet
    word_string = inputtext.word_string

    text = word_string

    stopwords = ['to', 'of','the','in','and','for','as','that','is','this','these','by','from','were','we','they','them','my','me','me','your','no','be','will' ]

    wc=WordCloud()
    words=wc.process_text(text)
    sorted_wordlist = sorted(words.items(), key=operator.itemgetter(1),reverse=True)

    f=open('index_template.js','r')
    fbuffer=f.read()
    f.close()

    # replace speeches
    replacetext=', \"' + word_string.replace("\n","\\n") + '\"'
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
    for index, item in enumerate(sorted_wordlist):
        if item[0] not in stopwords:
            word=item[0]
            rand1=str(randint(1,888))
            rand2=str(randint(1,888))
            t=block.replace('word', word).replace('x999', rand1).replace('y999', str(rand2)).replace('regex',word.lower())
            listwords.append(t)
        if index > 15:
            break

    fbuffer=fbuffer.replace('//replacedatatopics','\n'.join(listwords))

    existing_authors=['OBAMA']
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