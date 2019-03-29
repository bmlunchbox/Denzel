import pymongo


def connect():
    try:
        client = pymongo.MongoClient("mongodb+srv://Brandon:Brandon@coursedata-u7jmw.mongodb.net/CourseData")

        print("database connection success")
        return client

    except pymongo.errors.ServerSelectionTimeoutError:
        print("database connection failed")

