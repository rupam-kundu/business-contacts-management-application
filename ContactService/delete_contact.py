import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('BusinessContacts')
    table.delete_item(
        Key={
            "EmailAddress": event["EmailAddress"]
        }
    )
    return {
        "statusCode": 200,
        "body": json.dumps('Item successfully deleted!')
    }
