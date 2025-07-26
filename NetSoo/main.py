from dotenv import load_dotenv
load_dotenv()

from subscriber import TaskDelegationSubscriber
from Common.logger import netsoo_logger

task_delegation_sub = TaskDelegationSubscriber()

task_delegation_sub.declare_and_subscribe(queue_name = "post_task_delegation")

while True:
    try:
        task_delegation_sub.begin_consuming()
    except Exception as e:
        netsoo_logger.error("Encountered Exception:", e)