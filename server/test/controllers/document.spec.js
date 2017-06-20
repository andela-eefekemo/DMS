import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../testData';

import server from '../../../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Document', () => {
  let savedUser;
  let userToken;
  before((done) => {
    chai.request(server)
      .post('/users')
      .send(testData.userEight)
      .end((err, res) => {
        savedUser = res.body.userData;
        userToken = res.body.token;
        res.should.have.status(200);
        done();
      });
  });

  // create documents
  describe('/DOCUMENTS create', () => {
    it('should allow create new user document', (done) => {
      chai.request(server)
        .post('/documents')
        .set({ Authorization: userToken })
        .send(testData.documentOne)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('newDocument');
          res.body.should.have.property('message').eql(
            'Document successfully created');
          res.body.newDocument.should.have.property(
            'authorId').eql(savedUser.id);
          res.body.newDocument.should.have.property(
            'roleId');
          done();
        });
    });

    it('should not create document with incorrect access type', (done) => {
      chai.request(server)
      .post('/documents')
      .set({ Authorization: userToken })
      .send(testData.documentFive)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql(
          "we're sorry, Use a valid access type, please try again");
      });
      done();
    });

    it('should not create document with the same title', (done) => {
      chai.request(server)
      .post('/documents')
      .set({ Authorization: userToken })
      .send(testData.documentOne)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql(
          "we're sorry, title must be unique, please try again");
      });
      done();
    });

    it('should not create document with the same title', (done) => {
      chai.request(server)
      .post('/documents')
      .set({ Authorization: userToken })
      .send(testData.documentFour)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql(
          'Invalid Access Type');
      });
      done();
    });

    it('should fail if user is not signed in', (done) => {
      chai.request(server)
      .post('/documents')
      .send(testData.documentThree)
      .end((err, res) => {
        res.should.have.status(404);
      });
      done();
    });
  });
});
