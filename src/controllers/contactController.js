const ContactModel = require('../models/ContactModel')

exports.contact = (req, res) => {
    res.render('contact', {
        contact: {}
    })
}

exports.create = async function (req, res) {
    const contact = new ContactModel(req.body, res.locals.user)
    try {
        await contact.createContact()
        if(contact.errors.length > 0){
            req.flash('error', contact.errors)
            req.session.save(() => res.redirect('back'))
            return
        }
        req.flash('success', 'Contact registed')
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`))
    } catch (e) {
        console.log(e)
        return res.render('404')
    }
}

exports.editContact = async function(req, res){
    if(!req.params.id) return res.render('404')
    try{
        const contactById = await ContactModel.contactExists(req.params.id)
        if(!contactById) return res.render('404')
        res.render('contact', {
            contact: contactById
        })
    } catch(e){
        console.log(e)
        res.render('404')
    }
}

exports.saveEditContact = async function(req, res){
    if(!req.params.id) return res.render('404')
    const contact = new ContactModel(req.body, res.locals.user)
    try{
        await contact.saveEditedContact(req.params.id)
        if(contact.errors.length > 0){
            req.flash('error', contact.errors)
            req.session.save(() => res.redirect('back'))
            return
        }
        if(!contact.contact) return res.render('404')
        req.flash('success', 'Contact edited')
        req.session.save(() => res.redirect(`/contact/${contact.contact._id}`))
    } catch(e){
        console.log(e)
        res.render('404')
    }
}

exports.delete = async function(req, res){
    if(!req.params.id) return res.render('404')
    try{
        const delContact = await ContactModel.deleteContact(req.params.id)
        if(!delContact) return res.render('404')
        req.flash('success', 'Contact delected')
        req.session.save(() => res.redirect("back"))
    } catch(e){
        console.log(e)
        res.render('404')
    }
}