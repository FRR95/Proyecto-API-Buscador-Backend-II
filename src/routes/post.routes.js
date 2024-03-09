import {Router} from "express";
import { auth } from "../middlewares/auth.js";
import { CreatePost } from "../controllers/post.controller.js";



const router=Router();

router.post('/',auth,CreatePost)



export default router;