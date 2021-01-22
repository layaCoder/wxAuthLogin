import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.less'

export default class Index extends Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() { }

  componentDidShow() {
  }


  /*
  授权登录： 
  1. 微信登录 wx.login()
  2. 获取用户 weixin.getUserInfo()
  3. 将获取的用户信息 传给后端，后端保存/更新用户信息，并将 用户数信息与token返回全段
  4. 前端将
  */
  tobegin = () => {
    let jsCode
    Taro.login()
      .then(loginInfo => {
        jsCode = loginInfo.code
        console.log('login info..>>', jsCode)
        return Taro.getUserInfo()
      })
      .then(userInfo => {
        let { nickName, gender, language, city, province, country, avatarUrl } = userInfo.userInfo
        Taro.request({
          url: 'http://localhost:2000/wx/post/getUser', //仅为示例，并非真实的接口地址
          method: 'POST',
          data: {
            jsCode: jsCode,
            nickName,
            gender,
            language,
            city,
            province,
            country,
            avatarUrl
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log('getUser res...>', res.data)
            Taro.setStorage({
              key: 'user',
              data: res.data
            })
            Taro.redirectTo({
              url: '/pages/main/index'
            })
          },
          fail: function (err) {
            console.log(err, 63)
          }
        })
      })
  };

  componentDidHide() { }

  config = {
    navigationBarTitleText: 'Index'
  }


  render() {
    return (
      <View className='index'>
        <Text>index</Text>
        <Button className='btn' openType='getUserInfo' onGetUserInfo={this.tobegin} type='primary' lang='zh_CN'>
          一键登录
        </Button>
      </View>
    )
  }
}
