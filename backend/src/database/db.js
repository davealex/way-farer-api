import { Pool } from 'pg';
import logger from '../config/winston';
import config from '../config/app';

const { DATABASE_URL } = config;

const db = new Pool({
  // connectionString: process.env.NODE_ENV === 'test' ? TEST_DB_URL : DATABASE_URL,
  connectionString: DATABASE_URL,
  ssl: true,
});

db.on('connect', () => {
  logger.info({ message: 'connected to the db' });
});

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        is_admin VARCHAR(128) NOT NULL DEFAULT false,
        created_at TIMESTAMP,
        updated_at TIMESTAMP
      )`;

  db.query(queryText)
    .then(() => {
      logger.info({ message: 'user table created' });
      db.end();
    })
    .catch((err) => {
      logger.info({ message: err });
      db.end();
    });
};

createUserTable();
