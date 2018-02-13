import numpy as np
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf

df = pd.DataFrame({'x1': [3.17, 4.76, 4.17, 8.70, 11.45],
                   'x2': [23, 26, 73, 72, 16],
                   'y': [880.37, 716.20, 974.79, 322.80, 1054.25]},
                  index=np.arange(10, 20, 2))

result = smf.ols('y ~ x1 + x2', df).fit()
# df['yhat'] = result.fittedvalues
# df['resid'] = result.resid


# result2 = sm.OLS(df['y'], sm.add_constant(df[['x1', 'x2']])).fit()
# df['yhat2'] = result2.fittedvalues
# df['resid2'] = result2.resid

# predict doesn't return pandas series and no index is available
df['predicted'] = result.predict(df)

print(df)
