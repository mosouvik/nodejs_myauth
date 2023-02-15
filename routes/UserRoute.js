const router = require("express").Router();
const UserController = require("../controller/UserController");

router.get("/", UserController.register);
router.post("/register", UserController.register_create);
router.get("/login",UserController.login);


module.exports=router