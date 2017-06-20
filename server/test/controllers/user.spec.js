import chai from 'chai';
import chaiHttp from 'chai-http';
import testData from '../testData';

import server from '../../../server';

const should = chai.should();

chai.use(chaiHttp);


describe('User', () => {
  let savedUser;
  let adminToken;
  let adminUser;
  let userToken;
  let updatedToken;
  let updatedUser;
  let savedUser5;
  let userToken5;
  let fineUser;
  let fineToken;
  let hotAdmin;
  let hotToken;
  before((done) => {
    chai.request(server)
      .post('/users')
      .send(testData.userFive)
      .end((err, res) => {
        savedUser5 = res.body.userData;
        userToken5 = res.body.token;
        res.should.have.status(200);
      });
    chai.request(server)
      .post('/users')
      .send(testData.userSix)
      .end((err, res) => {
        fineUser = res.body.userData;
        fineToken = res.body.token;
        res.should.have.status(200);
      });
    chai.request(server)
      .post('/users')
      .send(testData.userFour)
      .end((err, res) => {
        hotAdmin = res.body.userData;
        hotToken = res.body.token;
        res.should.have.status(200);
      });
    chai.request(server)
      .post('/users')
      .send(testData.admin2)
      .end((err, res) => {
        res.should.have.status(200);
        adminToken = res.body.token;
        adminUser = res.body.userData;
        done();
      });
  });

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
          savedUser = res.body.userData;
          userToken = res.body.token;
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
        .set({ Authorization: userToken })
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
        .set({ Authorization: adminToken })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('userList');
          res.body.should.have.property('message').eql('Users found');
          res.body.should.have.property('metaData');
          res.body.metaData.should.be.a('object');
          res.body.userList.length.should.be.eql(8);
          done();
        });
    });

    it('should limit list of users', (done) => {
      chai.request(server)
        .get('/users?roleId=1&limit=2')
        .set({ Authorization: adminToken })
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
        .get('/users?roleId=1&offset=3')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('userList');
          res.body.should.have.property('message').eql('Users found');
          res.body.should.have.property('metaData');
          res.body.metaData.should.be.a('object');
          res.body.userList.length.should.be.eql(5);
          done();
        });
    });
  });

  // Get user by id
  describe('/GET user:id', () => {
    it('should allow admin to view user', (done) => {
      chai.request(server)
        .get(`/users/${savedUser5.id}`)
        .set({ Authorization: adminToken })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.should.have.property('message').eql('User found');
          res.body.user.should.be.a('object');
          done();
        });
    });

    it('should allow a user to view his/her infomation', (done) => {
      chai.request(server)
        .get(`/users/${savedUser5.id}`)
        .set({ Authorization: userToken5 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.should.have.property('message').eql('User found');
          res.body.user.should.be.a('object');
          done();
        });
    });

    it("should return 'User not found' if user does not exist", (done) => {
      chai.request(server)
        .get('/users/20')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.not.have.property('user');
          res.body.should.have.property('message').eql('User not found');
          done();
        });
    });

    it('should not allow users to view other users infomation', (done) => {
      chai.request(server)
        .get(`/users/${adminUser.id}`)
        .set({ Authorization: userToken5 })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  // Update user by id
  describe('/PUT user:id', () => {
    it('should allow admin to update user information', (done) => {
      chai.request(server)
        .put(`/users/${savedUser.id}`)
        .send(testData.updatedUser)
        .set({ Authorization: adminToken })
        .end((err, res) => {
          updatedToken = res.body.token;
          updatedUser = res.body.updatedUser;
          res.should.have.status(200);
          res.body.should.have.property('updatedUser');
          res.body.should.have.property(
            'message').eql('User information has been updated');
          res.body.updatedUser.should.be.a('object');
          res.body.updatedUser.should.have.property(
            'firstName').not.eql(savedUser.firstName);
          done();
        });
    });

    it('should allow user to update his/her information', (done) => {
      chai.request(server)
        .put(`/users/${savedUser.id}`)
        .send({ firstName: 'Boy' })
        .set({ Authorization: updatedToken })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('updatedUser');
          res.body.should.have.property(
            'message').eql('User information has been updated');
          res.body.updatedUser.should.be.a('object');
          res.body.updatedUser.should.have.property(
            'firstName').eql('Boy');
          done();
        });
    });

    it('should not allow users to update other users information', (done) => {
      chai.request(server)
        .put(`/users/${savedUser.id}`)
        .send({ firstName: 'Boy' })
        .set({ Authorization: fineToken })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("should return 'User not found' if user does not exist", (done) => {
      chai.request(server)
        .get('/users/20')
        .set({ Authorization: adminToken })
        .send(testData.updatedUser)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.not.have.property('updatedUser');
          res.body.should.have.property('message').eql('User not found');
          done();
        });
    });
  });

  // Delete user by id
  describe('/DELETE user:id', () => {
    it('user should be able to delete his/her account', (done) => {
      chai.request(server)
        .delete(`/users/${updatedUser.id}`)
        .set({ Authorization: updatedToken })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('User has been deleted');
          done();
        });
    });

    it('admin should not be able to delete user account', (done) => {
      chai.request(server)
        .delete(`/users/${updatedUser.id}`)
        .set({ Authorization: adminToken })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql(
            'You are unauthorized for this action');
          done();
        });
    });
  });
});

