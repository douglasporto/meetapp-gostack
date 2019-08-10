import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

/* MIDDLEWARES */
import { authMiddleware, authCreateSession } from './app/middlewares/auth';
import { createUser, updateUser } from './app/middlewares/UserMiddlewares';

/* CONTROLLERS */
import FileController from './app/controllers/FileController';
import NotificationsController from './app/controllers/NotificationsController';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/users', createUser, UserController.store);
routes.post('/sessions', authCreateSession, SessionController.store);

routes.use(authMiddleware);
routes.put('/users', updateUser, UserController.update);

routes.get('/notifications', NotificationsController.index);
routes.put('/notifications/:id', NotificationsController.update);

routes.post('/files', uploads.single('file'), FileController.store);

export default routes;
