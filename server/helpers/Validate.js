
/**
 * @class Validate
 */
class Validate {
  /**
   * @static
   * @param {any} [req]
   * @memberof Validate
   * @return {void}
   */
  static user(req) {
    let firstName, lastName, email, password, password1;
    if (!req.body.firstName || !req.body.firstName) {
      email = req.body.email;
      password = req.body.password;
      req.checkBody('email', 'Please Input Valid Email').isEmail().notEmpty();
      req.checkBody('password', 'Password is Required').notEmpty();
    } else {
      firstName = req.body.firstName;
      lastName = req.body.lastName;
      email = req.body.email;
      password = req.body.password;
      password1 = req.body.password1;
      req.checkBody('firstName', 'Last Name is Required').notEmpty();
      req.checkBody('firstName', 'Must be alphabets').isAlpha();
      req.checkBody('lastName', 'Last Name is Required').notEmpty();
      req.checkBody('lastName', 'Must be alphabets').isAlpha();
      req.checkBody('email', 'Email is Required').notEmpty();
      req.checkBody('email', 'Email is not valid').isEmail();
      req.checkBody('password', 'Password is Required').notEmpty();
      req.checkBody('password1', 'Passwords do not match').equals(password);
    }
  }

  /**
   * @static
   * @param {any} req
   * @memberof Validate
   * @return {void}
   */
  static role(req) {
    const title = req.body.title;
    const description = req.body.description;

    req.checkBody('title', 'Title is Required').notEmpty();
    req.checkBody('title', 'Must be alphabets').isAlpha();
    req.checkBody('description', 'Descrition is Required').notEmpty();
  }
}

export default Validate;

