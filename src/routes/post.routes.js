import {Router} from "express";
import { auth } from "../middlewares/auth.js";
import { CreatePost, DeletePost, GetUserPosts, GetUsersPosts, UpdatePost } from "../controllers/post.controller.js";



const router=Router();

router.post('/',auth,CreatePost)
router.delete('/:id',auth,DeletePost)
router.put('/:id',auth,UpdatePost)
router.get('/own',auth,GetUserPosts)
router.get('/',auth,GetUsersPosts)




export default router;