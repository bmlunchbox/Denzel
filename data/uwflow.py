from selenium import webdriver

BASE = "https://uwflow.com/course/"


def rating(code):
    url = BASE + code
    browser = webdriver.Chrome()
    browser.get(url)
