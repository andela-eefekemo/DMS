import jwt from 'jsonwebtoken';
/**
 * @class Authenticate
 */
class Authenticate {
  /**
   * @static
   * @param {any} request
   * @return {void}
   * @memberof Authenticate
   */
  static setUserInfo(request) {
    return {
      id: request.id,
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email,
      role: request.role,
    };
  }

  /**
   * @static
   * @param {any} user
   * @return {void}
   * @memberof Authenticate
   */
  static generateWebToken(user) {
    return jwt.sign(user, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7
    });
  }
}

export default Authenticate;

