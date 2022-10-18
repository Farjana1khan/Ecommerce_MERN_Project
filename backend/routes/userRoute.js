const express = require('express')

const {registerUser, loginUser, logoutUser, forgetPassword, resetPassword, getUserDetailById, updatePassword, updateUserProfile, getAllUser, getSingleUser, updateUserRole, deleteUserDetailById } = require("../controller/userController")
const { isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

router.route("/logout").get(logoutUser)

router.route("/password/forget").post(forgetPassword)

router.route("/password/reset/:token").put(resetPassword)


//get User Me
router.route("/user/me").get(isAuthenticatedUser, getUserDetailById)

router.route("/password/update").put(isAuthenticatedUser, updatePassword)

router.route("/user/profile/update").put( isAuthenticatedUser, updateUserProfile)


//Get all users API for -> such as Admin and Users
router.route("/admin/all/users").get( isAuthenticatedUser, authorizeRoles("admin"), getAllUser)

//Get Single user  API for -> such as Admin or user
router.route("/admin/user/role/:id").get( isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)


//Update  user Role API for -> such as Admin and User
router.route("/admin/user/role/:id").put( isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)

//Delete Single user  API for -> such as Admin or user
router.route("/admin/user/role/:id").delete( isAuthenticatedUser, authorizeRoles("admin"), deleteUserDetailById)

module.exports = router



