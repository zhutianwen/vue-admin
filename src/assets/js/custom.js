let FormValidate = (function(){
    function FormValidate () {};
    FormValidate.Form = function(){
        return{
            // 邮箱验证规则
            checkEmail(rule,value,callback){
                const regEmail =/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
                if(regEmail.test(value)){
                    return callback()
                }else{
                    return callback(new Error('邮箱有误'));
                } 
            },
            //手机号验证规则
            checkMobile(rule,value,callback){
                const regPhone = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
                if(regPhone.test(value)){
                   return callback()
               }else{
                   return callback(new Error('手机号有误'));
               }
            },
        }
    }
    return FormValidate
}())
    exports.FormValidate = FormValidate




