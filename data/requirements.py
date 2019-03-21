import urllib.request
from bs4 import BeautifulSoup

BASE = "http://ugradcalendar.uwaterloo.ca/page/"
department_urls = ['ENG-Management-Engineering']


def get_requirements():
    page_url = BASE + department_urls[0]

    html = urllib.request.urlopen(page_url).read()
    soup = BeautifulSoup(html, 'html.parser')

    # this only works for management for now
    table = soup.find_all('table')[5]
    for rows in table.find_all('tr')[1:]:
        header = rows.find_all('th')
        if header:
            print(header[0].text)

        cell = rows.find_all('td')
        if cell:
            print(cell[0].text.strip())
