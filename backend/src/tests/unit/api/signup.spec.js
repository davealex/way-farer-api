import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import uuidv4 from 'uuid/v4';
import logger from '../../../config/winston';
import app from '../../../server';

import db from '../../../database/connect';

const { describe } = mocha;
const { expect } = chai;

chai.use(chaiHttp);

// Test for valid registration
describe('User signup', () => {
  before((done) => {
    const deleteQuery = 'DELETE FROM users WHERE email=$1 returning *';
    db.query(deleteQuery, ['james@email.com'])
      .then(() => {
        done();
      }).catch(err => logger.error({ message: err.message }));
  });

  it('Should return 201 and confirmation of valid input', (done) => {
    // mock valid user input
    const newUser = {
      id: uuidv4(),
      email: 'james@email.com',
      firstName: 'James',
      lastName: 'Bond',
      password: 'myPassword',
      confirmPassword: 'myPassword',
    };
    // send request to the app
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser)
      .then((res) => {
        // assertions
        expect(res).to.have.status(201);
        done();
      })
      .catch((err) => {
        logger.error({ message: err.message });
      });
  });

  // Test for invalid registration:
  it('Should fail if data is not sent', (done) => {
    // mock invalid user input
    const newUser = {
      id: uuidv4(),
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    };

    // send request to the app
    chai.request(app).post('/api/v1/auth/signup')
      .send(newUser)
      .then((res) => {
        expect(res).to.have.status(422);
        expect(res.body.error.length).to.be.greaterThan(0);
        done();
      })
      .catch(err => logger.error({ message: err.message }));
  });
});
