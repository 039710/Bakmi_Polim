const router = require('express').Router();
const Controller = require('../controllers/controllerUser')

router.get('/admin',Controller.showAdminPage)
module.exports = router