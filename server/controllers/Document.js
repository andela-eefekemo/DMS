import db from '../models';
import validate from '../helpers/Validate';
import authenticate from '../helpers/Authenticate';
import paginate from '../helpers/paginate';
import handleError from '../helpers/handleError';

/**
 * @class Document
 */
class Document {
  /**
  * Creates a Document
  * Route: POST: /documents
  *
  * @static
  * @param {Object} req request object
  * @param {Object} res response object
  * @return {Object} response Object containing message and created document
  * @memberof Document
  */
  static create(req, res) {
    validate.document(req);
    const validateErrors = req.validationErrors();
    if (validateErrors) {
      handleError(400, validateErrors[0].msg, res);
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
                  return res.status(201).send({
                    message: 'Document successfully created',
                    newDocument: newDocument.filterDocumentDetails()
                  });
                });
            }).catch((error) => {
              handleError(400, `we're sorry,
                document ${error.errors[0].message}, please try again`, res);
            });
        }).catch(() => {
          handleError(400,
            "we're sorry, there was an error, please try again", res);
        });
    }
  }

  /**
  * View Documents
  * Route: GET: /documents
  *
  * @static
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  * @memberof Document
  */
  static view(req, res) {
    const id = authenticate.verify(req.params.id);
    if (id === false) {
      handleError(400,
        'Id must be a number', res);
    }
    db.Document.findOne({ where: { id } })
      .then((document) => {
        if (document) {
          if (
            ((Number(document.authorId) === Number(req.user.id))
              || (document.access === 'role'
                && Number(document.roleId) === Number(req.user.roleId)))
            || Number(req.user.roleId) === 1
            || document.access === 'public'
          ) {
            res.status(200).send(
              {
                message: 'Document found',
                document: document.filterDocumentDetails()
              });
          } else {
            handleError(401, 'You are unauthorized to view this document', res);
          }
        } else {
          handleError(404, 'Document not found', res);
        }
      })
      .catch((error) => {
        handleError(400,
          `We're sorry, ${error.errors[0].message} , please try again`, res);
      });
  }

  /**
  * Get a user's documents
  * Route: GET: /users/:id/documents
  *
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  * @memberof Document
  */
  static getUserDocuments(req, res) {
    const offset = authenticate.verify(req.query.offset);
    const limit = authenticate.verify(req.query.limit);
    if ((req.query.limit && limit === false)
      || (req.query.offset && offset === false)) {
      handleError(400, 'Offset and Limit must be Numbers', res);
    }
    return db.Document.findAndCount({
      offset: offset || 0,
      limit: limit || 5,
      where: { authorId: req.params.id },
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName', 'roleId']
      }],
      order: [['createdAt', 'DESC']]
    })
      .then((documents) => {
        res.status(200).send({
          message: 'Documents found',
          documents: documents.rows,
          metaData: paginate(documents.count, limit, offset)
        });
      })
      .catch(() => handleError(400,
        "we're sorry, there was an error, please try again", res));
  }

  /**
  * Update a document
  * Route: PUT: /documents/:id
  *
  * @static
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  * @memberof Document
  */
  static update(req, res) {
    // write test for method
    validate.documentUpdate(req);
    const validateErrors = req.validationErrors();
    if (validateErrors) {
      handleError(400, validateErrors[0].msg, res);
    } else {
      const id = authenticate.verify(req.params.id);
      if (id === false) {
        handleError(400, 'Id must be a number', res);
      }
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
                handleError(400,
                  'Document already exists', res);
              }
              document.update({
                title: req.body.title || document.title,
                content: req.body.content || document.content,
                access: req.body.access || document.access
              }).then((updatedDocument) => {
                return res.status(200).send(
                  {
                    message: 'Document information has been updated',
                    updatedDocument: updatedDocument.filterDocumentDetails()
                  });
              }).catch((error) => {
                handleError(400,
                  `We're sorry, document ${error.errors[0].message}`, res);
              });
            }).catch(() => {
              handleError(400,
                "We're sorry, there was an error, please try again", res);
            });
        }).catch(() => {
          handleError(404,
            'Document does not exist', res);
        });
    }
  }

  /**
  * Get documents
  * Route: GET: /search/documents?q=[title]&limit=[integer]&offset=[integer] and
  * Route: GET: /documents?q=[title]&limit=[integer]&offset=[integer]
  *
  * @static
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  * @memberof Document
  */
  static search(req, res) {
    let searchTerm = '%%';
    if (req.query.q) {
      searchTerm = `%${req.query.q}%`;
    }
    const offset = authenticate.verify(req.query.offset);
    const limit = authenticate.verify(req.query.limit);
    if ((req.query.limit && limit === false)
      || (req.query.offset && offset === false)) {
      handleError(400, 'Offset and Limit must be Numbers', res);
    }
    let query;
    if (req.user.roleId === 1) {
      query = {
        offset: offset || 0,
        limit: limit || 5,
        where: {
          $or: [
            { title: { $iLike: `%${searchTerm}%` } }
          ]
        },
        include: [{
          model: db.User,
          attributes: ['firstName', 'lastName', 'roleId']
        }],
        order: [['createdAt', 'DESC']]
      };
    } else {
      query = {
        offset: offset || 0,
        limit: limit || 5,
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
      .catch(() => {
        handleError(400, "We're sorry, we had an error, please try again", res);
      });
  }

  /**
  * Delete a document
  * Route: DELETE: /documents/:id
  *
  * @static
  * @param {Object} req request object
  * @param {Object} res response object
  * @returns {Response} response object
  * @memberof Document
  */
  static delete(req, res) {
    const id = authenticate.verify(req.params.id);
    if (id === false) {
      handleError(400, 'Id must be a number', res);
    }
    db.Document.findById(id)
      .then((document) => {
        if (Number(document.authorId) !== req.user.id &&
          req.user.roleId !== 1) {
          handleError(401, 'You are unauthorized for this action', res);
        } else {
          document.destroy()
            .then(() => {
              res.status(200).send({ message: 'Document has been deleted' });
            });
        }
      }).catch(() => {
        handleError(404, 'Document not found', res);
      });
  }
}

export default Document;
