wechatjs
======

微信公共平台自动回复消息接口服务中间件


## 模块状态
- [![NPM version](https://badge.fury.io/js/wechat.png)](http://badge.fury.io/js/wechat)
- [![Build Status](https://travis-ci.org/node-webot/wechat.png?branch=master)](https://travis-ci.org/node-webot/wechat)
- [![Dependencies Status](https://david-dm.org/node-webot/wechat.png)](https://david-dm.org/node-webot/wechat)
- [![Coverage Status](https://coveralls.io/repos/node-webot/wechat/badge.png)](https://coveralls.io/r/node-webot/wechat)

## 功能列表
- 自动回复（文本、图片、语音、视频、音乐、图文）
- 等待回复（用于调查问卷、问答等场景）
- 会话支持（创新功能）
- 目前功能只有文本被动回复可以使用
详细参见[微信官方API文档](https://mp.weixin.qq.com/wiki)

## Installation

```sh
$ npm install wechatjs
```

## Use with Connect/Express

```js
var wechatjs = require('wechatjs');
var wechat=new wechatjs()
var port=3000
wechat.set({
    token:'myWechat'
})
var http=require('http')
http.createServer(wechat).listen(port)
```
备注：token在微信平台的开发者中心申请

### 回复消息
当用户发送消息到微信公众账号，自动回复一条消息。这条消息可以是文本、图片、语音、视频、音乐、图文。详见：[官方文档](http://mp.weixin.qq.com/wiki/index.php?title=发送被动响应消息)

#### 回复文本
```js
wechat.on('text',function(obj){
    console.log(obj)
    return `you say: ${obj.Content}`
})
```
## License
The MIT license.
