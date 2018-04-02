import datetime
import time
import re

import pandas as pd
import run_create_dcjs
from auxiliary.data_container import data_rows
from matrix_manipulations import calculate_analytics

from auxiliary import web_get

from run_create_scatterplot import *
from run_create_table import *

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
    # < span   class ="count" > (1, 539) < / span >
    # Get total tocs

    # Find header, concatenant list results, split based on space as a delimiter and get first element, parse into int
    if total_car_count==0:
        total_car_count = parse_numeric(''.join(tree.xpath("//div[contains(@class,'max results')]/h1/text()")).split(' ')[0])

    for element in tree.xpath("//div[contains(@class, 'listing-item')]"):
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
            title = ''.join(title_string).strip()
            age = thisyear - parse_numeric(''.join(title_string).strip()[:4])
            milage = parse_float(''.join(milage_string).strip())
            link = 'https://www.carsales.com.au' + ''.join(link_string).strip()
            make = ''
            model = ''
            series = ''

            # Post processing - Title contains make, model, and series information, so extract as such
            try:
                make = title.split(' ')[1]
                model = title.split(' ')[2]
                series = (' '.join(title.split(' ')[3:])).replace('Auto', '').replace('Manual', '').strip()
                transmission = title.split(' ')[-1]
            except Exception as e:
                print 'String op failed: ',e

            car_ids.append(car_id)
            titles.append(title)
            ages.append(age)
            prices.append(price)
            milages.append(milage)

            links.append(link)

            df.loc[len(df)] = [
                car_id,
                title,
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


def save_to_db():

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

    for index, row in df.iterrows():
        # print row
        db_interface.db_save_df(row)

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
        url = regex_replace(url, 'offset', 59 * page_loop_counter)
        url = regex_replace(url, 'limit', 60)

        print 'Processing: ', 60 * page_loop_counter, url
        web_xml_tree = web_get.scrape_url(url, True)
        df=get_useful_xml_elements(web_xml_tree,df)
        time.sleep(3)

        page_loop_counter += 1
    return df

# Main Application
def main():

    global url,page_loop_counter,pagination_offset,total_car_count,LIVE_DATA,df,db_save

    # USE_LOCAL_COPY = False
    # bmw 3 series
    url = 'https://www.carsales.com.au/car/bmw/3-series-marketinggroup/new-south-wales-state/?limit=24&setype=pagination&sortby=LastUpdated&offset=0&silo=stock&WT.z_srchsrcx=makemodel&'
    # toyota camry
    url = 'https://www.carsales.com.au/car/toyota/camry/altise-badge/new-south-wales-state/?offset=0&setype=pagination&limit=24&WT.z_srchsrcx=makemodel&'
    # honda civic
    url = 'https://www.carsales.com.au/car/honda/civic/new-south-wales-state/sedan-bodystyle/4-doors/?offset=24&setype=pagination&limit=24&WT.z_srchsrcx=makemodel&'
    # mazda 3 really filtered
    url = 'https://www.carsales.com.au/cars/results?q=%28And.Year.range%282010..%29._.Service.Carsales._.%28C.Make.Mazda._.Model.3.%29_.State.New%20South%20Wales._.FuelEconomy.7L%2F100km%20or%20less._.Doors.4.%29&sortby=TopDeal&limit=12'
    # toyota prius (all models)
    url = 'https://www.carsales.com.au/cars/results?q=%28And.Service.Carsales._.State.New%20South%20Wales._.%28Or.%28C.Make.Toyota._.Model.Prius.%29_.%28C.Make.Toyota._.Model.Prius%20C.%29_.%28C.Make.Toyota._.Model.Prius%20V.%29%29%29&silo=stock&WT.z_srchsrcx=makemodel&sortby=TopDeal'
    # bmw 3 series nsw, > 2010
    url = 'https://www.carsales.com.au/cars/results?sortby=TopDeal&limit=12&q=%28And.%28C.Make.BMW._.MarketingGroup.3+Series.%29_.State.New+South+Wales._.Year.range%282010..%29.%29'

    url = 'https://www.carsales.com.au/car/toyota/camry/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel&'
    url = 'https://www.carsales.com.au/car/honda/accord/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel&'
    url = 'https://www.carsales.com.au/car/honda/civic/new-south-wales-state/?WT.z_srchsrcx=makemodel'
    # bmw-320i
    url = 'https://www.carsales.com.au/car/bmw/320i/3-series-marketinggroup/new-south-wales-state/?WT.z_srchsrcx=makemodel'

    # corolla
    url = 'https://www.carsales.com.au/cars/results?sortby=TopDeal&limit=12&q=%28And.Service.Carsales._.%28C.Make.Toyota._.Model.Corolla.%29_.State.New+South+Wales._.Price.range%28..20200%29.%29'

    # camry - desc updated, sub $150000, NSW
    url = 'https://www.carsales.com.au/cars/results?sortby=LastUpdated&limit=12&q=%28And.Service.Carsales._.%28C.Make.Toyota._.Model.Camry.%29_.State.New+South+Wales._.Price.range%28..15150%29.%29'

    # honda civic
    url = 'https://www.carsales.com.au/car/honda/civic/new-south-wales-state/?sortby=LastUpdated&offset=0&setype=sort&silo=stock&vertical=car&WT.z_srchsrcx=makemodel&'

    url = 'https://www.carsales.com.au/car/nissan/micra/new-south-wales-state/?WT.z_srchsrcx=makemodel'

    # Toyota Camry NSW (no price cap)
    url = 'https://www.carsales.com.au/car/toyota/camry/new-south-wales-state/?sortby=LastUpdated&offset=0&setype=sort&area=Stock&vertical=car&WT.z_srchsrcx=makemodel&'

    # Lancer
    url = 'https://www.carsales.com.au/car/mitsubishi/lancer/new-south-wales-state/?sortby=LastUpdated&offset=0&setype=sort&WT.z_srchsrcx=makemodel&'

    # Yaris
    url = 'https://www.carsales.com.au/car/toyota/yaris/new-south-wales-state/?sortby=LastUpdated&WT.z_srchsrcx=makemodel'

    # Pulsar
    url = 'https://www.carsales.com.au/car/nissan/pulsar/new-south-wales-state/?WT.z_srchsrcx=makemodel'

    # corolla
    url = 'https://www.carsales.com.au/cars/results?sortby=TopDeal&limit=12&q=%28And.Service.Carsales._.%28C.Make.Toyota._.Model.Corolla.%29_.State.New+South+Wales._.Price.range%28..20200%29.%29'

    # Honda Civic
    url = 'https://www.carsales.com.au/cars/results?q=%28And.Service.Carsales._.Odometer.range%280..120000%29._.State.New%20South%20Wales._.BodyStyle.Sedan._.GenericGearType.Automatic._.%28C.Make.Honda._.Model.Civic.%29%29&sortby=~Price&limit=12'

    # Corolla < 150,000km, > 2005, auto
    url = 'https://www.carsales.com.au/cars/results?q=%28And.Price.range%28..20200%29._.Odometer.range%280..150000%29._.Year.range%282004..%29._.Service.Carsales._.%28C.Make.Toyota._.Model.Corolla.%29_.State.New%20South%20Wales._.GenericGearType.Automatic.%29&sortby=~Price&limit=12'

    # Volvo - XC60 - NSW
    url = 'https://www.carsales.com.au/car/volvo/xc60/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel&'

    url = 'https://www.carsales.com.au/cars/results?q=%28And.Price.range%28..20200%29._.Odometer.range%280..150000%29._.Year.range%282004..%29._.Service.Carsales._.%28C.Make.Toyota._.Model.Corolla.%29_.State.New%20South%20Wales._.GenericGearType.Automatic.%29&sortby=~Price&limit=12'

    # Mazda Hatch
    url = 'https://www.carsales.com.au/car/mazda/3/new-south-wales-state/hatch-bodystyle/?WT.z_srchsrcx=makemodel'

    # corolla
    url = 'https://www.carsales.com.au/cars/results?sortby=TopDeal&limit=12&q=%28And.Service.Carsales._.%28C.Make.Toyota._.Model.Corolla.%29_.State.New+South+Wales._.Price.range%28..20200%29.%29'

    #################################################################

    # url='https://www.carsales.com.au/cars/dodge/caliber/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url = 'https://www.carsales.com.au/cars/results?sortby=TopDeal&limit=12&q=%28And.Service.Carsales._.%28C.Make.Toyota._.%28C.Model.Camry._.Badge.Altise.%29%29_.State.New+South+Wales._.Price.range%28..10100%29.%29'
    url = 'https://www.carsales.com.au/cars/lotus/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url = 'https://www.carsales.com.au/cars/nissan/micra/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'

    url = 'https://www.carsales.com.au/cars/bmw/116i/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/kia/grandcarnival/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/results?q=(And.Service.Carsales._.(C.Make.Subaru._.Model.Forester.)_.State.New%20South%20Wales._.Price.range(..10000).)&area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/chevrolet/camaro/coupe-bodystyle/'
    url='https://www.carsales.com.au/cars/results?q=%28And.Postcode.poi%282000x25km%29._.Year.range%282010..%29._.Service.Carsales._.%28C.Make.Volkswagen._.Model.Golf.%29_.State.New%20South%20Wales._.FuelType.Diesel.%29&sortby=TopDeal&limit=12'
    url='https://www.carsales.com.au/cars/results?sortby=TopDeal&limit=12&q=%28And.Price.range%28..15000%29._.Service.Carsales._.%28C.Make.Holden._.Model.Astra.%29_.State.New+South+Wales._.GenericGearType.Automatic._.Year.range%282007..%29.%29'
    url='https://www.carsales.com.au/cars/results?sortby=TopDeal&limit=12&q=%28And.Service.Carsales._.%28C.Make.Holden._.Model.Astra.%29_.State.New+South+Wales._.GenericGearType.Automatic._.Year.range%282007..%29._.Price.range%28..20200%29.%29'
    url='https://www.carsales.com.au/cars/results?q=(And.Service.Carsales._.(C.Make.BMW._.(C.MarketingGroup.X%20Models._.Model.X5.))_.State.New%20South%20Wales._.Price.range(..70000).)&area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/bmw/320i/3-series-marketinggroup/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/bmw/320d/3-series-marketinggroup/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/results?sortby=TopDeal&limit=12&q=%28And.Service.Carsales._.%28C.Make.Toyota._.Model.Corolla.%29_.State.New+South+Wales._.Price.range%28..15150%29._.Year.range%282009..%29.%29'
    url='https://www.carsales.com.au/cars/honda/cr-v/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url = 'https://www.carsales.com.au/cars/audi/q5/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/nissan/370z/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/bmw/335i/3-series-marketinggroup/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/results?sortby=TopDeal&limit=12&q=%28And.%28C.Make.BMW._.%28C.MarketingGroup.3+Series._.Model.335i.%29%29_.Year.range%282013..2014%29.%29'
    url='https://www.carsales.com.au/cars/subaru/liberty/new-south-wales-state/automatic-transmission/?WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/nissan/350z/?WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/results?q=%28And.Service.Carsales._.%28Or.%28C.Make.Nissan._.Model.350Z.%29_.%28C.Make.Nissan._.Model.370Z.%29%29%29&WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/results?sortby=TopDeal&limit=12&q=%28And.%28C.Make.Mazda._.Model.3.%29_.State.New+South+Wales._.GenericGearType.Automatic._.Year.range%282010..%29._.Postcode.poi%282000x50km%29.%29'
    url='https://www.carsales.com.au/cars/results?sortby=TopDeal&limit=12&q=%28And.%28C.Make.Toyota._.Model.Camry.%29_.State.New+South+Wales._.Year.range%280..2014%29.%29'


    url='https://www.carsales.com.au/cars/results?q=%28And.Service.Carsales._.State.New%20South%20Wales._.%28Or.%28C.Make.Toyota._.Model.Prius.%29_.%28C.Make.Toyota._.Model.Prius%20C.%29_.%28C.Make.Toyota._.Model.Prius%20V.%29%29%29&WT.z_srchsrcx=makemodel'

    #BMW 320
    url='https://www.carsales.com.au/cars/results?q=%28And.Service.Carsales._.State.New%20South%20Wales._.%28Or.%28C.Make.BMW._.%28C.MarketingGroup.3%20Series._.Model.320i.%29%29_.%28C.Make.BMW._.Model.320d.%29%29%29&WT.z_srchsrcx=makemodel'
    url='https://www.carsales.com.au/cars/toyota/camry/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'

    url='https://www.carsales.com.au/cars/results?q=%28And.Service.Carsales._.%28Or.%28C.Make.Nissan._.Model.350Z.%29_.%28C.Make.Nissan._.Model.370Z.%29%29%29&WT.z_srchsrcx=makemodel'

    #C200
    url = 'https://www.carsales.com.au/cars/results?q=%28And.Service.Carsales._.State.New%20South%20Wales._.%28Or.%28C.Make.Mercedes-Benz._.%28C.MarketingGroup.C%20Class._.Model.C200.%29%29_.%28C.Make.Mercedes-Benz._.Model.C200%20Kompressor.%29_.%28C.Make.Mercedes-Benz._.Model.C200%20CDI.%29%29%29&WT.z_srchsrcx=makemodel'


    # BMW M3 20180401
    url='https://www.carsales.com.au/cars/bmw/m3/m-models-marketinggroup/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'


    #Audi RS7
    url='https://www.carsales.com.au/cars/audi/rs7/'

    #Astin Martin
    url='https://www.carsales.com.au/cars/astonmartin/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'

    # BMW All 3 Series
    url='https://www.carsales.com.au/cars/bmw/3-series-marketinggroup/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'

    # VW Polo
    url='https://www.carsales.com.au/cars/volkswagen/polo/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    # url='https://www.carsales.com.au/cars/volkswagen/polo/66tsi-trendline-badge/new-south-wales-state/?WT.z_srchsrcx=makemodel'

    # Mercedes C250
    url='https://www.carsales.com.au/cars/mercedesbenz/c250/c-class-marketinggroup/new-south-wales-state/?WT.z_srchsrcx=makemodel'
    # Mercedes C63
    url='https://www.carsales.com.au/cars/mercedesbenz/c63/c-class-marketinggroup/new-south-wales-state/?area=Stock&vertical=car&WT.z_srchsrcx=makemodel'
    db_save = False
    USE_LOCAL_COPY = False

    ######################################################################################
    print 'Processing first page: ' + url
    web_xml_tree = web_get.scrape_url(url, overwrite=False,use_local_copy=USE_LOCAL_COPY)
    df=get_useful_xml_elements(web_xml_tree,df)

    print 'First Page complete - total items:', total_car_count
    print 'Now on to subsequent remaining items'
    df=pagination_scrape(page_loop_counter=0, url=url,pagination_offset=60,doc_count=total_car_count,LIVE_DATA=not USE_LOCAL_COPY,df=df)


    print 'Total items: ', total_car_count


    weightings = {
    # See coefficients below
        'age': 1,
        'milage': 2,
        'price':3
    }

    df,prediction_model=calculate_analytics(df,weightings)
    if db_save:
        save_to_db()

    create_web_files(df, weightings, extpath='../../../web/valuerating/', prediction_model=prediction_model, USE_LOCAL_COPY=USE_LOCAL_COPY)

    #Get scatterplot and recreate

    #Get model
    model=df.loc[0]['model'].lower()

    # Creates scatterplot webhost output files (for model only)
    run_create_scatterplot_from_model(model)
    # Creates dcjs webhost output files (redoes entire db repo)
    run_create_dcjs.run_all()

if __name__ == "__main__":
    main()

