import json
import logging
import datetime
from lib.bottle import get, post, request, response

import models

@get('/events/')
def get_all_events():
    logging.info("Getting all food Events!")
    foods = models.Event.query().order(models.Event.time).fetch(100)
    to_return = [models.event_to_json(food) for food in foods]
    response.content_type = 'application/json'
    return json.dumps(to_return)

@get('/today/')
def get_allEventsToday():
    foods = models.Event.query().order(models.Event.time).fetch(100)
    to_return =[]
    for food in foods:
        if food.time.month == date.today().month and food.time.day == date.today().day and food.time.year == date.today().year:
            to_return.append(food)
    return json.dumps(to_return)


@post('/event')
def create_new_event():
    logging.info("creating new food event")
    logging.info(request.json)
    event = models.Event(
        foodType=request.json.get('food'),
        address=request.json.get('address'),
        image64 = request.json.get('image'),
        time = request.json.get('time'),
        # time = datetime.datetime.strptime(request.json.get('time'), '%m-%d-%y-%H-%M').date(),
        contact = request.json.get('contact')
    )
    event.put()
    response.content_type = 'application/json'
    return models.event_to_json(event)
