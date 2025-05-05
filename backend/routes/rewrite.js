const express = require("express");
const router = express.Router();
const limiter = require("../middleware/limiter");
const validateInput = require("../middleware/validateInput");
const rewriteController = require("../controllers/rewriteController");

router.post("/rewrite", limiter, validateInput, rewriteController);

module.exports = router;
