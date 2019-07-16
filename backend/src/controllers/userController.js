import moment from 'moment';
import uuidv4 from 'uuid/v4';
import logger from '../config/winston';
import db from '../database/connect';

import {
  hash, generateToken, validateEmail, validateRequiredFields,
} from '../util/helpers';

/**
 * Sign up
 *
 *
 * @param req
 * @param res
 */
const signUp = (req, res) => {
  const { email, password, confirmPassword } = req.body;
  const expectedValues = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
  const error = [];

  // required fields validation
  validateRequiredFields(expectedValues, req.body, error);

  // extra validation
  if (!validateEmail(email.trim())) error.push({ email: 'The email address is not valid' });
  if (confirmPassword !== password) error.push({ confirmPassword: 'The password does not match password field' });

  if (error.length > 0) {
    res.status(422).json({
      status: 422,
      error,
    });
    return;
  }

  // check if user exits
  db.query('SELECT * FROM users WHERE email = $1', [req.body.email.trim()])
    .then((resp) => {
      const user = resp.rows[0];
      if (user) {
        return res.status(400).json({
          status: 400,
          error: 'The email is taken.',
        });
      }

      // save new user
      const text = `INSERT INTO
      users(id, email, first_name, last_name, password, is_admin, created_at, updated_at)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;

      const role = req.body.email.trim() === 'admin@gmail.com';

      const values = [
        uuidv4(),
        req.body.email.trim(),
        req.body.firstName,
        req.body.lastName,
        hash(req.body.password.trim()),
        role,
        moment(),
        moment(),
      ];

      return db.query(text, values)
        .then(() => {
          const data = {
            user_id: values[0],
            is_admin: values[5],
            token: generateToken(req.body.email.trim()),
          };

          delete data.password;
          return res.status(201).json({
            status: 'success',
            data,
          });
        })
        .catch((err) => {
          logger.error({ message: err.message });
          return res.status(400).json({
            status: 400,
            error: 'Creating a new user failed. Please try again.',
          });
        });
      // return false;
    })
    .catch((err) => {
      logger.error({ message: err.message });
      return res.status(400).json({
        status: 400,
        error: 'Authentication failed. Please try again.',
      });
    });
};

export default signUp;
