// ==UserScript==
// @name         古诗文网自动填充验证码
// @namespace    http://waahah.github.io/
// @version      0.1.3
// @description  自动识别填充验证码以及账号信息并登录，不需要到代码中修改账号，登陆一次之后就会自动登录
// @author       waahah
// @license      Apache License 2.0
// @require      https://unpkg.com/tesseract.js@2.1.4/dist/tesseract.min.js
// @match        *://so.gushiwen.cn/user/login.aspx*
// @icon         data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M15 3h6v5h-2V5h-4V3zM9 3v2H5v3H3V3h6zm6 18v-2h4v-3h2v5h-6zm-6 0H3v-5h2v3h4v2zM3 11h18v2H3v-2z'/%3E%3C/svg%3E
// @grant             unsafeWindow
// @grant             GM_registerMenuCommand
// ==/UserScript==
 
(function() {
    'use strict'
    let name,pwd,valName,valPwd;
    const host_name = location.host+"_nmae";
    const host_pwd = location.host+"_pwd";
 
    function del(){
        if (window.localStorage.getItem(host_name)!==null){
			window.localStorage.removeItem(host_name);
		}
		if (window.localStorage.getItem(host_pwd)!==null){
			window.localStorage.removeItem(host_pwd);
		}
    }
    GM_registerMenuCommand("删除保存在本地的账号密码", del);
 
    valName = localStorage.getItem(host_name);
    valPwd = localStorage.getItem(host_pwd);
 
    if(valName== undefined && valPwd == undefined){
        name = prompt('第一次需输入邮箱/手机号:','');
        pwd = prompt('第一次需输入密码:','');
        localStorage.setItem(host_name, name);
        localStorage.setItem(host_pwd, pwd);
        valName = localStorage.getItem(host_name);
        valPwd = localStorage.getItem(host_pwd);
        console.log(localStorage);
 
    }
 
    const account = document.querySelector('#email');
    const password = document.querySelector('#pwd');
    const core = document.querySelector('#code');
    const randcode = document.querySelector('#imgCode');
    const submit = document.querySelector('#denglu');
    const emailNo = document.getElementById('emailNo').style.display;
    const pwdNo = document.getElementById('pwdNo').style.display;
 
    function login(){
        $("#leftLogin").fadeOut("slow");//立即停止显示微信扫码登录
        clearInterval(intervalErweima);
        if(account.value == '邮箱 / 手机号' && password .value == ''){
            //onEmial();//消除提示
            account.value = valName;
            //onPwd();消除提示
            password .value = valPwd;
        }else if(zhanghao.value !== valName || password .value !== valPwd){
            zhanghao.value = valName;
            password .value = valPwd;
        }
    }
    login();
 
    async function security(){
        //GetCodeImg();
        const exampleImage = "/RandCode.ashx";
        console.log("exampleImage"+exampleImage);
 
		const worker = Tesseract.createWorker({
            logger: m => console.log(m)
		});
		Tesseract.setLogging(true);
		work();
 
		async function work() {
                await worker.load();
			    await worker.loadLanguage('eng');
			    await worker.initialize('eng');
 
			    let result = await worker.recognize(exampleImage);
			    console.log(result.data);
                console.log("识别成功率："+result.data.confidence);
 
			    await worker.terminate();
                core.value = result.data.text;
                if(emailNo == 'none' && pwdNo == 'none'&&result.data.confidence>30){
                    submit.click();
                }
                if(result.data.confidence<50){
                    (async () => GetCodeImg()) ().then(
                          async () => {
                            await security();
                        }
                    );
 
                }
        }
   }
    window.onload = () => {
        security();
    }
 
})();