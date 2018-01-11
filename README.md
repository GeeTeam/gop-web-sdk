极验onepass产品 web sdk

###本产品只适用手机端，且用户开启数据网络功能可用， 不支持https

##Installation
```bash
$ npm install gop-web-sdk --save
```

##API
#### gateway(options) 发送网关接口
- `options` <[Object]>
  - `phone` <[string]> 电话号码
  - `process_id` <[string]> 可选，使用验证码必填
- returns: <[GOP]>

#### onGatewaySuccess(func) 网关请求成功
- `func` <[Function]>
- returns: <[GOP]>

#### onGatewayFail(func) 网关请求失败
- `func` <[Function]>
- returns: <[GOP]>

#### sendMessage(options) 发送短信接口
- `options` <[Object]>
  - `phone` <[string]> 电话号码
- returns: <[GOP]>

#### onSendMessageSuccess(func) 短信接口成功
- `func` <[Function]>
- returns: <[GOP]>

#### onSendMessageFail(func) 短信接口失败
- `func` <[Function]>
- returns: <[GOP]>

#### checkMessage(msg) 验证短信接口
- `msg` <[string]> 短信验证码
- returns: <[GOP]>

#### onCheckMessageSuccess(func) 验证短信接口成功
- `func` <[Function]>
- returns: <[GOP]>

#### onCheckMessageFail(func) 验证短信接口失败
- `func` <[Function]>
- returns: <[GOP]>

#### onError(func)
- `func` <[Function]>
- returns: <[GOP]>

#### reset()
- returns: <[GOP]>

#### Error 错误回调对象
- `err` <[Object]>
  - `code` <Int> 错误代码
  - `err` <Object> 错误信息

	| code | description
	| 100  | pre_gateway 加载失败  
	| 101  | pre_gateway 返回结果错误  
	| 102  | 网关接口 加载失败  
	| 103  | 网关接口 返回结果错误  
	| 104  | check_gateway 加载失败  
	| 105  | check_gateway 返回结果错误  
	| 106  | send_message 加载失败  
	| 107  | send_message 返回结果错误  
	| 108  | check_message 加载失败  
	| 109  | check_message 返回结果错误  
  

##Example
```js
var GOP = require('gop-web-sdk');
var opInstance = new GOP({
    custom: '您申请的onepass ID',
    checkGatewayUrl:'您的check_gateway地址',
    checkMessageUrl:'您的check_message地址'
});
opInstance.onGatewaySuccess(function(){
    // 网关验证成功，finish
}).onGatewayFail(function(err){
    console.log('onGatewayFail', err);
    // step2: 网关失败，调用短信
    opInstance.sendMessage({phone: '电话号码'})
}).onSendMessageSuccess(function(){
    // step3: 短信发送成功， 显示短信接收页面
    console.log('onSendMessageSuccess')         
}).onSendMessageFail(function(err){
    console.log('sendMessage fail')
}).onCheckMessageSuccess(function(){
    // step5 短信验证成功 finish
    console.log('onMessageSuccess')
}).onCheckMessageFail(function(err){
    console.log('checkmessage fail');
}).onError(function(err){                
    console.log(err);                
});   

//your code

// step1: 调用网关
opInstance.gateway({phone: '电话号码', process_id: '验证码返回结果'});

//your code

// step4 短信验证接口
opInstance.checkMessage('短信验证码');
```