from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
import pandas as pd
import yfinance as yf

app = Flask(__name__)
CORS(app)
api = Api(app)
Users = [
    {'username': 'admin',
    'password': 'admin'},
    {'username': 'tu',
    'password': 'tp'}
]

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
AMOUNT = 0
data=pd.DataFrame()

def loadTickers(sym):
    data = yf.download(investment_types[sym], period="5d", interval ="30m")
    if(sym == 'INDEX'):
        n=data.shape[0]
        data.drop(data.index[n-1],inplace=True)
    return data

def loadArray(df):
    arr = []
    df.index = df.index.strftime('%b. %d %Y %X')
    for index, row in df['Adj Close'].iterrows():
        temp = {'name':index}
        for index, value in row.items():
            temp[index] = value
        arr.append(temp)
    return arr


selection_put_args = reqparse.RequestParser()
selection_put_args.add_argument("type", type =str, help="type of investment", required=True)
selection_put_args.add_argument("amount", type =str, help="amount to invest", required=True)

class Selection(Resource):
    def post(self):
        args = selection_put_args.parse_args()
        global SELECTED, AMOUNT
        SELECTED = args.type
        AMOUNT = args.amount
        return api.make_response({"msg":"req received"}, 200)


investment_put_args = reqparse.RequestParser()
investment_put_args.add_argument("type", type =str, help="type of investment")

class Investment(Resource):
    def get(self):
        if not SELECTED: 
            return api.make_response({"msg":"No Investment Type Selected"}, 400)
        else:  
            k = loadTickers(SELECTED)
            arr = loadArray(k)
            payload = {"data":arr, "type":SELECTED, "amount":AMOUNT, "portfolio":investment_portfolio[SELECTED]}
            return api.make_response(payload, 200)
    # def post(self):
    #     args = investment_put_args.parse_args()
    #     SELECTED = args.type
    #     k = loadTickers(SELECTED)
    #     arr = loadArray(k)
    #     return{"data":arr, "type":SELECTED, "port":investment_portfolio[SELECTED]}

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
    def post(self):
        args = login_put_args.parse_args()
        username = args.username
        password = args.password
        print(username, password)
        if(checkUsers(username, password)):
            resp = api.make_response(k, code=200)
            resp.set_cookie('stronkest cookie', 'stonk')
            return api.make_response(200)
        else : 
            return api.make_response({"msg":"Authorization Failed"}, 401)
        print(username, password)
        return {"data": "none"}

class Signup(Resource):
    def post(self):
        return {"data":"none"}

api.add_resource(Investment,"/investment")
api.add_resource(Login, "/login")
api.add_resource(Signup, "/signup")
api.add_resource(Selection, "/selection")

if __name__ == "__main__":
    print("#########################################################")
    app.run(debug=True)