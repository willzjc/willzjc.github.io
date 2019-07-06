import datetime
import time
import re
import sys
import pandas as pd
import patsy

from auxiliary.data_container import data_rows
from matrix_manipulations import calculate_analytics

from auxiliary import web_get

# Local Module loading
import create_webfiles_table,create_webfiles_scatterplot ,create_webfiles_dcjs

global url,page_loop_counter, pagination_offset, total_car_count, LIVE_DATA,df,db_save
global car_ids
global ages
global milages
global prices
global links
global titles
global thisyear
global pagination_offset
global total_car_count
global dage
global dmilage
global dprice


db_save=True

df = pd.DataFrame(columns=['id','title','link','make','model','series','transmission','price','milage','age'])

entry_already_in_db =False
run_until_pagenum   =0     # Set to higher if you want to live scrape but terminate earlier
LIVE_DATA           =True
# LIVE_DATA=False       # Uncomment if you want to simulate scraping and just do parsing

car_ids             =[]
ages                =[]
milages             =[]
prices              =[]
links               =[]
titles              =[]
thisyear            =   datetime.datetime.now().year
pagination_offset   =   60
total_car_count           =   0

dage                = data_rows()
dmilage             = data_rows()
dprice              = data_rows()

dage.label          =  'Age'
dage.sets           =  ages
dage.coefficient    =   1
dage.ratings        =   []

dmilage.label       = 'Milage'
dmilage.sets        = milages
dmilage.coefficient = 2
dmilage.ratings     = []

dprice.label        = 'Price'
dprice.sets         = prices
dprice.coefficient  = 3.5
dprice.ratings      = []


def parse_numeric(input):
    if len(input) < 1: return 0
    else:
        for char in ['$','*','km',',','(',')',' ']:
            input=input.replace(char,'')
        try:
            return int(input)
        except Exception as e:
            print 'Exception: ', e
            return 0
def parse_float(input):
    if len(input) < 1: return 0
    else:
        for char in ['$','*','km',',','(',')',' ']:
            input=input.replace(char,'')
        try:
            return float(input)
        except Exception as e:
            print 'Exception: ', e
            return 0

def get_useful_xml_elements(tree,df):

    global car_ids
    global ages
    global milages
    global prices
    global links
    global titles
    global thisyear
    global pagination_offset
    global total_car_count
    global dage
    global dmilage
    global dprice

    global total_car_count
    
    def merge_tokens(tokens, patterns):
        # line = ' '.join(tokens)
        if filter(lambda x: filter(lambda y: x in y.lower(), tokens), patterns):
            tokens[1] = tokens[1] + ' ' + tokens[2]
            tokens = tokens[0:2] + tokens[3:]
    
    # < span   class ="count" > (1, 539) < / span >
    # Get total tocs

    # Find header, concatenant list results, split based on space as a delimiter and get first element, parse into int
    if total_car_count==0:
        total_car_count = parse_numeric(''.join(tree.xpath("//div[contains(@class,'max results')]/h1/text()")).split(' ')[0])

    for element_count,element in enumerate(tree.xpath("//div[contains(@class, 'listing-item')]")):
        header = element.xpath(
            "div[contains(@class, 'listing-header')]/div[contains(@class, 'n_columns')]/div[contains(@class, 'save-button')]/@data-csn-item-id")
        title_string  = element.xpath("div[contains(@class, 'listing-header')]/div[contains(@class, 'n_columns')]/div[contains(@class, 'n_width-max title ')]/a/h2/text()")
        price_string  = element.xpath("div[contains(@class, 'listing-body')]/div[contains(@class,'n_columns')]/div[contains(@class, 'price')]" +
           "/a/div[contains(@class,'price')][text()[contains(.,'$')]]" +
           "/text()")
        # // span[contains( @class , 'myclass') and text() = 'qwerty']

        milage_string = element.xpath("div[contains(@class, 'listing-body')]/div[contains(@class,'n_columns')]" +
               "/div[contains(@class, 'ad-features')]/div[contains(@class, 'vehicle-features')]/div[contains(@class, 'listing-feature')]" +
               "/div[contains(@class, 'feature-text')][text()[contains(.,'km')]]/text()")

        link_string = element.xpath("div[contains(@class, 'listing-header')]/div[contains(@class, 'n_columns')]/div[contains(@class, 'n_width-max title ')]/a/@href")

        price = parse_float(''.join(price_string))

        if len(title_string)>0 and price > 0:

            # df.loc[len(df)] = [car_id, titles[index], links[index], make, model, series, transmission,
            #                    dprice.sets[index], dmilage.sets[index], dage.sets[index]]

            car_id='.'.join(header).strip()
            title_string = ''.join(title_string).strip()
            car_description = ''.join(title_string).strip()
            age = thisyear - parse_numeric(''.join(title_string).strip()[:4])
            milage = parse_float(''.join(milage_string).strip())
            link = 'https://www.carsales.com.au' + ''.join(link_string).strip()
            make = ''
            model = ''
            series = ''

            # Post processing - Title contains make, model, and series information, so extract as such
            # As such it requires tokenization
            try:

                # split description/title string
                car_description_tokenized = car_description.split(' ')
############################## Car Make Combiner  ##############################
                if filter(lambda x: x in car_description.lower(), ['aston martin', 'land rover']):
                    # car_description=car_description.replace(' ','-',2)
                    car_description_tokenized[1] = car_description_tokenized[1]+' '+car_description_tokenized[2]
                    car_description_tokenized = car_description_tokenized[0:2] + car_description_tokenized[3:]

############################## Car Model Combiner ##############################
                make = car_description_tokenized[1]
                if filter(lambda x: x in car_description_tokenized[2].lower(), ['v8', 'v10', 'v12']):
                    car_description_tokenized[1] = car_description_tokenized[1]+' '+car_description_tokenized[2]
                    car_description_tokenized = car_description_tokenized[0:2] + car_description_tokenized[3:]

                model = car_description_tokenized[2]
                series = (' '.join(car_description_tokenized[3:])).replace('Auto', '').replace('Manual', '').strip()
                transmission = car_description_tokenized[-1]
            except Exception as e:
                print 'String op failed: ',e

            car_ids.append(car_id)
            titles.append(car_description)
            ages.append(age)
            prices.append(price)
            milages.append(milage)

            links.append(link)

            print len(df), [
                car_id,
                car_description,
                link,
                make,
                model,
                series,
                transmission,
                price,
                milage,
                age
            ]
            df.loc[len(df)] = [
                car_id,
                car_description,
                link,
                make,
                model,
                series,
                transmission,
                price,
                milage,
                age
            ]

    return df

def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

def quote(s):
    if is_number(s):
        return str(s)
    else:
        return str("'"+s+"'")


def save_to_db(df):

    global db_save
    global car_ids
    global ages
    global milages
    global prices
    global links
    global titles
    global thisyear
    global pagination_offset
    global total_car_count
    global dage
    global dmilage
    global dprice

    print 'Scraping Finished - Time for Analytics'
    output = open('output/process_id_dump_output.csv','w')
    headerline='id,Title,Age,Age_rating,Milage,Milage_rating,Price,Price_rating,Sum_rating,Predicted_PriceLink'
    output.write(headerline+'\n')

    db_interface = None

    if db_save:
        import auxiliary.db_operations as dbo
        db_interface = dbo.db_interface()

        print 'Saving to database'

        db_interface.save_update_df(df)

    output.write('\0')
    output.close()

    print 'doc_count = ' , total_car_count

def regex_replace(url,parameter,new_number):
    if not parameter+'=' in url: url=url+'&'+parameter+'=24'
    url=url.replace('&&'+parameter+'=', '&' + parameter + '=')

    new_parameter_metric=str(new_number)
    m = re.search(str(parameter) + "\\=\\d+", str(url))
    parameter_replace=m.group(0)
    m2 = re.search('\\d+',parameter_replace).group(0)
    new_string= parameter_replace.replace(m2,'')+str(new_parameter_metric)
    url=url.replace(parameter_replace, new_string)
    return url

def pagination_scrape(page_loop_counter,url,pagination_offset,doc_count,LIVE_DATA,df):

    while (page_loop_counter * pagination_offset <= doc_count and LIVE_DATA):
        url = regex_replace(url, 'offset', 11 * page_loop_counter)
        url = regex_replace(url, 'limit', 12)

        print 'Processing: ', 12 * page_loop_counter, url
        web_xml_tree = web_get.scrape_url(url, True)
        df=get_useful_xml_elements(web_xml_tree,df)
        time.sleep(1)

        page_loop_counter += 1
    return df

# Main Application

def main():

    global url,page_loop_counter,pagination_offset,total_car_count,LIVE_DATA,df,db_save


    url_list = open('url_list','r').read().split('\n')
    url = [url for url in url_list if len(url.strip()) > 0 and url.strip()[0] != '#'][-1]


    print sys.argv

    if len(sys.argv) > 1:
        url=sys.argv[1]

    print url

    db_save = False
    USE_LOCAL_COPY = False

    ######################################################################################
    print 'Processing first page: ' + url
    web_xml_tree = web_get.scrape_url(url, overwrite=False,use_local_copy=USE_LOCAL_COPY)
    df=get_useful_xml_elements(web_xml_tree,df)

    print 'First Page complete - total items:', total_car_count
    print 'Now on to subsequent remaining items'
    df=pagination_scrape(page_loop_counter=0, url=url,pagination_offset=12,doc_count=total_car_count,LIVE_DATA=not USE_LOCAL_COPY,df=df)


    print 'Total items: ', total_car_count


    weightings = {
    # See coefficients below
        'age': 1,
        'milage': 2,
        'price':3
    }

    df,prediction_model=calculate_analytics(df,weightings)

    if db_save:
        save_to_db(df=df)

    # Create basic table
    create_webfiles_table.create_web_files(df, weightings,
        extpath='../../../web/valuerating/', prediction_model=prediction_model,
        USE_LOCAL_COPY=USE_LOCAL_COPY)

    #Get car model name
    model=df.loc[0]['model'].lower()

    # Creates scatterplot webhost output files (for model only)
    create_webfiles_scatterplot.run_create_all()

    # Creates dcjs webhost output files (redoes entire db repo)
    create_webfiles_dcjs.run_create_all()

if __name__ == "__main__":
    main()