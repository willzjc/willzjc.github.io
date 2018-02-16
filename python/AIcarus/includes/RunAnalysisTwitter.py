import AIcarus.includes.SentimentAnalysis
import urllib3

def main():
    # creating object of TwitterClient Class
    global sentimentquery, sentimentcount, previewcount
    api = AIcarus.includes.SentimentAnalysis.TwitterClient()
    # calling function to get tweets
    # tweets = api.get_tweets(query='Donald Trump', count=200)
    tweets = api.get_tweets(query=sentimentquery, count=sentimentcount)


    # picking positive tweets from tweets
    ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']
    # picking negative tweets from tweets
    ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative']


    # percentage of positive tweets
    print("Positive tweets percentage: {} %".format(100 * len(ptweets) / len(tweets)))
    # percentage of negative tweets
    print("Negative tweets percentage: {} %".format(100 * len(ntweets) / len(tweets)))
    # percentage of neutral tweets
    print("Neutral tweets percentage: {} % \
        ".format(100 * (len(tweets) - len(ntweets) - len(ptweets)) / len(tweets)))

    # printing first few positive tweets
    print("\n\nPositive tweets:")
    for tweet in ptweets[:previewcount]:
        print(tweet['text'])

    # printing first few negative tweets
    print("\n\nNegative tweets:")
    for tweet in ntweets[:previewcount]:
        print(tweet['text'])

    print "\n===========================\nQuery is: \"" + sentimentquery + '\" (Sentiments analyzed: ' + str(sentimentcount) + ')'
    # percentage of positive tweets
    print("Positive tweets percentage: {} %".format(100 * len(ptweets) / len(tweets)))
    # percentage of negative tweets
    print("Negative tweets percentage: {} %".format(100 * len(ntweets) / len(tweets)))
    # percentage of neutral tweets
    print("Neutral tweets percentage: {} % \
        ".format(100 * (len(tweets) - len(ntweets) - len(ptweets)) / len(tweets)))

    print "See above for links and details that AIcarus analysed."

if __name__ == "__main__":
    # calling main function
    previewcount = 20
    sentimentquery = 'China'
    sentimentcount = 400
    main()