/**
 * 压缩图片
 * @param {object} config
 * @param {string} config.url 图片的 url 或者 src
 * @param {string} config.type 'image/jpeg' or 'image/png'
 * @param {string} config.quality 0 ～ 100
 * @param {number} config.width 
 * @param {number} config.height 
 * @param {function(string)} config.callback
 * @returns {string} 
 */
function compressImage(config) {
  config = Object.assign({
    type: 'image/jpeg',
    quality: 95,
    width: 1080,
    height: 1080,
    callback: (data)=>{}
  }, config)

  let $img = $('<img>')
  $img.css({display: 'none'})
  $img.appendTo($('body'))
  let img = $img[0]
  img.crossOrigin = 'anonymous'
  
  let $canvas = $('<canvas>')
  $canvas.css({display:'none'})
  $canvas.appendTo($('body'))

  let canvas = $canvas[0]

  $img.on('load', ()=>{
    let maxWidth = config.width
    let maxHeight = config.height

    let originWidth = img.naturalWidth
    let originHeight = img.naturalHeight
    let targetWidth = originWidth
    let targetHeight = originHeight

    if(originWidth > maxWidth || originHeight > maxHeight){
      if(originWidth / originHeight > maxWidth / maxHeight){
        targetWidth = maxWidth
        targetHeight = Math.round(maxWidth * (originHeight / originWidth))
      }
      else{
        targetHeight = maxHeight
        targetWidth = Math.round(maxHeight * (originWidth / originHeight))
      }
    }

    let ctx = canvas.getContext('2d')
    canvas.width = targetWidth
    canvas.height = targetHeight

    ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

    config.callback(canvas.toDataURL('image/jpeg', 1))
    
    $canvas.remove()
    $img.remove()
  })

  $img.attr('src', config.url)
}



