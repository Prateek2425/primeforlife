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

        const { limit = 10, page = 1, search = "" } = event.arguments.input;

        let conditionStr = "";
        if(search) {
            conditionStr = `WHERE title LIKE '%${search}%' OR description LIKE '%${search}%'`;
        }

        const offset = (page - 1) * limit;
        const dataResult = await dataApiClient.query(`SELECT id, title, description, videoUrl, thumbnailUrl, videoLength, createdAt, updatedAt FROM VideoContent ${conditionStr} LIMIT :limit OFFSET :offset;`, {
            limit,
            offset
        });
        console.log("dataResult", JSON.stringify(dataResult, 4));

        const countResult = await dataApiClient.query(`SELECT COUNT(id) videoContentCount FROM VideoContent`);
        console.log("countResult", JSON.stringify(countResult, 4));

        return {
            result: dataResult.records,
            totalResult: countResult.records[0].videoContentCount || 0,
            limit: limit,
            page: page,
            search: search
        }
    } catch (error) {
        console.log('[CATCHED ERROR]', error);
        throw error; //Throw generated error to handle by Graphql resolver
    }
};


// https://dev.to/mkllecoq/amplify-how-to-add-aurora-serverless-to-a-rest-api-10h7
// https://www.npmjs.com/package/data-api-client