import {Router} from "express";
import {  DeleteUser, FollowUnfollowUser, GetUsers, UpdateUserProfile, UpdateUserProfileInfo, UpdateUserRole, getUserProfile } from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";
import { isSuperAdmin } from "../middlewares/isSuperAdmin.js";
import { GetPostsByUserId } from "../controllers/post.controller.js";


const router=Router();

router.get('/',auth,GetUsers)
router.get('/profile',auth,getUserProfile)
router.put('/profile',auth,UpdateUserProfile)
router.delete('/:id',auth,isSuperAdmin,DeleteUser)
router.put('/:id',auth,isSuperAdmin,UpdateUserProfileInfo)
router.put('/:id/role',auth,isSuperAdmin,UpdateUserRole)
router.get('/posts/:id',auth,GetPostsByUserId)
router.put('/follow/:id',auth,FollowUnfollowUser)


export default router;