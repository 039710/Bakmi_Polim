const {Food,User,Invoice} = require('../models/index')
const {Op} = require('sequelize')
const changeFormatPrice = require('../helper/changeFormatPrice')
let bcrypt = require('bcryptjs');
class Controller{
    static orderList(req, res) {
        User.findAll({
            include : Food
        }).
        then((users)=>{
            users = users.filter((user)=>{
                if(user.Food !== null){
                    return user
                }
            })
            console.log(users)
            if(req.session.user.id){
                res.render('admin-order',{title : 'admin page', users, user : req.session.user})
            }else{
                res.render('admin-order',{title : 'admin page', users, user : {id:0} })
            }
        })
        .catch((err)=>{
            console.log(err.message)
            res.send(err)
        })
    }
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
            let errorMessages = err.errors.map(el => el.message)
            res.redirect(`/user/register?message=${errorMessages}`)
        })
    }
    static loginGet(req, res) {
        res.render('login.ejs', {title : 'Login',err : [],user : {id:0}})
    }
    static loginPost(req, res) {
        User.findOne({where: {
                email : {
                    [Op.eq] : req.body.email
                }
            }})
            .then((result) => {
                if(result && bcrypt.compareSync(req.body.password, !result.password ? "abc" : result.password)){
                    req.session.user = {
                        id : result.id,
                        role : result.role
                    }
                    if(result.role === 'Customer'){
                        res.redirect('/')
                    }else{
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
        User.findByPk(req.session.user.id)
        .then(dataUser => {
            if(dataUser){
                if(req.session.user.id){
                    res.render('profile',{dataUser, title : 'Profile',user:req.session.user,greeting : User.greeting(dataUser.first_name)})
                }else{
                    res.render('profile',{dataUser, title : 'Profile',user:{id : 0}, greeting : User.greeting(dataUser.first_name)})
                }
            }else{
                res.redirect('/')
            }
        })
        .catch(err => {
            res.send(err.message)
        })
    }
    static profileEditGet(req, res) {
        let id = req.session.user.id
        User.findByPk(id).then(dataUser => {
            let errors = []
            if (req.query.message) {
                errors = req.query.message.split(',')
            }
            if(req.session.user.id){
                res.render('editProfile.ejs',{dataUser, title : 'Edit Profile',user:req.session.user, errors})
            }else{
                res.render('editProfile.ejs',{dataUser, title : 'Edit Profile',user:{id : 0}, errors})
            }
        })
        .catch(err => {
            res.send(err.message)
        })
    }
    static profileEditPost(req, res) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(req.body.password,salt)
        let id = +req.params.id
        let { first_name, last_name, email, phone_number, birth_date, address} = req.body
        let editedUser = {
            first_name,
            last_name,
            email,
            phone_number,
            birth_date,
            address,
            password : hash
        }
        User.update(editedUser,{where: {id: id}}).then(() => {
            res.redirect('/user/profile')
        })
        .catch(err => {
            let errorMessages = err.errors.map(el => el.message)
            res.redirect(`/user/profile/${id}/edit?message=${errorMessages}`)
        })
    }
    static deleteUser(req, res) {
        let id = +req.params.id
        User.destroy({where: {id: id}})
        .then(() => {
            console.log('deleted')
            req.session.destroy()
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
                if(req.session.user.role == 'Admin'){
                    if(req.session.user.id){
                        res.render('admin-page',{foods, title : 'Admin Page',user:req.session.user,changeFormatPrice})
                    }else{
                        res.render('admin-page',{foods, title : 'Admin Page',user:{id : 0},changeFormatPrice})
                    }
                }else{
                    res.redirect('/')
                }
            }).catch((err)=>{
                res.send(err)
            })
    }

    static addGet(req, res) {
        let errors = []
        if (req.query.message) {
            errors = req.query.message.split(',')
        }
        if (req.session.user.id) {
            res.render('addMenu.ejs',{title : 'Admin Page - Add Menu',user:req.session.user,errors})   
        } else {
            res.render('addMenu.ejs',{title : 'Admin Page - Add Menu',user:{id : 0},errors})
        }
    }

    static addPost(req,res) {
        let url = ''
        if(req.file){
            url = req.file.path.split('\\').join('/')
            url = url.substring(6,url.length)
        }
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
            let errorMessages = err.errors.map(el => el.message)
            res.redirect(`/user/admin/add?message=${errorMessages}`)
        })
    }

    static editGet(req, res){
        let errors = []
        if (req.query.message) {
            errors = req.query.message.split(',')
        }
        Food.findByPk(+req.params.id).then(dataMenu => {
            console.log(dataMenu);
            if (req.session.user.id) {
                res.render('editMenu.ejs',{dataMenu , title : `${dataMenu.name}`,user:req.session.user ,changeFormatPrice, errors})   
            } else {
                res.render('editMenu.ejs',{dataMenu , title : `${dataMenu.name}`,user:{id : 0} ,changeFormatPrice, errors})
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static editPost(req, res) {
        let id = +req.params.id
        let editedMenu = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        }
        if(req.file){
            let url = req.file.path.split('\\').join('/')
            url = url.substring(6,url.length)
            editedMenu["img_url"] = url
        }else{
            editedMenu["img_url"] = ""
        }
        Food.update(editedMenu,{where: {id: req.params.id}}).then(() => {
            console.log(editedMenu);
                res.redirect('/user/admin')
            })
            .catch(err => {
                let errorMessages = err.errors.map(el => el.message)
                res.redirect(`/user/admin/${id}/edit?message=${errorMessages}`)
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
    static getInvoice(req,res){
        User.findByPk(+req.params.id,{
            include : Food
        })
        .then(rest=>{
            console.log(req.session.user,'---------------')
            if(!req.session.user){
                res.render('order',{users : rest, title :'your orders', user : {id:0}})
            }else{
                res.render('order',{users : rest, title :'your orders', user : req.session.user})
            }
        })
        .catch(err => {
            console.log(err.message)
            res.send(err)
        })
    }
}

module.exports = Controller