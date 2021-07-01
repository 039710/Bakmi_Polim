const {Food} = require('../models/index')
class Controller{
    static getHomePage(req,res){
        Food.findAll().then((foods)=>{
            res.render('index',{foods,title : 'Home Page'})
        }).catch((err)=>{
            console.log(err.message)
            res.send(err)
        })
    }
}


module.exports = Controller