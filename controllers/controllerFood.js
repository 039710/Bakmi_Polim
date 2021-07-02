const {Food,User,Invoice} = require('../models/index')
const changeFormatPrice = require('../helper/changeFormatPrice')
class Controller{
    static getHomePage(req,res){
        Food.findAll(
            {
                include: User
            }
        ).then((foods)=>{
            if(!req.session.user){
                // console.log(foods)
                res.render('index',{foods,title : 'Home Page',user:{id : 0},changeFormatPrice})
            }else{
                // console.log(foods)
                res.render('index',{foods,title : 'Home Page',user:req.session.user,changeFormatPrice})
                
            }
        }).catch((err)=>{
            console.log(err.message)
            res.send(err)
        })
    }
    static getDetails(req,res){
        Food.findByPk(+req.params.id).then((foods=>{
            if(req.session.user.id){
                res.render('food-details',{foods , title : `${foods.name}`,user: req.session.user ,changeFormatPrice})
            }else{
                res.render('food-details',{foods , title : `${foods.name}`,user:{ id : 0} ,changeFormatPrice})
            }
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
    static buyFood(req,res){
        const FoodId = +req.params.id
        const quantity = +req.params.quantity
        const UserId = +req.params.UserId
        Food.findByPk(+req.params.id)
        .then((food)=>{
            // console.log(req.params.UserId,'--- user id')
            // console.log(food.quantity,'--- quantity before')
            food.quantity -= quantity
            // console.log(food.quantity,'---- new food stock')
            food.save();
            return Invoice.create({
                FoodId,
                UserId,
                quantity_per_item : quantity
            })
        }).then(()=>{
            res.redirect(`/user/invoice/${UserId}`)
        })
        .catch((err)=>res.send(err.message))
    }
}


module.exports = Controller