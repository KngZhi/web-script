// ==UserScript==
// @name         TPO 阅读读取数据
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/he/1.2.0/he.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js
// @match        https://top.zhan.com/toefl/read/single-feedback.html*
// ==/UserScript==

document.head.insertAdjacentHTML('afterbegin', '<link rel="stylesheet" href="https://cdn.bootcss.com/Primer/11.0.0-rc.5/build.css">')

const data = JSON.parse(document.getElementById('configread').innerText).reading

const result = JSON.stringify(
    data.map(
        l => l.list
            .filter(l => l.result === 'eAnswer' || l.result === 'hAnswer')
            .map(l => he.decode(l.text).replace(/(\r|\n)/g, ''))),
    null,
    2
)

const btn = `
<button class="btn tooltipped tooltipped-s" aria-label="Copied"data-clipboard-text="${result}" style="width: unset;line-height: unset; height: unset;">
  Copy Error Data To Clipboard
</button>
`
document.querySelector('h3').insertAdjacentHTML('beforebegin', btn)

new ClipboardJS('.btn');
