import db from '../models';
import validate from '../helpers/Validate';
import authenticate from '../helpers/Authenticate';
import paginate from '../helpers/paginate';

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

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberof Document
   */
  static listAll(req, res) {
    const offset = authenticate.verify(req.query.offset) || 0;
    const limit = authenticate.verify(req.query.limit) || 20;

    if (Number(req.user.roleId) === 1) {
      db.Document.findAndCount({ offset, limit })
        .then((documents) => {
          res.status(200).send(
            {
              message: 'Documents found',
              documentList: documents.rows,
              metaData: paginate(documents.count, limit, offset)
            });
        })
        .catch((error) => {
          res.status(400).send(
            {
              message: "We're sorry, we had an error eguono, please try again",
              error
            });
        });
    } else {
      db.Document.findAndCount({
        offset,
        limit,
        where: {
          $or: [
            {
              $or: [{ access: 'public' }, {
                $and: [
                  { access: 'role' }, { roleId: req.user.roleId }]
              }]
            },
            { authorId: req.user.id }
          ]
        }
      }).then((documents) => {
        res.status(200).send(
          {
            message: 'Documents found',
            documentList: documents.rows,
            metaData: paginate(documents.count, limit, offset)
          });
      })
        .catch((error) => {
          res.status(400).send(
            {
              message: "We're sorry, we had an error, please try again",
              error
            });
        });
    }
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @return {void}
   * @memberof Document
   */
  static view(req, res) {
    const id = authenticate.verify(req.params.id);
    db.Document.findOne({ where: { id } })
      .then((document) => {
        if (document) {
          if (
            (document.authorId !== req.user.id && req.user.roleId !== 1
            && document.access !== 'public') || (document.access === 'role'
              && document.roleId === req.user.roleId)
          ) {
            res.status(401).send(
              { message: 'You are unauthorized to view this document' });
          } else {
            res.status(200).send(
              {
                message: 'Document found',
                document
              });
          }
        } else {
          res.status(401).send({ message: 'Document not found' });
        }
      })
      .catch((error) => {
        res.status(400).send(
          {
            message:
            `We're sorry, ${error.errors[0].message} , please try again`,
          });
      });
  }
}

export default Document;
