module.exports = {
  up: (queryInterface) => {
    queryInterface.bulkInsert('Documents', [{
      title: 'The Name of The Wind',
      content: 'The book of Kvothe the Awesome',
      access: 'private',
      authorId: 2,
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'The Way of Kings',
      content: 'The book of kayland the first of the knights radiants',
      access: 'public',
      authorId: 3,
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('Documents', null, {});
  }
};
