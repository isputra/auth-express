module.exports = {
    checkAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }

        req.flash('error_msg', "Please log in to view this resource");
        res.redirect('/users/login');
    },
    checkNotAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return res.redirect('/dashboard');
        }
        next();
    }
}