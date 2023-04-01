const express = require("express");
const router = express.Router();

const ApplicationControllers = require("../controllers/app.controllers");

router.get('/api/credentials', ApplicationControllers.checkCredentials);

module.exports = router;