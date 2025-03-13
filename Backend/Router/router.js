import { Router } from "express";
import { forgetpassword, resetpassword,verifytoken, emailverification, signin, signout, signup } from "../Component/authentication.js";
import authenticate from "../Component/authentication.js";
import jobposting from "../Component/jobposting.js";
import {getjobposting,deletejobposting,saveapplicationform,saveapplicationform2,retrieveapplicationform,retrieveapplicationform2} from "../Component/jobposting.js";
import {saveapplicationform4,retrieveapplicationform4} from "../Component/jobposting.js";
import { saveapplicationform5,retrieveapplicationform5 } from "../Component/jobposting.js";
import { saveapplicationform3,retrieveapplicationform3 } from "../Component/jobposting.js";
import { saveapplicationform6,retrieveapplicationform6 } from "../Component/jobposting.js";
import multer_upload from "../multer/multer.js";
import { handleuploaddocument } from "../multer/multer.js";
const router = Router();


router.get('/', (req, res) => {
    res.send(' Request throught router');
});

router.post("/uploaddocument",authenticate,multer_upload.single("file"),handleuploaddocument);
router.post("/retrieveapplicationform",authenticate,retrieveapplicationform);
router.post("/retrieveapplicationform2",authenticate,retrieveapplicationform2);
router.post("/retrieveapplicationform4",authenticate,retrieveapplicationform4);
router.post("/retrieveapplicationform5",authenticate,retrieveapplicationform5);
router.post("/saveapplicationform5",authenticate,saveapplicationform5);
router.post("/saveapplicationform4",authenticate,saveapplicationform4);
router.post("/saveapplicationform",authenticate,saveapplicationform)
router.post("/saveapplicationform2",authenticate,saveapplicationform2)
router.post("/saveapplicationform3",authenticate,saveapplicationform3);
router.post("/retrieveapplicationform3",authenticate,retrieveapplicationform3);
router.post("/saveapplicationform6",authenticate,saveapplicationform6);
router.post("/retrieveapplicationform6",authenticate,retrieveapplicationform6);
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