import { Pool } from 'pg';
import logger from '../config/winston';
import config from '../config/app';

const { DATABASE_URL } = config;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: true,
});

pool.on('connect', () => {
  logger.info({ message: 'connected to the db' });
});


export default {
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  end: () => pool.end(),
};
