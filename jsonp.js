function jsonp(url, options) {
    var $script = document.createElement('script');
    // url拼接
    // 判断url中是否存在?
    if(url.indexOf('?') > -1) {
        url += '&_=' + Date.now(); 
    } else {
        url += '?_=' + Date.now(); 
    }
    for(var i in options) {
        url += '&' + i + '=' + options[i];
    }

    $script.src = url;
    document.body.appendChild($script);
}
