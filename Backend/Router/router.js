import { Router } from "express";
import { forgetpassword, resetpassword,verifytoken, emailverification, signin, signout, signup } from "../Component/authentication.js";
import authenticate from "../Component/authentication.js";
import jobposting from "../Component/jobposting.js";
import {getjobposting} from "../Component/jobposting.js";
const router = Router();


router.get('/', (req, res) => {
    res.send(' Request throught router');
});


router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout", signout);
router.get("/verifytoken", verifytoken);
router.post("/jobposting",authenticate, jobposting);
router.get("/getjobposting",authenticate, getjobposting);
router.post("/forgetpassword", forgetpassword);
router.post("/resetpassword", resetpassword);
router.get("/emailverification/:token", emailverification);
// router.get("/resetpassword/:token", );









export default router;