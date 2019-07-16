import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import logger from '../../../config/winston';
import app from '../../../server';

const { describe } = mocha;
const { expect } = chai;

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
