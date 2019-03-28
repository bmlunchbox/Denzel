from pymongo import MongoClient


def connect():
    client = MongoClient("mongodb+srv://Brandon:<pw>@coursedata-u7jmw.mongodb.net/test?retryWrites=true")
    db = client.Courses
