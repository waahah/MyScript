// ==UserScript==
// @name         下载CSDN、简书、掘金、知乎专栏、博客园、脚本之家、51CTO、程序员大本营、吾爱破解、腾讯云、阿里云、华为云、百度等文章保存为Markdown文件
// @namespace    https://waahah.xyz/
// @version      0.1.3
// @description  下载保存博客文章为markdown,已支持CSDN、简书、掘金、知乎专栏、博客园、脚本之家、51CTO、程序员大本营、吾爱破解、腾讯云、阿里云、华为云、百度、360等，脚本仅限学习，请大家尊重版权。
// @author       waahah
// @match        *://blog.csdn.net/*
// @match        *://www.jianshu.com/p/*
// @match        *://juejin.cn/post/*
// @match        *://zhuanlan.zhihu.com/p/*
// @match        *://www.cnblogs.com/*/p/*
// @match        *://www.cnblogs.com/*/archive/*
// @match        *://www.jb51.net/article/*
// @match        *://blog.51cto.com/u_*
// @match        *://www.pianshen.com/article/*
// @match        *://www.360doc.com/content/*
// @match        *://baijiahao.baidu.com/s?id=*
// @match        *://jingyan.baidu.com/article/*
// @match        *://www.52pojie.cn/thread-*
// @match        *://cloud.tencent.com/developer/article/*
// @match        *://developer.aliyun.com/article/*
// @match        *://huaweicloud.csdn.net/*
// @license      Apache-2.0
// @icon         data:image/svg+xml,%3Csvg t='1691941995383' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='1514' width='200' height='200'%3E%3Cpath d='M320 864 320 0l480 0 0 192 0 32L1024 224l0 640L320 864zM928 320l-512 0 0 32 512 0L928 320zM928 448l-512 0 0 32 512 0L928 448zM928 576l-512 0 0 32 512 0L928 576zM928 704l-512 0 0 32 512 0L928 704zM832 0l19.2 0L1024 160 1024 192l-192 0L832 0zM288 896l320 0L704 896l0 128L0 1024 0 160l288 0 0 320-192 0L96 512l192 0 0 96-192 0L96 640l192 0 0 96-192 0L96 768l192 0 0 96-192 0L96 896 288 896z' p-id='1515'%3E%3C/path%3E%3C/svg%3E
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(async function() {
    /**
    * 遵循开源协议,转载请注明出处谢谢
    */

    'use strict';
    const webUrl = window.location.href;
    const headline = document.title;
    const host = location.host;

    const InterfaceList = [
        { "host": "blog.csdn.net", "el": "article.baidu_pl", "cut_str": "_" },
        { "host": "www.jianshu.com", "el": "article._2rhmJa", "cut_str": " - " },
        { "host": "juejin.cn", "el": ".article-content.markdown-viewer", "cut_str": " - " },
        { "host": "zhuanlan.zhihu.com", "el": ".Post-RichTextContainer", "cut_str": " - " },
        { "host": "www.cnblogs.com", "el": "#cnblogs_post_body", "cut_str": " - " },
        { "host": "www.jb51.net", "el": "#content", "cut_str": "_" },
        { "host": "blog.51cto.com", "el": "#result", "cut_str": "_" },
        { "host": "www.pianshen.com", "el": ".blogpost-body", "cut_str": " - " },
        { "host": "www.360doc.com", "el": "#artContent", "cut_str": "" },
        { "host": "baijiahao.baidu.com", "el": "div[data-testid='article']", "cut_str": "" },
        { "host": "jingyan.baidu.com", "el": ".exp-content-outer", "cut_str": "-" },
        { "host": "www.52pojie.cn", "el": ".t_f", "cut_str": " - " },
        { "host": "cloud.tencent.com", "el": ".mod-content__markdown", "cut_str": "-" },
        { "host": "developer.aliyun.com", "el": ".content-wrapper", "cut_str": "-" },
        { "host": "huaweicloud.csdn.net", "el": ".main-content", "cut_str": "_" }
    ]

    const utils = {

        async css (css) {
            const myStyle = document.createElement('style');
            myStyle.textContent = css;
            const doc = document.head || document.documentElement;
            doc.appendChild(myStyle);
        },
    
        async node (node) {
            const myDiv = document.createElement('div');
            myDiv.innerHTML = node;
            const doc = document.body || document.documentElement;
            doc.appendChild(myDiv);
        },
    
        async load_web_script (list) {
            try {
                for (const url of list) {
                    if(!document.querySelector(`script[src="${url}"]`)){
                        const script = document.createElement("script");
                        script.src = url;
                        script.async = false;
                        document.body.append(script);
                    }
                }
    
            } catch (e) {
                console.error(e);
            }
        }
    }


    await utils.css(`#zuihuitao {cursor:pointer; position:fixed; top:100px; left:0px; width:0px; z-index:2147483647; font-size:12px; text-align:left;}
        #zuihuitao .logo { position: absolute;right: 0; width: 1.375rem;padding: 10px 2px;text-align: center;color: #fff;cursor: auto;user-select: none;border-radius: 0 4px 4px 0;transform: translate3d(100%, 5%, 0);background: deepskyblue;}
        #zuihuitao .die {display:none; position:absolute; left:28px; top:0; text-align:center;background-color:#04B4AE; border:1px solid gray;}
        #zuihuitao .die li{font-size:12px; color:#fff; text-align:center; width:60px; line-height:21px; float:left; border:1px solid gray;border-radius: 6px 6px 6px 6px; padding:0 4px; margin:4px 2px;list-style-type: none;}
        #zuihuitao .die li:hover{color:#fff;background:#FE2E64;}
        @media print {body {display: block !important;}}
        *{-webkit-user-select: text; -moz-user-select: text; -ms-user-select: text; user-select: text;}
        .add{background-color:#FE2E64;}
        .btn-success{position: fixed;font-weight: 400;color: #fff;background-color: #28a745;border-color: #28a745;text-align: center;vertical-align: middle;border: 1px solid transparent;padding: .375rem .75rem;font-size: 1rem;line-height: 1.5;border-radius: .25rem; z-index:2147483647;cursor: pointer;}`);


    const html = `<div id='zuihuitao'>
        <div class='item_text'>
            <div class="logo"><a id="m">文档下载</a></div>
                <div class='die' >
                    <div style='display:flex;'>
                        <div style='width:128px; padding:0px 0;'>
                        <br>
                            <div style='font-size:16px; text-align:center; color:#fff; line-height:21px;'>导出Markdown</div>
                            <ul style='margin:0 24px;'>
                                <li id="li0">下载</li>
                                <div style='clear:both;'></div>
                            </ul>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>`;

    await utils.node(html);
    document.getElementsByClassName('item_text')[0].addEventListener('mouseover', () => {
        document.getElementsByClassName('die')[0].style.display = 'block';
    });

    document.getElementsByClassName('item_text')[0].addEventListener('mouseout', () => {
        document.getElementsByClassName('die')[0].style.display = 'none';
    })

    const cut_title = async (title, cut_str) => {
        try{
            const new_title = title.split(cut_str)[0];
            return new_title;
        }
        catch(e){
            console.log(e);
            return title;
        }
        
    }

    const save_md = async (el, title) => {
        const turndownService = new TurndownService();
        const gfm = turndownPluginGfm.gfm;
        turndownService.use(gfm);
        let ele = document.querySelector(el);
        let markdown = turndownService.turndown(ele);
        //console.log(markdown);
        let filename = `${title}.md`;
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', filename);
        let markdownContent = `${markdown}\n\n本文转自 <${webUrl}>，如有侵权，请联系删除。`;
        //downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(markdownContent);
        const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
        let blobURL = URL.createObjectURL(blob);
        downloadLink.setAttribute('href', blobURL);
        //document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    await utils.load_web_script([
        'https://unpkg.com/turndown/dist/turndown.js',
        'https://unpkg.com/turndown-plugin-gfm/dist/turndown-plugin-gfm.js'
    ]);
    
    const main = async () => {
        let new_headline;
        for (const even in InterfaceList) {
            if (host == InterfaceList[even].host) {
                let ele = InterfaceList[even].el;
                let cut = InterfaceList[even].cut_str;
                if(cut != ''){
                    new_headline = await cut_title(headline, cut);
                }else{
                    new_headline = headline;
                }
                await save_md(ele, new_headline);
                return new_headline;
            }
        }
    }

    document.getElementById('li0').addEventListener('click', async () => {

        await main().then(
            res => {
                document.getElementsByClassName('die')[0].style.block = 'none';
                console.log(`文件 ${res}.md 下载完成！`);
            }).catch(
            err => {
            console.log(err);
        });
    });
    
})();
