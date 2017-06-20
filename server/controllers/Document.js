import db from '../models';
import validate from '../helpers/Validate';

/**
 * @class Document
 */
class Document {
  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberof Document
   */
  static create(req, res) {
    validate.document(req);
    const validateErrors = req.validationErrors();
    if (validateErrors) {
      res.status(403).send({ error: validateErrors[0].msg });
    } else {
      db.User.findById(req.user.id)
        .then((user) => {
          db.Document.create({
            title: req.body.title,
            content: req.body.content,
            access: req.body.access,
            authorId: req.user.id,
            roleId: user.roleId
          })
            .then((document) => {
              document.save()
                .then((newDocument) => {
                  res.status(200).send({
                    message: 'Document successfully created',
                    newDocument
                  });
                });
            }).catch((error) => {
              res.status(400).send({
                message:
                `we're sorry, ${error.errors[0].message}, please try again`
              });
            });
        }).catch((error) => {
          res.status(400).send({
            message: "we're sorry, there was an error, please try again",
            error
          });
        });
    }
  }
}

export default Document;
