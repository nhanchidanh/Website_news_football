const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/verify/:email/", authController.verifyAccount);
router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/forgot-password", authController.forgotPassword);
router.post("/forgot-password/:email", authController.changePassword);
router.get(
  "/sign-in",
  AuthMiddleware.authorization,
  authController.getCurrentUser
);
router.post("/sign-out", authController.signOut);
router.get("/refresh-token", authController.refreshToken);

module.exports.authRoute = router;
