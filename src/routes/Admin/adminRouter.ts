import express from 'express';
import { usePath } from '../../utility/pathInterface';
import loginRouter from './login/loginRouter';
import registrationRouter from './registration/registrationRouter';
import { requireAuth } from '../../middlewares/auth/requireAuth';
import { requireAdminAuth } from '../../middlewares/auth/requireAdminAuth';
import { datasetRouter } from './dataset/datasetRouter';
import { adminUserRouter } from './adminUsers/adminUserRouter';

const adminRouter = express.Router();


//TODO: INFO -> unauthRoutes
usePath(adminRouter, loginRouter, '/login');
usePath(adminRouter, registrationRouter, '/signup');

adminRouter.use(requireAuth, requireAdminAuth);

usePath(adminRouter, datasetRouter, '/datasets');
usePath(adminRouter, adminUserRouter, '/users');

export default adminRouter;

