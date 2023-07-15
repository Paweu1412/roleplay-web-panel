const express = require("express");
const router = express.Router();

const ApplicationControllers = require("../controllers/app.controllers");

router.get('/api/credentials', ApplicationControllers.checkCredentials);
router.get('/api/session', ApplicationControllers.checkSession);

router.get('/api/informations', ApplicationControllers.checkInformations);
router.get('/api/home', ApplicationControllers.checkHome);

module.exports = router;