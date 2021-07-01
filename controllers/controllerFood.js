const {Food} = require('../models/index')
const changeFormatPrice = require('../helper/changeFormatPrice')
class Controller{
    static getHomePage(req,res){
        Food.findAll().then((foods)=>{
            if(!req.session.user){
                res.render('index',{foods,title : 'Home Page',user:{id : 0},changeFormatPrice})
            }else{
                res.render('index',{foods,title : 'Home Page',user:req.session.user,changeFormatPrice})
                
            }
        }).catch((err)=>{
            res.send(err)
        })
    }
    static getDetails(req,res){
        Food.findByPk(+req.params.id).then((foods=>{
            res.render('food-details',{foods , title : `${foods.name}`,user:{} ,changeFormatPrice})
        }))
        .catch((err)=>{
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