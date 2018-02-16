import statsmodels.api as sm
from sklearn import datasets, linear_model  ## imports datasets from scikit-learn
data = datasets.load_boston() ## loads Boston dataset from datasets library
import numpy as np
import pandas as pd
# define the data/predictors as the pre-set feature names
df = pd.DataFrame(data.data, columns=data.feature_names)
print df
print '\n====\n'
# Put the target (housing value -- MEDV) in another DataFrame
target = pd.DataFrame(data.target, columns=["MEDV"])

## Without a constant

import statsmodels.api as sm

X = df["RM"]
y = target["MEDV"]

# Note the difference in argument order
model = sm.OLS(y, X).fit()
predictions = model.predict(X) # make the predictions by the model

# Print out the statistics
model.summary()

import statsmodels.api as sm # import statsmodels

X = df["RM"] ## X usually means our input variables (or independent variables)
y = target["MEDV"] ## Y usually means our output/dependent variable
X = sm.add_constant(X) ## let's add an intercept (beta_0) to our model

# Note the difference in argument order
model = sm.OLS(y, X).fit() ## sm.OLS(output, input)
predictions = model.predict(X)

# Print out the statistics
model.summary()

X = df
y = target["MEDV"]

lm = linear_model.LinearRegression()
model = lm.fit(X, y)

predictions = lm.predict(X)
print(predictions)[0:5]
