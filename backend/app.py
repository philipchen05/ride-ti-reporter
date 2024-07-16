from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True)