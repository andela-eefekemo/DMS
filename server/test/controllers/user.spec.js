import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../testData';

import server from '../../../server';

const should = chai.should();

chai.use(chaiHttp);

// Sign up user
describe('/POST users', () => {
  it('should fail without email field', (done) => {
    chai.request(server)
      .post('/users')
      .send(testData.incompleteInfo)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('array');
        res.body.error[0].should.have.property('msg').eql('Email is Required');
        done();
      });
  });
  it('should save user info', (done) => {
    chai.request(server)
      .post('/users')
      .send(testData.newUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('userData');
        res.body.should.have.property('message');
        res.body.userData.should.be.a('object');
        res.body.message.should.be.a('string').eql('Signup successful');
        res.body.userData.should.have.property('firstName');
        res.body.userData.should.have.property('lastName');
        res.body.userData.should.have.property('email');
        res.body.userData.should.have.property('password');
        done();
      });
  });

  it('should return a token', (done) => {
    chai.request(server)
      .post('/users')
      .send(testData.userOne)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        res.body.token.should.be.a('string');
        done();
      });
  });

  it('should fail if email already exists', (done) => {
    chai.request(server)
      .post('/users')
      .send(testData.newUser)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.have.property('message').eql('Email already exists');
        done();
      });
  });
});

// Login user
describe('/POST users/login', () => {
  it('should log in user', (done) => {
    chai.request(server)
      .post('/users/login')
      .send(testData.userTwo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('userData');
        res.body.should.have.property('message');
        res.body.userData.should.be.a('object');
        res.body.message.should.be.a('string').eql('login successful');
        res.body.userData.should.have.property('email');
        res.body.userData.should.have.property('password');
        done();
      });
  });

  it('should return a token', (done) => {
    chai.request(server)
      .post('/users/login')
      .send(testData.userTwo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('token');
        res.body.token.should.be.a('string');
        done();
      });
  });

  it('should fail without email field', (done) => {
    chai.request(server)
      .post('/users/login')
      .send({ password: 'eguono' })
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('error');
        res.body.error.should.be.a('array');
        res.body.error[0].should.have.property('msg').eql(
          'Please Input Valid Email');
        done();
      });
  });

  it('should fail without correct password', (done) => {
    chai.request(server)
      .post('/users/login')
      .send(testData.userThree)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql(
          'Invalid password');
        done();
      });
  });
});

// POST /users/logout
describe('/POST logout user', () => {
  it('should logout user', (done) => {
    chai.request(server)
      .post('/users/logout')
      .send(testData.userThree)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.message.should.be.a('string').eql(
          'Success, delete user token');
        done();
      });
  });
});

// GET /users
describe('/GET users', () => {
  it('should be only accessible to admins', (done) => {
    chai.request(server)
      .get('/users')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql(
          "We're sorry, you're not authorized for this feature");
        done();
      });
  });
  it('should get list of users', (done) => {
    chai.request(server)
      .get('/users?roleId=1')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('userList');
        res.body.should.have.property('message').eql('Users found');
        res.body.should.have.property('metaData');
        res.body.metaData.should.be.a('object');
        res.body.userList.length.should.be.eql(4);
        done();
      });
  });

  it('should limit list of users', (done) => {
    chai.request(server)
      .get('/users?roleId=1&limit=2')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('userList');
        res.body.should.have.property('message').eql('Users found');
        res.body.should.have.property('metaData');
        res.body.metaData.should.be.a('object');
        res.body.userList.length.should.be.eql(2);
        done();
      });
  });
  it('should limit users based on offset', (done) => {
    chai.request(server)
      .get('/users?roleId=1&limit=2&offset=3')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('userList');
        res.body.should.have.property('message').eql('Users found');
        res.body.should.have.property('metaData');
        res.body.metaData.should.be.a('object');
        res.body.userList.length.should.be.eql(1);
        done();
      });
  });
});
