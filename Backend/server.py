from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
import pandas as pd
import yfinance as yf

app = Flask(__name__)
CORS(app, supports_credentials =True)
api = Api(app)

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
    'VALUE' : 'DVA PG JNJ' 
}

SELECTED = ""
AMOUNT = 0
PORTFOLIO_VALUE =0 
STOCKINFO=pd.DataFrame()
CLOSINGINFO = pd.DataFrame()
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
    global DIST_ARR, PORTFOLIO_VALUE
    amt = float(AMOUNT)
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
            print(index, symbol, value)
            temp = {}
            temp['name'] = symbol
            shares = int(dist[index]/value)
            temp['shares'] = shares
            temp['price'] = round(value,2)
            tot = value*shares
            total_val += tot
            temp['value'] = round(tot,2)
            newDist.append(temp)
        DIST_ARR = newDist
        PORTFOLIO_VALUE = round(total_val,2)
        print(DIST_ARR)
        print('total valuation of portfolio ', total_val)
        return 0


selection_put_args = reqparse.RequestParser()
selection_put_args.add_argument("type", type =str, help="type of investment", required=True)
selection_put_args.add_argument("amount", type =str, help="amount to invest", required=True)

class Selection(Resource):
    def post(self):
        args = selection_put_args.parse_args()
        global SELECTED, AMOUNT, STOCKINFO, CLOSINGINFO
        SELECTED = args.type
        AMOUNT = args.amount
        STOCKINFO = loadTickers(SELECTED, "5d", "15m")
        CLOSINGINFO = loadTickers(SELECTED, "1d", "1d")
        distributeStocks()
        return api.make_response({"msg":"req received"}, 200)


investment_put_args = reqparse.RequestParser()
investment_put_args.add_argument("type", type =str, help="type of investment")

class Distribution(Resource):
    def get(self):
        if not SELECTED: 
            return api.make_response({"msg":"No Investment Type Selected"}, 400)
        return api.make_response({"data":DIST_ARR, "total":PORTFOLIO_VALUE}, 200)

class Investment(Resource):
    def get(self):
        if not SELECTED: 
            return api.make_response({"msg":"No Investment Type Selected"}, 400)
        else:  
            arr = loadArray(STOCKINFO)
            payload = {"data":arr, "type":SELECTED, "amount":AMOUNT, "portfolio":investment_portfolio[SELECTED], "total":PORTFOLIO_VALUE}
            return api.make_response(payload, 200)

def checkUsers(username, password):
    for line in open("userinfo.txt","r").readlines(): # Read the lines
        login_info = line.split() # Split on the space, and store the results in a list of two strings
        if username == login_info[0] and password == login_info[1]:
            print("Correct credentials!")
            return True
        print("Incorrect credentials.")

login_put_args = reqparse.RequestParser()
login_put_args.add_argument("username", type=str, help="username")
login_put_args.add_argument("password", type=str, help="password")

class Login(Resource):
    def get(self):
        resp = api.make_response({"msg":"auth success"},code = 200)
        resp.set_cookie('cookie', 'stronkest cookie')
        return resp
    def post(self):
        args = login_put_args.parse_args()
        username = args.username
        password = args.password
        print(username, password)
        if(checkUsers(username, password)):
            resp = api.make_response({"msg":"auth success"},code = 200)
            resp.set_cookie('cookie', 'stronkest cookie')
            return resp
        else : 
            return api.make_response({"msg":"Authorization Failed"}, 401)

class Signup(Resource):
    def post(self):
        return {"data":"none"}

api.add_resource(Investment,"/investment")
api.add_resource(Login, "/login")
api.add_resource(Signup, "/signup")
api.add_resource(Selection, "/selection")
api.add_resource(Distribution, "/distribution")

if __name__ == "__main__":
    print("#########################################################")
    app.run(debug=True)