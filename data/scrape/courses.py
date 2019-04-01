import urllib.request
from bs4 import BeautifulSoup
from scrape import uwflow

# will have to change the 1920 to year if that's a feature
BASE = "http://www.ucalendar.uwaterloo.ca/1920/COURSE/"
department_urls = ['course-MSCI.html']


def department_courses(url):
    page_url = BASE + url

    html = urllib.request.urlopen(page_url).read()
    soup = BeautifulSoup(html, 'html.parser')

    courses = soup.find_all('center')
    course_objects = []

    for course in courses:

        bold = course.find_all('b')
        code = "".join(bold[0].text.split()[:2]).lower()
        course_name = bold[1].text
        description = course.find_all('td')[3].text

        availability = []
        string_list = description.split()
        if "[Offered:" in string_list:
            start_index = string_list.index("[Offered:")
            for temp in string_list[start_index + 1:]:
                temp = temp.replace("]", '').replace(",", ' ').split()
                for i in temp:
                    if i == "F" or i == "S" or i == "W":
                        availability.append(i)

        notes = list()
        italicized = course.find_all('i')
        for i in italicized:
            if i.text.strip():
                notes.append(i.text)

        useful = easy = "0"
        if code != "syde263":
            easy, useful = uwflow.rating(code)
            if easy != []:
                easy = easy[0].replace('%', '')
            else:
                easy = "0"
            if useful != []:
                useful = useful[0].replace('%', '')
            else:
                useful="0"

        course_object = {
            "course": code,
            "name": course_name,
            "description": description,
            "availability": availability,
            "notes": notes,
            "easy": easy,
            "useful": useful
        }

        course_objects.append(course_object)
        print(course_object)

    return course_objects
