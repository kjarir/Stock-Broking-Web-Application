import express from 'express'
const router = express.Router();

import { loginController } from "../controller/loginController.js";
import { signupController } from '../controller/signupController.js';

router.get('/login', loginController);
router.get('/signup', signupController);

export default router;