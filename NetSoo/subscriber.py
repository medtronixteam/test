import pika
import os
from Common.logger import netsoo_logger
from PlatformPoster.task_delegator import TaskDelegator
import json 

class TaskDelegationSubscriber:
    def __init__(self):
        connection = pika.BlockingConnection(pika.URLParameters(os.environ["RABBIT_MQ_URL"]))
        self.channel = connection.channel()
        self.task_delegator = TaskDelegator()

    def declare_and_subscribe(self, queue_name):
        self.channel.queue_declare(queue=queue_name, durable=True)
        self.channel.basic_consume(queue=queue_name, on_message_callback=self.callback, auto_ack=True)

    def begin_consuming(self):
        netsoo_logger.info(' [*] Waiting for messages. To exit press CTRL+C')
        self.channel.start_consuming()
    
    def callback(self, ch, method, properties, body):
        body = json.loads(body)
        netsoo_logger.info(f" [x] Received {body}")
        self.task_delegator.delegate(body)