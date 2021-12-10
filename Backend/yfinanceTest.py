import pandas as pd
import yfinance as yf
from datetime import datetime

data=pd.DataFrame()

investment_types = {
    'ETHICAL' : 'CWEN SEDG NIO',
    'GROWTH' : 'WOOF UPST LYB',
    'INDEX' : 'SPYG QQQ MGK',
    'QUALITY' : 'AAPL GOOG TSLA',
    'VALUE' : 'DVA PG JNJ' }

data = yf.download(investment_types['INDEX'], period="1d", interval = "30m")
n=data.shape[0]
data.drop(data.index[n-1],inplace=True)
print(data)
# def loadTickers(sym):
#     data = yf.download(investment_types[sym], period="5d")
#     return data

# def loadArray(df):
#     arr = []
#     df.index = df.index.strftime('%b. %d %Y')
#     for index, row in data['Adj Close'].iterrows():
#         temp = {'name':index}
#         for index, value in row.items():
#             temp[index] = value
#         arr.append(temp)
#     return arr

# data = loadTickers('VALUE')
# arr = loadArray(data)
# print(arr)