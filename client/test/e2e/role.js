
const faker = require('faker');

const title = faker.lorem.words(1);
const newTitle = faker.lorem.words(1);
const email = 'efe@gmail.com';
const password = 'password';
module.exports = {
  'Create role without credentials': (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .click('#role-header')
      .pause(1000)
      .click('#create-role')
      .pause(1000)
      .waitForElementVisible('input', 5000)
      .setValue('input[name=title]', '')
      .setValue('input[name=description]', '')
      .pause(3000)
      .click('#save-role')
      .pause(1000)
      .waitForElementVisible('.toast', 6000)
      .assert.containsText('.toast', 'No field should be left blank');
  },
  'User should be able to create role successfully': (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .click('#role-header')
      .pause(1000)
      .click('#create-role')
      .pause(1000)
      .waitForElementVisible('input', 5000)
      .setValue('input[name=title]', title)
      .setValue('input[name=description]', 'a description')
      .pause(3000)
      .click('#save-role')
      .pause(1000)
      .waitForElementVisible('.toast', 6000)
      .assert.containsText('.toast', 'Role created')
      .waitForElementVisible('.document-list-view', 5000)
      .pause(5000)
      .assert.containsText('.scrollable > div > h5', title);
  },
  'User should not be able to create role if title exists': (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .click('#role-header')
      .pause(1000)
      .click('#create-role')
      .pause(1000)
      .waitForElementVisible('input', 5000)
      .setValue('input[name=title]', title)
      .setValue('input[name=description]', 'a description')
      .pause(3000)
      .click('#save-role')
      .pause(1000)
      .waitForElementVisible('.toast', 6000)
      .assert
      .containsText(
      '.toast', 'Role already exists');
  },
  'User should not be able to update role with existing title':
  (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .click('#role-header')
      .pause(1000)
      .click('#roleList')
      .pause(5000)
      .click('#update-role')
      .pause(2000)
      .waitForElementVisible('input', 5000)
      .setValue('input[name=title]', 'admin')
      .setValue('input[name=description]', 'a description')
      .click('#update')
      .waitForElementVisible('.toast', 5000)
      .pause(1000)
      .assert.containsText('.toast',
      'Role title must be unique, please rename role');
  },
  'User should be able to update role':
  (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .click('#role-header')
      .pause(1000)
      .click('#roleList')
      .pause(5000)
      .click('#update-role')
      .pause(2000)
      .waitForElementVisible('input', 5000)
      .setValue('input[name=title]', newTitle)
      .setValue('input[name=description]', 'a description')
      .click('#update')
      .waitForElementVisible('.toast', 5000)
      .pause(1000)
      .assert.containsText('.toast', 'Role successfully updated');
  },
  'User delete role': (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .click('#role-header')
      .pause(1000)
      .click('#roleList')
      .pause(5000)
      .click('#delete-role')
      .pause(2000)
      .waitForElementVisible('h5', 5000)
      .click('#delete')
      .waitForElementVisible('.toast', 5000)
      .pause(1000)
      .assert.containsText('.toast', 'Role has been deleted')
      .end();
  },
};
