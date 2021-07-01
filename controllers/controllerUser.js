const {Food,User} = require('../models/index')
const {Op} = require('sequelize')
class Controller{
    static logOut(req,res){
        req.session.destroy()
        res.redirect('/')
    }
    static registerGet(req, res) {
        let errors = []
        if (req.query.message) {
            errors = req.query.message.split(',')
        }
        res.render('register.ejs', {title : 'Register', errors, user : {id:0}})
    }
    static registerPost(req, res) {
        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            birth_date: (req.body.birth_date),
            address: req.body.address,
            password: req.body.password
        }
        User.create(newUser).then(() => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err.message);
            let errorMessages = err.errors.map(el => el.message)
            res.redirect(`/user/register?message=${errorMessages}`)
        })
    }
    static loginGet(req, res) {
        res.render('login.ejs', {title : 'Login',err : [],user : {id:0}})
    }
    static loginPost(req, res) {
        console.log(req.body)
        User.findOne({where: {
                email : {
                    [Op.eq] : req.body.email
                },
                password : {
                    [Op.eq] : req.body.password
                }
            }})
            .then((result) => {
                console.log('berhasil login')
                if(result){
                    console.log(req.session,'ini session')
                    req.session.user = {
                        id : result.id,
                        role : result.role
                    }
                    console.log(req.session,'ini session ----')
                    if(result.role === 'Customer'){
                        console.log('masuk tod')
                        res.redirect('/')
                    }else{
                        console.log('masuk jing')
                        res.redirect('/user/admin')
                    }
                }else{
                    res.render('login.ejs',{title : 'Login',err : ['Password / Email salah'],user : {id:0}})
                }
            })
            .catch(err => {
                res.send(err)
            })
    }
    static profile(req, res) {
        User.findAll().then(dataUser => {
            if(dataUser.length){
                res.render('profile.ejs', {dataUser, title : 'Profile',user:{}})
            }else{
                res.redirect('/')
            }
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
            res.render('editProfile.ejs', {dataUser, title : 'Profile Edit', errors, user:{}})
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
                console.log(req.session)
                if(req.session.user.role == 'Admin'){
                    if(req.session.user.id){
                        res.render('admin-page',{foods, title : 'Admin Page',user:req.session.user})
                    }else{
                        res.render('admin-page',{foods, title : 'Admin Page',user:{id : 0}})
                    }
                }else{
                    res.redirect('/')
                }
            }).catch((err)=>{
                res.send(err)
            })
    }

    static addGet(req, res) {
        
        res.render('addMenu.ejs', {title : 'Admin Page - Add Menu',user:{}})
    }

    static addPost(req,res) {
        let url = req.file.path.split('\\').join('/')
        url = url.substring(6,url.length)
        let newMenu = {
            name: req.body.name,
            description: req.body.description,
            img_url: url,
            price: req.body.price,
            quantity: req.body.quantity
        }
        Food.create(newMenu)
        .then(() => {
                res.redirect('/user/admin')
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editGet(req, res){
        Food.findByPk(+req.params.id).then(dataMenu => {
                res.render('editMenu.ejs', { dataMenu, title : 'Admin Page - Edit Menu',user:{}})
            })
            .catch(err => {
                res.send(err)
            })
    }

    static editPost(req, res) {
        let url = req.file.path.split('\\').join('/')
        url = url.substring(6,url.length)
        let editedMenu = {
            name: req.body.name,
            description: req.body.description,
            img_url: url,
            price: req.body.price,
            quantity: req.body.quantity
        }
        Food.update(editedMenu,{where: {id: req.params.id}}).then(() => {
                res.redirect('/user/admin')
            })
            .catch(err => {
                console.log(err.message)
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