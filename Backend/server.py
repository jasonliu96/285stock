from flask import Flask
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS
import pandas as pd
import yfinance as yf

app = Flask(__name__)
CORS(app)
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
    'VALUE' : 'DVA PG JNJ' }
SELECTED = ""

data=pd.DataFrame()
investment_put_args = reqparse.RequestParser()
investment_put_args.add_argument("type", type =str, help="type of investment")

def loadTickers(sym):
    data = yf.download(investment_types[sym], period="5d")
    return data

def loadArray(df):
    arr = []
    df.index = df.index.strftime('%b. %d %Y')
    for index, row in df['Adj Close'].iterrows():
        temp = {'name':index}
        for index, value in row.items():
            temp[index] = value
        arr.append(temp)
    return arr

#Hello World API 
@app.route("/test")
def test():
    return {"msg":"Hello World"}

@app.route("/strats")
def strategies():
    return {"strategies":investment_types}


@app.route("/ethical")
def ethical():
    if('Adj Close' in data.columns):
        return {"ethical":data['Adj Close'].to_json(), "type":SELECTED}
    return {"ethical":"empty"}

@app.route("/")
def helloWorld():
  return {"ethical":"Hello, cross-origin-world!"}

class Investment(Resource):
    def get(self):
        return{"data":"testing flask_restful"}
    def post(self):
        args = investment_put_args.parse_args()
        SELECTED = args.type
        k = loadTickers(SELECTED)
        arr = loadArray(k)
        return{"data":arr, "type":SELECTED, "port":investment_portfolio[SELECTED]}


api.add_resource(Investment,"/investment")



if __name__ == "__main__":
    print("#########################################################")
    app.run(debug=True)