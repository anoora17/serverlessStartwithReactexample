import * as dynamoDbLib from "./libs/dynmodb-lib";
import { success, failure } from "./libs/response-lib";
export function main(event, context, callback) {
 const params =  {
 TableName: "resumes",
 // 'Key' defines the partition key and sort key of the item to beremoved
 // - 'userId': Identity Pool identity id of the authenticated user
 // - 'resumeId': path parameter
 Key: {
		 userid: event.requestContext.identity.cognitoIdentityId,
		 resumeid: event.pathParameters.id
     }
   };
 try {
		 const result =  dynamoDbLib.call("delete", params);
		 callback(null, success({ status: true }));
 } catch (e) {

 		callback(null, failure({ status: false }));
   }
}



//This makes a DynamoDB delete call with 