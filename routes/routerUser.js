const router = require('express').Router();
const Controller = require('../controllers/controllerUser')


router.get('/register',Controller.registerGet)
router.post('/register',Controller.registerPost)
router.get('/login',Controller.loginGet)
router.post('/login',Controller.loginPost)
router.get('/profile',Controller.profile)
router.get('/profile/:id/edit',Controller.profileEditGet)
router.post('/profile/:id/edit',Controller.profileEditPost)
router.get('/profile/:id/edit',Controller.delete)


router.get('/admin',Controller.showAdminPage)
router.get('/admin/add',Controller.addGet)
router.post('/admin/add',Controller.addPost)
router.get('/admin/:id/edit',Controller.editGet)
router.post('/admin/:id/edit',Controller.editPost)
router.get('/admin/:id/delete',Controller.delete)

module.exports = router