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
      res.status(200).send({ error: validateErrors[0].msg });
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
                  return res.status(200).send({
                    message: 'Document successfully created',
                    newDocument
                  });
                });
            }).catch((error) => {
              return res.status(200).send({
                message:
                `we're sorry, document ${error.errors[0].message}, please try again`
              });
            });
        }).catch((error) => {
          return res.status(400).send({
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
      db.Document.findAndCount({
        offset,
        limit,
        include: [{
          model: db.User,
          attributes: ['firstName', 'lastName', 'roleId']
        }],
        order: [['createdAt', 'DESC']]
      })
        .then((documents) => {
          return res.status(200).send(
            {
              message: 'Documents found',
              documentList: documents.rows,
              metaData: paginate(documents.count, limit, offset)
            });
        })
        .catch((error) => {
          return res.status(400).send(
            {
              message: "We're sorry, we had an error, please try again",
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
        },
        include: [{
          model: db.User,
          attributes: ['firstName', 'lastName', 'roleId']
        }],
        order: [['createdAt', 'DESC']]
      }).then((documents) => {
        return res.status(200).send(
          {
            message: 'Documents found',
            documentList: documents.rows,
            metaData: paginate(documents.count, limit, offset)
          });
      })
        .catch((error) => {
          return res.status(400).send(
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
            res.status(200).send(
              { message: 'You are unauthorized to view this document' });
          } else {
            return res.status(200).send(
              {
                message: 'Document found',
                document
              });
          }
        } else {
          return res.status(200).send({ message: 'Document not found' });
        }
      })
      .catch((error) => {
        return res.status(400).send(
          {
            message:
            `We're sorry, ${error.errors[0].message} , please try again`,
          });
      });
  }

  /**
  * Get a user's documents
  * Route: GET: /users/:id/documents
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  */
  static getUserDocuments(req, res) {
    // write test for method
    return db.Document.findAll({
      where: { authorId: req.params.id },
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName', 'roleId']
      }],
      order: [['createdAt', 'DESC']]
    })
      .then((documents) => {
        res.status(200).send({ message: 'Documents found', documents });
      })
      .catch(error => error, res);
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {request} -
   * @memberof Document
   */
  static update(req, res) {
    // write test for method
    validate.documentUpdate(req);
    const validateErrors = req.validationErrors();
    if (validateErrors) {
      res.status(403).send({ error: validateErrors[0].msg });
    } else {
      const id = Number(req.params.id);
      db.Document.findById(id)
        .then((document) => {
          if (document.authorId !== req.user.id && req.user.roleId !== 1) {
            return res.status(401).send({
              message: 'you are unauthorized for this action'
            });
          }
          db.Document.findAll({ where: { title: req.body.title } })
            .then((existingDocument) => {
              if (existingDocument.length !== 0 &&
                document.authorId !== req.user.id) {
                return res.status(401).send({
                  message: 'Document already exists'
                });
              }
              document.update({
                title: req.body.title || document.title,
                content: req.body.content || document.content,
                access: req.body.access || document.access
              }).then((updatedDocument) => {
                return res.status(200).send(
                  {
                    message: 'Document information has been updated',
                    updatedDocument
                  });
              }).catch((error) => {
                return res.status(400).send({
                  message:
                  `we're sorry, document ${error.errors[0].message}`
                });
              });
            }).catch((error) => {
              res.status(400).send({
                message: "we're sorry, there was an error, please try again",
                error
              });
            });
        }).catch((error) => {
          return res.status(404).send({
            message:
            'Document does not exist',
            error
          });
        });
    }
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {request} -
   * @memberof Document
   */
  static search(req, res) {
    const searchTerm = req.query.q;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;

    let query;
    if (req.user.roleId === 1) {
      query = {
        offset,
        limit,
        where: {
          $or: [
            { title: { $iLike: `%${searchTerm}%` } }
          ]
        },
        order: [['createdAt', 'DESC']]
      };
    } else {
      query = {
        offset,
        limit,
        where: {
          $and: [{
            $or: [
              {
                $or: [{ access: 'public' }, {
                  $and: [
                    { access: 'role' }, { roleId: req.user.roleId }]
                }]
              },
              { authorId: req.user.id }
            ]
          },
          { title: { $iLike: `%${searchTerm}%` } }
          ]
        },
        include: [{
          model: db.User,
          attributes: ['firstName', 'lastName', 'roleId']
        }],
        order: [['createdAt', 'DESC']]
      };
    }

    return db.Document.findAndCount(query)
      .then((documents) => {
        return res.status(200).send(
          {
            message: 'Documents found',
            documentList: documents.rows,
            metaData: paginate(documents.count, limit, offset)
          });
      })
      .catch((error) => {
        return res.status(400).send(
          {
            message: "We're sorry, we had an error, please try again",
            error
          });
      });
  }

  /**
   * @static
   * @param {any} req
   * @param {any} res
   * @returns {request} -
   * @memberof Document
   */
  static delete(req, res) {
    // write test for method
    const id = authenticate.verify(req.params.id);
    db.Document.findById(id)
      .then((document) => {
        if (Number(document.authorId) !== req.user.id &&
          req.user.roleId !== 1) {
          res.status(200).send(
            { message: 'You are unauthorized for this action' });
        } else {
          document.destroy()
            .then(() => {
              res.status(200).send({ message: 'Document has been deleted' });
            });
        }
      }).catch((error) => {
        res.status(404).send({ message: 'Document not found', error });
      });
  }
}

export default Document;
