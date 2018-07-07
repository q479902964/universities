<template>
    <div class="event">
      <div id="wrap">
        <div class="event_message">
          <div class="bg_box">
            <div class="message_box">
              <div class="event_title">
                <h1 id="event_topic">{{event.event_title}}</h1>
                <h1 id="event_date">{{event.event_date}}</h1>
              </div>
              <p id="introduce">
                {{event.introduce}}
              </p>
            </div>
          </div>
        </div>
        <div class="tab_box">
          <!--<a href="#/news">新闻端</a>-->
          <!--<a href="#/weibo">微博端</a>-->
          <!--<a href="#/zhihu">知&nbsp;&nbsp;乎</a>-->
          <router-link :to="{path:'/event/news?eid='+input+'&pid=1'}">新闻端</router-link>
          <router-link :to="{path:'/event/weibo?eid='+input+'&pid=2'}">微博端</router-link>
          <router-link :to="{path:'/event/zhihu?eid='+input+'&pid=3'}">知&nbsp;&nbsp;乎</router-link>
        </div>
      </div>
      <transition :name="transitionName">
      <keep-alive>
      <router-view></router-view>
      </keep-alive>
      </transition>
      <div style="clear: both"></div>
    </div>
</template>

<script>

    export default {
      data(){
        return{
          input:{},
          event:{},
          transitionName:''
        }
      },
      mounted(){
        this.input =this.$route.query.eid;
        this.$http.get().then((response) => {
          response = response.data;
          this.event = response;
          $(".event_message").css("background-image","url(\""+this.event.event_img+"\")");
        })
      },
      watch: {//使用watch 监听$router的变化
        $route(to, from) {
          //如果to索引大于from索引,判断为前进状态,反之则为后退状态
          if(to.meta.index > from.meta.index){
            //设置动画名称
            this.transitionName = 'slide-left';
          }else{
            this.transitionName = 'slide-right';
          }
        }
      }
    }
</script>

<style scoped lang="stylus">
  #wrap{
    width: 1024px;
    margin: 20px auto;
  }
  .event_message{
    width: 100%;
    min-height: 470px;
    background:#fff;
    background-size:100% 100%;
    background-repeat: no-repeat;
  }
  .bg_box{
    width: 100%;
    min-height: 470px;
    background: rgba(38,75,78,0.50);
  }
  .message_box{
    width: 825px;
    padding-top: 200px;
    padding-left: 100px;
  }
  .event_title{
    width: 100%;
    height: 100%;
    border-left:4px solid #FB7C45 ;
  }
  .event_title h1{
    padding-left: 26px;
  }
  .event_title h1:first-child{
    font-style: normal;
    font-size: 30px;
    color: #FFFFFF;
  }
  .event_title h1:nth-of-type(2){
    font-style: normal;
    padding-top: 18px;
    font-size: 18px;
    color: #FFFFFF;
  }
  .message_box p{
    text-indent: 2em;
    margin-top: 18px;
    padding-bottom: 60px;
    font-size: 14px;
    color: #FFFFFF;
    line-height: 18px;
  }
  /*事件信息*/

  /*端口*/
  .tab_box{
    width: 100%;
    text-align: center;
    background: transparent;
    margin-top: 40px;
  }
  .tab_box a{
    font-size: 20px;
    color: #585858;
    letter-spacing: 2px;
    padding-bottom: 10px;
  }
  .tab_box a:first-of-type{
    margin-right: 200px;
  }
  .tab_box a:nth-of-type(3){
    margin-left: 200px;
  }
  .tab_box a.active{
    border-bottom: 5px solid #FB7C45;
  }
  .tab_box a:hover{
    border-bottom: 5px solid #FB7C45;
  }
  /*端口*/
  .fade-enter-active,.fade-leave-active{
    transition: all 1s;
  }
  .fade-enter{
    opacity 0;
    transform: translateX(100%);
  }
  .fade-leave-active{
    opacity 0;
    transform: translateX(-100%);
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all 500ms;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
