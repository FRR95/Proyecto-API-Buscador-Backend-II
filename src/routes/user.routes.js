import {Router} from "express";
import {  GetUsers } from "../controllers/user.controller.js";


const router=Router();

router.get('/',GetUsers)


export default router;