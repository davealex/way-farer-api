import express from 'express';
import signUp from '../../../controllers/userController';

const routerV1 = express.Router();

export default routerV1;

// user signup endpoint
/**
 * @swagger
 *
 * /api/v1/auth/signup:
 *   post:
 *     description: Signup to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: User First Name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: User Last Name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: confirmPassword
 *         description: User's Confirmed password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User Email Address.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: signup
 */
routerV1.post('/auth/signup', signUp);
