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

data=pd.DataFrame()

def loadTickers(sym):
    data = yf.download(investment_types[sym], period="1d", interval ="30m")
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

investment_put_args = reqparse.RequestParser()
investment_put_args.add_argument("type", type =str, help="type of investment")

class Investment(Resource):
    def get(self):
        k = {"data":"testing flask_restful"}
        resp = api.make_response(k, code=200)
        resp.set_cookie('i am cookie', 'test cookie')
        return resp
    def post(self):
        args = investment_put_args.parse_args()
        SELECTED = args.type
        k = loadTickers(SELECTED)
        arr = loadArray(k)
        return{"data":arr, "type":SELECTED, "port":investment_portfolio[SELECTED]}

def checkUsers(username, password):
    for elem in Users:
        print(elem)
        if username and password in elem.values():
            return True
        return False

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
            return api.make_response({"args":args}, 200)
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

if __name__ == "__main__":
    print("#########################################################")
    app.run(debug=True)