var GOP = require('../');

var step1Div = document.getElementById('step1');
var step2Div = document.getElementById('step2');
var step3Div = document.getElementById('step3');

function getPhone(){
    var phoneEl = document.getElementById('phone');
    return phoneEl && phoneEl.value;
}
function checkPhoneNumber(){
    var phonenumber = getPhone();
    if (!phonenumber) {
        alert('请输入手机号！');
        return false;
    }
    var phonereg = /^1\d{10}$/;
    var result = phonereg.test(phonenumber);
    if (!result) {
        alert('请输入正确的手机号');
    }
    return result;
}
function hideElement(ele){
    ele.style.display = "none"
}
function showElement(ele){
    ele.style.display = "block"
}
function initOnepass(){
    var opInstance = new GOP({
        custom: '您申请的onepass ID',
        checkGatewayUrl:'您的check_gateway地址',
        checkMessageUrl:'您的check_message地址'
    });
    opInstance.onGatewaySuccess(function(){
        // 网关验证成功，finish                
        hideElement(step1Div);
        hideElement(step2Div);
        showElement(step3Div);
    }).onGatewayFail(function(err){
        console.log('onGatewayFail', err);
        // step2: 网关失败，调用短信
        opInstance.sendMessage({phone: getPhone()})
    }).onSendMessageSuccess(function(){
        // step3: 短信发送成功， 显示短信接收页面
        console.log('onSendMessageSuccess')                
        hideElement(step1Div);
        showElement(step2Div);
        hideElement(step3Div);                         
    }).onSendMessageFail(function(err){
        alert('sendMessage fail')
        console.log(err)
    }).onCheckMessageSuccess(function(){
        // step5 短信验证成功 finish
        console.log('onMessageSuccess')        
        hideElement(step1Div);
        hideElement(step2Div);
        showElement(step3Div);     
    }).onCheckMessageFail(function(err){
        alert('checkmessage fail');
        console.log(err)
    }).onError(function(err){                
        console.log(err);                
    });   
    return opInstance;
}
var opInstance = initOnepass();


document.getElementById('btnStep1').addEventListener('click', function(){
    var checkphone = checkPhoneNumber();
    if (checkphone) {
        // step1: 调用网关
        opInstance.gateway({phone: getPhone(), process_id: ''});
    }
});
document.getElementById('btnStep2').addEventListener('click',function(){
    var text_msg = document.getElementById('txtmsg');
    if(text_msg && text_msg.value){
        // step4 短信验证接口
        opInstance.checkMessage(text_msg.value);
    }else{
        alert('请输入短信验证码');
    }
});