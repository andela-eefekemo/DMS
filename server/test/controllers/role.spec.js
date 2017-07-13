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
        adminToken = `JWT ${res.body.token}`;
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
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('array');
          res.body.message[0].should.have.property('msg').eql(
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
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Role already exists');
          done();
        });
    });
  });

  describe('/VIEW role', () => {
    it('should get list of roles', (done) => {
      chai.request(server)
        .get('/roles')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Roles found');
          res.body.should.have.property('roles');
          res.body.roles.length.should.eql(3);
          done();
        });
    });
  });

  describe('/UPDATE roles', () => {
    it('should update role', (done) => {
      chai.request(server)
        .put('/roles/3')
        .set({ Authorization: adminToken })
        .send({ description: 'has been updated' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('updatedRole');
          res.body.should.have.property(
            'message').eql('Role successfully updated');
          res.body.updatedRole.description.should.eql('has been updated');
          done();
        });
    });

    it('should fail if an empty input was sent', (done) => {
      chai.request(server)
        .put('/roles/3')
        .set({ Authorization: adminToken })
        .send({ description: '' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.not.have.property('updatedRole');
          res.body.message[0].should.have.property(
            'msg').eql('Description is Required');
          done();
        });
    });

    it('should fail if role does not exist', (done) => {
      chai.request(server)
        .put('/roles/300')
        .set({ Authorization: adminToken })
        .send({ description: 'hello world' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.not.have.property('updatedRole');
          res.body.should.have.property(
            'message').eql('Role not found');
          done();
        });
    });
  });

  describe('/DELETE role', () => {
    it('should delete role', (done) => {
      chai.request(server)
      .delete('/roles/3')
      .set({ Authorization: adminToken })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Role has been deleted');
        done();
      });
    });

    it('should fail if role does not exist', (done) => {
      chai.request(server)
        .delete('/roles/3000')
        .set({ Authorization: adminToken })
        .send({ description: 'hello world' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property(
            'message').eql('Role not found');
          done();
        });
    });
  });
});
