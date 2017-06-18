import db from '../models';
import validate from '../helpers/Validate';

/**
 * @class Role
 */
class Role {

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberof Role
   * @method create
   */
  static create(req, res) {
    validate.role(req);
    const validateErrors = req.validationErrors();
    if (validateErrors) {
      res.status(403).send({ error: validateErrors });
    } else {
      db.Role.findOne({ where: { title: req.body.title } })
        .then((role) => {
          if (role !== null) {
            res.status(400).send({ message: 'Role already exists' });
          } else {
            return db.Role.create({
              title: req.body.title,
              description: req.body.description
            })
              .then((newRole) => {
                newRole.save().then((savedRole) => {
                  res.status(200).send({ message: 'Role created', savedRole });
                });
              })
              .catch((error) => {
                res.send({
                  message: "We're sorry, the new role couldn't be created",
                  error
                });
              });
          }
        });
    }
  }
}

export default Role;
