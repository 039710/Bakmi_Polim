const router = require('express').Router();
const Controller = require('../controllers/controllerUser')

router.get('/admin',Controller.showAdminPage)
router.get('/admin/add',Controller.addGet)
router.post('/admin/add',Controller.addPost)
router.get('/admin/:id/edit',Controller.editGet)
router.post('/admin/:id/edit',Controller.editPost)
router.get('/admin/:id/delete',Controller.delete)

module.exports = router