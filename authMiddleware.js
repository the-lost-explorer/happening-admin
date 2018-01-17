var authServer =  require('./authentication.js');

exports.createUserMiddleware = function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    authServer.createUser(res,email, password);
}

exports.loginMiddleware = function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    authServer.login(res,email,password);
}

exports.logoutMiddleware = function(req,res){
    authServer.logout(res);
}