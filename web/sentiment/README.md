[![Build Status](https://travis-ci.org/JasonKessler/scattertext.svg?branch=master)](https://travis-ci.org/JasonKessler/scattertext)
[![Conda Install](https://anaconda.org/ioam/holoviews/badges/installer/conda.svg)](https://anaconda.org/conda-forge/scattertext)
[![Gitter Chat](https://img.shields.io/badge/GITTER-join%20chat-green.svg)](https://gitter.im/scattertext/Lobby)
[![Twitter Follow](https://img.shields.io/twitter/follow/espadrine.svg?style=social&label=Follow)](https://twitter.com/jasonkessler)

# Scattertext 0.0.2.19
### Updates
Semiotic Squares now look better, and have customizable labels. 

Incorporated the [General Inquirer](http://www.wjh.harvard.edu/~inquirer/homecat.htm) 
lexicon. For non-commercial use only. The lexicon is downloaded from their homepage at the start of each 
use. See `demo_general_inquierer.py`.

Incorporated Phrasemachine from [AbeHandler](https://github.com/AbeHandler) (Handler et al. 2016). For the license, 
please see `PhraseMachineLicense.txt`.  For an example, please see `demo_phrase_machine.py`.

Added `CompactTerms` for removing redundant and infrequent terms from term document matrices.
These occur if a word or phrase is always part of a larger phrase; the shorter phrase is 
considered redundant and removed from the corpus. See `demo_phrase_machine.py` for an example.   

Added `FourSquare`, a pattern that allows for the creation of a semiotic square with
separate categories for each corner.  Please see `demo_four_square.py` for an early example. 

**Table of Contents**

- [Installation](#installation)
- [Citation](#citation)
- [Overview](#overview)
- [Tutorial](#tutorial)
- [Advanced Uses](#advanced-uses)
    - [Visualizing query-based categorical differences](#visualizing-query-based-categorical-differences)
    - [Visualizing any kind of term score](#visualizing-any-kind-of-term-score)
    - [Custom term positions](#custom-term-positions)
    - [Emoji analysis](#emoji-analysis)
    - [Visualizing scikit-learn text classification weights](#visualizing-scikit-learn-text-classification-weights)
    - [Creating lexicalized semiotic squares](#creating-lexicalized-semiotic-squares)
- [Examples](#examples)
- [A note on chart layout](#a-note-on-chart-layout)
- [What's new](#whats-new)
- [Sources](#sources)

A tool for finding distinguishing terms in small-to-medium-sized
corpora, and presenting them in a sexy, interactive scatter plot with 
non-overlapping term labels.  Exploratory data analysis just 
got more fun.

Feel free to use the Gitter community [gitter.im/scattertext](https://gitter.im/scattertext/Lobby) for help or to discuss the project.   

[![Conventions-Visualization.html](https://jasonkessler.github.io/2012conventions0.0.2.2.png)](https://jasonkessler.github.io/Conventions-Visualization.html)

## Installation 
Install Python 3.4 or higher and run:

`$ pip install scattertext && python -m spacy.en.download`

If you cannot (or don't want to) install spaCy, substitute `nlp = spacy.en.English()` lines with
`nlp = scattertext.WhitespaceNLP.whitespace_nlp`.  Note, this is not compatible 
with `word_similarity_explorer`, and the tokenization and sentence boundary detection 
capabilities will be low-performance regular expressions. See `demo_without_spacy.py`
for an example.

Python 2.7 support is experimental.  Many things will break.

The HTML outputs look best in Chrome and Safari.

## Citation
Jason S. Kessler. Scattertext: a Browser-Based Tool for Visualizing how Corpora Differ. ACL System Demonstrations. 2017.

Link to preprint: [arxiv.org/abs/1703.00565](https://arxiv.org/abs/1703.00565)

```
@article{kessler2017scattertext,
  author    = {Kessler, Jason S.},
  title     = {Scattertext: a Browser-Based Tool for Visualizing how Corpora Differ},
  booktitle = {Proceedings of ACL-2017 System Demonstrations},
  year      = {2017},
  address   = {Vancouver, Canada},
  publisher = {Association for Computational Linguistics},
}
```
## Overview
 
This is a tool that's intended for visualizing what words and phrases
 are more characteristic of a category than others.  
 
Consider the example at the top of the page.

Looking at this seem overwhelming.  In fact, it's a relatively simple visualization of word use 
during the 2012 political convention.  Each dot corresponds to a word or phrase mentioned by Republicans or Democrats
during their conventions.  The closer a dot is to the top of the plot, the more frequently it was used by 
Democrats.  The further right a  dot, the more that word or phrase was used by Republicans.  Words frequently
used by both parties, like "of" and "the" and even "Mitt" tend to occur in the upper-right-hand corner. Although very low 
frequency words have been hidden to preserve computing resources, a word that neither party used, like "giraffe" 
 would be in the bottom-left-hand corner.  
 
The interesting things happen close to the upper-left and lower-right corners.  In the upper-left corner, 
words like "auto" (as in auto bailout) and "millionaires" are frequently used by Democrats but infrequently or never used 
by Republicans.  Likewise, terms frequently used by Republicans and infrequently by Democrats occupy the
 bottom-right corner.  These include "big government" and "olympics", referring to the Salt Lake City Olympics in which 
 Gov. Romney was involved.
 
Terms are colored by their association.  Those that are more associated with Democrats are blue, and those 
more associated with Republicans red.  

Terms (only unigrams for now) that are most characteristic of the both sets of documents are displayed
 on the far-right of the visualization.
   
The inspiration for this visualization came from Dataclysm (Rudder, 2014).
  
Scattertext is designed to help you build these graphs and efficiently label points on them. 

The documentation (including this readme) is a work in 
progress.  Please see the tutorial below as well as the [PyData 2017 Tutorial](https://github.com/JasonKessler/Scattertext-PyData).

Poking around the code and tests should give you a good idea of how things work. 

The library covers some novel and effective term-importance formulas, including **Scaled F-Score**.

## Tutorial

### Help! I don't know Python but I still want to use Scattertext.
While you should learn Python fully use Scattertext, I've put some of the basic 
functionality in a commandline tool.  The tool is installed when you follow the procedure layed out
above.

Run `$ scattertext --help` from the commandline to see the full usage information.  Here's a quick example of
how to use vanilla Scattertext on a CSV file.  The file needs to have at least two columns,
one containing the text to be analyzed, and another containing the category.  In the example CSV below,
the columns are text and party, respectively.

The example below processes the CSV file, and the resulting HTML visualization into cli_demo.html.

Note, the parameter `--minimum_term_frequency=8` omit terms that occur less than 8 
times, and `--regex_parser` indicates a simple regular expression parser should 
 be used in place of spaCy. The flag `--one_use_per_doc` indicates that term frequency
  should be calculated by only counting no more than one occurrence of a term in a document. 
  
If you'd like to parse non-English text, you can use the `--spacy_language_model` argument to configure which
spaCy language model the tool will use.  The default is 'en' and you can see the others available at 
[https://spacy.io/docs/api/language-models](https://spacy.io/docs/api/language-models).

```bash
$ curl -s https://cdn.rawgit.com/JasonKessler/scattertext/master/scattertext/data/political_data.csv | head -2
party,speaker,text
democrat,BARACK OBAMA,"Thank you. Thank you. Thank you. Thank you so much.Thank you.Thank you so much. Thank you. Thank you very much, everybody. Thank you.
$
$ scattertext --datafile=https://cdn.rawgit.com/JasonKessler/scattertext/master/scattertext/data/political_data.csv \
> --text_column=text --category_column=party --metadata_column=speaker --positive_category=democrat \
> --category_display_name=Democratic --not_category_display_name=Republican --minimum_term_frequency=8 \
> --one_use_per_doc --regex_parser --outputfile=cli_demo.html
```


### Using Scattertext as a text analysis library: finding characteristic terms and their associations

The following code creates a stand-alone HTML file that analyzes words 
used by Democrats and Republicans in the 2012 party conventions, and outputs some notable
 term associations.
 
First, import Scattertext and spaCy.

```pydocstring
>>> import scattertext as st
>>> import spacy
>>> from pprint import pprint
```

Next, assemble the data you want to analyze into a Pandas data frame. It should have
at least two columns, the text you'd like to analyze, and the category you'd like to 
study. Here, the `text` column contains convention speeches while the `party` column
 contains the party of the speaker.  We'll eventually use the `speaker` column
 to label snippets in the visualization.

```pydocstring
>>> convention_df = st.SampleCorpora.ConventionData2012.get_data()  
>>> convention_df.iloc[0]
party                                               democrat
speaker                                         BARACK OBAMA
text       Thank you. Thank you. Thank you. Thank you so ...
Name: 0, dtype: object
```

Turn the data frame into a Scattertext Corpus to begin analyzing it.  To look for differences 
in parties, set the `category_col` parameter to `'party'`, and use the speeches, 
present in the `text` column, as the texts to analyze by setting the `text` col 
parameter.  Finally, pass a spaCy model in to the `nlp` argument and call `build()` to construct the corpus.
 
```pydocstring
# Turn it into a Scattertext Corpus 
>>> nlp = spacy.load('en')
>>> corpus = st.CorpusFromPandas(convention_df, 
...                              category_col='party', 
...                              text_col='text',
...                              nlp=nlp).build()
```

Let's see characteristic terms in the corpus, and terms that are most associated Democrats and 
Republicans.  See slides 
[52](http://www.slideshare.net/JasonKessler/turning-unstructured-content-into-kernels-of-ideas/52) to [59](http://www.slideshare.net/JasonKessler/turning-unstructured-content-into-kernels-of-ideas/59) of the [Turning Unstructured Content ot Kernels of Ideas](http://www.slideshare.net/JasonKessler/turning-unstructured-content-into-kernels-of-ideas/) talk for more details on these approaches. 

Here are the terms that differentiate the corpus from a general English corpus. 
```pydocstring
>>> print(list(corpus.get_scaled_f_scores_vs_background().index[:10]))
['obama',
 'romney',
 'barack',
 'mitt',
 'obamacare',
 'biden',
 'romneys',
 'hardworking',
 'bailouts',
 'autoworkers']
```

Here are the terms that are most associated with Democrats: 

```pydocstring
>>> term_freq_df = corpus.get_term_freq_df()
>>> term_freq_df['Democratic Score'] = \
...  corpus.get_scaled_f_scores('democrat')
>>> pprint(list(term_freq_df.sort_values(by='Democratic Score', 
...                                      ascending=False).index[:10]))
['auto',
 'america forward',
 'auto industry',
 'insurance companies',
 'pell',
 'last week',
 'pell grants',
 "women 's",
 'platform',
 'millionaires']
```

And Republicans:
```pydocstring
>>> term_freq_df['Republican Score'] = \
...  corpus.get_scaled_f_scores('republican')
>>> pprint(list(term_freq_df.sort_values(by='Democratic Score', 
...                                      ascending=False).index[:10]))
['big government',
 "n't build",
 'mitt was',
 'the constitution',
 'he wanted',
 'hands that',
 'of mitt',
 '16 trillion',
 'turned around',
 'in florida']
```

### Visualizing term associations

Now, let's write the scatter plot a stand-alone HTML file.  We'll make the y-axis category  "democrat", and name
the category "Democrat" with a capital "D" for presentation 
purposes.  We'll name the other category "Republican" with a capital "R".  All documents in the corpus without 
the category "democrat" will be considered Republican. We set the width of the visualization in pixels, and label 
each excerpt with the speaker using the `metadata` parameter.  Finally, we write the visualization to an HTML file.
 
```pydocstring
>>> html = st.produce_scattertext_explorer(corpus,
...          category='democrat',
...          category_name='Democratic',
...          not_category_name='Republican',
...          width_in_pixels=1000,
...          metadata=convention_df['speaker'])
>>> open("Convention-Visualization.html", 'wb').write(html.encode('utf-8'))
```
Below is what the webpage looks like.  Click it and wait a few minutes for the interactive version.
[![Conventions-Visualization.html](https://jasonkessler.github.io/2012conventions0.0.2.2.png)](https://jasonkessler.github.io/Conventions-Visualization.html)

### Visualizing Empath topics and categories

In order to visualize Empath (Fast 2016) topics and categories instead of terms, we'll need to 
create a `Corpus` of extracted topics and categories rather than unigrams and 
bigrams. To do so, use the `FeatsOnlyFromEmpath` feature extractor.  See the source code for 
examples of how to make your own.

When creating the visualization, pass the `use_non_text_features=True` argument into
 `produce_scattertext_explorer`.  This will instruct it to use the labeled Empath 
 topics and categories instead of looking for terms.  Since the documents returned
 when a topic or category label is clicked will be in order of the document-level
 category-association strength, setting `use_full_doc=True` makes sense, unless you have
 enormous documents.  Otherwise, the first 300 characters will be shown.
 
```pydocstring
>>> empath_corpus = st.CorpusFromParsedDocuments(convention_df,
...                                              category_col='party',
...                                              feats_from_spacy_doc=st.FeatsFromOnlyEmpath(),
...                                              parsed_col='text').build()
>>> html = st.produce_scattertext_explorer(empath_corpus,
...                                        corpus_for_empath='democrat',
...                                        category_name='Democratic',
...                                        not_category_name='Republican',
...                                        width_in_pixels=1000,
...                                        metadata=convention_df['speaker'],
...                                        use_non_text_features=True,
...                                        use_full_doc=True)
>>> open("Convention-Visualization-Empath.html", 'wb').write(html.encode('utf-8'))
``` 

[![Convention-Visualization-Empath.html](https://jasonkessler.github.io/Convention-Visualization-Empath.png)](https://jasonkessler.github.io/Convention-Visualization-Empath.html)

### Understanding Scaled F-Score

![Scaled F-Score Explanation 1](https://raw.githubusercontent.com/JasonKessler/jasonkessler.github.io/master/scaled_f_score1.png)


![Scaled F-Score Explanation 2](https://raw.githubusercontent.com/JasonKessler/jasonkessler.github.io/master/scaled_f_score2.png)

## Advanced uses

### Visualizing query-based categorical differences  
Word representations have recently become a hot topic in NLP.  While lots of work has been done visualizing 
how terms relate to one another given their scores 
(e.g., [http://projector.tensorflow.org/](http://projector.tensorflow.org/)),
none to my knowledge has been done visualizing how we can use these to examine how 
document categories differ. 

In this example given a query term, "jobs", we can see how Republicans and 
Democrats talk about it differently.

In this configuration of Scattertext, words are colored by their similarity to a query phrase.  
This is done using [spaCy](https://spacy.io/)-provided GloVe word vectors (trained on 
the Common Crawl corpus). The cosine distance between vectors is used, 
with mean vectors used for phrases.

The calculation of the most similar terms associated with each category is a simple heuristic.  First, 
sets of terms closely associated with a category are found. Second, these terms are ranked 
based on their similarity to the query, and the top rank terms are displayed to the right of the 
scatterplot.  

A term is considered associated if its p-value is less than 0.05.  P-values are 
determined using Monroe et al. (2008)'s difference in the weighted log-odds-ratios with an 
uninformative Dirichlet prior.  This is the only model-based method discussed in Monroe et al. 
that does not rely on a large, in-domain background corpus. Since we are scoring 
bigrams in addition to the unigrams scored by Monroe, the size of the corpus would have to be larger 
to have high enough bigram counts for proper penalization. This function 
relies the Dirichlet distribution's parameter alpha, a vector, which is uniformly set to 0.01.

Here is the code  to produce such a visualization. 
 
```pydocstring
>>> from scattertext import word_similarity_explorer
>>> html = word_similarity_explorer(corpus,
...                                 category='democrat',
...                                 category_name='Democratic',
...                                 not_category_name='Republican',
...                                 target_term='jobs',
...                                 minimum_term_frequency=5,
...                                 pmi_threshold_coefficient=4,
...                                 width_in_pixels=1000,
...                                 metadata=convention_df['speaker'],
...                                 alpha=0.01,
...                                 max_p_val=0.05,
...                                 save_svg_button=True)
>>> open("Convention-Visualization-Jobs.html", 'wb').write(html.encode('utf-8'))
``` 
[![Convention-Visualization-Jobs.html](https://jasonkessler.github.io/Convention-Visualization-Jobs.png)](https://jasonkessler.github.io/Convention-Visualization-Jobs.html)


#### Developing and using bespoke word representations 

Scattertext can interface with Gensim Word2Vec models.  For example, here's a snippet from `demo_gensim_similarity.py`
which illustrates how to train and use a word2vec model on a corpus.  Note the similarities produced 
reflect quirks of the corpus, e.g., "8" tends to refer to the 8% unemployment rate at the time of the
convention.

```python
import spacy
from gensim.models import word2vec
from scattertext import SampleCorpora, word_similarity_explorer_gensim, Word2VecFromParsedCorpus
from scattertext.CorpusFromParsedDocuments import CorpusFromParsedDocuments
nlp = spacy.en.English()
convention_df = SampleCorpora.ConventionData2012.get_data()
convention_df['parsed'] = convention_df.text.apply(nlp)
corpus = CorpusFromParsedDocuments(convention_df, category_col='party', parsed_col='parsed').build()
model = word2vec.Word2Vec(size=300,
                          alpha=0.025,
                          window=5,
                          min_count=5,
                          max_vocab_size=None,
                          sample=0,
                          seed=1,
                          workers=1,
                          min_alpha=0.0001,
                          sg=1,
                          hs=1,
                          negative=0,
                          cbow_mean=0,
                          iter=1,
                          null_word=0,
                          trim_rule=None,
                          sorted_vocab=1)
html = word_similarity_explorer_gensim(corpus,
                                       category='democrat',
                                       category_name='Democratic',
                                       not_category_name='Republican',
                                       target_term='jobs',
                                       minimum_term_frequency=5,
                                       pmi_threshold_coefficient=4,
                                       width_in_pixels=1000,
                                       metadata=convention_df['speaker'],
                                       word2vec=Word2VecFromParsedCorpus(corpus, model).train(),
                                       max_p_val=0.05,
                                       save_svg_button=True)
open('./demo_gensim_similarity.html', 'wb').write(html.encode('utf-8'))
```
How Democrats and Republicans talked differently about "jobs" in their 2012 convention speeches. 
[![Convention-Visualization-Jobs.html](https://jasonkessler.github.io/demo_gensim_similarity.png)](https://jasonkessler.github.io/demo_gensim_similarity.html)


### Visualizing any kind of term score

We can use Scattertext to visualize alternative types of word scores, and ensure that 0 scores are greyed out.  Use the `sparse_explroer` function to acomplish this, and see its source code for more details.     

```pydocstring
>>> from sklearn.linear_model import Lasso
>>> from scattertext import sparse_explorer
>>> html = sparse_explorer(corpus,
...                        category='democrat',
...                        category_name='Democratic',
...                        not_category_name='Republican',
...                        scores = corpus.get_regression_coefs('democrat', Lasso(max_iter=10000)),
...                        minimum_term_frequency=5,
...                        pmi_threshold_coefficient=4,
...                        width_in_pixels=1000,
...                        metadata=convention_df['speaker'])
>>> open('./Convention-Visualization-Sparse.html', 'wb').write(html.encode('utf-8'))
```

[![Convention-Visualization-Sparse.html](https://jasonkessler.github.io/Convention-Visualization-Sparse.png)](https://jasonkessler.github.io/Convention-Visualization-Sparse.html)

### Custom term positions

You can also use custom term positions and axis labels.  For example, you can base terms' y-axis 
positions on a regression coefficient and their x-axis on term frequency and label the axes
 accordingly.  The one catch is that axis positions must be scaled between 0 and 1.

First, let's define two scaling functions: `scale` to project positive values to \[0,1\], and 
`zero_centered_scale` project real values to \[0,1\], with negative values always \<0.5, and
positive values always \>0.5.

```pydocstring
>>> def scale(ar):
...     return (ar - ar.min()) / (ar.max() - ar.min())
...
>>> def zero_centered_scale(ar):
...     ar[ar > 0] = scale(ar[ar > 0])
...     ar[ar < 0] = -scale(-ar[ar < 0])
...     return (ar + 1) / 2.
```

Next, let's compute and scale term frequencies and L2-penalized regression coefficients. We'll
hang on to the original coefficients and allow users to view them by mousing over terms.  

```pydocstring
>>> from sklearn.linear_model import LogisticRegression
>>> import numpy as np
>>>
>>> frequencies_scaled = scale(np.log(term_freq_df.sum(axis=1).values))
>>> scores = corpus.get_logreg_coefs('democrat',
...                                  LogisticRegression(penalty='l2', C=10, max_iter=10000, n_jobs=-1))
>>> scores_scaled = zero_centered_scale(scores)
```

Finally, we can write the visualization. Note the use of the `x_coords` and `y_coords` 
parameters to store the respective coordinates, the `scores` and `sort_by_dist` arguments
 to register the original coefficients and use them to rank the terms in the right-hand
 list, and the `x_label` and `y_label` arguments to label axes.
 
```pydocstring
>>> html = produce_scattertext_explorer(corpus,
...                                     category='democrat',
...                                     category_name='Democratic',
...                                     not_category_name='Republican',
...                                     minimum_term_frequency=5,
...                                     pmi_threshold_coefficient=4,
...                                     width_in_pixels=1000,
...                                     x_coords=frequencies_scaled,
...                                     y_coords=scores_scaled,
...                                     scores=scores,
...                                     sort_by_dist=False,
...                                     metadata=convention_df['speaker'],
...                                     x_label='Log frequency',
...                                     y_label='L2-penalized logistic regression coef')
>>> open('demo_custom_coordinates.html', 'wb').write(html.encode('utf-8'))
```
[![demo_custom_coordinates.html](https://jasonkessler.github.io/demo_custom_coordinates.png)](https://jasonkessler.github.io/demo_custom_coordinates.html)


### Emoji analysis
The Emoji analysis capability displays a chart of the category-specific distribution
of Emoji. Let's look at a new corpus, a set of tweets.  We'll build a visualization
showing how men and women use emoji differently.

Note: the following example is implemented in `demo_emoji.py`.

First, we'll load the dataset and parse it using NLTK's tweet tokenizer.  Note, install NLTK
before running this example.  It will take some time for the dataset to download.
```python
import nltk, urllib.request, io, agefromname, zipfile
import scattertext as st
import pandas as pd


with zipfile.ZipFile(io.BytesIO(urllib.request.urlopen(
    'http://followthehashtag.com/content/uploads/USA-Geolocated-tweets-free-dataset-Followthehashtag.zip'
).read())) as zf:
    df = pd.read_excel(zf.open('dashboard_x_usa_x_filter_nativeretweets.xlsx'))

nlp = st.tweet_tokenzier_factory(nltk.tokenize.TweetTokenizer())
df['parse'] = df['Tweet content'].apply(nlp)

df.iloc[0]
'''
Tweet Id                                                     721318437075685382
Date                                                                 2016-04-16
Hour                                                                      12:44
User Name                                                        Bill Schulhoff
Nickname                                                          BillSchulhoff
Bio                           Husband,Dad,GrandDad,Ordained Minister, Umpire...
Tweet content                 Wind 3.2 mph NNE. Barometer 30.20 in, Rising s...
Favs                                                                        NaN
RTs                                                                         NaN
Latitude                                                                40.7603
Longitude                                                              -72.9547
Country                                                                      US
Place (as appears on Bio)                                    East Patchogue, NY
Profile picture               http://pbs.twimg.com/profile_images/3788000007...
Followers                                                                   386
Following                                                                   705
Listed                                                                       24
Tweet language (ISO 639-1)                                                   en
Tweet Url                     http://www.twitter.com/BillSchulhoff/status/72...
parse                         Wind 3.2 mph NNE. Barometer 30.20 in, Rising s...
Name: 0, dtype: object
'''
```

Next, we'll use the [AgeFromName](https://github.com/JasonKessler/agefromname) package to find the probabilities of the gender of 
each user given their first name.  First, we'll find a dataframe indexed on first names 
that contains the probability that each someone with that first name is male (`male_prob`).
 
```python
male_prob = agefromname.AgeFromName().get_all_name_male_prob()
male_prob.iloc[0]
'''
hi      1.00000
lo      0.95741
prob    1.00000
Name: aaban, dtype: float64
'''
```

Next, we'll extract the first names of each user, and use the `male_prob` data frame 
to find users whose names indicate there is at least a 90% chance they are either male or female,
label those users, and create new data frame `df_mf` with only those users.

```python
df['first_name'] = df['User Name'].apply(lambda x: x.split()[0].lower() if type(x) == str and len(x.split()) > 0 else x)
df_aug = pd.merge(df, male_prob, left_on='first_name', right_index=True)
df_aug['gender'] = df_aug['prob'].apply(lambda x: 'm' if x > 0.9 else 'f' if x < 0.1 else '?')
df_mf = df_aug[df_aug['gender'].isin(['m', 'f'])]
```

The key to this analysis is to construct a corpus using only the emoji 
extractor `st.FeatsFromSpacyDocOnlyEmoji` which builds a corpus only from
 emoji and not from anything else.
 
```python
corpus = st.CorpusFromParsedDocuments(
	df_mf,
	parsed_col='parse',
	category_col='gender',
	feats_from_spacy_doc=st.FeatsFromSpacyDocOnlyEmoji()
).build()
```

Next, we'll run this through a standard `produce_scattertext_explorer` visualization
generation.
```python
html = st.produce_scattertext_explorer(
	corpus,
	category='f',
	category_name='Female',
	not_category_name='Male',
	use_full_doc=True,
	term_ranker=OncePerDocFrequencyRanker,
	sort_by_dist=False,
	metadata=(df_mf['User Name']
	          + ' (@' + df_mf['Nickname'] + ') '
	          + df_mf['Date'].astype(str)),
	width_in_pixels=1000
)
open("EmojiGender.html", 'wb').write(html.encode('utf-8'))
```

[![EmojiGender.html](https://jasonkessler.github.io/EmojiGender.png)](https://jasonkessler.github.io/EmojiGender.html)


### Visualizing scikit-learn text classification weights

Suppose you'd like to audit or better understand 
weights or importances given to bag-of-words features 
by a classifier.
 
It's easy to use Scattertext to do, if you use a Scikit-learn-style classifier.

For example the [Lighting](http://contrib.scikit-learn.org/lightning/) package makes available
high-performance linear classifiers which are have Scikit-compatible interfaces.

First, let's import `sklearn`'s text feature extraction classes, the 20 Newsgroup
corpus, Lightning's Primal Coordinate Descent classifier, and Scattertext. We'll also
fetch the training portion of the Newsgroup corpus.

```python
from lightning.classification import CDClassifier
from sklearn.datasets import fetch_20newsgroups
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

import scattertext as st

newsgroups_train = fetch_20newsgroups(
	subset='train',
	remove=('headers', 'footers', 'quotes')
)
```

Next, we'll tokenize our corpus twice.  Once into tfidf features 
which will be used to train the classifier, an another time into
ngram counts that will be used by Scattertext.  It's important that
both vectorizers share the same vocabulary, since we'll need to apply the 
weight vector from the model onto our Scattertext Corpus.

```python
vectorizer = TfidfVectorizer()
tfidf_X = vectorizer.fit_transform(newsgroups_train.data)
count_vectorizer = CountVectorizer(vocabulary=vectorizer.vocabulary_)
```

Next, we use the `CorpusFromScikit` factory to build a Scattertext Corpus object.
Ensure the `X` parameter is a document-by-feature matrix. The argument to the 
`y` parameter is an array of class labels.  Each label is an integer representing
a different news group.  We the `feature_vocabulary` is the vocabulary used by the 
vectorizers.  The `category_names` are a list of the 20 newsgroup names which
as a class-label list.  The `raw_texts` is a list of the text of newsgroup texts.
  
```python
corpus = st.CorpusFromScikit(
	X=count_vectorizer.fit_transform(newsgroups_train.data),
	y=newsgroups_train.target,
	feature_vocabulary=vectorizer.vocabulary_,
	category_names=newsgroups_train.target_names,
	raw_texts=newsgroups_train.data
).build()
```

Now, we can train the model on `tfidf_X` and the categoricla response variable,
and capture feature weights for category 0 ("alt.atheism").
```python
clf = CDClassifier(penalty="l1/l2",
                   loss="squared_hinge",
                   multiclass=True,
                   max_iter=20,
                   alpha=1e-4,
                   C=1.0 / tfidf_X.shape[0],
                   tol=1e-3)
clf.fit(tfidf_X, newsgroups_train.target)
term_scores = clf.coef_[0]
```

Finally, we can create a Scattertext plot.  We'll use the Monroe-style visualization, and automatically
select around 4000 terms that encompass the set of frequent terms, terms with high absolute scores,
and terms that are characteristic of the corpus.  

```python
html = st.produce_fightin_words_explorer(
	corpus,
	'alt.atheism',
	scores=term_scores,
	use_term_significance=False,
	terms_to_include=st.AutoTermSelector.get_selected_terms(corpus, term_scores, 4000),
	metadata = ['/'.join(fn.split('/')[-2:]) for fn in newsgroups_train.filenames]
)
```
[![demo_sklearn.html](https://raw.githubusercontent.com/JasonKessler/jasonkessler.github.io/master/demo_sklearn.png)](https://jasonkessler.github.io/demo_sklearn.html)


Let's take a look at the performance of the classifier:

```python
newsgroups_test = fetch_20newsgroups(subset='test',
                                     remove=('headers', 'footers', 'quotes'))
X_test = vectorizer.transform(newsgroups_test.data)
pred = clf.predict(X_test)
f1 = f1_score(pred, newsgroups_test.target, average='micro')
print("Microaveraged F1 score", f1)
```
Microaveraged F1 score 0.662108337759.  Not bad over a ~0.05 baseline.

### Creating lexicalized semiotic squares

Please see [Signo](http://www.signosemio.com/greimas/semiotic-square.asp) for an 
introduction to semiotic squares.

The idea behind the semiotic square is to express the relationship between two opposing 
concepts and concepts things within a larger domain of a discourse. 
Examples of opposed concepts life or death, male or female, or, in our example, positive or negative sentiment. 
Semiotics squares are comprised of four "corners": the upper two corners are the opposing concepts,
while the bottom corners are the negation of the concepts.  

Circumscribing the negation of a concept involves finding everything in the 
domain of discourse that isn't associated with the concept.  For example, in the 
life-death opposition, one can consider the universe of discourse to be all
animate beings, real and hypothetical. The not-alive category will cover dead things,
but also hypothetical entities like fictional characters or sentient AIs.

In building lexicalized semiotic squares, we consider concepts to be documents labeled
in a corpus.  Documents, in this setting, can belong to one of three categories: two labels corresponding
to the opposing concepts, a neutral category, indicating a document is in the same domain as
the opposition, but cannot fall into one of opposing categories. 

In the example below positive and negative movie reviews are treated as the opposing categories,
while plot descriptions of the same movies are treated as the neutral category.

Terms associated with one of the two opposing categories (relative only to the other) are
listed as being associated with that category.  Terms associated with a netural category 
(e.g., not positive) are terms which are associated with the disjunction of the opposite 
category and the neutral category. For example, not-positive terms are those most associated 
with the set of negative reviews and plot descriptions vs. positive reviews.

Common terms among adjacent corners of the square are also listed.

An HTML-rendered square is accompanied by a scatter plot.  Points on the plot are terms.
The x-axis is the Z-score of the association to one of the opposed concepts. The y-axis
is the Z-score how associated a term is with the neutral set of documents relative to the
opposed set.  A point's red-blue color indicate the term's opposed-association, while
the more desaturated a term is, the more it is associated with the neutral set of documents.       



```python
import scattertext as st
movie_df = st.SampleCorpora.RottenTomatoes.get_data()
movie_df.category = movie_df.category.apply\
	(lambda x: {'rotten': 'Negative', 'fresh': 'Positive', 'plot': 'Plot'}[x])
corpus = st.CorpusFromPandas(
	movie_df,
	category_col='category',
	text_col='text',
	nlp=st.whitespace_nlp_with_sentences
).build()
corpus = corpus.get_unigram_corpus()

semiotic_square = st.SemioticSquare(
	corpus,
	category_a='Positive',
	category_b='Negative',
	neutral_categories=['Plot'],
	scorer=st.RankDifference(),
	labels={'not_a_and_not_b': 'Plot Descriptions', 'a_and_b': 'Reviews'}
)

html = st.produce_semiotic_square_explorer(semiotic_square,
                                           category_name='Positive',
                                           not_category_name='Negative',
                                           x_label='Fresh-Rotten',
                                           y_label='Plot-Review',
                                           neutral_category_name='Plot Description',
                                           metadata=movie_df['movie_name'])
```

[![semiotic square](https://jasonkessler.github.io/semiotic_square_plot.png)](https://jasonkessler.github.io/demo_semiotic.html)

## Examples 

Please see the examples in the [PyData 2017 Tutorial](https://github.com/JasonKessler/Scattertext-PyData) on Scattertext.

## A note on chart layout

[Cozy: The Collection Synthesizer](https://github.com/uwplse/cozy) (Loncaric 2016) was used to help determine 
which terms could be labeled without overlapping a circle or another label.  It automatically built a data structure to efficiently store and query the locations of each circle and labeled term.

The script to build `rectangle-holder.js` was
```
fields ax1 : long, ay1 : long, ax2 : long, ay2 : long
assume ax1 < ax2 and ay1 < ay2
query findMatchingRectangles(bx1 : long, by1 : long, bx2 : long, by2 : long)
    assume bx1 < bx2 and by1 < by2
    ax1 < bx2 and ax2 > bx1 and ay1 < by2 and ay2 > by1
```

And it was called using
```
$ python2.7 src/main.py <script file name> --enable-volume-trees \
  --js-class RectangleHolder --enable-hamt --enable-arrays --js rectangle_holder.js
```

## What's new

### 0.0.2.15-16
Added a very semiotic square creator.

The idea to build a semiotic square that contrasts two categories in a Term Document Matrix
while using other categories as neutral categories.   

See [Creating semiotic squares](#creating-semiotic-squares) for an overview on how to 
use this functionality and semiotic squares.

Added a parameter to disable the display of the top-terms sidebar, e.g.,
`produce_scattertext_explorer(..., show_top_terms=False, ...)`.

An interface to part of the subjectivity/sentiment dataset from 
Bo Pang and Lillian Lee. ``A Sentimental Education: Sentiment Analysis Using Subjectivity Summarization 
Based on Minimum Cuts''. ACL. 2004. See `SampleCorpora.RottenTomatoes`.

Fixed bug that caused tooltip placement to be off after scrolling.   

Made `category_name` and `not_category_name` optional in `produce_scattertext_explorer` etc.

Created the ability to customize tooltips via the `get_tooltip_content` argument to
 `produce_scattertext_explorer` etc., control axes labels via `x_axis_values` 
 and `y_axis_values`.  The `color_func` parameter is a Javascript function to control color of a point.  Function takes a parameter
 which is a dictionary entry produced by `ScatterChartExplorer.to_dict` and returns a string.


### 0.0.2.14
Integration with Scikit-Learn's text-analysis pipeline led the creation of the
`CorpusFromScikit` and `TermDocMatrixFromScikit` classes.

The `AutoTermSelector` class to automatically suggest terms to appear in the visualization.  
This can make it easier to show large data sets, and remove fiddling with the various 
minimum term frequency parameters. 

For an example of how to use `CorpusFromScikit` and `AutoTermSelector`, please see `demo_sklearn.py`

Also, I updated the library and examples to be compatible with spaCy 2.

Fixed bug when processing single-word documents, and set the default beta to 2. 


### 0.0.2.11-13
Added `produce_fightin_words_explorer` function, and adding the PEP 369-compliant 
`__version__` attribute as mentioned in [#19](https://github.com/JasonKessler/scattertext/issues/19).
Fixed bug when creating visualizations with more than two possible categories.  Now, by default, 
category names will not be title-cased in the visualization, but will retain their original case.  
If you'd still like to do this this, use `ScatterChart (or a descendant).to_dict(..., title_case_names=True)`.
Fixed `DocsAndLabelsFromCorpus` for Py 2 compatibility. 


### 0.0.2.10
Fixed bugs in `chinese_nlp` when jieba has already been imported and in p-value
computation when performing log-odds-ratio w/ prior scoring.  

Added demo for performing a Monroe et. al (2008) style visualization of 
log-odds-ratio scores in `demo_log_odds_ratio_prior.py`.   


### 0.0.2.9.*
Breaking change: `pmi_filter_thresold` has been replaced with `pmi_threshold_coefficient`.

Added Emoji and Tweet analysis. See [Emoji analysis](#emoji-analysis).

Characteristic terms falls back ot "Most frequent" if no terms used in the chart are present
in the background corpus.
 
Fixed top-term calculation for custom scores.
 
Set scaled f-score's default beta to 0.5.

Added `--spacy_language_model` argument to the CLI. 

Added the `alternative_text_field` option in `produce_scattertext_explorer` to show an 
alternative text field when showing contexts in the interactive HTML visualization.   

Updated `ParsedCorpus.get_unigram_corpus` to allow for continued 
`alternative_text_field` functionality. 


### 0.0.2.8.6
Added ability to for Scattertext to use noun chunks instead of unigrams and bigrams through the
`FeatsFromSpacyDocOnlyNounChunks` class. In order to use it, run your favorite `Corpus` or 
`TermDocMatrix` factory, and pass in an instance of the class as a parameter: 
```
st.CorpusFromParsedDocuments(..., feats_from_spacy_doc=st.FeatsFromSpacyDocOnlyNounChunks())
```

Fixed a bug in corpus construction that occurs when the last document has no features.

### 0.0.2.8.5
Now you don't have to install tinysegmenter to use Scattertext.  But you need to
install it if you want to parse Japanese.  This caused a problem when Scattertext
was being installed on Windows.

### 0.0.2.8.1-4
Added `TermDocMatrix.get_corner_score`, giving an improved version of the 
Rudder Score.  Exposing `whitespace_nlp_with_sentences`.  It's a lightweight
 bad regex sentence splitter built a top a bad regex tokenizer that somewhat
 apes spaCy's API. Use it if you don't have spaCy and the English model 
 downloaded or if you care more about memory footprint and speed than accuracy.
 
It's not compatible with `word_similarity_explorer` but is compatible with 
 `word_similarity_explorer_gensim'.
 
Tweaked scaled f-score normalization.

Fixed Javascript bug when clicking on '$'. 

### 0.0.2.8.0
Fixed bug in Scaled F-Score computations, and changed computation to better score words that are inversely correlated to category.

Added `Word2VecFromParsedCorpus` to automate training Gensim word vectors from a corpus, and  
`word_similarity_explorer_gensim` to produce the visualization.  

See `demo_gensim_similarity.py` for an example. 


### 0.0.2.7.1
Added the `d3_url` and `d3_scale_chromatic_url` parameters to 
`produce_scattertext_explorer`.  This provides a way to manually specify the paths to "d3.js" 
(i.e., the file from "https://cdnjs.cloudflare.com/ajax/libs/d3/4.6.0/d3.min.js") and
"d3-scale-chromatic.v1.js" (i.e., the file from "https://d3js.org/d3-scale-chromatic.v1.min.js").

This is important if you're getting the error:

```
Javascript error adding output!
TypeError: d3.scaleLinear is not a function
See your browser Javascript console for more details.
``` 

It also lets you use Scattertext if you're serving in an environment with no (or a restricted) 
external Internet connection. 

For example, if "d3.min.js" and "d3-scale-chromatic.v1.min.js" were present in the current
working directory, calling the following code would reference them locally instead of 
the remote Javascript files. See [Visualizing term associations](#visualizing-term-associations) 
for code context. 

```pydocstring
>>> html = st.produce_scattertext_explorer(corpus,
...          category='democrat',
...          category_name='Democratic',
...          not_category_name='Republican',
...          width_in_pixels=1000,
...          metadata=convention_df['speaker'],
...          d3_url='d3.min.js',
...          d3_scale_chromatic_url='d3-scale-chromatic.v1.min.js')
```

### 0.0.2.7.0
Fixed a bug in 0.0.2.6.0 that transposed default axis labels.

Added a Japanese mode to Scattertext.  See `demo_japanese.py` for an example of
 how to use Japanese.  Please run `pip install tinysegmenter` to parse Japanese.

Also, the `chiense_mode` boolean parameter in 
`produce_scattertext_explorer` has been renamed to `asian_mode`.

For example, the output of `demo_japanese.py` is:
[![demo_japanese.html](https://jasonkessler.github.io/demo_japanese.png)](https://jasonkessler.github.io/demo_japanese.html)


### 0.0.2.6.0
Custom term positions and axis labels.  Although not recommended, you can 
visualize different metrics on each axis in visualizations similar to Monroe et al. (2008).
Please see [Custom term positions](#custom-term-positions) for more info.

 
### 0.0.2.5.0
Enhanced the visualization of query-based categorical differences, a.k.a the `word_similarity_explorer`
function. When run, a plot is produced that contains category associated terms 
colored in either red or blue hues, and terms not associated with either class
colored in greyscale and slightly smaller. The intensity of each color indicates 
 association with the query term.  For example:
 
[![Convention-Visualization-Jobs.html](https://jasonkessler.github.io/Conventions-Viz-Explanation.png)](https://jasonkessler.github.io/Convention-Visualization-Jobs.html)

### 0.0.2.4.6
Some minor bug fixes, and added a `minimum_not_category_term_frequency` parameter.  This fixes a problem with 
visualizing imbalanced datasets.  It sets a minimum number of times a word that does not appear in the target 
category must appear before it is displayed.

Added `TermDocMatrix.remove_entity_tags` method to remove entity type tags 
from the analysis. 

### 0.0.2.4.5
Fixed matched snippet not displaying issue [#9](/../../issues/9), and fixed a Python 2 issue 
in created a visualization using a `ParsedCorpus` prepared via `CorpusFromParsedDocuments`, mentioned
in the latter part of the issue [#8](/../../issues/8) discussion.

Again, Python 2 is supported in experimental mode only.

### 0.0.2.4.4
Corrected example links on this Readme.
   
Fixed a bug in Issue 8 where the HTML visualization produced by `produce_scattertext_html` would fail.

### 0.0.2.4.2
Fixed a couple issues that rendered Scattertext broken in Python 2. Chinese processing still does not work.

Note: Use Python 3.4+ if you can.

### 0.0.2.4.1
Fixed links in Readme, and made regex NLP available in CLI.

### 0.0.2.4
Added the command line tool, and fixed a bug related to Empath visualizations.

### 0.0.2.3
Ability to see how a particular term is discussed differently between categories
through the `word_similarity_explorer` function. 

Specialized mode to view sparse term scores.

Fixed a bug that was caused by repeated values in background unigram counts.

Added true alphabetical term sorting in visualizations.
  
Added an optional save-as-SVG button.

### 0.0.2.2

Addition option of showing characteristic terms (from the full set of documents) being considered.
The option (`show_characteristic` in `produce_scattertext_explorer`) is on by default, 
but currently unavailable for Chinese.  If you know of a good Chinese wordcount list,
please let me know.  The algorithm used to produce these is F-Score.  See [this and the following slide](http://www.slideshare.net/JasonKessler/turning-unstructured-content-into-kernels-of-ideas/58) for more details

### 0.0.2.1.5

Added document and word count statistics to main visualization. 

### 0.0.2.1.4

Added preliminary support for visualizing [Empath](https://github.com/Ejhfast/empath-client) (Fast 2016) topics categories instead of emotions.  See the tutorial for more information. 

### 0.0.2.1.3

Improved term-labeling.

### 0.0.2.1.1

Addition of `strip_final_period` param to `FeatsFromSpacyDoc` to deal with spaCy 
 tokenization of all-caps documents that can leave periods at the end of terms.

### 0.0.2.1.0

I've added support for Chinese, including the ChineseNLP class, which uses a RegExp-based 
sentence splitter and [Jieba](https://github.com/fxsjy/jieba) for word 
segmentation. To use it, see the `demo_chinese.py` file.  Note that `CorpusFromPandas`
currently does not support ChineseNLP.

In order for the visualization to work, set the `asian_mode` flag to `True` in
`produce_scattertext_explorer`.

## Sources
* 2012 Convention Data: scraped from [The New York Times.](http://www.nytimes.com/interactive/2012/09/06/us/politics/convention-word-counts.html?_r=0)
* count_1w: Peter Norvig assembled this file (downloaded from [norvig.com](http://norvig.com/ngrams/count_1w.txt)). See http://norvig.com/ngrams/ for an explanation of how it was gathered from a very large corpus.
* hamlet.txt: William Shakespeare. From [shapespeare.mit.edu](http://shakespeare.mit.edu/hamlet/full.html)
* Inspiration for text scatter plots: Rudder, Christian. Dataclysm: Who We Are (When We Think No One's Looking). Random House Incorporated, 2014.
* Loncaric, Calvin. "Cozy: synthesizing collection data structures." Proceedings of the 2016 24th ACM SIGSOFT International Symposium on Foundations of Software Engineering. ACM, 2016.
* Fast, Ethan, Binbin Chen, and Michael S. Bernstein. "Empath: Understanding topic signals in large-scale text." Proceedings of the 2016 CHI Conference on Human Factors in Computing Systems. ACM, 2016.
* Burt L. Monroe, Michael P. Colaresi, and Kevin M. Quinn. 2008. Fightin’ words: Lexical feature selection and evaluation for identifying the content of political conflict. Political Analysis.
* Bo Pang and Lillian Lee. A Sentimental Education: Sentiment Analysis Using Subjectivity Summarization Based on Minimum Cuts, Proceedings of the ACL, 2004.
* Abram Handler, Matt Denny, Hanna Wallach, and Brendan O'Connor. Bag of what? Simple noun phrase extraction for corpus analysis.  NLP+CSS Workshop at EMNLP 2016.

