import { Router } from 'express';

import { Multer } from './config/multerConfig';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { DeleteUserController } from './controllers/DeleteUserController';

const router = Router();

//Auth
router.post('/auth', Multer.single('file'), new AuthenticateUserController().handleSignUp);
router.post('/login', new AuthenticateUserController().handleSignIn);
router.patch('/validade/email/:id', new AuthenticateUserController().handleValidadeEmail);
router.post('/send/validade/email/:id', new AuthenticateUserController().handleSendValidateEmail);

//User
router.delete('/user/:id/delete', new DeleteUserController().handle);

export { router }
