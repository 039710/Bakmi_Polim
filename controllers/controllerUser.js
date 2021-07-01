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

}

module.exports = Controller