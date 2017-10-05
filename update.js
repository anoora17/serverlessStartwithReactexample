import * as dynamoDbLib from "./libs/dynmodb-lib";
import { success, failure } from "./libs/response-lib";


export  function main(event, context, callback) {
		 const data = JSON.parse(event.body);
		 const params = {
		 TableName: "resume",
		 // 'Key' defines the partition key and sort key of the item to beupdated
		 // - 'userId': Identity Pool identity id of the authenticated user
		 // - 'resumeId': path parameter
		 Key: {
			 userid: event.requestContext.identity.cognitoIdentityId,
			 resumeid: event.pathParameters.id
		   },
			 // 'UpdateExpression' defines the attributes to be updated
			 // 'ExpressionAttributeValues' defines the value in the update expression
				 UpdateExpression:"SET content = :content, attachment = :attachment",

				 ExpressionAttributeValues: {
				 ":attachment": data.attachment ? data.attachment : null,
				 ":content": data.content ? data.content : null
		    },
		    ReturnValues: "ALL_NEW"
		 };
 try {
		 const result =  dynamoDbLib.call("update", params);
		 callback(null, success({ status: true }));
 } catch (e) {
        callback(null, failure({ status: false }));
 }
}
