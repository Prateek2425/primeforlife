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

        if(!cognitoSub) {
            throw new Error('INVALID_COGNITO_SUB');
        }

        const activeProgramMapData = await getUserActiveProgram(cognitoSub);

        if(!activeProgramMapData || !activeProgramMapData.id) return {};

        return await getMyPreviousWatch(activeProgramMapData.id);

    } catch (error) {
        console.log('[CATCHED ERROR]', error);
        throw error;
    }
};

/**
 * Function to retrive the active program of the Request user by cognito ID
 * @param {string} cognitoSub 
 * @returns 
 */
const getUserActiveProgram = async (cognitoSub = "") => {
    
    const query = `SELECT cpm.id FROM ClientProgramMapping as cpm INNER JOIN User as u ON cpm.clientId = u.id WHERE u.sub = :cognitoSub AND cpm.isActiveProgram = 1 ORDER BY cpm.createdAt DESC LIMIT 1;`;
    console.log("getUserActiveProgram -> query", query);
    const queryResult = await dataApiClient.query(query, {
        cognitoSub
    });

    console.log("getUserActiveProgram -> queryResult", JSON.stringify(queryResult, 4));

    return (queryResult.records.length > 0) ? queryResult.records[0]: {};
}

/**
 * Function to retrive the previous watch video
 * Conditions
 * isCompleteWatch = true
 * videoContentID is included in the set of videos in the ProgramVideoMapping table for Client’s program 
 * Date of watchStartTime is NOT today
 * watchStartTime is max datetime of the entries returned (so it will only return one or zero entries)
 * @param {Number} clientProgramMappingId 
 * @returns 
 */
const getMyPreviousWatch = async (clientProgramMappingId = null) => {
    
    const query = `SELECT * FROM ClientProgramVideo WHERE clientProgramMappingId = :clientProgramMappingId AND isCompleteWatch = 1 AND DATE(watchStartTime) < CURDATE() ORDER BY watchStartTime DESC LIMIT 1;`;
    console.log("getUserActiveProgram -> query", query);
    const queryResult = await dataApiClient.query(query, {
        clientProgramMappingId
    });

    console.log("getMyPreviousWatch -> queryResult", JSON.stringify(queryResult, 4));

    return (queryResult.records.length > 0) ? queryResult.records[0]: {};
}