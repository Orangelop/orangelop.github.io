// Back to top //
(function() {
    var backToTop = document.querySelector('.back-to-top')
    // console.log(backToTop);
    window.addEventListener('scroll', function() {
  
      // 页面顶部滚进去的距离
      var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
  
      if (scrollTop > 200) {
        backToTop.classList.add('back-to-top-show')
      } else {
        backToTop.classList.remove('back-to-top-show')
      }
    })
  }());