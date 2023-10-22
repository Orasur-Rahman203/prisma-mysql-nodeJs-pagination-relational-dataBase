const express=require("express");
const {
    // handleSignUP,
    //  handleSignIn,
     handleGet, handlePost, handleGetById, handlePatchById, handleDeleteById}=require('../controller/user')
const router=express.Router();

// router.route("/signUp").post(handleSignUP)
// router.route("/signIn").post(handleSignIn)

router.route('/')
.get(handleGet)
.post(handlePost)

router.route('/:id')
.get(handleGetById)
.patch(handlePatchById)
.delete(handleDeleteById)



module.exports=router;