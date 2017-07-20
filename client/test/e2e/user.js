module.exports = {
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
      .setValue('input[name=email]', 'hello@hello.com')
      .setValue('input[name=password]', 'hello')
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .assert.urlEquals(`${'http://localhost:7000/dashboard/alldocuments'}`),
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
      .setValue('input[name=email]', 'efekemo@efe.com')
      .setValue('input[name=password]', 'hello')
      .setValue('input[name=confirmPassword]', 'hello')
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .assert.urlEquals(`${'http://localhost:7000/dashboard/alldocuments'}`),
  'User should be able to update his/her profile': browser =>
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'efekemo@efe.com')
      .setValue('input[name=password]', 'hello')
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .assert.urlEquals(`${'http://localhost:7000/dashboard/alldocuments'}`)
      .click('#user-header')
      .click('#profile')
      .waitForElementVisible('input', 5000)
      .pause(5000)
      .setValue('input[name=firstName]', 'Eguono')
      .setValue('input[name=lastName]', 'John')
      .setValue('input[name=email]', 'efe@efe.com')
      .click('#update-button')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Profile updated!')
      .click('#user-header')
      .click('#profile')
      .waitForElementVisible('input', 5000)
      .click('#update-password')
      .pause(5000)
      .setValue('input[name=oldPassword]', 'hello')
      .setValue('input[name=password]', 'John')
      .setValue('input[name=confirmPassword]', 'John')
      .click('#update-button')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Profile updated!')
      .end(),
};
