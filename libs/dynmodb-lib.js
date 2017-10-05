import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

export function call(action, params) {
     const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}


//http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-examples.html
//https://github.com/awsdocs/aws-doc-sdk-examples/blob/master/javascript/example_code/dynamodb/ddb_deletetable.js