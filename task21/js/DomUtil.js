/**
 * Created by honoka on 16/4/24.
 */
export  default class DomUtil {
  $(ele) {
    return document.getElementById(ele)
  }
  alerta(str) {
    alert(str)
  }
  create(num, className) {
    const divElement = document.createElement('div')
    divElement.innerHTML = num
    divElement.className = className
    return divElement
  }

  insertEle(containId, element, type) {
    const containEle = document.getElementById(containId)
    const childList = containEle.childNodes
    if (type === 'left') {
      containEle.insertBefore(element, childList[0])
    } else {
      containEle.appendChild(element)
    }
  }

  searchRender(textCon, str) {
    if (str !== null && str.length > 0) {
      if (textCon.match(str)) {
        textCon = textCon.replace(new RegExp(str, 'g'), `<span class="search-span">${str}</span>`)
        return `<div>${textCon}</div>`
      }
    }
  }
}