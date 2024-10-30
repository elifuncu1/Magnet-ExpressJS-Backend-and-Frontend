const oturumAcilmis = function (req, res, next) {
    if (req.isAuthenticated()) {
        //console.log('AUTH MIDDLEWARE GİRİŞ YAPILMIŞ');
        return next();
    } else {
        req.flash('error', ['Lütfen önce oturum açın'])
        res.redirect('/magnetogiris/login');
    }
}

const oturumAcilmamis = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/magnetogiris');
    }
}




module.exports = {
    oturumAcilmis,
    oturumAcilmamis
}