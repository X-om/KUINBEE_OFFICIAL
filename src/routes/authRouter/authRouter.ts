import express from 'express';
import { loginInputValidation } from '../../middlewares/auth/handleLoginValidation';
import { loginController } from '../../controllers/auth/authControllers';
const authRouter = express.Router();


authRouter.post('/login', loginInputValidation, loginController);
// authRouter.post('/signup', registrationInputValidation, registrationController);


export default authRouter;