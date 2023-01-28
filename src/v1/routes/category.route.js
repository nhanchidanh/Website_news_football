const { Router } = require("express");

const categoryRoute = require("../controllers/category.controller");

const router = Router();

router.get("/", categoryRoute.getAll);
router.get("/:id", categoryRoute.getById);
router.post("/", categoryRoute.create);
router.patch("/:id", categoryRoute.update);
router.delete("/:id", categoryRoute.delete);
router.delete("/force/:id", categoryRoute.deleteForce);

module.exports.categoryRoute = router;
