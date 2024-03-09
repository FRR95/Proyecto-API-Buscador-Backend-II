import {Router} from "express";
import { auth } from "../middlewares/auth.js";
import { CreatePost, DeletePost, GetPostById, GetUserPosts, GetUsersPosts, UpdatePost } from "../controllers/post.controller.js";



const router=Router();

router.post('/',auth,CreatePost)
router.delete('/:id',auth,DeletePost)
router.put('/:id',auth,UpdatePost)
router.get('/own',auth,GetUserPosts)
router.get('/',auth,GetUsersPosts)
router.get('/:id',auth,GetPostById)




export default router;