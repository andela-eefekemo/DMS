import chai from 'chai';

import db from '../../models';

const expect = chai.expect;

const goodUser = {
  firstName: 'Eguono',
  lastName: 'Efekemo',
  email: 'efe@gmail.com',
  password: 'password'
};

const awesomeBook = {
  title: 'Best book ever written',
  content: 'And Eguono was so awesome it blow the world away',
  access: 'Private'
};


let book;

before((done) => {
  db.User.create(goodUser)
    .then((newUser) => {
      awesomeBook.authorId = newUser.id;
      db.Document.create(awesomeBook).then((newBook) => {
        book = newBook;
        done();
      });
    });
});

after(() => db.sequelize.sync({ force: true }));

describe('Document model', () => {
  it('should save the document information', () => {
    expect(awesomeBook.title).to.equal(book.title);
    expect(awesomeBook.content).to.equal(book.content);
    expect(awesomeBook.access).to.equal(book.access);
  });
});


describe('Document', () => {
  it('should be saved in database', () => {
    book.save().then((savedBook) => {
      expect(savedBook.firstName).to.equal(book.firstName);
      expect(savedBook.lastName).to.equal(book.lastName);
      expect(savedBook.userName).to.equal(book.userName);
    });
  });
});

