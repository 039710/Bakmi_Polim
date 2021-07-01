const router = require('express').Router();
const upload = require('../middlewares/multer')
const Controller = require('../controllers/controllerUser')

// login for admin and user
router.get('/login',Controller.loginGet)
router.post('/login',Controller.loginPost)
// user
router.get('/register',Controller.registerGet)
router.post('/register',Controller.registerPost)
router.get('/profile',Controller.profile)
router.get('/profile/:id/edit',Controller.profileEditGet)
router.post('/profile/:id/edit',Controller.profileEditPost)
router.get('/profile/:id/edit',Controller.delete)

// admin 
router.get('/admin',Controller.showAdminPage)
router.get('/admin/add',Controller.addGet)
router.post('/admin/add',upload.single('image_url'),Controller.addPost)
router.get('/admin/:id/edit',Controller.editGet)
router.post('/admin/:id/edit',upload.single('image_url'),Controller.editPost)
router.get('/admin/:id/delete',Controller.delete)

module.exports = router