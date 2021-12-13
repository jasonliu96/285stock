import pandas as pd
import yfinance as yf
from datetime import datetime

#investment_types = ["Ethical", "Growth", "Index", "Quality", "Value"]
ETHICAL_PORT = ["CWEN", "SEDG", "NIO"]
GROWTH_PORT = ["WOOF", "UPST", "LYB"]
INDEX_PORT = ["SPYG", "QQQ", "MGK"]
QUALITY_PORT = ["AAPL","GOOG","TSLA"]
VALUE_PORT = ["DVA", "PG", "JNJ"]

investment_portfolio = {
    'ETHICAL' : ETHICAL_PORT,
    'GROWTH' : GROWTH_PORT,
    'INDEX' : INDEX_PORT,
    'QUALITY' : QUALITY_PORT,
    'VALUE' : VALUE_PORT 
}

investment_types = {
    'ETHICAL' : 'CWEN SEDG NIO',
    'GROWTH' : 'WOOF UPST LYB',
    'INDEX' : 'SPYG QQQ MGK',
    'QUALITY' : 'AAPL GOOG TSLA',
    'VALUE' : 'DVA PG JNJ' }
SELECTED = ""
AMOUNT = 5000
STOCKINFO=pd.DataFrame()
CLOSINGINFO=pd.DataFrame()
DIST_ARR = []

## Loads the data from yfinance api for the selected tickers 
# since index funds might have missing values for the last 30 minutes of market open drop last row of values
def loadTickers(sym, period, interval):
    data = yf.download(investment_types[sym], period=period, interval=interval)
    if(sym == 'INDEX' and interval != "1d"):
        n=data.shape[0]
        data.drop(data.index[n-1],inplace=True)
    return data

## Parse through the data obtained from tickers change timestamp to datetime for string format 
# Loads values into an array useable by from end 
# Array format [{'name':'index'}]
def loadArray(df):
    arr = []
    df.index = df.index.strftime('%b. %d %Y %X')
    for index, row in df['Adj Close'].iterrows():
        temp = {'name':index}
        for index, value in row.items():
            temp[index] = value
        arr.append(temp)
    return arr

#Call Backend -> data input = name: stock, value=total distribution amount //mv, price = closing price, shares
## Data format [{name:stock, value:market distribution, price = adj. closing price, shares = num shares}]
def distributeStocks():
    global DIST_ARR

    if(AMOUNT<0):
        return 0
    else :
        a = AMOUNT * .5
        b = AMOUNT * .3
        c = AMOUNT * .2
        dist = [a, b, c]
        total_val = 0
        for index, (symbol, value) in enumerate(CLOSINGINFO['Adj Close'].iloc[0].items()):
            print(index, symbol, value)
            temp = {}
            temp['name'] = symbol
            shares = int(dist[index]/value)
            temp['shares'] = shares
            temp['price'] = value
            tot = value*shares
            total_val += tot
            temp['value'] = tot
            DIST_ARR.append(temp)
        print(DIST_ARR)
        print('total valuation of portfolio ', total_val)
        return 0


def runCycle():
    sym = investment_types['GROWTH']+" "+investment_types['ETHICAL']
    print(sym)

runCycle()


# ## Recursively reinvest 
# def distribute(money):
#     if()