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
PORTFOLIO_VALUE = 0
DIST_ARR = []

## Loads the data from yfinance api for the selected tickers 
# since index funds might have missing values for the last 30 minutes of market open drop last row of values
def loadTickers(sym, period, interval):
    data = yf.download(sym, period=period, interval=interval)
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


def distributeStocks(amount):
    global DIST_ARR, PORTFOLIO_VALUE
    amt = float(amount)
    newDist = []
    if(amt<0):
        return 0
    else :
        a = amt * .5
        b = amt * .3
        c = amt * .2
        dist = [a, b, c]
        total_val = 0
        for index, (symbol, value) in enumerate(CLOSINGINFO['Adj Close'].iloc[0].items()):
            temp = {}
            temp['name'] = symbol
            shares = int(dist[index]/value)
            temp['shares'] = shares
            temp['price'] = round(value,2)
            tot = value*shares
            total_val += tot
            temp['value'] = round(tot,2)
            newDist.append(temp)
        DIST_ARR += newDist
        PORTFOLIO_VALUE += round(total_val,2)
        print("Before Reinvest", DIST_ARR)
        investRemainder(amount-round(total_val,2))
        return 0

### reinvests balance
def investRemainder(amount):
    global PORTFOLIO_VALUE 
    balance = amount
    for k in DIST_ARR:
        while(balance>k['price']):
            k['shares']+=1
            k['value']+=k['price']
            balance-=k['price']
            PORTFOLIO_VALUE += k['price']



k = [{'name' : 'AAPL', 'shares':10, 'price':20, 'value':30}]
l = [{'name' : 'AAPL', 'shares':10, 'price':20, 'value':30}]
def runCycle():
    global SELECTED, SECOND_TYPE, AMOUNT, STOCKINFO, CLOSINGINFO
    SELECTED = 'GROWTH'
    SECOND_TYPE = "INDEX"
    AMOUNT = 140000 
    sym = investment_types[SELECTED]+" "+investment_types[SECOND_TYPE]
    STOCKINFO = loadTickers(sym, "5d", "30m")
    CLOSINGINFO = loadTickers(investment_types[SELECTED], "1d", "1d")
    distributeStocks(AMOUNT*.6)
    CLOSINGINFO = loadTickers(investment_types[SECOND_TYPE], "1d", "1d")
    distributeStocks(AMOUNT*.4)
    print("After Reinvest", DIST_ARR)
    print(AMOUNT - PORTFOLIO_VALUE)

runCycle()


# ## Recursively reinvest 
# def distribute(money):
#     if()