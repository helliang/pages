/*
 * @Author: carrie
 * @Date: 2018-05-10 10:35:00 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-10 10:39:17
 * 常规设计给的设计稿 750、640
 * rem就是相对于根元素html的font-size来做计算。而这套方案（flexible.js）使用rem单位，是能轻易的根据html的font-size计算出元素的盒模型大小
设备像素比（dpr） == 物理像素/设备独立像素。
例如：iphone6 物理像素750 x 1334 px 设备独立像素 375 x 667 dp  直接除就知道iphone6 dpr是2
  案例: .testBox {
        width: 4rem;
        height: 3.2rem;
        border: 1px solid #ddd;
        margin: 3rem;
        box-sizing: border-box;
    }

    当在iphone6模拟器运行html的时候，html标签会被新增两个属性其中一个就是 style="font-size:75px;" 这个时候大家可以理解成 1rem = 75px，那么：

    300px的盒子就是 300/75 = 4rem
    如果设计是iphone5的标准
    那么flexible会把html的font-size处理成64px，以此类推 1rem = 64px
    300px的盒子就是 300/64 = 4.6875rem
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
(function flexible (window, document) {
  var docEl = document.documentElement
  var dpr = window.devicePixelRatio || 1

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = (12 * dpr) + 'px'
    }
    else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit () {
    var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + 'px'
  }

  setRemUnit()

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement('body')
    var testElement = document.createElement('div')
    testElement.style.border = '.5px solid transparent'
    fakeBody.appendChild(testElement)
    docEl.appendChild(fakeBody)
    if (testElement.offsetHeight === 1) {
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody)
  }
}(window, document))
