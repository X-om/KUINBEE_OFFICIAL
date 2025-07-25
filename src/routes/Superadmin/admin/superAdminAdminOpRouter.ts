import express from 'express';
import { addAdminController } from '../../../controllers/Superadmin/admin/adminOperationsController';
import { handleAddAdminValidation } from '../../../middlewares/superAdmin/suoerAdminOpRouteValidations';
const superAdminAdminOpRouter = express.Router();

// ************************** GET *************************** //
// superAdminAdminRouter.get();


// ************************** POST ************************** //
// TODO : add vadlidation before adding new admin
superAdminAdminOpRouter.post('/addAdmin', handleAddAdminValidation, addAdminController);



// ************************** PUT *************************** //
// superAdminAdminRouter.put();



// ************************** DELETE ************************** //
// superAdminAdminRouter.delete();

export default superAdminAdminOpRouter;