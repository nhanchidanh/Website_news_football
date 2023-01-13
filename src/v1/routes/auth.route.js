const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const router = Router();

router.get("/verify/:email/", authController.verifyAccount);
router.post("/sign-up", authController.signUp);

module.exports.authRoute = router;
