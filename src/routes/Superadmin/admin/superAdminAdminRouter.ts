import express from 'express';
import { usePath } from '../../../utility/pathInterface';
import superAdminAdminOpRouter from './superAdminAdminOpRouter';

const superAdminAdminRouter = express.Router();

usePath(superAdminAdminRouter, superAdminAdminOpRouter, '/operations');
usePath(superAdminAdminRouter, superAdminAdminOpRouter, '/stats');


export default superAdminAdminRouter;