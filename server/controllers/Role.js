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
      res.status(200).send({ error: validateErrors });
    } else {
      db.Role.findOne({ where: { title: req.body.title } })
        .then((role) => {
          if (role !== null) {
            res.status(200).send({ message: 'Role already exists' });
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

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @return {request} -
   * @memberof Role
   */
  static view(req, res) {
    db.Role.findAll({ where: { id: { $not: [1, 2] } } })
      .then((roles) => {
        if (roles.length === 0) {
          return res.status(200).send({
            message: 'There are no roles currently'
          });
        }
        res.status(200).send({ message: 'Roles found', roles });
      }).catch((error) => {
        res.status(400).send({
          message: "we're sorry, there was an error please try again",
          error
        });
      });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @return {request} -
   * @memberof Role
   */
  static update(req, res) {
    validate.roleUpdate(req);
    const validateErrors = req.validationErrors();
    if (validateErrors) {
      res.status(200).send({ error: validateErrors });
    } else {
      const id = Number(req.params.id);
      db.Role.findById(id)
        .then((roles) => {
          if (roles === null) {
            return res.status(200).send({ message: 'Role not found' });
          }
          roles.update({
            title: req.body.title || roles.title,
            description: req.body.description || roles.description
          }).then((updatedRole) => {
            return res.status(200).send({
              message: 'Role successfully updated',
              updatedRole
            });
          })
            .catch((error) => {
              res.status(200).send({
                message: `we're sorry, role ${error.errors[0].message}`
              });
            });
        })
        .catch((error) => {
          res.status(400).send({
            message: "we're sorry, there was an error, please try again",
            error
          });
        });
    }
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @return {request} -
   * @memberof Role
   */
  static delete(req, res) {
    // write test for method
    const id = Number(req.params.id);
    db.Role.findById(id)
      .then((roles) => {
        if (roles === null) {
          return res.status(200).send({ message: 'Role not found' });
        }
        roles.destroy()
          .then(() => {
            return res.status(200).send({ message: 'Role has been deleted' });
          });
      }).catch((error) => {
        return res.status(404).send({ message: 'Role not found', error });
      });
  }
}

export default Role;
