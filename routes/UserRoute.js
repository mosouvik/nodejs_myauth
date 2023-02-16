const router = require("express").Router();
const UserController = require("../controller/UserController");
const verify=require('../middleware/VarifySingup')

router.get("/", UserController.register);
router.post("/register",[verify.checkDuplicatEntries], UserController.register_create);
router.get("/login",UserController.login);
router.post("/login/create",UserController.login_create);
router.get("/dashbordars",UserController.userAuth, UserController.dashbordar);
router.get("/logout",UserController.logout)


module.exports=router