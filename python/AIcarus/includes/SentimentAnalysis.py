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
