const express = require("express");
const router = express.Router();
const userController = require("../../controller/v1/userController");
const bodyParser = require("body-parser");

router.use(
    bodyParser.json({
        limit: "5mb"
    })
);

router.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "5mb"
    })
);

router.get("/getAllUsers", userController.getAllUser);
router.get("/getUserById/:userId", userController.getUserById);
router.post("/saveUser", userController.saveUser);
router.post("/updateUser", userController.updateUser);
router.post("/deleteUser", userController.deleteUser);

module.exports = router;