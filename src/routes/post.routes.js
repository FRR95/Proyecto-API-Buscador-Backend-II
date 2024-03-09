import {Router} from "express";
import { auth } from "../middlewares/auth.js";


const router=Router();

router.post('/',auth,GetUsers)



export default router;