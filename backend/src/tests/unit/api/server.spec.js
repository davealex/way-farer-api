import mocha from 'mocha';
const { describe } = mocha;
import chai from 'chai';
const { expect } = chai;
import chaiHttp from 'chai-http';
import logger from '../../../config/winston';
import app from '../../../server';

chai.use(chaiHttp);

describe('Server is online', () => {
  it('Request should return status 200', (done) => {
    chai.request(app).get('/')
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      })
      .catch(err => logger.error({ message: err.message }));
  });
});
