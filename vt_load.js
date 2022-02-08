console.log('load tools')

const wapperStyles = [
  'height: 0px',
  'position: absolute',
  'top: 0',
  'right: 0'
]

const toolBtnsStyles = [
  'float: right',
  'position: absolute',
  'bottom: 0',
  'right: 0',
  'transform: translateY(calc(100% + 20px))',
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

const fullPage = (v) => {
  v.style.position = 'fixed'
  v.style.width = '100%'
  v.style.zIndex = '10001'
  v.style.top = '50%'
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

const addTools = (tools, item) => {
  item.parentNode.insertBefore(tools, item)
}

const removeTools = (tools) => {
  tools.remove()
}

const videos = document.getElementsByTagName('video')
if (videos.length > 0) {
  for (const item of videos) {
    console.log('item', item)
    const toolEl = buildToolsEl(item)
    item.addEventListener('mouseenter', () => { addTools(toolEl, item) })
    item.addEventListener('mouseleave', () => { removeTools(toolEl) })
  }
}