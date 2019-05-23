# from run_create_dcjs import *
# from run_create_scatterplot import *
# from run_create_table import *

import create_webfiles_dcjs
import create_webfiles_scatterplot
import create_webfiles_table

def main():
    stuffhappens=True

    # Creates Basic Table
    create_webfiles_table.run_create_all()

    # Creates Scatterplot
    create_webfiles_scatterplot.run_create_all()

    # Creates DC JS Culmination
    create_webfiles_dcjs.run_create_all()

if __name__ == '__main__':
    main()
