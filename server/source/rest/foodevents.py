import json
import logging

from lib.bottle import get, post, request, response

import models

@get('/foodevents/')
def get_all_comments():
    logging.info("Getting all food Events!")
    foods = models.FoodEvent.query().order(models.FoodEvent.time).fetch(100)
    to_return = [models.foodEvent_to_json(food) for food in foods]
    response.content_type = 'application/json'
    return json.dumps(to_return)


@post('/foodevent')
def create_new_comment():
    logging.info("creating new food event")
    logging.info(request.json)
    comment = models.Comment(
        text=request.json.get('text'),
        author=request.json.get('author')
    )
    comment.put()
    response.content_type = 'application/json'
    return models.comment_to_json(comment)
