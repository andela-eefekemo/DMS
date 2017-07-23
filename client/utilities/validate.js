import validator from 'validator';


/**
  * Validate required fields
  *
  * @param {Array} inputFields values
  * @param {Function} requiredFields names of fields
  * @returns {Object} object containing the status and possible error messages
  */
const validateRequiredFields = (inputFields = [], requiredFields = []) => {
  const errors = {};
  let valid = true;

  inputFields.forEach((field, index) => {
    if (validator.isEmpty(String(field))) {
      errors[requiredFields[index]] =
        `Please enter the ${requiredFields[index]}`;
      valid = false;
    }
  });

  return { errors, valid };
};
/**
 * @class Validate
 */
class Validate {

  /**
  * Validate login
  *
  * @param {Object} inputFields user details
  * @returns {Object} object containing the status and possible error messages
  */
  static validateLogin({ email = '', password = '' }) {
    return validateRequiredFields([email, password], ['email', 'password']);
  }

  /**
  * Validate signup
  *
  * @param {Object} inputFields user details
  * @returns {Object} object containing the status and possible error messages
  */
  static validateSignUp({
  firstName = '', password = '', lastName = '', email = '', confirmPassword
  }) {
    const status = validateRequiredFields(
      [firstName, password, lastName, email],
      ['firstName', 'password', 'lastName', 'email']);

    if (!validator.isEmail(email)) {
      status.errors.email = 'Please enter a valid email';
      status.valid = false;
    }

    if (password !== confirmPassword) {
      status.errors.confirmPassword = 'Password must match';
      status.valid = false;
    }

    return status;
  }
  /**
  * Validate save document
  *
  * @param {Object} inputFields document details
  * @returns {Object} object containing the status and possible error messages
  */
  static validateSaveDocument({ title = '', access = '', content = '' }) {
    const status = validateRequiredFields(
      [title, access, content], ['title', 'access', 'content']);

    if (access === 'null') {
      status.errors.access = 'Please choose an access control';
    }
    return status;
  }
  /**
  * Validate save document
  *
  * @param {Object} inputFields role details
  * @returns {Object} object containing the status and possible error messages
  */
  static validateSaveRole({ title = '', description = '' }) {
    const status = validateRequiredFields(
      [title, description], ['title', 'description']);
    return status;
  }/**
  * Validate save document
  *
  * @param {Object} inputFields document details
  * @returns {Object} object containing the status and possible error messages
  */
  static validateUpdateUser({
  firstName = '', lastName = '', email = ''
  }) {
    const status = validateRequiredFields(
      [firstName, lastName, email],
      ['firstName', 'lastName', 'email']);
    return status;
  }

}

export default Validate;
