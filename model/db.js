var config = require("../config.json");

var knex = require('knex')({
    client: 'mssql',
    connection: {
        host: config.db.host,
        user: config.db.user,
        password: config.db.password,
        database: config.db.database
    }
});

var build = (item) => item;

export default {
    get_courses() {
        return knex.select().from(config.db.table).then(build);
    }
}