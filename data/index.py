from scrape import courses
from models import server

client = server.connect()
db = client.CourseData
courses_collection = db.Courses

course_data = courses.department_courses("course-MATH.html")
courses_collection.insert_many(course_data)
