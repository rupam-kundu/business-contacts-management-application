import boto3
import json

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('BusinessContacts')
    table.put_item(
        Item={
        'EmailAddress': event['EmailAddress'],
        'Address': event['Address'],
        'Company': event['Company'],
        'JobTitle': event['JobTitle'],
        'Name': event['Name'],
        'PhoneNumber': event['PhoneNumber']
        }
    )
    return {
        "statusCode": 200,
        "body": json.dumps('Data succesfully inserted.')
    }
