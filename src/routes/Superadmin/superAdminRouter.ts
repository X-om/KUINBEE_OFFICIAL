import express, { Router } from 'express';
import { usePath } from '../../utility/pathInterface';
import superAdminAdminOpRouter from './admin/superAdminAdminOpRouter';
import requireAuth from '../../middlewares/auth/requireAuth';
import { requireAdminAuth } from '../../middlewares/auth/requireAdminAuth';
const superAdminRouter: Router = express.Router();





superAdminRouter.use(requireAuth, requireAdminAuth);

usePath(superAdminRouter, superAdminAdminOpRouter, '/admin');




export default superAdminRouter;