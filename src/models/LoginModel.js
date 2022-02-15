const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login{
    constructor(body){
        this.body = body
        this.errors = {
            email: [],
            password: [],
            name: [],
            userExists: ""
        }
        this.user = null
    }

    async login(){
        this.userInputCheck(false)
        if(this.errors.email.length > 0) return
        const user = await LoginModel.findOne({ email: this.body.email})
        console.log(user)
        if(!user) {
            this.errors.email.push('Incorrect email or password ') && this.errors.password.push('Incorrect email or password ')
            return
        }
        if(!bcryptjs.compareSync(this.body.password, user.password)){
            this.errors.email.push('Incorrect email or password ') && this.errors.password.push('Incorrect email or password ')
            return
        }
        this.user = user
    }

    async register(){
        this.userInputCheck()
        if(this.errors.email.length > 0 || this.errors.password.length > 0 || this.errors.name.length > 0 ) return
        this.userExists()
        if(this.errors.userExists.length > 0) return
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        this.user = await LoginModel.create(this.body)
    }

    async userExists(){
        const user = await LoginModel.findOne({ email: this.body.email})
        if(user) this.errors.userExists = 'This account already exists'
    }

    userInputCheck(registerCheck = true) {
        this.cleanUp()
        if(!validator.isEmail(this.body.email)){
            this.errors.email.push('Invalid Email')
        }
        if(!this.body.name && registerCheck){
            this.errors.name.push('Please, enter a name')
        }
        if(this.body.password.length < 8 || this.body.password.length > 50 && registerCheck){
            this.errors.password.push('Invalid Password - need a password between 8 to 50 characters')
        }
        if(!validator.isStrongPassword(this.body.password) && registerCheck){
            this.errors.password.push('Week Password - need at least 1 letter uppercase, 1 simbol and 1 number')
        }

    }

    cleanUp() {
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }
        this.body = {
            name: this.body.name,
            email: this.body.email,
            password: this.body.password
        }
    }

    
}
module.exports = Login