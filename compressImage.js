/**
 * 压缩图片
 * @param {object} config
 * @param {string} config.url 图片的 url 或者 src
 * @param {string} config.type 'image/jpeg' or 'image/png'
 * @param {string} config.quality 0 ～ 1
 * @param {number} config.width
 * @param {number} config.height
 * @param {(base64: string) => void} config.callback
 */
function compressImage(config) {
  config = Object.assign(
    {
      type: 'image/jpeg',
      quality: 0.95,
      width: 1080,
      height: 1080,
      callback: () => {}
    },
    config
  );

  let $img = new Image();
  let $canvas = document.createElement('canvas');

  $img.crossOrigin = 'anonymous';
  $img.style.display = 'none';
  $canvas.style.display = 'none';

  document.body.appendChild($img);
  document.body.appendChild($canvas);

  $img.onload = () => {
    let maxWidth = config.width;
    let maxHeight = config.height;

    let originWidth = $img.naturalWidth;
    let originHeight = $img.naturalHeight;
    let targetWidth = originWidth;
    let targetHeight = originHeight;

    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        targetWidth = maxWidth;
        targetHeight = ~~(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = ~~(maxHeight * (originWidth / originHeight));
      }
    }

    let ctx = $canvas.getContext('2d');
    $canvas.width = targetWidth;
    $canvas.height = targetHeight;

    ctx.drawImage($img, 0, 0, targetWidth, targetHeight);

    config.callback($canvas.toDataURL(config.type, config.quality));

    $canvas.remove();
    $img.remove();
  };

  $img.setAttribute('src', config.url);
}
