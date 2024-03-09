import {Router} from "express";
import {  GetUsers, getUserProfile } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";


const router=Router();

router.get('/',auth,isSuperAdmin,GetUsers)
router.get('/profile',auth,getUserProfile)


export default router;