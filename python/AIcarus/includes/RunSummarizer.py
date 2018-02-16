import nltk
#Import library essentials
from sumy.parsers.plaintext import PlaintextParser #We're choosing a plaintext parser here, other parsers available for HTML etc.
from sumy.nlp.tokenizers import Tokenizer 
from sumy.summarizers.lex_rank import LexRankSummarizer #We're choosing Lexrank, other algorithms are also built in

file = "input/plain_text.txt"           #   Name of the plain-text file
parser = PlaintextParser.from_file(file, Tokenizer("english"))
summarizer = LexRankSummarizer()

summary = summarizer(parser.document, 5) #  Summarize the document with 5 sentences


large_text=''
with open('input/plain_text.txt') as f:
    large_text=f.read()
    f.close()

import summarize
smy=summarize.summarize_text(large_text)

print smy