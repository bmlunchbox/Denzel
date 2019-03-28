import urllib.request
from bs4 import BeautifulSoup
from data import uwflow

# will have to change the 1920 to year if that's a feature
BASE = "http://www.ucalendar.uwaterloo.ca/1920/COURSE/"
department_urls = ['course-MSCI.html']


def department_courses():
    page_url = BASE + department_urls[0]

    html = urllib.request.urlopen(page_url).read()
    soup = BeautifulSoup(html, 'html.parser')

    courses = soup.find_all('center')
    for course in courses:
        bold = course.find_all('b')
        code = "".join(bold[0].text.split()[:2]).lower()
        course_name = bold[1].text
        description = course.find_all('td')[3].text

        notes = list()
        italicized = course.find_all('i')
        for i in italicized:
            if i.text.strip():
                notes.append(i.text)

        easy, useful = uwflow.rating(code)

        print(code, course_name, description, notes, easy, useful)

# def ratings(course):

    # to be called with above information
    # dependency to get JavaScript rendered information
