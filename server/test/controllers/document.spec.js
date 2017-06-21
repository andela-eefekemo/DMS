import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../testData';

import server from '../../../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Document', () => {
  let savedUser;
  let userToken;
  let savedUser1;
  let userTokenOne;
  let savedUser2;
  let userToken2;
  let privateDocument1;
  let publicDocument1;
  let roleDocument1;
  let privateDocument2;
  let publicDocument2;
  let roleDocument2;
  before((done) => {
    chai.request(server)
      .post('/users')
      .send(testData.userEight)
      .end((err, res) => {
        savedUser = res.body.userData;
        userToken = res.body.token;
        res.should.have.status(200);
      });
    chai.request(server)
      .post('/users')
      .send(testData.userNine)
      .end((err, res) => {
        savedUser1 = res.body.userData;
        userTokenOne = res.body.token;
        res.should.have.status(200);
      });
    chai.request(server)
      .post('/users')
      .send(testData.userTen)
      .end((err, res) => {
        savedUser2 = res.body.userData;
        userToken2 = res.body.token;
        res.should.have.status(200);
        done();
      });
  });
  before((done) => {
    chai.request(server)
      .post('/documents')
      .set({ Authorization: userTokenOne })
      .send(testData.documentSix)
      .end((err, res) => {
        privateDocument1 = res.body.newDocument;
        res.should.have.status(200);
      });
    chai.request(server)
      .post('/documents')
      .set({ Authorization: userTokenOne })
      .send(testData.documentEight)
      .end((err, res) => {
        publicDocument1 = res.body.newDocument;
        res.should.have.status(200);
      });
    chai.request(server)
      .post('/documents')
      .set({ Authorization: userTokenOne })
      .send(testData.documentTen)
      .end((err, res) => {
        roleDocument1 = res.body.newDocument;
        res.should.have.status(200);
      });
    chai.request(server)
      .post('/documents')
      .set({ Authorization: userToken })
      .send(testData.documentSeven)
      .end((err, res) => {
        privateDocument2 = res.body.newDocument;
        res.should.have.status(200);
      });
    chai.request(server)
      .post('/documents')
      .set({ Authorization: userToken })
      .send(testData.documentNine)
      .end((err, res) => {
        publicDocument2 = res.body.newDocument;
        res.should.have.status(200);
      });
    chai.request(server)
      .post('/documents')
      .set({ Authorization: userToken })
      .send(testData.documentEleven)
      .end((err, res) => {
        roleDocument2 = res.body.newDocument;
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

  // list all documents
  describe('DOCUMENTS listAll', () => {
    it('should listAll documents for the admin', () => {
      chai.request(server)
        .get('/documents')
        .set({ Authorization: userTokenOne })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Documents found');
          res.body.should.have.property('documentList');
          res.body.documentList.length.should.eql(8);
        });
    });

    it(
      'should list role, public and private documents user has access to view',
      () => {
        chai.request(server)
          .get('/documents')
          .set({ Authorization: userToken })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Documents found');
            res.body.should.have.property('documentList');
            res.body.documentList.length.should.eql(5);
          });
      });
    it('should list only public and documents if user has no other access',
      () => {
        chai.request(server)
          .get('/documents')
          .set({ Authorization: userToken2 })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Documents found');
            res.body.should.have.property('documentList');
            res.body.documentList.length.should.eql(2);
          });
      });
    it('should fail if user is not logged in', () => {
      chai.request(server)
        .get('/documents')
        .end((err, res) => {
          res.should.have.status(404);
        });
    });
  });

  describe('DOCUMENTS view', () => {
    describe('admin', () => {
      it('should view private document for regularUser', (done) => {
        chai.request(server)
          .get(`/documents/${privateDocument2.id}`)
          .set({ Authorization: userTokenOne })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title').eql(privateDocument2.title);
            done();
          });
      });

      it('should view role document of regularUser', (done) => {
        chai.request(server)
          .get(`/documents/${roleDocument2.id}`)
          .set({ Authorization: userTokenOne })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title').eql(roleDocument2.title);
            done();
          });
      });

      it('should view public document of regularUser', (done) => {
        chai.request(server)
          .get(`/documents/${publicDocument2.id}`)
          .set({ Authorization: userTokenOne })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title').eql(publicDocument2.title);
            done();
          });
      });
    });

    describe('regularUser', () => {
      it('should  not view private document for admin', (done) => {
        chai.request(server)
          .get(`/documents/${privateDocument1.id}`)
          .set({ Authorization: userToken })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property(
              'message').eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should not view role document of admin', (done) => {
        chai.request(server)
          .get(`/documents/${roleDocument1.id}`)
          .set({ Authorization: userToken })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property(
              'message').eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should view public document of admin', (done) => {
        chai.request(server)
          .get(`/documents/${publicDocument1.id}`)
          .set({ Authorization: userToken })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title').eql(publicDocument1.title);
            done();
          });
      });

      it('should view private own document', (done) => {
        chai.request(server)
          .get(`/documents/${privateDocument2.id}`)
          .set({ Authorization: userToken })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title').eql(privateDocument2.title);
            done();
          });
      });
    });

    describe('contributor', () => {
      it('should not view private document for admin', (done) => {
        chai.request(server)
          .get(`/documents/${privateDocument1.id}`)
          .set({ Authorization: userToken2 })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property(
              'message').eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should not view role document of admin', (done) => {
        chai.request(server)
          .get(`/documents/${roleDocument1.id}`)
          .set({ Authorization: userToken2 })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property(
              'message').eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should view public document of admin', (done) => {
        chai.request(server)
          .get(`/documents/${publicDocument1.id}`)
          .set({ Authorization: userToken2 })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title').eql(publicDocument1.title);
            done();
          });
      });

      it('should not view private of other user', (done) => {
        chai.request(server)
          .get(`/documents/${privateDocument2.id}`)
          .set({ Authorization: userToken2 })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property(
              'message').eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should not view role document of regularUser', (done) => {
        chai.request(server)
          .get(`/documents/${roleDocument2.id}`)
          .set({ Authorization: userToken2 })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property(
              'message').eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should view public document of regularUser', (done) => {
        chai.request(server)
          .get(`/documents/${publicDocument2.id}`)
          .set({ Authorization: userToken2 })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title').eql(publicDocument2.title);
            done();
          });
      });
    });
  });
});
