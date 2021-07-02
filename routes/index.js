const router = require('express').Router();
const routerFood = require('./routerFood');
const routerUser = require('./routerUser')
const session = require('express-session');
const Controller = require('../controllers/controllerFood')
router.use(session({
    secret: 'ssshhhhh',
    resave : false,
    saveUninitialized : true,
}));
router.get('/',Controller.getHomePage)
router.use('/food',routerFood)
router.use('/user',routerUser)
module.exports = router