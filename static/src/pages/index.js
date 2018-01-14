// 登录页面
// import { DatePicker } from 'antd'
import * as API from 'API'

import '../assets/css/index.css';

const style = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '320px',
    textAlign: 'center',
    marginLeft: '-160px',
    zIndex: 99,
    fontWeight: 'bold'
  }
}

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      msg: ''
    }
  }

  componentWillMount () {
    document.getElementsByTagName('canvas')[0].style.display = 'block'
  }

  changeItem (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleRegister () {
    const self = this
    API.signUp({
      data: {
        userName: self.state.userName,
        password: self.state.password
      },
      onSuccess (res) {
        alert(`恭喜您注册成功!`)
        self.props.history.push('/admin')
      },
      onFailure (err) {
        self.setState({
          msg: err.message
        })
        setTimeout(() => {
          self.setState({
            msg: ''
          })
        }, 1000)
      }
    })
  }

  handleSubmit () {
    const self = this
    API.signIn({
      data: {
        userName: self.state.userName,
        password: self.state.password
      },
      onSuccess (res) {
        self.props.history.push('/admin')
      },
      onFailure () {
        self.setState({
          msg: '账号或密码错误'
        })
        setTimeout(() => {
          self.setState({
            msg: ''
          })
        }, 1000)
      }
    })
  }
  
  render () {
    return (
      <div style={ style.content }>
        <div className="info">
          <p>账号: <input name="userName" type="text" value={ this.state.userName } onChange={ this.changeItem.bind(this) } /></p>
          <p>密码: <input name="password" type="password" value={ this.state.password } onChange={ this.changeItem.bind(this) } /></p>
          <button onClick={ this.handleSubmit.bind(this) }>登录</button>
          <button onClick={ this.handleRegister.bind(this) }>注册</button>
          <p>{ this.state.msg }</p>
        </div>
      </div>
    )
  }
}