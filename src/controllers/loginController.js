const Login = require('../models/LoginModel')

exports.login = (req, res, next) => {
    if(req.session.user) {
        if(res.locals.success.length > 0) res.locals.success = req.flash('success', res.locals.success)
        return res.redirect('/')
    }
    res.render('login')
}

exports.logout = (req, res, next) => {
    req.session.destroy()
    res.redirect('/')
}

exports.loginUser = async function(req, res){
    try {
        const login = new Login(req.body)
        await login.login()

        if (login.errors.email.length > 0 || login.errors.password.length > 0) {
            if (login.errors.email.length > 0) req.flash('inputLoginErrorEmail', login.errors.email)
            if (login.errors.password.length > 0) req.flash('inputLoginErrorPassword', login.errors.password)
            req.session.save(() => res.redirect('back'))
            return
        }
        req.flash('success', `Welcome back ${login.user.name}!`)
        req.session.user = login.user
        req.session.save(() => res.redirect('back'))
    }
    catch (e) {
        console.log(e)
        return res.render('404')
    }
}


exports.registerUser = async function (req, res) {
    try {
        const login = new Login(req.body)
        await login.register()

        if (login.errors.email.length > 0 || login.errors.password.length > 0 || login.errors.userExists.length > 0 || login.errors.name.length > 0) {
            if (login.errors.email.length > 0) req.flash('inputRegisterErrorEmail', login.errors.email)
            if (login.errors.password.length > 0) req.flash('inputRegisterErrorPassword', login.errors.password)
            if (login.errors.name.length > 0) req.flash('inputRegisterErrorName', login.errors.name)
            if (login.errors.userExists.length > 0) req.flash('error', login.errors.userExists)
            req.session.save(() => res.redirect('back'))
            return
        }
        req.flash('success', 'Your account has been created')
        req.session.save(() => res.redirect('back'))
    }
    catch (e) {
        console.log(e)
        return res.render('404')
    }
}