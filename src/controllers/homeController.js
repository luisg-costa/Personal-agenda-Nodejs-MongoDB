const Contact = require('../models/ContactModel')

exports.home = async function(req,  res){
    const contacts = await Contact.findContacts(res.locals.user)
    res.render('index', { contacts })
}
