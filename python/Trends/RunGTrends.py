import time, sys, os
from random import randint

import pandas as pd
from pytrends.request import TrendReq

from Auxiliary import sanitize_name, create_if_required

# Instantiation
pytrend = TrendReq()

# Keywords / input file
keywords                        = pd.read_csv('input/ccy_pairs.csv')


# Functional variables
use_normalizer                  = False
normalizer_keyword              = 'EURUSD'
combined_frame                  = None
kw_list                         = []
pframes                         = []

# File output variables
base_name                       = 'output_matrix/currency'
regular_path                    = base_name + '/regular_data/'
singular_path                   = base_name + '/combined_frame/singular'
combined_frame_path             = base_name + '/combined_frame'

# Ensuring all relevant paths exists
create_if_required(regular_path)
create_if_required(singular_path)
create_if_required(combined_frame_path)

# Looping Variables - Matrx retry attempt
max_list                        = 1
if use_normalizer: max_list     = 5

# Main sentinel
def main():

    global use_normalizer
    global normalizer_keyword
    global combined_frame
    global kw_list
    global pframes
    global base_name
    global regular_path
    global singular_path
    global combined_frame_path

    for index, row in keywords.iterrows():
        current_line=row[0]
        kw_list.append(current_line)
        print current_line

        random_timer_delay=0

        if len(kw_list) >= max_list:

            if use_normalizer:
                kw_list.insert(0, normalizer_keyword)
                print("Downloading Keyword #" + str(index), kw_list,';  Normalizer=', normalizer_keyword, ';  Delay Timer=', random_timer_delay)
            else:
                print("Downloading Keyword #" + str(index), kw_list,'. Delay Timer=',random_timer_delay)

            retry=0
            while retry < 2:
                try:

                    # Time is delayed randomly
                    time.sleep(random_timer_delay)
                    random_timer_delay = randint(3, 9)

                    # Actualy scraping and building of data
                    pytrend.build_payload(kw_list, cat=0, timeframe='today 5-y', geo='', gprop='')


                    # Create output filename
                    csvname = (regular_path + str(index) + '_' + sanitize_name(row[0]) + '.csv')
                    result = None

                    result=pytrend.interest_over_time()

                    print 'pytrend.interest_over_time()\n==============\n' + str(result) + '\n\n'
                    # print 'pytrend.interest_by_region()\n==============\n' +  str(pytrend.interest_by_region()) + '\n\n'
                    # print 'pytrend.related_topics()\n==============\n' +  str(pytrend.related_topics()) + '\n\n'
                    # print 'pytrend.related_queries()\n==============\n' +  str(pytrend.related_queries()) + '\n\n'


                    if combined_frame is None :
                        # print 'First Frame - ', result
                        combined_frame = result
                    else:
                        # print 'Merging - ', combined_frame,' and ', result
                        combined_frame = combined_frame.merge(result, left_index=True, right_index=True, how='outer', suffixes=('', '_y'))

                    cols = [c for c in combined_frame.columns
                            if 'ispartial' not in c.lower() and '_y' not in c.lower()]

                    combined_frame = combined_frame[cols] # filters out useless columns
                    # combined_frame=pd.concat([combined_frame, result[cols]], axis=1)
                    combined_frame.to_csv(combined_frame_path + 'combined_' + str(index) + '.csv')
                    combined_frame.to_csv(singular_path + '/combined.csv')

                    pframes.append(result)
                    result.to_csv(csvname)

                    # Sleep

                    retry += 1
                except Exception as e:
                    exc_type, exc_obj, exc_tb = sys.exc_info()
                    fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
                    print(exc_type, fname, exc_tb.tb_lineno)

            kw_list=[]

if __name__ == "__main__":
    main()