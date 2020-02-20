import Sequelize from 'sequelize';
import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../testData';

import { Document } from '../../models'
import server from '../../../server';

const should = chai.should(); // eslint-disable-line'
const { and, or, iLike } = Sequelize.Op;

chai.use(chaiHttp);

describe('Document', () => {
  let savedUser;
  let regularUserToken;
  let adminUser;
  let adminToken;
  let contributorToken;
  let adminPrivate;
  let adminPublic;
  let adminRole;
  let regularUserPrivate;
  let regularUserPublic;
  let regularUserRole;

  before(async () => {
    const firstResponse = await chai.request(server)
      .post('/api/v1/users')
      .send(testData.userEight);

    const secondResponse = await chai.request(server)
      .post('/api/v1/users')
      .send(testData.userNine);

    const thirdResponse = await chai.request(server)
      .post('/api/v1/users')
      .send(testData.userTen);


    firstResponse.should.have.status(201);
    secondResponse.should.have.status(201);
    thirdResponse.should.have.status(201);

    regularUserToken = `Bearer ${firstResponse.body.token}`;
    adminToken = `Bearer ${secondResponse.body.token}`;
    contributorToken = `Bearer ${thirdResponse.body.token}`;

    savedUser = firstResponse.body.userData;
    adminUser = secondResponse.body.userData;
  });
  before(async () => {
    const firstResponse = await chai.request(server)
      .post('/api/v1/documents')
      .set({ Authorization: adminToken })
      .send(testData.documentSix);

    const secondResponse = await chai.request(server)
      .post('/api/v1/documents')
      .set({ Authorization: adminToken })
      .send(testData.documentEight);

    const thirdResponse = await chai.request(server)
      .post('/api/v1/documents')
      .set({ Authorization: adminToken })
      .send(testData.documentTen);


    firstResponse.should.have.status(201);
    secondResponse.should.have.status(201);
    thirdResponse.should.have.status(201);

    adminPrivate = firstResponse.body.newDocument;
    adminPublic = secondResponse.body.newDocument;
    adminRole = thirdResponse.body.newDocument;
  });

  before(async () => {
    const firstResponse = await chai.request(server)
      .post('/api/v1/documents')
      .set({ Authorization: regularUserToken })
      .send(testData.documentSeven);

    const secondResponse = await chai.request(server)
      .post('/api/v1/documents')
      .set({ Authorization: regularUserToken })
      .send(testData.documentNine);

    const thirdResponse = await chai.request(server)
      .post('/api/v1/documents')
      .set({ Authorization: regularUserToken })
      .send(testData.documentEleven);

    firstResponse.should.have.status(201);
    secondResponse.should.have.status(201);
    thirdResponse.should.have.status(201);

    regularUserPrivate = firstResponse.body.newDocument;
    regularUserPublic = secondResponse.body.newDocument;
    regularUserRole = thirdResponse.body.newDocument;

  });

  // create documents
  describe('/api/v1/DOCUMENTS create', () => {
    it('should allow create new user document', async () => {
      const res = await chai.request(server)
        .post('/api/v1/documents')
        .set({ Authorization: regularUserToken })
        .send(testData.documentOne);

      res.should.have.status(201);
      res.body.should.have.property('newDocument');
      res.body.should.have.property('message').eql(
        'Document successfully created'
      );
      res.body.newDocument.should.have.property(
        'authorId'
      ).eql(savedUser.id);
      res.body.newDocument.should.have.property(
        'roleId'
      );
    });

    it('should not create document with incorrect access type', (done) => {
      chai.request(server)
        .post('/api/v1/documents')
        .set({ Authorization: regularUserToken })
        .send(testData.documentFive)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql(
            'Invalid Access Type'
          );
          done();
        });
    });

    it('should not create document with existing title', (done) => {
      chai.request(server)
        .post('/api/v1/documents')
        .set({ Authorization: regularUserToken })
        .send(testData.documentOne)
        .end((err, res) => {
          res.should.have.status(500);
          res.error.should.have.property('text').eql(
            'Title must be unique'
          );
          done();
        });
    });

    it('should not create document with no access type', (done) => {
      chai.request(server)
        .post('/api/v1/documents')
        .set({ Authorization: regularUserToken })
        .send(testData.documentFour)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql(
            'Invalid Access Type'
          );
          done();
        });
    });

    it('should fail if user is not signed in', (done) => {
      chai.request(server)
        .post('/api/v1/documents')
        .send(testData.documentThree)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  // list all documents
  describe('DOCUMENTS listAll', () => {
    it('should listAll documents for the admin', async () => {
      const res = await chai.request(server)
        .get('/api/v1/documents?limit=20')
        .set({ Authorization: adminToken });
      const documentList = await Document.findAll();
      res.should.have.status(200);
      res.body.should.have.property('message').eql('Documents found');
      res.body.should.have.property('documentList');
      res.body.documentList.length.should.eql(documentList.length);
    });

    it(
      'should list role, public and private documents user has access to view',
      async () => {
        const res = await chai.request(server)
          .get('/api/v1/documents?limit=20')
          .set({ Authorization: regularUserToken });
        const query = {
          [or]: [
            {
              [or]: [{ access: 'public' }, {
                [and]: [
                  { access: 'role' }, { roleId: savedUser.roleId }]
              }]
            },
            { authorId: savedUser.id }
          ]
        };
        const documentList = await Document.findAll({ where: query });
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Documents found');
        res.body.should.have.property('documentList');
        res.body.documentList.length.should.eql(documentList.length);
      }
    );
    it('should list only public documents if user has no other access',
      async () => {
        const res = await chai.request(server)
          .get('/api/v1/documents?limit=20')
          .set({ Authorization: contributorToken });
        const documentList = await Document.findAll({ where: { access: 'public' } });
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Documents found');
        res.body.should.have.property('documentList');
        res.body.documentList.length.should.eql(documentList.length);
      });
    it('should fail if user is not logged in', (done) => {
      chai.request(server)
        .get('/api/v1/documents')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  // View documents by id
  describe('DOCUMENTS view', () => {
    describe('admin', () => {
      it('should view private document for regularUser', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${regularUserPrivate.id}`)
          .set({ Authorization: adminToken })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title'
            ).eql(regularUserPrivate.title);
            done();
          });
      });

      it('should view role document of regularUser', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${regularUserRole.id}`)
          .set({ Authorization: adminToken })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title'
            ).eql(regularUserRole.title);
            done();
          });
      });

      it('should view public document of regularUser', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${regularUserPublic.id}`)
          .set({ Authorization: adminToken })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title'
            ).eql(regularUserPublic.title);
            done();
          });
      });
    });

    describe('regularUser', () => {
      it('should  not view private document for admin', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${adminPrivate.id}`)
          .set({ Authorization: regularUserToken })
          .end((err, res) => {
            res.should.have.status(403);
            res.error.should.have.property(
              'text'
            ).eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should not view role document of admin', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${adminRole.id}`)
          .set({ Authorization: regularUserToken })
          .end((err, res) => {
            res.should.have.status(403);
            res.error.should.have.property(
              'text'
            ).eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should view public document of admin', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${adminPublic.id}`)
          .set({ Authorization: regularUserToken })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title'
            ).eql(adminPublic.title);
            done();
          });
      });

      it('should view private own document', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${regularUserPrivate.id}`)
          .set({ Authorization: regularUserToken })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title'
            ).eql(regularUserPrivate.title);
            done();
          });
      });
    });

    describe('contributor', () => {
      it('should not view private document for admin', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${adminPrivate.id}`)
          .set({ Authorization: contributorToken })
          .end((err, res) => {
            res.should.have.status(403);
            res.error.should.have.property(
              'text'
            ).eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should not view role document of admin', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${adminRole.id}`)
          .set({ Authorization: contributorToken })
          .end((err, res) => {
            res.should.have.status(403);
            res.error.should.have.property(
              'text'
            ).eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should view public document of admin', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${adminPublic.id}`)
          .set({ Authorization: contributorToken })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title'
            ).eql(adminPublic.title);
            done();
          });
      });

      it('should not view private of other user', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${regularUserPrivate.id}`)
          .set({ Authorization: contributorToken })
          .end((err, res) => {
            res.should.have.status(403);
            res.error.should.have.property(
              'text'
            ).eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should not view role document of regularUser', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${regularUserRole.id}`)
          .set({ Authorization: contributorToken })
          .end((err, res) => {
            res.should.have.status(403);
            res.error.should.have.property(
              'text'
            ).eql('You are unauthorized to view this document');
            done();
          });
      });

      it('should view public document of regularUser', (done) => {
        chai.request(server)
          .get(`/api/v1/documents/${regularUserPublic.id}`)
          .set({ Authorization: contributorToken })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Document found');
            res.body.should.have.property('document');
            res.body.document.should.have.property(
              'title'
            ).eql(regularUserPublic.title);
            done();
          });
      });
    });

    it('should fail if document does not exist', (done) => {
      chai.request(server)
        .get('/api/v1/documents/3000')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          res.should.have.status(404);
          res.error.should.have.property('text').eql('Document not found');
          done();
        });
    });
  });

  // Update documents by id
  describe('DOCUMENTS update', () => {
    it('should allow a user to update his/her document', (done) => {
      chai.request(server)
        .put(`/api/v1/documents/${regularUserPrivate.id}`)
        .set({ Authorization: regularUserToken })
        .send({ title: 'The great divide' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property(
            'message'
          ).eql('Document information has been updated');
          res.body.should.have.property('updatedDocument');
          res.body.updatedDocument.should.have.property(
            'title'
          ).eql('The great divide');
          done();
        });
    });

    it('should not allow a user to update other users document', (done) => {
      chai.request(server)
        .put(`/api/v1/documents/${regularUserPrivate.id}`)
        .set({ Authorization: contributorToken })
        .send({ title: 'The main man' })
        .end((err, res) => {
          res.should.have.status(403);
          res.error.should.have.property(
            'text'
          ).eql('You are unauthorized to view this document');
          res.body.should.not.have.property('updatedDocument');
          done();
        });
    });

    it('should allow admin to update other users document', (done) => {
      chai.request(server)
        .put(`/api/v1/documents/${regularUserPrivate.id}`)
        .set({ Authorization: adminToken })
        .send({ title: 'The main man' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property(
            'message'
          ).eql('Document information has been updated');
          res.body.should.have.property('updatedDocument');
          res.body.updatedDocument.should.have.property(
            'title'
          ).eql('The main man');
          done();
        });
    });

    it('should fail if input field is empty', (done) => {
      chai.request(server)
        .put(`/api/v1/documents/${regularUserPrivate.id}`)
        .set({ Authorization: adminToken })
        .send({ title: '' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property(
            'message'
          ).eql('Title is Required');
          res.body.should.not.have.property('updatedDocument');
          done();
        });
    });

    it('should fail if document title already exists', (done) => {
      chai.request(server)
        .put(`/api/v1/documents/${adminPrivate.id}`)
        .set({ Authorization: adminToken })
        .send({ title: 'Harry Potter 10' })
        .end((err, res) => {
          res.should.have.status(409);
          res.error.should.have.property(
            'text'
          ).eql('Document already exists');
          res.body.should.not.have.property('updatedDocument');
          done();
        });
    });
  });

  // Get user documents by id
  describe('GETUSERDOCUMENTS', () => {
    it('should get all documents by user', async () => {
      const res = await chai.request(server)
        .get(`/api/v1/users/${adminUser.id}/documents?limit=20`)
        .set({ Authorization: adminToken });
      const documentList = await Document.findAll({ where: { authorId: adminUser.id } });
      res.should.have.status(200);
      res.body.should.have.property('message').eql('Documents found');
      res.body.should.have.property('documents');
      res.body.documents.length.should.eql(documentList.length);
    });
  });

  // Search documents by title
  describe('DOCUMENTS search', () => {
    it('admin should search all documents based on title', async () => {
      const res = await chai.request(server)
        .get('/api/v1/search/documents?q=o&limit=20')
        .set({ Authorization: adminToken });
      const documentList = await Document.findAll(
        { where: { title: { [iLike]: `%o%` } } });
      res.should.have.status(200);
      res.body.should.have.property('documentList');
      res.body.documentList.length.should.eql(documentList.length);
    });

    it('user should view only documents he/her has access to view', async () => {
      const res = await chai.request(server)
        .get('/api/v1/search/documents?q=o&limit=20')
        .set({ Authorization: regularUserToken });
      const query = {
        [and]: [{
          [or]: [
            {[or]: [
                { access: 'public' },
                {[and]: [{ access: 'role' }, { roleId: savedUser.roleId }]
              }]},
            { authorId: savedUser.id }]},
          { title: { [iLike]: `%o%` } }]
      }
      const documentList = await Document.findAll({ where: query });
      res.should.have.status(200);
      res.body.should.have.property('documentList');
      res.body.documentList.length.should.eql(documentList.length);
    });

    it('should return empty if an empty string is provided', async () => {
      const res = await chai.request(server)
        .get('/api/v1/search/documents?q=""')
        .set({ Authorization: regularUserToken });
      const documentList = await Document.findAll({ where: { title: { [iLike]: `%''%` } }});
      res.should.have.status(200);
      res.body.should.have.property('documentList');
      res.body.documentList.length.should.eql(documentList.length);
    });
  });

  // Delete documents by id
  describe('DOCUMENTS delete', () => {
    it('should not allow users to delete other users documents', (done) => {
      chai.request(server)
        .delete(`/api/v1/documents/${regularUserPrivate.id}`)
        .set({ Authorization: contributorToken })
        .end((err, res) => {
          res.should.have.status(403);
          res.error.should.have.property(
            'text'
          ).eql('You are unauthorized for this action');
          done();
        });
    });

    it('should allow users to delete his/her documents', (done) => {
      chai.request(server)
        .delete(`/api/v1/documents/${regularUserPrivate.id}`)
        .set({ Authorization: regularUserToken })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property(
            'message'
          ).eql('Document has been deleted');
          done();
        });
    });

    it('should allow admin to delete other users documents', (done) => {
      chai.request(server)
        .delete(`/api/v1/documents/${regularUserPublic.id}`)
        .set({ Authorization: adminToken })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property(
            'message'
          ).eql('Document has been deleted');
          done();
        });
    });

    it('should fail if document is not found', (done) => {
      chai.request(server)
        .delete('/api/v1/documents/5000')
        .set({ Authorization: contributorToken })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});
