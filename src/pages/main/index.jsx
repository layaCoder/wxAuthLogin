import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  constructor() {
    this.state = {
      user: null,
      token: null
    }
    this.handleUpdateUserInfo = this.handleUpdateUserInfo.bind(this)
  }


  componentWillMount() { }

  componentWillMount() {
    let _this = this
    Taro.getStorage({
      key: 'user',
      success: function (res) {
        let { user, token } = JSON.parse(res.data)
        const checkSession = Taro.request({
          url: 'http://localhost:2000/wx/get/checkSession', //仅为示例，并非真实的接口地址
          method: 'GET',
          header: {
            'content-type': 'application/json', // 默认值
            'Authorization': 'Bearer ' + token
          }
        })
        checkSession.then(res => {
          if (res.data.auth) {
            _this.setState({
              user: user,
              token: token
            })
          }
          else {
            Taro.redirectTo({
              url: '/pages/login/index'
            })
          }
        })
      },
      fail: function (err) {
        Taro.redirectTo({
          url: '/pages/login/index'
        })
      }
    })
  }

  config = {
    navigationBarTitleText: 'Main'
  }

  handleUpdateUserInfo() {
    let { token } = this.state
    Taro.request({
      url: 'http://localhost:2000/wx/post/updateUserInfo', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: {
        param: 'test param here'
      },
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'Bearer ' + token
      },
      success: function (res) {
        console.log('getUser res...>', res.data)
      }
    })
  }

  render() {
    return (
      <View className='index'>
        <View>
          <Image src={user[0].avatarUrl}></Image>
        </View>
        <View>
          <Text> {`Hi  ${user[0].nickName}`}</Text>
        </View>
        <Button className='btn' onClick={this.handleUpdateUserInfo}>修改地址</Button>
      </View>
    )
  }
}

