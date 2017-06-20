import passport from 'passport';

import controllers from '../controllers';
import authenticate from '../helpers/Authenticate';

const userController = controllers.User;
const roleController = controllers.Role;
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
  app.post('/users/login', userController.login);
  app.post('/users/logout', userController.logout);
  app.get('/users', auth, authenticate.permitAdmin, userController.listAll);
  app.get(
    '/users/:id', auth, authenticate.permitUserOrAdmin, userController.view);
  app.put(
    '/users/:id', auth, authenticate.permitUserOrAdmin, userController.update);
  app.delete(
  '/users/:id', auth, userController.remove);
  app.get('/efe', auth, (req, res) => {
    res.json({ message: 'passport works' });
  });
};
