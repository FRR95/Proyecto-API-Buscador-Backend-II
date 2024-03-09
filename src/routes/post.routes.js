import {Router} from "express";
import { auth } from "../middlewares/auth.js";
import { CreatePost, DeletePost } from "../controllers/post.controller.js";



const router=Router();

router.post('/',auth,CreatePost)
router.delete('/:id',auth,DeletePost)




export default router;