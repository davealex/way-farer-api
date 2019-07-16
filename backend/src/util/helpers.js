import jwt from 'jsonwebtoken';
import { hashSync } from 'bcrypt';
import config from '../config/app';

const { JWT_KEY } = config;

export const generateToken = email => jwt.sign({ email }, JWT_KEY, { expiresIn: 86400 });

export const hash = password => hashSync(password, 10);

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validateRequiredFields = (fields, requests, error) => {
  fields.forEach((value) => {
    if (!(value in requests) || !requests[value].trim()) {
      error.push({
        [value]: `The ${value} field is required`,
      });
    }
  });
};


export const isAlpha = (fields, requests, error) => {
  fields.forEach((value) => {
    if (!/^[a-z]+$/i.test(requests[value].trim())) {
      error.push({
        [value]: `The ${value} field must contain only alphabets`,
      });
    }
  });
};

export const isNumeric = (fields, requests, error) => {
  fields.forEach((value) => {
    if (!isNumeric(requests[value].trim())) {
      error.push({
        [value]: `The ${value} field must be numeric`,
      });
    }
  });
};


// export const compare = (pass, hash) => compareSync(pass, hash);
