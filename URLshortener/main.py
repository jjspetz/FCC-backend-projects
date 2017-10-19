import random
import validators
from flask import Flask, redirect
app = Flask(__name__)

# 1. create variable for storage ****
# 2. /new/<url> route assigns short random url and saves url into storage ****
# 3. random url in storage redirect to original page ****
# 4. url validator ****
# 5. add basic homepage
# 6. deploy somewhere

# delcare url dictionary
urls = {'thispageshome': 1000};
reverse_urls = {1000: 'thispageshome'}

# random short url creator
def url_creator():
    short = 1000
    # creates new random 4 digit string
    while short in reverse_urls:
        short = random.randint(1001,9999)

    return short

# routes
@app.route('/')
def homepage():
    return 'Homepage'

@app.route('/new/<path:url>')
def save_url(url=None):
    # validate url
    if validators.url(url):
        #check to see if url already in dictionary
        if url in urls:
            return 'website already present. Try path - /' + str(urls[url])

        short = url_creator()
        urls[url] = short
        reverse_urls[short] = url
        # print(urls)

        # displays results on screen
        return str({'original': url, 'short': short})

    return 'Invalid URL'

@app.route('/<int:page>')
def redirect_url(page=None):
    # checks if path is a valid saved url
    if page in reverse_urls:
        return redirect(reverse_urls[page])

    return 'Invalid Path'
