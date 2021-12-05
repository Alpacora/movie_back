import { Router } from 'express';

import { Multer } from './config/multerConfig';

import { uploadImage } from './middlewares/uploadImage';

import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { DeleteUserController } from './controllers/DeleteUserController';

const router = Router();

//Auth
router.post('/auth', Multer.single('file'), uploadImage, new AuthenticateUserController().handleSignUp);
router.post('/login', new AuthenticateUserController().handleSignIn);

//User
router.post('/user/upload/:id');
router.delete('/user/:id/delete', new DeleteUserController().handle);

export { router }
