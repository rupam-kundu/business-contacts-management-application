import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('BusinessContacts')
    n = event["Name"]
    table.update_item(
        Key={
            "EmailAddress": event["EmailAddress"]
        },
        UpdateExpression="SET Address = :val1, Company = :val2, JobTitle = :val3, #c = :val4, PhoneNumber = :val5",
        ExpressionAttributeValues={
            ":val1": event["Address"],
            ":val2": event["Company"],
            ":val3": event["JobTitle"],
            ":val4": n,
            ":val5": event["PhoneNumber"]
        },
        ExpressionAttributeNames={"#c": "Name"}
    )
    return {
        "statusCode": 200,
        "body": json.dumps('Item successfully updated!')
    }
