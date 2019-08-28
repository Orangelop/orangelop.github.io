/* by：弦云孤赫——David Yang
** github - https://github.com/yangyunhe369
*/
// 游戏主函数
let _main = {
  LV: 1,                               // 初始关卡
  MAXLV: 3,                            // 最终关卡
  scene: null,                         // 场景对象
  blockList: null,                     // 所有砖块对象集合
  ball: null,                          // 小球对象
  ballshadow: null,                          // 小球阴影对象
  paddle: null,                        // 挡板对象
  score: null,                         // 计分板对象
  ball_x: 491,                         // 小球默认x轴坐标
  ball_y: 418,                         // 小球默认y轴坐标
  paddle_x: 449,                       // 挡板默认x轴坐标
  paddle_y: 450,                       // 挡板默认y轴坐标
  score_x: 10,                         // 计分板默认x轴坐标
  score_y: 30,                         // 计分板默认y轴坐标
  fps: 60,                             // 游戏运行帧数
  game: null,                          // 游戏主要逻辑对象

  skillq: null,                        // q技能
  skillw: null,                        // w技能

  start: function () {                 // 游戏启动函数
    let self = this
    /**
     * 生成场景（根据游戏难度级别不同，生成不同关卡）
     */
    self.scene = new Scene(self.LV)
    // 实例化所有砖块对象集合
    self.blockList = self.scene.initBlockList()
    /**
     * 小球
     */
    self.ball = new Ball(self)
	/**
     * 小球阴影
     */
    self.ballshadow = new BallShadow(self)
    /**
     * 挡板
     */
    self.paddle = new Paddle(self)
    /**
     * 计分板
     */
    self.score = new Score(self)
    /**
     * 游戏主要逻辑
     */
    self.game = new Game(self)

    self.skillq = new SkillQ(self);
    self.skillw = new SkillW(self);
    
    /**
     * 游戏初始化
     */
    self.game.init(self)
  }
}
// setTimeout(function() {
	// _main.start()
// }, 1000);
/**
 * some JavaScript code for this blog theme
 */
/* jshint asi:true */

/////////////////////////header////////////////////////////
/**
 * clickMenu
 */
(function() {
  if (window.innerWidth <= 770) {
    var menuBtn = document.querySelector('#headerMenu')
    var nav = document.querySelector('#headerNav')
    menuBtn.onclick = function(e) {
      e.stopPropagation()
      if (menuBtn.classList.contains('active')) {
        menuBtn.classList.remove('active')
        nav.classList.remove('nav-show')
      } else {
        nav.classList.add('nav-show')
        menuBtn.classList.add('active')
      }
    }
    document.querySelector('body').addEventListener('click', function() {
      nav.classList.remove('nav-show')
      menuBtn.classList.remove('active')
    })
  }
}());

//////////////////////////back to top////////////////////////////
(function() {
  var backToTop = document.querySelector('.back-to-top')
  var backToTopA = document.querySelector('.back-to-top a')
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

  // backToTopA.addEventListener('click',function (e) {
  //     e.preventDefault()
  //     window.scrollTo(0,0)
  // })
}());

//////////////////////////hover on demo//////////////////////////////
(function() {
  var demoItems = document.querySelectorAll('.grid-item')
}());
