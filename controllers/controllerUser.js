const {Food, User} = require('../models/index')
class Controller{
    static registerGet(req, res) {
        let errors = []
        if (req.query.message) {
            errors = req.query.message.split(',')
        }
        res.render('register.ejs', {title : 'Register', errors})
    }

    static registerPost(req, res) {
        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: +req.body.phone_number,
            birth_date: req.body.birth_date,
            address: req.body.address
        }
        User.create(newUser).then(() => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err);
            res.send(err);
            // let errorMessages = err.errors.map(el => el.message)
            // res.redirect(`/user/register?message=${errorMessages}`)
        })
    }

    static loginGet(req, res) {
        res.render('login.ejs', {title : 'Login'})
    }

    static loginPost(req, res) {
        User.findOne({where: {
                email: req.body.email,
                password: req.body.password
            }})
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                res.redirect('/login')
            })
    }

    static profile(req, res) {
        User.findAll().then(dataUser => {
            res.render('profile.ejs', {dataUser, title : 'Profile'})
        })
        .catch(err => {
            res.send(err.message)
        })
    }

    static profileEditGet(req, res) {
        let id = +req.params.id
        User.findByPk(id).then(dataUser => {
            // console.log(dataUser);
            let errors = []
            if (req.query.message) {
                errors = req.query.message.split(',')
            }
            res.render('editProfile.ejs', {dataUser, title : 'Profile Edit', errors})
        })
        .catch(err => {
            res.send(err.message)
        })
    }




    static profileEditPost(req, res) {
        // console.log(124712940714789);
        let id = +req.params.id
        let { first_name, last_name, email, phone_number, birth_date, address, password } = req.body
        let editedUser = {
            first_name,
            last_name,
            email,
            phone_number,
            birth_date,
            address,
            password
        }
        User.update(editedUser,{where: {id: id}}).then(() => {
            res.redirect('/user/profile')
        })
        .catch(err => {
            let errorMessages = err.errors.map(el => el.message)
            res.redirect(`/user/profile/${id}/edit?message=${errorMessages}`)
        })
    }

    static delete(req, res) {
        let id = +req.params.id
        User.destroy({where: {id: id}}).then(() => {
            res.redirect('/')
        })
        .catch(err => {
            res.send(err.message)
        })
    }

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