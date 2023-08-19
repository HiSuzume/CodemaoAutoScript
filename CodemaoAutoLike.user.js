// ==UserScript==
// @name         CodemaoAutoLike
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  自动点赞收藏脚本,请勿用于一些影响用户体验的操作!!!
// @author       HiSuzume
// @match        https://shequ.codemao.cn/work/*
// @match        https://shequ.codemao.cn/404
// ==/UserScript==

//使用说明:打开浏览器,打开任意作品即可自动点赞收藏.

fuck = () => {
    window.open('https://shequ.codemao.cn/work/196236259','_blank')
    window.location.href="about:blank";
    window.close();
}

setInterval(()=>{
    if(window.location.href.search("work") !== -1) {
        console.log('begin autolike')

        if (document.getElementsByClassName('r-work-c-work_interaction--data_name')[0].textContent != "已点赞")
            document.getElementsByClassName('r-work-c-work_interaction--praise')[0].click()
        if (document.getElementsByClassName('r-work-c-work_interaction--data_name')[1].textContent != "已收藏")
            document.getElementsByClassName('r-work-c-work_interaction--collect')[0].click()

        if (document.getElementsByClassName('r-work-c-work_interaction--data_name')[0].textContent.search('审核') !== -1)
            fuck()

        setTimeout(() => {
            let ls = document.getElementsByClassName('c-work_item--work_item')
            let c = Math.floor(Math.random() * (ls.length - 1 + 1))
            let l = ls[c]
            l.click()
            window.location.href="about:blank";
            window.close();
        },500)
    } else {
        fuck()
    }
},100)
