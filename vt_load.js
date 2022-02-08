console.log('load tools')

const wapperStyles = [
  'height: 0px',
  'position: relative',
]

const toolBtnsStyles = [
  'float: right',
  'position: absolute',
  'bottom: 0',
  'left: 50%',
  'transform: translate(-50%, 100%)',
  'z-index: 9999'
]

const fullPageBtnStyles = [
  'background: #FFF',
  'color: #000',
  'box-shadow: 0 0 5px #666',
  'padding: 4px',
  'display: inline-block'
]

const fullPageWapperStyles = [
  'background: #000',
  'position: fixed',
  'top: 0',
  'bottom: 0',
  'right: 0',
  'left: 0',
  'z-index: 10000'
]

const closeBtnStyles = [
  'position: fixed',
  'z-index: 10001',
  'top: 10px',
  'right: 10px',
  'display: inline-block',
  'color: #FFF'
]

let mask = null

const createMask = (v, originStyles) => {
  mask = document.createElement('div')
  mask.style.cssText = fullPageWapperStyles.join(';')

  // 创建退出按钮
  const close = document.createElement('div')
  close.style.cssText = closeBtnStyles.join(';')
  close.innerText = '关闭'
  close.addEventListener('click', () => {
    mask.remove()
    v.createTools = false
    v.style = JSON.parse(originStyles)
  })

  mask.append(close)
  document.body.append(mask)
}

const fullPage = (v) => {
  createMask(v, JSON.stringify(v.style))
  v.style.position = 'fixed'
  v.style.width = '100%'
  v.style.zIndex = '10999'
  v.style.top = '50%'
  v.style.left = 0
  v.style.transform = 'translateY(-50%)'
}

const buildToolsEl = (video) => {
  const wapper = document.createElement('div')
  wapper.style.cssText = wapperStyles.join(';')

  const toolBtns = document.createElement('div')
  toolBtns.style.cssText = toolBtnsStyles.join(';')

  const fullPageBtn = document.createElement('div')
  fullPageBtn.style.cssText = fullPageBtnStyles.join(';')
  fullPageBtn.innerText = '网页全屏'
  fullPageBtn.addEventListener('click', () => fullPage(video))

  toolBtns.append(fullPageBtn)
  wapper.append(toolBtns)
  return wapper
}

let tools = null
document.body.addEventListener('mousemove', ({ path }) => {
  for (const item of path) {
    if (item.nodeName === 'VIDEO' && !item.createTools) {
      tools = buildToolsEl(item)
      tools.removeEvent = () => {
        item.createTools = false
        tools.remove()
      }
      item.parentNode.insertBefore(tools, item)
      item.createTools = true
      return true
    }
  }
  const vd = path.find((item) => item.nodeName === 'VIDEO')
  if (!vd && tools) {
    tools.removeEvent()
  }
})