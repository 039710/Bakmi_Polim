const router = require('express').Router();
const routerFood = require('./routerFood');
const routerUser = require('./routerUser')

// 2 controller foods, sama user,
const Controller = require('../controllers/controllerFood')

router.get('/',Controller.getHomePage)
router.use('/food',routerFood)
router.use('/user',routerUser)
module.exports = router