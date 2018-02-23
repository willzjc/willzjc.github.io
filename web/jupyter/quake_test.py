import pandas as pd
from plotly.offline import download_plotlyjs, init_notebook_mode, iplot
from plotly.offline.offline import _plot_html
import numpy as np
import cufflinks as cf
init_notebook_mode()

import pandas as pd
quake_df=pd.read_csv('quake-later3.csv')
print quake_df.columns
iplot(quake_df[['FID','type']].iplot(asFigure=True ,kind='line', title='Quake Details - Pandas', dimensions=(800,500)))
