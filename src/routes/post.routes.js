import {Router} from "express";
import { auth } from "../middlewares/auth.js";
import { CreatePost, DeletePost, GetFollowingUsersPosts, GetPostById, GetUserPosts, GetUsersPosts,LikeUnlikeThePost, UpdatePost } from "../controllers/post.controller.js";



const router=Router();

router.post('/',auth,CreatePost)
router.delete('/:id',auth,DeletePost)
router.put('/:id',auth,UpdatePost)
router.get('/own',auth,GetUserPosts)
router.get('/',auth,GetUsersPosts)
router.put('/like/:id',auth,LikeUnlikeThePost)

router.get('/timeline',auth,GetFollowingUsersPosts)
router.get('/:id',auth,GetPostById)




export default router;