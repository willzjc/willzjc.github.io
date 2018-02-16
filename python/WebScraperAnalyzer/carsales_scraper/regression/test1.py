import pandas as pd
import statsmodels.formula.api as sm
import statsmodels.api as sm2

TV = [230.1, 44.5, 17.2, 151.5, 180.8]
Radio = [37.8,39.3,45.9,41.3,10.8]
Newspaper = [69.2,45.1,69.3,58.5,58.4]
Sales = [22.1, 10.4, 9.3, 18.5,12.9]
df = pd.DataFrame({'TV': TV,
                   'Radio': Radio,
                   'Newspaper': Newspaper,
                   'Sales': Sales})

Y = df.Sales
X = df[['TV','Radio','Newspaper']]
X = sm2.add_constant(X)
# model = sm.OLS(Y, X).fit()

model = sm.OLS(Y, X).fit()
new_x = df.loc[df.Sales.notnull(), ['TV', 'Radio', 'Newspaper']].values
new_x = sm2.add_constant(new_x)  # sm2 = statsmodels.api
y_predict = model.predict(new_x)

print y_predict