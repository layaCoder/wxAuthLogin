import Taro, { Component } from '@tarojs/taro'
import Index from './pages/login'
import Main from './pages/main'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  componentDidMount() {

  }

  componentWillMount() {
    Taro.checkSession({
      success: function () {
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        Taro.redirectTo({
          url: '/pages/login/index'
        })
      }
    })


  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  config = {
    pages: [
      'pages/main/index',
      'pages/login/index'

    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      // <Index />
      <Main />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
