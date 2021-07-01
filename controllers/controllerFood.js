const {Food} = require('../models/index')
class Controller{
    static getHomePage(req,res){
        Food.findAll().then((foods)=>{
            console.log(req.session)
            console.log(req.session.user)
            if(!req.session.user){
                res.render('index',{foods,title : 'Home Page',user:{id : 0}})
            }else{
                res.render('index',{foods,title : 'Home Page',user:req.session.user})
                
            }
        }).catch((err)=>{
            console.log(err.message)
            res.send(err)
        })
    }
    static getDetails(req,res){
        console.log(req.params.id)
        Food.findByPk(+req.params.id).then((foods=>{
            res.render('food-details',{foods , title : `${foods.name}`,user:{} })
        }))
        .catch((err)=>{
            console.log(err)
            res.send(err)
        })
    }
    static getFood(req,res){
        Food.findByPk(+req.params.id)
        .then((food)=>{
            res.send(food)
        })
        .catch((err)=>res.send(err))
    }
}


module.exports = Controller