$(()=>{
  $('#file').on('change', (e) => {
    file = e.target.files[0]
  })
  compressImage({
    url:'http://m.xiguacity.cn/static/QuantumComputer.jpg',
    callback: (data) =>{
      $('#show').attr('src', data)
    }
  })
})
