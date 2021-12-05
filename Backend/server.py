from flask import Flask
import yfinance as yf

app = Flask(__name__)

investment_types = ["Ethical", "Growth", "Index", "Quality", "Value"]
ETHICAL_PORT = ["CWEN", "SEDG", "NIO"]
GROWTH_PORT = ["WOOF", "UPST", "LYB"]
INDEX_PORT = ["SPYG", "QQQ", "MGK"]
QUALITY_PORT = ["AAPL","GOOG","TSLA"]
VALUE_PORT = ["DVA", "PG", "JNJ"]

#Hello World API 
@app.route("/test")
def test():
    return {"msg":"Hello World"}

@app.route("/strats")
def strategies():
    return {"strategies":investment_types}








if __name__ == "__main__":
    print("#########################################################")
    app.run(debug=True)