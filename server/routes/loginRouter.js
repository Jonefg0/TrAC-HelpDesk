const express = require("express");
//const sessionController = require("../controllers/sessionController");
const userController = require("../controllers/userController");
const router = express.Router();

/**
 * login
 */
router.post("/", userController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

router.post("/test", userController.test, (req, res) => {
  console.log("RES:", req)
  res.status(200).json(res.locals.user);
});

module.exports = router;