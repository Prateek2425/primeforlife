/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

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
            clientProgramMappingId,
            videoContentId,
            watchStartTime,
            watchEndTime,
            isCompleteWatch
        } = event.arguments.createProgramVideoEngagementInput;

        const queryResult = await dataApiClient.query(`INSERT INTO ClientProgramVideo (clientProgramMappingId, videoContentId, watchStartTime, watchEndTime, isCompleteWatch) VALUES( :clientProgramMappingId, :videoContentId, :wStartTime, :wEndTime, :isCompleteWatch)`, {
            clientProgramMappingId,
            videoContentId,
            wStartTime: AWSDateTimeToMysqlDateTime(watchStartTime),
            wEndTime: AWSDateTimeToMysqlDateTime(watchEndTime),
            isCompleteWatch
        })

        console.log("queryResult", queryResult);

        if(!queryResult || !queryResult.insertId) {
            throw new Error('FAILED_TO_SAVE_RECORD');
        }

        return await getClientProgramVideo(queryResult.insertId);

    } catch (error) {
        console.log('[CATCHED ERROR]', error);
        throw error;
    }
};

const getClientProgramVideo = async (id = "") => {
    
    const query = `SELECT * FROM ClientProgramVideo WHERE id = :id LIMIT :limit;`;
    console.log("getClientProgramVideo -> query", query);
    const queryResult = await dataApiClient.query(query, {
        id,
        limit : 1
    });
    console.log("getClientProgramVideo -> queryResult", JSON.stringify(queryResult, 4));

    return (queryResult.records.length > 0) ? queryResult.records[0]: {};
}

const AWSDateTimeToMysqlDateTime = (awsdatetime) => {
    const dt = new Date(awsdatetime);
    return dt.toISOString().slice(0, 19).replace('T', ' ');
}