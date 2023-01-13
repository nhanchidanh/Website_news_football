const { Router } = require("express");
const roleController = require("../controllers/role.controller");

const router = Router();

router.get("/", roleController.getAll);
router.get("/:id", roleController.getById);
// router.get("/get-role-id-gte-5", roleController.getRoleIdGTE5)
router.post("/", roleController.create)
router.patch("/:id", roleController.update)
router.delete("/:id", roleController.delete)
router.delete("/force/:id", roleController.deleteForce)

module.exports.roleRoute = router