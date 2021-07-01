const idAdmin = function(req,res,next){
    if(!req.session.isAdmin){
        res.redirec('/')
    }else{
        next()
    }
}

const loginType = function(req,res,next){
    
}
module.exports = isAdmin