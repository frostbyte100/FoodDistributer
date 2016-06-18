import logging
from google.appengine.ext import ndb

class Comment(ndb.Model):
    created = ndb.DateTimeProperty(auto_now_add=True)
    text = ndb.StringProperty()
    author = ndb.StringProperty()

class Event(ndb.Model):
    title = ndb.StringProperty(required=False)
    foodType = ndb.StringProperty(required=False)
    address = ndb.StringProperty(required=False )
    image64 = ndb.StringProperty(required=False)
    created = ndb.DateTimeProperty(auto_now_add=True)
    time = ndb.StringProperty(required=False)

def comment_to_json(comment):
    return {
        'key': comment.key.urlsafe(),
        'created': str(comment.created),
        'text': comment.text,
        'author': comment.author
    }
def event_to_json(event):
    return {
        'key': event.key.urlsafe(),
        'title': event.title,
        'created': str(event.created),
        'food': event.foodType,
        'address': event.address,
        'image': event.image64,
        'time': str(event.time)
    }