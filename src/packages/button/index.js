import Button from './button'
import '../../theme-chalk/button.scss'

Button.install = app => app.component(Button.name, Button)
export default Button