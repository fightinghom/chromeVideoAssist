console.log('load tools')

const wapperStyles = [
  'height: 0px',
  'position: relative',
]

const toolBtnsStyles = [
  'color: #FFFFFF',
  'font-weight: bold',
  'float: right',
  'position: absolute',
  'bottom: 0',
  'transform: translateY(calc(100% + 20px))',
  'z-index: 10000'
]

const buildToolsEl = (video) => {
  const wapper = document.createElement('div')
  wapper.style.cssText = wapperStyles.join(';')

  const toolBtns = document.createElement('span')
  toolBtns.style.cssText = toolBtnsStyles.join(';')

  wapper.append(toolBtns)
  return wapper
}

const videos = document.getElementsByTagName('video')
if (videos.length > 0) {
  for (const item of videos) {
    console.log('item', item.parentNode)
    const toolEl = buildToolsEl(item)
    item.parentNode.insertBefore(toolEl, item)
  }
}