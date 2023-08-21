// ==UserScript==
// @name         编程猫工具箱
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  (电脑端)支持自动识别Kitten/Nemo作品防沉迷,支持Nemo作品出源,不定时诈尸更新~
// @author       HiSuzume
// @match        https://shequ.codemao.cn/work/*
// ==/UserScript==

/*
 * 注:使用此脚本造成的损失作者不承担任何责任
 */

var gc = (n) => document.getElementsByClassName(n)
var getWorkId = () => location.href.substring(location.href.lastIndexOf('/') + 1,location.href.length)

window.onload = (() => {
    setTimeout(() => {
        //出源
        (() => {
            let bb = gc('r-work-c-player--player_fun')[0]
            bb.innerHTML += '<span id="tools_yuan" style="text-align:center;font-size:130%;">源码</span>'
            document.getElementById('tools_yuan').onclick = () => {
                let wi = getWorkId()
                let x = new XMLHttpRequest()
                x.open('GET','https://api.codemao.cn/creation-tools/v1/works/' + wi + '/source/public')
                x.send()
                x.onreadystatechange = () => {
                    if (x.readyState==4 && x.status==200) {
                        let re = x.responseText
                        let r = JSON.parse(re)
                        let awsl = r.work_urls
                        let l = awsl[0]
                        location.href = l
                    }
                }
            }
        })()
        //防沉迷
        if (gc('c-virtual_player--toast_content')[0] != null) {
            console.log('开始破解辣,啊哈哈')

            if (gc('r-work-c-work_info--kitten3')[0] != null)
                s = 'https://player.codemao.cn/w/'
            else if(gc('r-work-c-work_info--kitten4')[0] != null)
                s = 'https://player.codemao.cn/new/'
            else if(gc('r-work-c-work_info--nemo')[0] != null)
                s = 'https://nemo.codemao.cn/w/'
            let shit = () => {
                let f = document.createElement('iframe')
                f.setAttribute('src',s + getWorkId())
                let fk = gc('r-work-c-player--player_container')[0]
                fk.innerHTML = ''
                fk.appendChild(f)
            }

            shit()

            gc('r-work-c-player--player_refresh')[0].addEventListener('click',() => {
                shit()
            })
        }
    },1500)
})
