// ==UserScript==
// @name         CodemaoAutoLike
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  自动点赞收藏脚本,请勿用于一些影响用户体验的操作!!!
// @author       HiSuzume
// @match        https://shequ.codemao.cn/work/*
// ==/UserScript==

//使用说明:打开浏览器,打开任意作品即可自动点赞收藏.

setTimeout(() => {
    console.log('begin autolike')
    document.getElementsByClassName('r-work-c-work_interaction--praise')[0].click()
    document.getElementsByClassName('r-work-c-work_interaction--collect')[0].click()
    setTimeout(() => {
        let ls = document.getElementsByClassName('c-work_item--work_item')
        let c = Math.floor(Math.random() * (ls.length - 1 + 1))
        let l = ls[c]
        l.click()
        window.location.href="about:blank";
        window.close();
    },500)
},4000)
