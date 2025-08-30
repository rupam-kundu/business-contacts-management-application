import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('BusinessContacts')
    response = table.get_item(
        Key={
            "EmailAddress": event["EmailAddress"]
        }
    )
    item = response['Item']
    return {
        "statusCode": 200,
        "body": json.dumps(item)
    }