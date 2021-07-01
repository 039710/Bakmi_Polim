const router = require('express').Router();
const Controller = require('../controllers/controllerFood')
router.get('/:id',Controller.getDetails)
router.get('/foodData/:id',Controller.getFood)
module.exports = router