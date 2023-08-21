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

var getWorkId = () => location.href.substring(location.href.lastIndexOf('/') + 1,location.href.length)

var fuck = () => {
    location.replace('https://shequ.codemao.cn/work/196236259')
}

var random = () => {
    if (Math.random() >= 0.5) {
        let x = new XMLHttpRequest()
        x.open('GET','https://api.codemao.cn/web/works/recommended?type=KITTEN')
        x.send()
        x.onreadystatechange = () => {
            if (x.readyState==4 && x.status==200) {
                let re = x.responseText
                let r = JSON.parse(re)
                let l = r.items
                location.replace('https://shequ.codemao.cn/work/' + l[Math.floor(Math.random() * (l.length - 1 + 1))].id)
            }
        }
    } else {
        let x = new XMLHttpRequest()
        x.open('GET','https://api.codemao.cn/nemo/v2/works/web/' + getWorkId() + '/recommended')
        x.send()
        x.onreadystatechange = () => {
            if (x.readyState==4 && x.status==200) {
                let re = x.responseText
                let l = JSON.parse(re)
                location.replace('https://shequ.codemao.cn/work/' + l[Math.floor(Math.random() * (l.length - 1 + 1))].id)
            }
        }
    }
}

setInterval(()=>{
    if(window.location.href.search("work") !== -1) {
        console.log('begin autolike')

        let sbsh = document.getElementsByClassName('r-work--tip')[0]
        if (sbsh != null)
            if (sbsh.textContent.search('审核') !=-1)
                random()

        if (document.getElementsByClassName('r-work-c-work_interaction--data_name')[0].textContent != "已点赞")
            document.getElementsByClassName('r-work-c-work_interaction--praise')[0].click()
        if (document.getElementsByClassName('r-work-c-work_interaction--data_name')[1].textContent != "已收藏")
            document.getElementsByClassName('r-work-c-work_interaction--collect')[0].click()

        random()
        
    } else {
        random()
    }
},100)
