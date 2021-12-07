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

def loadTickers(sym):
    data = yf.download(investment_types[sym], period="5d")
    return data

# data = loadTickers('ETHICAL')
# arr = []
# data.index = data.index.strftime('%b. %d %Y')
# print(data.index)
# # data.index = data.index.to_pydatetime()
# print(data['Adj Close'].iloc[0])
# for index, row in data['Adj Close'].iterrows():
#     temp = {'name':index}
#     for index, value in row.items():
#         temp[index] = value
#     arr.append(temp)

# print(arr)

def loadArray(df):
    arr = []
    df.index = df.index.strftime('%b. %d %Y')
    for index, row in data['Adj Close'].iterrows():
        temp = {'name':index}
        for index, value in row.items():
            temp[index] = value
        arr.append(temp)
    return arr

data = loadTickers('VALUE')
arr = loadArray(data)
print(arr)