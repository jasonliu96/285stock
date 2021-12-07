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
        return{"ethical":"testing flask_restful"}
    def post(self):
        args = investment_put_args.parse_args()
        SELECTED = args.type
        k = loadTickers(SELECTED)
        return{"ethical":k['Adj Close'].to_json(), "type":SELECTED}


api.add_resource(Investment,"/investment")


if __name__ == "__main__":
    print("#########################################################")
    app.run(debug=True)