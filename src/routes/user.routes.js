import {Router} from "express";
import {  DeleteUser, GetUsers, UpdateUserProfile, UpdateUserRole, getUserProfile } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";


const router=Router();

router.get('/',auth,isSuperAdmin,GetUsers)
router.get('/profile',auth,getUserProfile)
router.put('/profile',auth,UpdateUserProfile)
router.delete('/:id',auth,isSuperAdmin,DeleteUser)
router.put('/:id/role',auth,isSuperAdmin,UpdateUserRole)


export default router;