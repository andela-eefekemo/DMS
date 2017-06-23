import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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
      roleId: request.roleId,
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

  /**
   * @static
   * @param {any} password
   * @param {any} hash
   * @return {boolean} -
   * @memberof Authenticate
   */
  static verifyPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  /**
   * @static
   * @param {any} request
   * @returns {integer} -
   * @memberof Authenticate
   */
  static verify(request) {
    return Number(request);
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {request} -
   * @memberof Authenticate
   */
  static permitUserOrAdmin(req, res, next) {
    if (
      req.user.roleId === 1 || Number(req.params.id) === Number(req.user.id)) {
      res.locals.user = req.user;
      return next();
    }
    return res.status(401).send(
      { message: 'You are unauthorized for this action' });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns {request} -
   * @memberof Authenticate
   */
  static permitAdmin(req, res, next) {
    if (req.user.roleId !== 1) {
      return res.status(401).send(
        { message: "We're sorry, you're not authorized for this feature" });
    }
    res.locals.user = req.user;
    return next();
  }
}
export default Authenticate;

