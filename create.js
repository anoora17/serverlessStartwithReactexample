import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynmodb-lib";
import { success, failure } from "./libs/response-lib";

export  function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "resumes",
        Item: {
          userid: event.requestContext.identity.cognitoIdentityId,
          resumeid: uuid.v1(),
          content: data.content,
          attachment: data.attachment,
          createdAt: new Date().getTime()
        }
  };

  try {
     dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}