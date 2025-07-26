#!/usr/bin/env python
import pika
import os
from dotenv import load_dotenv
load_dotenv()

import json

connection = pika.BlockingConnection(
    pika.URLParameters(os.environ["RABBIT_MQ_URL"])
    )
channel = connection.channel()

channel.queue_declare(queue='hello')

body = {
    "user-id" : 123,
    "platform" : "twitter",
    "post-id" : 321
}

channel.basic_publish(exchange='', routing_key='task_delegation', body=json.dumps(body))
print(" [x] Sent 'Hello World!'")
connection.close()