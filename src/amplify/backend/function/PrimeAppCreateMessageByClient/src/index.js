/* Amplify Params - DO NOT EDIT
    API_PRIMEAPPGRAPHQL_GRAPHQLAPIIDOUTPUT
    API_PRIMEAPPGRAPHQL_MESSAGETABLE_ARN
    API_PRIMEAPPGRAPHQL_MESSAGETABLE_NAME
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.REGION });
const documentClient = new AWS.DynamoDB.DocumentClient();

const uuidv4 = require('uuid').v4;

const messageTableName = process.env.API_PRIMEAPPGRAPHQL_MESSAGETABLE_NAME;

const DB_SECRET_ARN = process.env.DB_SECRET_ARN;
const DB_CLUSTER_ARN = process.env.DB_CLUSTER_ARN;
const DB_NAME = process.env.DB_NAME;

const dataApiClient = require('data-api-client')({
    secretArn: DB_SECRET_ARN,
    resourceArn: DB_CLUSTER_ARN,
    database: DB_NAME
});

exports.handler = async (event) => {

    console.log('[RECEIVED_EVENT]', JSON.stringify(event, 4));

    try {

        const { sub: cognitoSub = "" } = event.identity;
        const {
            clientCoachMappingId,
            contentText
        } = event.arguments.createMessageByClientInput;

        const currentDateTime = new Date().toISOString();

        /**
         * Query to retrive client-coach mapping details & extract client & coach data
         */
        const queryResult = await dataApiClient.query(`SELECT ccp.id, ccp.coachId, ccp.clientId, client.sub as clientSub, coach.sub as coachSub FROM ClientCoachMapping as ccp INNER JOIN User as client ON ccp.clientId = client.id INNER JOIN User as coach ON ccp.coachId = coach.id WHERE ccp.id = :clientCoachMappingId AND client.sub = :cognitoSub LIMIT 1;`, {
            clientCoachMappingId,
            cognitoSub
        });

        console.log("queryResult", queryResult);

        if (!queryResult || !queryResult.records || queryResult.records.length == 0) {
            throw new Error('INVALID_CLIENT_COACH_DETAIL');
        }

        const resultData = queryResult.records[0];

        const params = {
            TableName: messageTableName,
            Item: {
                id: uuidv4(),
                clientCoachMappingId: clientCoachMappingId,
                userId: resultData.clientSub,
                members: [ resultData.clientSub, resultData.coachSub ],
                contentType: "text",
                contentText: contentText,
                scheduleDate: currentDateTime,
                createdAt: currentDateTime,
                updatedAt: currentDateTime
            }
        };

        await documentClient.put(params).promise();
        return params.Item;

    } catch (error) {
        console.log('[CATCHED ERROR]', error);
        throw error;
    }
};