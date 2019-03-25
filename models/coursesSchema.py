from mongoengine import *


class Courses(Document):
    title: StringField(required=True)

    