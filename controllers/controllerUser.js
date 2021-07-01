const {Food} = require('../models/index')
class Controller{
    static showAdminPage(req,res){
        Food.findAll({
                order : [['id']]
            }).then((foods)=>{
                res.render('admin-page',{foods, title : 'Admin Page'})
            }).catch((err)=>{
                res.send(err)
            })
    }

    static addGet(req, res) {
        res.render('addMenu.ejs', {title : 'Admin Page - Add Menu'})
    }

    static addPost(req, res) {
        let newMenu = {
            name: req.body.name,
            description: req.body.description,
            img_url: req.body.img_url,
            price: req.body.price,
            quantity: req.body.quantity
        }
        Food.create(newMenu).then(() => {
                res.redirect('/user/admin')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editGet(req, res){
        Food.findByPk(+req.params.id).then(dataMenu => {
                res.render('editMenu.ejs', { dataMenu, title : 'Admin Page - Edit Menu'})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editPost(req, res) {
        let editedMenu = {
            name: req.body.name,
            description: req.body.description,
            img_url: req.body.img_url,
            price: req.body.price,
            quantity: req.body.quantity
        }
        Food.update(editedMenu,{where: {id: req.params.id}}).then(() => {
                res.redirect('/user/admin')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static delete(req, res) {
        Food.destroy({where:{id:req.params.id}}).then(() => {
            res.redirect('/user/admin')
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = Controller