import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

/* MIDDLEWARES */
import { authMiddleware, authCreateSession } from './app/middlewares/auth';
import { createUser, updateUser } from './app/middlewares/UserMiddlewares';
import { createMeetapp } from './app/middlewares/MeetappMiddlewares';

/* CONTROLLERS */
import FileController from './app/controllers/FileController';
import NotificationsController from './app/controllers/NotificationsController';
import MeetappController from './app/controllers/MeetappController';
import SubscriptionController from './app/controllers/SubscriptionController';

const routes = new Router();
const uploads = multer(multerConfig);

/* USER AND SESSION */
routes.post('/users', createUser, UserController.store);
routes.post('/sessions', authCreateSession, SessionController.store);

routes.use(authMiddleware);

/* USER */
routes.put('/users', updateUser, UserController.update);

/* MEETAPP */
routes.post('/meetapps', createMeetapp, MeetappController.store);
routes.get('/meetapps', MeetappController.index);
routes.put('/meetapps/:id', MeetappController.update);
routes.delete('/meetapps/:id', MeetappController.delete);
routes.get('/meetapps/:id', MeetappController.show);

/* SUBSCRIBED */
routes.get('/subscriptions', SubscriptionController.index);
routes.post('/subscriptions/:id', SubscriptionController.store);
routes.delete('/subscriptions/:id', SubscriptionController.delete);
// routes.get('/subscriptions/:id', SubscriptionController.show);

// /* NOTIFICATIOS */
routes.get('/notifications', NotificationsController.index);
routes.put('/notifications/:id', NotificationsController.update);

/* FILES */
routes.post('/files', uploads.single('file'), FileController.store);

export default routes;
