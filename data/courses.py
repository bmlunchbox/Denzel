import urllib.request
from bs4 import BeautifulSoup

# will have to change the 1920 to year if that's a feature
BASE = "http://www.ucalendar.uwaterloo.ca/1920/COURSE/"
department_urls = ['course-MSCI.html']


def department_courses():
    page_url = BASE + department_urls[0]

    html = urllib.request.urlopen(page_url).read()
    soup = BeautifulSoup(html, 'html.parser')

    courses = soup.find_all('center')
    for course in courses:
        # index 0 is code, index 1 is name
        bolded = course.find_all('b')

        description = course.find_all('td')[3].text

        italicized = course.find_all('i')
        for i in italicized:
            if i.text.strip():
                print(i.text)

# def ratings(course):

    # to be called with above information
    # dependency to get JavaScript rendered information
