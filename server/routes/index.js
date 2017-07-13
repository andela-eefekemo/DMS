import passport from 'passport';

import controllers from '../controllers';
import authenticate from '../helpers/Authenticate';

const userController = controllers.User;
const roleController = controllers.Role;
const documentController = controllers.Document;
const auth = passport.authenticate('jwt', {
  session: false
});

module.exports = (app) => {
  app.get('/home', (req, res) => {
    res.status(200).send({
      message: 'The document management system'
    });
  });
  app.post('/users', userController.create);
  app.post('/roles', auth, authenticate.permitAdmin, roleController.create);
  app.get('/roles', auth, authenticate.permitAdmin, roleController.view);
  app.put('/roles/:id', auth, authenticate.permitAdmin, roleController.update);
  app.delete('/roles/:id',
    auth, authenticate.permitAdmin, roleController.delete);
  app.post('/users/login', userController.login);
  app.post('/users/logout', userController.logout);
  app.get('/users', auth, authenticate.permitAdmin, userController.listAll);
  app.get(
    '/users/:id', auth, authenticate.permitUserOrAdmin, userController.view);
  app.put(
    '/users/:id', auth, authenticate.permitUserOrAdmin, userController.update);
  app.delete(
    '/users/:id', auth, authenticate.permitUserOrAdmin, userController.remove);
  app.get('/users/:id/documents',
    auth, authenticate.permitUserOrAdmin, documentController.getUserDocuments);
  app.post('/documents', auth, documentController.create);
  app.get('/documents', auth, documentController.listAll);
  app.get('/documents/:id', auth, documentController.view);
  app.put('/documents/:id',
    auth, documentController.update);
  app.delete(
    '/documents/:id', auth, documentController.delete);
  app.get('/search/users',
    auth, authenticate.permitAdmin, userController.search);
  app.get('/search/documents',
    auth, documentController.search);
};
