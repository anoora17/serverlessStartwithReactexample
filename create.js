import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
	/ Item is an object that will be created in dynmoDB 
// the userID is an Id that been created in cognito service that we already configured in advance on aws console, you can use any othe provider 
  const data = JSON.parse(event.body);
  const params = {
    TableName: "resumes",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      resumeId: uuid.v1(), // assigne uniqe id to know more read devtools dynmoDB aws sdk javascript 
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime()
    }
  };



 try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}

 catch(e) {
  console.log(e);
  callback(null, failure({status: false}));
}
