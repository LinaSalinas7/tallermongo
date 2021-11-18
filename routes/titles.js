const express = require('express');
const router = express.Router();

const title_controller = require("../controllers/titles")

/* GET users listing. */
router.post("/register", title_controller.create)
router.get("/", title_controller.index)
router.get("/:id", title_controller.show)
router.put("/id:", title_controller.update)
router.delete("/:id", title_controller)

module.exports = router;