export default function ajax(options) {
  const xhr = new XMLHttpRequest();
  const action = options.action;

  const fd = new FormData();
  fd.append(options.formDataName, options.file)
  xhr.onerror = function(err) {
    options.onError(err)
  }

  xhr.onreadystatechange = function() {
    if (this.status === 200 && this.readyState === 4) {
      let text = xhr.responseText || xhr.response;
      options.onSuccess(JSON.parse(text))
    }
  }

  xhr.upload.onprogress = function(e) {
    if (e.total > 0) {
      e.perent = e.loaded / e.total * 100;
      options.onProgress(e.perent)
    }

  }

  xhr.open('post', action, true)
  // 发送请求
  xhr.send(fd);

  return xhr
}