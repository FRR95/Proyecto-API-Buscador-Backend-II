import {Router} from "express";
import { auth } from "../middlewares/auth.js";
import { CreatePost, DeletePost, UpdatePost } from "../controllers/post.controller.js";



const router=Router();

router.post('/',auth,CreatePost)
router.delete('/:id',auth,DeletePost)
router.put('/:id',auth,UpdatePost)




export default router;