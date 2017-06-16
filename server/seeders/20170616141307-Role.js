module.exports = {
  up: (queryInterface) => {
    queryInterface.bulkInsert('Roles', [{
      name: 'regularUser',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('Roles', null, {});
  }
};
