import 'core-js/stable'
import 'regenerator-runtime/runtime' 
//import './assets/css/style.css' unused for this project
import {Register,Login} from './modules/FormCheck'

const login = new Login('.form-login')
const register = new Register('.form-register')

login.init()
register.init() 