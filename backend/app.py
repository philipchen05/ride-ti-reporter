from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import firebase_admin
from firebase_admin import credentials, db
import json
import urllib.parse

app = Flask(__name__)
CORS(app)

#cred = firebase_admin.credentials.Certificate('./key.json')
#default_app = firebase_admin.initialize_app(cred, {
#    'databaseURL': 'firebaseURL'
#})

def encode(key):
    key = key.replace('.', '%2E')
    return urllib.parse.quote(key, safe='')

def decode(key):
    key = urllib.parse.unquote(key)
    return key.replace('%2E', '.')

@app.route('/')
def home():
    return "Hola, Flask!"

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    options = Options()
    options.add_argument('--headless=new')
    driver = webdriver.Chrome(options)
    driver.get("https://rt.ffximg.com")
    driver.implicitly_wait(0.5)
    user = driver.find_element(By.ID, "user")
    user.send_keys(username)
    pswrd = driver.find_element(By.NAME, "pass")
    pswrd.send_keys(password)
    login = driver.find_element(By.CLASS_NAME, "btn")
    login.click()
    try:
        driver.find_element(By.ID, "TitleBox--_NoAuth_Login_html--error----UmVzdWx0cw__---0")
    except:
        return jsonify({"message": "Login successful"})
    abort(401)

@app.route('/prod', methods = ['POST'])
def prod():
    print('prod')

    
    #try:
    #    url = "owners/"
    #    ref = db.reference(url)
    #    best_sellers = ref.get()
    #    print(best_sellers)
    #except Exception as e:
    #    print(f"Exception occurred: {e}")


    return jsonify({"message": "PROD"})

if __name__ == '__main__':
    app.run(debug=True)