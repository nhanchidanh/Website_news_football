const { Router } = require("express");
const userController = require("../controllers/user.controller");

const router = Router();

router.get("/", userController.getAll);
router.post("/", userController.create);
router.get("/:id", userController.getById);
router.patch("/:id", userController.update);
router.patch("/change-password/:id", userController.changePassword);
router.delete("/:id", userController.delete);
router.delete("/force/:id", userController.deleteForce);

module.exports.userRoute = router