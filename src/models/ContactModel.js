const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const ContactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: false, default: '' },
    tel: {type: String, required: false, default: ''},
    email: {type: String, required: false, default: ''},
    userId: {type: String, required: true},
    dateCreated: {type: Date, default: Date.now}
})

const ContactModel = mongoose.model('Contact', ContactSchema)

class Contact{
    constructor(body, userId){
        this.body = body
        this.userId = userId
        this.errors = []
        this.contact = null
    }
    
    async saveEditedContact(id){
        if(typeof id !== 'string') return
        this.userInputCheck()
        if(this.errors.length > 0) return
        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true})
    }

    async createContact(){
        this.userInputCheck()
        if(this.errors.length > 0) return 
        this.contact = await ContactModel.create(this.body)
    }

    userInputCheck() {
        this.cleanUp()
        
        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid email')
        if(!this.body.name) this.errors.push('Contact need to have a name')
        if(!this.body.email && !this.body.tel) this.errors.push('Contact need to have an email or phone')

    }

    cleanUp() {
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }
        this.body = {
            name: this.body.name,
            lastname: this.body.lastname,
            tel: this.body.tel,
            email: this.body.email,
            userId: this.userId
        }
    }

    static async contactExists(id){
        if(typeof id !== 'string') return
        const findById = await ContactModel.findById(id)
        return findById
    }

    static async findContacts(userId){
        const findContacts = await ContactModel.find({userId}).sort({dateCreated: -1})
        return findContacts
    }
    static async deleteContact(id){
        if(typeof id !== 'string') return
        const delContact = await ContactModel.findByIdAndDelete(id)
        return delContact
    }
}

module.exports = Contact