import { Router } from "express";
import { forgetpassword, resetpassword,verifytoken, emailverification, signin, signout, signup } from "../Component/authentication.js";
import authenticate from "../Component/authentication.js";
import jobposting from "../Component/jobposting.js";
import {getjobposting,deletejobposting,saveapplicationform} from "../Component/jobposting.js";
import multer_upload from "../multer/multer.js";
import { handleuploaddocument } from "../multer/multer.js";
const router = Router();


router.get('/', (req, res) => {
    res.send(' Request throught router');
});

router.post("/uploaddocument",authenticate,multer_upload.single("file"),handleuploaddocument);
router.post("/saveapplicationform",authenticate,saveapplicationform)
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/signout", signout);
router.get("/verifytoken", verifytoken);
router.post("/jobposting",authenticate, jobposting);
router.get("/getjobposting",authenticate, getjobposting);
router.delete("/deletejobposting",authenticate, deletejobposting);
router.post("/forgetpassword", forgetpassword);
router.post("/resetpassword", resetpassword);
router.get("/emailverification/:token", emailverification);
// router.get("/resetpassword/:token", );









export default router;