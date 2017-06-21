import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../testData';

import server from '../../../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Role', () => {
  let adminToken;

  before((done) => {
    chai.request(server)
      .post('/users')
      .send(testData.admin)
      .end((err, res) => {
        res.should.have.status(200);
        adminToken = res.body.token;
        done();
      });
  });

  describe('/POST roles', () => {
    it('should fail without title field', (done) => {
      chai.request(server)
        .post('/roles')
        .set({ Authorization: adminToken })
        .send(testData.incompleteRole)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          res.body.error.should.be.a('array');
          res.body.error[0].should.have.property('msg').eql(
            'Title is Required');
          done();
        });
    });

    it('should save role info', (done) => {
      chai.request(server)
        .post('/roles')
        .set({ Authorization: adminToken })
        .send(testData.roleOne)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('savedRole');
          res.body.savedRole.should.be.a('object');
          res.body.savedRole.should.have.property('title');
          res.body.savedRole.should.have.property('description');
          res.body.message.should.be.a('string').eql('Role created');
          done();
        });
    });

    it('should fail if title already exists', (done) => {
      chai.request(server)
        .post('/roles')
        .set({ Authorization: adminToken })
        .send(testData.roleOne)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Role already exists');
          done();
        });
    });
  });
});
