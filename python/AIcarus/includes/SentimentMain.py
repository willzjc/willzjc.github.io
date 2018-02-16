import re
import tweepy
from tweepy import OAuthHandler
from textblob import TextBlob
import TwitterScanner
global sentimentquery, sentimentcount, previewcount

from TwitterScanner import TwitterClient

class SentimentAnalysis():
    def __init__(self):
        TextBlob

    def analyse_sentiment(self,sentence):
        analysis = TextBlob(sentence)
        result = 'Neutral'
        if analysis.sentiment.polarity<0:
            result = 'Negative: ' + str(analysis.sentiment.polarity)
        else:
            result = 'Positive: ' + str(analysis.sentiment.polarity)

        return result


class TwitterClient(object):
    '''
    Generic Twitter Class for sentiment analysis.
    '''

    def __init__(self):
        '''
        Class constructor or initialization method.
        '''
        # keys and tokens from the Twitter Dev Console
        consumer_key = 'FVrqloaRvUMqYPWUJw9FP5O1D'
        consumer_secret = 'XkPcaUrYnSfg8aks6FraqrICnRZaVZbdzXJt8OCeCudRpTGMib'
        access_token = '927101432121081858-II9VDsHduFTYWb6pmR2zs33tX4f55hI'
        access_token_secret = 'CgDluppkZavfgS9PydB2BboRwc2efHJlD3bw41ir1eaLK'

        # attempt authentication
        try:
            # create OAuthHandler object
            self.auth = OAuthHandler(consumer_key, consumer_secret)
            # set access token and secret
            self.auth.set_access_token(access_token, access_token_secret)
            # create tweepy API object to fetch messages
            self.api = tweepy.API(self.auth)
        except:
            print("Error: Authentication Failed")

    def clean_message(self, message):
        '''
        Utility function to clean message text by removing links, special characters
        using simple regex statements.
        '''
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t]) | (\w+:\ / \ / \S+)", " ", message).split())

    def get_message_sentiment(self, message):
        '''
        Utility function to classify sentiment of passed message
        using textblob's sentiment method
        '''
        # create TextBlob object of passed tweet text
        analysis = TextBlob(self.clean_message(message))
        # set sentiment
        if analysis.sentiment.polarity > 0:
            return 'positive'
        elif analysis.sentiment.polarity == 0:
            return 'neutral'
        else:
            return 'negative'

    def get_messages(self, query, count=10):
        '''
        Main function to fetch tweets and parse them.
        '''
        # empty list to store parsed tweets
        messages = []

        try:
            # call twitter api to fetch tweets
            fetched_messages = self.api.search(q=query, count=count)

            # parsing tweets one by one
            for message in fetched_messages:
                # empty dictionary to store required params of a message
                parsed_message = {}

                # saving text of message
                parsed_message['text'] = message.text
                # saving sentiment of message
                parsed_message['sentiment'] = self.get_message_sentiment(message.text)

                # appending parsed message to tweets list
                if message.retweet_count > 0:
                    # if message has retweets, ensure that it is appended only once
                    if parsed_message not in messages:
                        messages.append(parsed_message)
                else:
                    messages.append(parsed_message)

            # return parsed tweets
            return messages

        except tweepy.TweepError as e:
            # print error (if any)
            print("Error : " + str(e))


def main():
    # creating object of TwitterClient Class
    global sentimentquery, sentimentcount, previewcount
    api = TwitterClient()
    # calling function to get tweets
    # tweets = api.get_tweets(query='Donald Trump', count=200)
    tweets = api.get_messages(query=sentimentquery, count=sentimentcount)


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

    print "\n===========================\nQuery is: \"" + sentimentquery + '\" (sentiments analyzed: ' + str(sentimentcount) + ')'
    # percentage of positive tweets
    print("Positive tweets percentage: {} %".format(100 * len(ptweets) / len(tweets)))
    # percentage of negative tweets
    print("Negative tweets percentage: {} %".format(100 * len(ntweets) / len(tweets)))
    # percentage of neutral tweets
    print("Neutral tweets percentage: {} % \
        ".format(100 * (len(tweets) - len(ntweets) - len(ptweets)) / len(tweets)))

    print "See above for links and details that was analysed."

if __name__ == "__main__":
    # calling main function
    previewcount = 20
    sentimentquery = 'Michael Jordan'
    sentimentcount = 283
    main()