import chai from 'chai';

import db from '../../models';

const expect = chai.expect;


const regularUser = {
  name: 'regularUser'
};


let role;

before((done) => {
  db.Role.create(regularUser).then((newRole) => {
    role = newRole;
    done();
  });
});

after(() => db.sequelize.sync({ force: true }));

describe('Role model', () => {
  it('should save the role information', () => {
    expect(regularUser.title).to.equal(role.title);
  });
});


describe('Role', () => {
  it('should be saved in database', () => {
    role.save().then((savedrole) => {
      expect(savedrole.title).to.equal(role.title);
    });
  });
});

