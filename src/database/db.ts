const db = require('../configs/db.config');

const executeQuery = async (dbQuery: string, values: any) => {
    try {
        const res = await db.query(dbQuery, values);
        return res.rows;
    } catch (e) {
        throw e;
    }
}

module.exports = executeQuery;

export {};