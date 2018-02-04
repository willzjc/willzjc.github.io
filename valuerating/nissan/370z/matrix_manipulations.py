# Updated 20180121 9:26 PM
import datetime
import json
import pandas


def calculate_analytics(df, weightings=None):
    if weightings is None:
        # defaults
        weightings = {
            'age': 1,
            'milage': 2,
            'price': 3
        }

    # Recalculate Ratings based on STD
    for metric in ['age', 'milage', 'price']:
        df[metric + '_std'] = df[metric].std()
        df[metric + '_mean'] = df[metric].mean()
        df[metric + '_rating'] = (df[metric + '_mean'] - df[metric]) / df[metric + '_std']

    # Do the mass arithmetic operation to each row with one SINGLE command... wow!
    df['sum_rating'] = weightings['age'] * df['age_rating'] \
                       + weightings['milage'] * df['milage_rating'] \
                       + weightings['price'] * df['price_rating']

    # Sort by sum of all ratings
    df = df.sort_values(by=['sum_rating'], ascending=False)

    cleanup = True
    if cleanup:
        # Removal of columns
        for metric in ['age', 'milage', 'price']:
            df = df.drop([metric + '_std'], axis=1)
            df = df.drop([metric + '_mean'], axis=1)

    # Force inserts a column called 'row_count' into dtaframe
    df.insert(0, 'row_count', range(1, len(df) + 1))

    import statsmodels.api as sm  # Required for regression prediction

    # print df
    df_X = df[['milage', 'age']]  # Choose variables
    df_X = sm.add_constant(df_X)  # Add constant
    df_y = df.price  # Choose target

    prediction_model = sm.OLS(df_y.astype(float), df_X.astype(float)).fit()
    df['market_price'] = (
            (df['milage'] * prediction_model.params['milage']) + (df['age'] * prediction_model.params['age']) +
            prediction_model.params['const']).astype(int)

    df['price_difference'] = (df['market_price'] - df['price']).astype(int)

    print prediction_model.summary()
    return df, prediction_model


def save_output_files(df, weightings=None,
                      extpath='C:/local/apps/wamp64/www/github/willzjc.github.io/valuerating/', prediction_model=None
                      ):
    if weightings is None:
        # defaults
        weightings = {
            'age': 1,
            'milage': 2,
            'price': 3
        }

    summarylist = {}
    for metric in ['age', 'milage', 'price', 'sum_rating', 'price_difference']:
        summarylist[metric + '_max'] = float(df[metric].max())
        summarylist[metric + '_min'] = float(df[metric].min())

    for metric in weightings.keys():
        summarylist[metric + '_weight'] = weightings[metric]

    # File Saving
    # Saves as CSV firstly

    df.to_csv('output/records.csv')

    for path in ['output/records.json', extpath + 'data/records.json']:
        with open(path, 'w') as f:
            j = json.loads(df.to_json(orient='records'))
            f.write(json.dumps(j, indent=4, separators=(',', ': ')))
            f.close()

    for path in ['output/summary.json', extpath + 'data/summary.json']:
        with  open(path, 'w') as f:
            f.write(json.dumps(summarylist, indent=4, separators=(',', ': ')))
            f.close()

    #################################################
    # This step saves to the Webpage

    with  open('output/titles.csv', 'w') as f:
        f.write(','.join(df.columns.tolist()))
        f.close()


def main():
    import auxiliary.db_operations as dbo

    query = "select * from cars where date_created > '%s' and make like 'toyota' and model like 'prius' " % datetime.datetime(
        2017, 1, 1).isoformat()
    query = "select * from cars where date_created > '%s' and make like 'bmw'" % datetime.datetime(
        2018, 1, 1).isoformat()

    query = "select * from cars where date_created >= '%s' and make like 'bmw'" % datetime.datetime(
        2018, 1, 21).isoformat()

    db_interface = dbo.db_interface()

    df = pandas.read_sql(query, con=db_interface.connection)
    # Rearrangement of 2 last columns (shuffs datestamps to the front)
    columns = df.columns.tolist()
    columns = columns[0:2] + columns[-2:] + columns[2:-2]
    columns.remove('link')
    columns.insert(1, 'link')

    # See coefficients below
    weightings = {
        'age': 1,
        'milage': 2,
        'price': 3
    }

    df = df[columns]  # Rearrange columns
    df = calculate_analytics(df, weightings)
    save_output_files(df, weightings)


if __name__ == "__main__":
    main()
