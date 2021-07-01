const idAdmin = function(req,res,next){
    if(!req.session.isAdmin){
        res.redirec('/')
    }else{
        next()
    }
}

module.exports = isAdmin