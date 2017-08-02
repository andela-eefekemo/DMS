const faker = require('faker');

const email = faker.internet.email();
const password = faker.internet.password();
const newPassword = faker.internet.password();
const newEmail = faker.internet.email();
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();

module.exports = {
  'User sign up without credentials': browser =>
    browser
      .url('http://localhost:7000/auth/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=firstName]', '')
      .setValue('input[name=lastName]', '')
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .setValue('input[name=confirmPassword]', '')
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'No field should be left blank'),
  'User sign up with existing email': browser =>
    browser
      .url('http://localhost:7000/auth/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=firstName]', 'Eguono')
      .setValue('input[name=lastName]', 'Efekemo')
      .setValue('input[name=email]', 'hello@hello.com')
      .setValue('input[name=password]', 'hello')
      .setValue('input[name=confirmPassword]', 'hello')
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Email already exists'),
  'User sign up success': browser =>
    browser
      .url('http://localhost:7000/auth/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=firstName]', 'Eguono')
      .setValue('input[name=lastName]', 'Efekemo')
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000),
  'User sign in without credentials': browser =>
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'No field should be left blank'),
  'User sign in with wrong email': browser =>
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'wrong')
      .setValue('input[name=password]', 'password123')
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Please Input Valid Email'),
  'User sign in with wrong password': browser =>
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'hello@hello.com')
      .setValue('input[name=password]', 'a very wrong password')
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText(
      '.toast', 'Wrong password, Please input correct password'),
  'User sign in success': browser =>
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000),
  'User should be able to update his/her profile': browser =>
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .click('#user-header')
      .click('#profile')
      .waitForElementVisible('input', 5000)
      .pause(5000)
      .clearValue('input[name=firstName]')
      .setValue('input[name=firstName]', firstName)
      .clearValue('input[name=lastName]')
      .setValue('input[name=lastName]', lastName)
      .clearValue('input[name=email]')
      .setValue('input[name=email]', newEmail)
      .pause(5000)
      .click('#update-button')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Profile updated!')
      .click('#profile')
      .waitForElementVisible('input', 5000)
      .assert.valueContains('#firstName', firstName)
      .assert.valueContains('#lastName', lastName),
  'User should be able to search through user': browser =>
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'efe@gmail.com')
      .setValue('input[name=password]', 'password')
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .click('#user-header')
      .pause(2000)
      .click('#userList')
      .waitForElementVisible('input', 5000)
      .pause(2000)
      .clearValue('input[name=searchTerm]')
      .setValue('input[name=searchTerm]', 'hello')
      .pause(5000)
      .assert.containsText('.scrollable > div > a', 'hello eguono')
      .end(),
};
