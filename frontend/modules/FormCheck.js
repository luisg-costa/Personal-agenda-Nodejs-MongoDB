import validator from 'validator'
import ejs from './ejs'

export class Register {
    constructor(formClass) {
        this.form = document.querySelector(formClass)
    }

    init() {
        this.events()
    }

    events() {
        if (!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            this.cleanMessages(e)
            this.validate(e)
        })
    }

    validate(e) {
        const el = e.target
        const emailInput = el.querySelector('input[name=email]')
        const passwordInput = el.querySelector('input[name=password]')
        const nameInput = el.querySelector('input[name=name]')
        let error = false
        if (!nameInput.value) {
            error = true
            this.showError('Insert a name', '.ejs-tag-name')
        }
        if (!validator.isEmail(emailInput.value)) {
            error = true
            this.showError('Insert a valid email', '.ejs-tag-email')
        }
        if (!validator.isStrongPassword(passwordInput.value) || passwordInput.value.length < 8 || passwordInput.value.length > 50) {
            error = true
            this.showError('Insert a stronger password', '.ejs-tag-password')
        }
        if (!error) el.submit()
    }

    showError(error, tag) {
        const ejsTag = ejs.render('<%= error %>', { error })
        document.querySelector(tag).innerHTML = ejsTag
    }

    cleanMessages(e) {
        for (let i of ['.ejs-tag-name', '.ejs-tag-email', '.ejs-tag-password']) {
            e.target.querySelector(i).innerHTML = ""
        }
    }
}

export class Login extends Register {
    constructor(formClass) {
        super(formClass)
    }

    validate(e) {
        const el = e.target
        const emailInput = el.querySelector('input[name=email]')
        const passwordInput = el.querySelector('input[name=password]')
        let error = false
        if (!validator.isEmail(emailInput.value)) {
            error = true
            this.showError('Insert a valid email', '.ejs-tag-email-login')
        }
        if (!validator.isStrongPassword(passwordInput.value) || passwordInput.value.length < 8 || passwordInput.value.length > 50) {
            error = true
            this.showError('Insert a stronger password', '.ejs-tag-password-login')
        }
        if (!error) el.submit()
    }

    cleanMessages(e) {
        for (let i of ['.ejs-tag-email-login', '.ejs-tag-password-login']) {
            e.target.querySelector(i).innerHTML = ""
        }
    }
}
