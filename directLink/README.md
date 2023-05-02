# directLink

>主流博客网站略过安全中心外链直达、去除相应广告、csdn免登录复制【保持原格式】

#### 动态监测整个页面链接变化，略过知乎、csdn、简书、掘金、gitee、微博安全中心中间页外站链接直接跳转。解除csdn未登录复制限制，移除知乎、csdn的强制登陆弹窗,getbootstrap4中文网及上述网站去除冗余的广告

>与其他脚本区别：
>1. 只在页面响应成功后处理一次链接，未考虑界面后续ajax或者iframe加载产生dom变化从而出现新的链接
>2. 不使用定时器定时刷新 
>
>由于在时间线拉到下面动态获取新的问答或者展开评论的时候，Dom 会变化，所以此脚本动态监测页面dom变化，dom结构放生变化后才会遍历检查替换所有新出现的相关链接。

>[想要提出问题？点击这里](https://github.com/waahah/MyScript/issues])

- *greasyfork相关地址 [略过安全中心直达外链](https://greasyfork.org/zh-CN/scripts/444972-%E7%95%A5%E8%BF%87%E5%AE%89%E5%85%A8%E4%B8%AD%E5%BF%83%E7%9B%B4%E8%BE%BE%E5%A4%96%E9%93%BE-%E5%8E%BB%E9%99%A4%E5%BC%B9%E7%AA%97%E5%B9%BF%E5%91%8A-%E8%A7%A3%E9%99%A4csdn%E5%A4%8D%E5%88%B6%E9%99%90%E5%88%B6)*

