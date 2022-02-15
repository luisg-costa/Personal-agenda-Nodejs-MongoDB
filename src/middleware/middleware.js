exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('404')
    }
    
}
exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}
exports.messages = (req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
}

exports.inputErrors = (req, res, next) => {
    res.locals.inputRegisterErrorEmail = req.flash('inputRegisterErrorEmail')
    res.locals.inputRegisterErrorPassword = req.flash('inputRegisterErrorPassword')
    res.locals.inputLoginErrorEmail = req.flash('inputLoginErrorEmail')
    res.locals.inputLoginErrorPassword = req.flash('inputLoginErrorPassword')
    res.locals.inputRegisterErrorName = req.flash('inputRegisterErrorName')
    next()
}


exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        res.locals.error = req.flash('error', 'You need login to access that page')
        return res.redirect('/login')
    }
    next()
}

exports.sessionUser = (req, res, next) => {
    res.locals.user= req.session.user
    next()
}