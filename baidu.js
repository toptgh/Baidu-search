var baiduInput = (function () {
    var timer = null;
    return {
        init: function (ele) {
            this.$ele = document.querySelector(ele);
            this.$searchInp = this.$ele.querySelector('input');
            this.$resultList = this.$ele.querySelector('.search-list');
            this.$btn=this.$ele.querySelector('#search-btn');
            this.event();
        },
        event: function () {
            var _this = this;
            this.$btn.onclick=function(){
                alert('请在百度搜索一样的词，看看出现的是不是一样');
                location.href='http://www.baidu.com';
            }
            this.$searchInp.onfocus = function () {
                // 如果文本框内容不为空,下拉框展示
                _this.judgeInput();
            }
            this.$searchInp.oninput = function () {
                var text = this.value;
                // 如果文本框内容不为空,下拉框展示, 如果为空,隐藏
                _this.judgeInput();
                // 根据每次输入的内容获取下拉框提示的数据吧

                // 清除延时器
                clearTimeout(timer);
                // 添加延时器(用户如果输入很快, 没必要每次都查询数据)
                timer = setTimeout(function(){
                    _this.getData(text);
                }, 500);
                // _this.getData(text);

            }
            // 了利用事件委托给每一个li查询的结果添加点击事件
            this.$resultList.onclick = function (e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (target.nodeName === 'LI') {
                    // 把内容输入到文本框内
                    _this.$searchInp.value = target.innerHTML;
                    // 下拉框隐藏
                    // _this.listBoxShow();
                }
            }
            // this.$searchInp.onblur = function() {
            //     _this.listBoxShow();
            // }
            document.onclick = function(e) {
               
                if(e.target !== _this.$searchInp ) {
                    _this.listBoxShow()
                }
            }
        },
        // 空值下拉框的显示和隐藏  
        listBoxShow: function (val) {
            val = val || 'none';
            this.$resultList.style.display = val;
        },
        judgeInput: function () {
            var val = this.$searchInp.value;
            if (val === '') {
                this.listBoxShow();
            } else {
                this.listBoxShow('block');
            }
        },
        getData: function (val) {
            val = val || this.$searchInp.value;
            var params = {
                wd: val,
                cb: "baiduInput.insertData"
            }
            jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', params);
        },
        insertData: function (data) {
            data = data.s;
            data = data.map(function(x) {
                return '<li>' + x +'</li>';
            })
            this.$resultList.innerHTML = data.join('');
            console.log(data);
        }
    }
}())