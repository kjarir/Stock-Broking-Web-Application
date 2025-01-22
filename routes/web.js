import { Router } from 'express';
const router = Router();

import express from 'express';
import { loginController, getDoc, logout } from '../controller/loginController.js';
import { signupController, createDoc } from '../controller/signupController.js';
import { dashboardController } from '../controller/dashboardController.js';

router.get('/', loginController);
router.get('/login', loginController);
router.post('/login', getDoc);
router.get('/signup', signupController);
router.post('/signup', createDoc);
router.get('/dashboard', dashboardController);
router.get('/logout', logout);


export default router;