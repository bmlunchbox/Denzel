from selenium import webdriver
from bs4 import BeautifulSoup


def rating(code):
    base = "https://uwflow.com/course/"
    url = base + code
    browser = webdriver.Chrome()
    browser.get(url)

    html = browser.execute_script("return document.body.innerHTML")
    soup = BeautifulSoup(html, 'html.parser')

    ratings = soup.find_all("div", class_="rating-num-span")

    return ratings[0].text.split(), ratings[1].text.split()
