import express from "express"
import { getMyDetails, userLogin, userLogout, userRegister } from "../controller/user.js";
import { isLoggedIn } from "../middleware/isAuth.js";

const router = express.Router();

router.post('/login', isLoggedIn, userLogin);
router.get('/logout', userLogout);
router.post('/register', userRegister);
router.get('/profile', isLoggedIn, getMyDetails);

export default router;