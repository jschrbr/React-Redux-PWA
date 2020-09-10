import * as express from 'express';
import { signup, login, getParts, addParts, countParts, removeParts } from '../handlers/handlers'
import { FBAuth } from "../../middleware/FBAuth"


const router = express.Router()

router.post("/signup", signup);
router.post("/login",  login);

router.route('/parts')
    .get(FBAuth as any, getParts)
    .post(FBAuth as any,addParts)
    .put(FBAuth as any,countParts)
    .delete(FBAuth as any,removeParts)

export default router
