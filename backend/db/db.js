const { Pool } = require('pg');

const pool = new Pool({
  user: 'twfgpwyh',
  host: 'stampy.db.elephantsql.com',
  database: 'twfgpwyh',
  password: 'ISCBdy7dbXPTubcsvtzaEuE6J53VP6JK',
  port: 5432,
});

module.exports = pool;
