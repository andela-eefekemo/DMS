import { User, Document } from '../models';
import validate from '../helpers/Validate';
import authenticate from '../helpers/Authenticate';
import paginate from '../helpers/paginate';
import handleError from '../helpers/handleError';
import AppError from '../helpers/AppError';

/**
 * @class Document
 */
class DocumentController {
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
      throw new AppError(validateErrors[0].msg, 400);
    }
    User.findById(req.user.id)
      .then(user =>
        Document.create({
          title: req.body.title,
          content: req.body.content,
          access: req.body.access,
          authorId: req.user.id,
          roleId: user.roleId
        }))
      .then(document => document.save())
      .then(newDocument => res.status(201).send({
        message: 'Document successfully created',
        newDocument: newDocument.filterDocumentDetails()
      }))
      .catch((err) => {
        const status = err && err.status ? err.status : 500;
        const message = err && err.message ? err.message : "we're sorry, there was an error, please try again";
        res.status(status).send(message);
      });
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
    if (!id) return handleError(400, 'Id must be a number', res);
    Document.findById(id)
      .then((document) => {
        if (document) {
          const isAuthor = Number(document.authorId) === Number(req.user.id);
          const isAdmin = Number(req.user.roleId) === 1;
          const isPublicDocument = document.access === 'public';
          const hasRoleAccess = (document.access === 'role'
            && Number(document.roleId) === Number(req.user.roleId));
          if (isAuthor || isAdmin || hasRoleAccess || isPublicDocument) {
            return res.status(200).send(
              {
                message: 'Document found',
                document: document.filterDocumentDetails()
              });
          }
          throw new AppError('You are unauthorized to view this document', 403);
        }
        throw new AppError('Document not found', 404);
      })
      .catch((err) => {
        const status = err && err.status ? err.status : 500;
        const message = err && err.message ? err.message : "we're sorry, there was an error, please try again";
        res.status(status).send(message);
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
    if ((req.query.limit && !limit) || (req.query.offset && !offset)) {
      return handleError(400, 'Offset and Limit must be Numbers', res);
    }
    Document.findAndCount({
      offset: offset || 0,
      limit: limit || 5,
      where: { authorId: req.params.id },
      include: [{
        model: User,
        attributes: ['firstName', 'lastName', 'roleId']
      }],
      order: [['createdAt', 'DESC']]
    })
      .then(({ rows: documents, count }) => {
        res.status(200).send({
          message: 'Documents found',
          documents,
          metaData: paginate(count, limit, offset)
        });
      })
      .catch((err) => {
        const status = err && err.status ? err.status : 500;
        const message = err && err.message ? err.message : "we're sorry, there was an error, please try again";
        res.status(status).send(message);
      });
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
    validate.documentUpdate(req);
    const validateErrors = req.validationErrors();
    const id = authenticate.verify(req.params.id);

    if (validateErrors) return handleError(400, validateErrors[0].msg, res);
    if (!id) return handleError(400, 'Id must be a number', res);
    Document.findOne(
      { where: { title: req.body.title, authorId: req.user.id } })
      .then((existingDocument) => {
        if (existingDocument) {
          throw new AppError('Document already exists', 409);
        }
        return Document.findById(id);
      })
      .then((document) => {
        const isAuthor = document.authorId === req.user.id;
        const isAdmin = req.user.roleId === 1;
        if (!isAuthor && !isAdmin) {
          throw new AppError('You are unauthorized to view this document', 403);
        }
        return document.update({
          title: req.body.title || document.title,
          content: req.body.content || document.content,
          access: req.body.access || document.access
        });
      })
      .then(updatedDocument => res.status(200).send(
        {
          message: 'Document information has been updated',
          updatedDocument: updatedDocument.filterDocumentDetails()
        }))
      .catch((err) => {
        const status = err && err.status ? err.status : 500;
        const message = err && err.message ? err.message : "we're sorry, there was an error, please try again";
        res.status(status).send(message);
      });
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

    if ((req.query.limit && !limit) || (req.query.offset && !offset)) {
      handleError(400, 'Offset and Limit must be Numbers', res);
    }

    const query = {
      offset: offset || 0,
      limit: limit || 5,
      where: {
        $or: [
          { title: { $iLike: `%${searchTerm}%` } }
        ]
      },
      include: [{
        model: User,
        attributes: ['firstName', 'lastName', 'roleId']
      }],
      order: [['createdAt', 'DESC']]
    };

    if (req.user.roleId !== 1) {
      query.where = {
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
      };
    }

    return Document.findAndCount(query)
      .then(({ rows: documents, count }) => res.status(200).send(
        {
          message: 'Documents found',
          documentList: documents,
          metaData: paginate(count, limit, offset)
        }))
      .catch((err) => {
        const status = err && err.status ? err.status : 500;
        const message = err && err.message ? err.message : "we're sorry, there was an error, please try again";
        res.status(status).send(message);
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
    if (!id) return handleError(400, 'Id must be a number', res);
    Document.findById(id)
      .then((document) => {
        const isAuthor = document.authorId === req.user.id;
        const isAdmin = req.user.roleId === 1;
        if (!isAuthor && !isAdmin) {
          throw new AppError('You are unauthorized for this action', 403);
        }
        return document.destroy();
      })
      .then(() => res.status(200).send({ message: 'Document has been deleted' }))
      .catch((err) => {
        const status = err && err.status ? err.status : 500;
        const message = err && err.message ? err.message : "we're sorry, there was an error, please try again";
        res.status(status).send(message);
      });
  }

}

export default DocumentController;
