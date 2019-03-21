import urllib.request
from bs4 import BeautifulSoup

BASE = "http://ugradcalendar.uwaterloo.ca/page/"
department_urls = ['ENG-Management-Engineering']


def get_requirements():
    page_url = BASE + department_urls[0]

    html = urllib.request.urlopen(page_url).read()
    soup = BeautifulSoup(html, 'html.parser')

    term = ""
    electives = 0

    # this only works for management for now
    table = soup.find_all('table')[5]
    for rows in table.find_all('tr')[1:]:
        header = rows.find_all('th')
        if header:
            term = header[0].text
            print(term)

        cell = rows.find_all('td')
        if cell:
            course = cell[0].text.strip()
            if course == "Elective":
                electives += 1
            print(course)

    print(electives)
