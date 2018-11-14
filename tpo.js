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


const data = JSON.parse(document.getElementById('configread').innerText).reading

const result = JSON.stringify(
    data.map(
        l => l.list
            .filter(l => l.result === 'eAnswer' || l.result === 'hAnswer')
            .map(l => he.decode(l.text).replace(/(\r|\n)/g, ''))),
    null,
    2
)

const btn = document.createElement('button')
btn.innerText = 'Copy Error to Clipboard'
btn.setAttribute('data-clipboard-text', result)
btn.setAttribute('class', 'btn')

new ClipboardJS('.btn');

document.querySelector('h3').insertAdjacentElement('beforebegin', btn)