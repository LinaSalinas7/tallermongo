const express = require('express');
const router = express.Router();

const user_controller = require("../controllers/users")

/* GET users listing. */
router.post("/register", user_controller.create)
router.get("/", user_controller.index)
router.get("/:id", user_controller.show)
router.put("/id:", user_controller.update)
router.delete("/:id", user_controller.delete)

module.exports = router;
