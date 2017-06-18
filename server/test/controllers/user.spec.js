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
describe('/POST/logout user', () => {
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
