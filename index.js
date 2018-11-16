compressImage({
  url: document.getElementById('origin').getAttribute('src'),
  width: 200,
  callback: data => {
    document.getElementById('compressed').setAttribute('src', data);
  }
});
