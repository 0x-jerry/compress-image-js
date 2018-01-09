# 简单图片压缩

## 使用方法

```js
compressImage({
  url:'image_url',
  callback: (data) =>{
    $('img#show').attr('src', data)
  }
})
```
