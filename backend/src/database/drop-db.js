import { Pool } from 'pg';
import logger from '../config/winston';
import config from '../config/app';

const { DATABASE_URL } = config;

const db = new Pool({
  connectionString: DATABASE_URL,
  ssl: true,
});

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users CASCADE';
  db.query(queryText)
    .then(() => {
      logger.info({ message: 'user table dropped' });
      // db.end();
    })
    .catch((err) => {
      logger.info({ message: err });
      db.end();
    });
};

dropUserTable();
