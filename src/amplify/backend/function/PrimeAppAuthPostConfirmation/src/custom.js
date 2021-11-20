const DB_SECRET_ARN = process.env.DB_SECRET_ARN;
const DB_CLUSTER_ARN = process.env.DB_CLUSTER_ARN;
const DB_NAME = process.env.DB_NAME;

const dataApiClient = require('data-api-client')({
    secretArn: DB_SECRET_ARN,
    resourceArn: DB_CLUSTER_ARN,
    database: DB_NAME
});

const DEFAULT_COACH_ID = 1;
const DEFAULT_PROGRAM_ID = 1;

exports.handler = async event => {

    console.log(`[RECEIVED_EVENT] :`, JSON.stringify(event, 4));

    try {

        const { userPoolId, userName } = event;
        const { email = "", sub, name = "", family_name = "" } = event.request.userAttributes || null;

        console.log(`userName: ${userName}, email: ${email}`);

        if (!email || !userName) {
            throw new Error('Invalid email or sub');
        }

        const countResult = await dataApiClient.query(`SELECT COUNT(id) userCount FROM User WHERE sub = :userName`, {
            userName: userName
        });

        const userCount = countResult.records[0].userCount || 0;

        /**
         * ! User already exist, Don't make new entry
         * ! If user not exist then add new entry
         */
        if (userCount == 0) {

            const userId = await getNextTableID('User');
            const clientProgramMappingId = await getNextTableID('ClientProgramMapping');

            const queryTransaction = await dataApiClient.transaction()
                .query(`INSERT INTO User (id, sub, userType, firstName, lastName, email, timezone) VALUES(:id, :sub, :userType, :firstName, :lastName, :email, :timezone)`, {
                    id: userId,
                    sub: userName,
                    userType: 'client',
                    firstName: name,
                    lastName: family_name,
                    email: email,
                    timezone: 'UTC'
                })
                .query(`INSERT INTO ClientCoachMapping (coachId, clientId) VALUES(:coachId, :clientId)`, {
                    coachId: DEFAULT_COACH_ID,
                    clientId: userId
                })
                .query(`INSERT INTO ClientSchedule (clientId, scheduleDay, startTime) VALUES(:clientId, :scheduleDay, :startTime)`, [
                    [{ clientId: userId, scheduleDay: "MON", startTime: "10:00" }],
                    [{ clientId: userId, scheduleDay: "TUE", startTime: "10:00" }],
                    [{ clientId: userId, scheduleDay: "WED", startTime: "10:00" }],
                    [{ clientId: userId, scheduleDay: "THU", startTime: "10:00" }],
                    [{ clientId: userId, scheduleDay: "FRI", startTime: "10:00" }],
                    [{ clientId: userId, scheduleDay: "SAT", startTime: "10:00" }],
                    [{ clientId: userId, scheduleDay: "SUN", startTime: "10:00" }]
                ])
                .query(`INSERT INTO ClientProgramMapping (id, programId, clientId, isActiveProgram, isCompleted) VALUES(:id, :programId, :clientId, :isActiveProgram, :isCompleted)`, {
                    id: clientProgramMappingId,
                    programId: DEFAULT_PROGRAM_ID,
                    clientId: userId,
                    isActiveProgram: '1',
                    isCompleted: '0'
                })
                .rollback((e, status) => {
                    console.log('rollback error', e);
                    console.log('rollback status', status);
                    throw new Error(e.message);
                })
                .commit();
            console.log("queryTransaction", queryTransaction);
        }

        return event;

    } catch (error) {

        console.log('[CATCHED ERROR]', error);
        return error;
    }
};


/**
 * Get NEXT AUTO_INCREMENT value for the Table
 */
const getNextTableID = async (tableName = null) => {

    if (!tableName) throw new Error('INVALID_TABLE_NAME');
    const queryResult = await dataApiClient.query(`SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = '${tableName}';`);
    console.log("getNextTableID -> queryResult", queryResult);
    if (queryResult.records && queryResult.records.length > 0 && queryResult.records[0].hasOwnProperty('AUTO_INCREMENT')) {
        return queryResult.records[0].AUTO_INCREMENT
    }
    throw new Error('DB_ERROR_FAILED_TO_GET_TABLE_NEXT_ID');
}