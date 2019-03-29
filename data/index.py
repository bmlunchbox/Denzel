from scrape import courses
from models import server

course_data = courses.department_courses()

client = server.connect()
db = client.CourseData
courses = db.Courses

# courses.insert_many(course_data)
