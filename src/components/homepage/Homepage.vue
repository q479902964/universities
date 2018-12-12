<template>
  <div class="Homepage">
    <transition name="move">
    <img class="line_charts"  src="./line_charts.png" v-show="flag">
    </transition>
    <transition name="fade" >
    <div id="wrapper" v-show="flag">
      <div class="wrap_box">
        <div class="line_box">
          <!--<div class="line1 line" @click="change_img(0)"></div>-->
          <!--<div class="line2 line" @click="change_img(1)"></div>-->
          <div class="line1 line" @click="img_index=0" v-bind:class="[img_index==0?'line_in':'line_out']"></div>
          <div class="line2 line" @click="img_index=1" v-bind:class="[img_index==1?'line_in':'line_out']"></div>
        </div>
        <div class="title" >
          <transition-group name="banner" tag="ul">
            <img :src=banner1 v-show="img_index==0" v-bind:key="0">
            <img :src=banner2 v-show="img_index==1" v-bind:key="1">
          </transition-group>
        </div>
        <div class="content_box">
          <ul>
            <li>
              <div>领域性强</div>
            </li>
            <li>
              <div>多平台全网检测</div>
            </li>
            <li>
              <div>多维度、细粒度分析</div>
            </li>
          </ul>
        </div>
      </div>
      <a href='#/entry'>
        <div class="go_entry">
          <div>免费使用入口</div>
        </div>
      </a>
    </div>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      img_index:0,
      banner1:"static/banner1.png",
      banner2:"static/banner2.png",
      intId:{},
      flag:false
    }
  },
  created(){
  },
  mounted(){
    this.play();
    this.flag = true;
    function checkIE(){
      return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style
    }
    if (checkIE()) {
      window.addEventListener('hashchange', () => {
        var currentPath = window.location.hash.slice(1);
        if (this.$route.path !== currentPath) {
          this.$router.push(currentPath)
        }
      }, false)
    }
  },
  methods:{
    jump_entry(){
      this.$router.push({path: 'entry'})
    },
    change_img(index){
      this.img_index = index;
      // if(this.img_index==0){
      //   $(".line1").css("background","#FB7C45")
      //   $(".line2").css("background","#FFF")
      //   $(".title img").eq(1).hide();
      //   $(".title img").eq(0).fadeIn(1000);
      // }
      // else{
      //   $(".line2").css("background","#FB7C45")
      //   $(".line1").css("background","#FFF")
      //   $(".title img").eq(0).hide();
      //   $(".title img").eq(1).fadeIn(1000);
      // }
    },
    autoPlay(){
      this.img_index++;
      if (this.img_index === 2) { //当遍历到最后一张图片置零
        this.img_index = 0
      }
      // this.change_img(this.img_index)
    },
    play () {
      this.intId=setInterval(this.autoPlay, 3000)
    }
  },
    beforeDestroy(){
      this.intId = clearInterval(this.intId);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  /*主体部分*/
  *{
    margin: 0;
    padding:0;
  }
  li{
    list-style: none;
  }
  body{
    font-family:MicrosoftYaHei;
    background: #fff;
  }
  a{
    text-decoration: none;
    color:#676972 ;
  }

  /*pc端*/
  .banner-enter-active{
    transition: all 1s ease;
  }
  .banner-leave-active{
    transition: all 0s ease;
  }
  .banner-enter-active,.banner-leave{
    opacity: 1;
  }
  .banner-leave-active{
    opacity: 1;
  }
  .banner-enter{
    opacity: 0;
  }
  .fade-enter-active,.fade-leave-active{
      transition: all 1s;
  }
    .fade-enter{
      opacity 0;
      transform: translateX(100%);
    }
    .move-enter-active,.move-leave-active{
      transition: all 1s;
    }
    .move-enter {
      opacity 0;
      transform: translateX(100%);
    }
    #wrapper{
      width: 100%;
    }
    #wrapper .wrap_box{
      position: relative;
      background:url("./bg.png");
      background-repeat: no-repeat;
      width: 100%;
      height: 668px;
      background-size: cover;
    }
    /*线段*/
    #wrapper .line_box{
      position: absolute;
      top: 185px;
      left: 128px;
    }
    .line_box .line1{
      width: 3px;
      height: 50px;
      /*background: #FB7C45;*/
    }
    .line_box .line2{
      margin-top: 10px;
      width: 3px;
      height: 50px;
      /*background: #FFF;*/
    }
    .line_in{
      background #FB7C45;
    }
    .line_out{
      background #FFF;
    }
    .line_box .line:hover{
      background: #FB7C45;
    }
    /*线段*/
    /*主题背景*/
    #wrapper .title{
      width: 41.4%;
      height: 405px;
      position: absolute;
      top:-2px;
      left: 231px;
      overflow hidden;
    }
    #wrapper .title img{
      width: 100%;
      height: 405px;
    }
    /*主题背景*/
    /*线图*/
    .line_charts{
      width: 30%;
      height: 765px;
      position: absolute;
      z-index: 1;
      top:0;
      right: 0;
    }
  @media screen and (min-width: 1365px){
    .line_charts{
      width: 524px;
      height: 765px;
      position: absolute;
      z-index: 1;
      top:0;
      right: 0;
    }
  }
    /*线图*/
    /*特征描述*/
    /*.content_box{*/
      /*position: absolute;*/
      /*top:495px;*/
      /*left: 57px;*/
      /*height: 70px;*/
    /*}*/
    /*.content_box ul li{*/
      /*float: left;*/
      /*width: 302px;*/
      /*height: 70px;*/
      /*border-left: 2px solid #fff;*/
    /*}*/
    /*.content_box ul li:first-of-type{*/
      /*border-left: 0;*/
    /*}*/
    /*.content_box ul li div{*/
      /*width: 302px;*/
    /*}*/
    /*.content_box ul li div{*/
      /*text-align: center;*/
      /*line-height: 70px;*/
      /*color:#FFFFFF;*/
      /*font-size: 14px;*/

    /*}*/
    .content_box{
      /*position: absolute;*/
      /*top:495px;*/
      /*left: 57px;*/
      padding-top: 495px;
      padding-left: 57px;
      width: 60%;
      height: 70px;
    }
    .content_box ul li{
      float: left;
      width: 33%;
      height: 70px;
      border-left: 2px solid #fff;
    }
    .content_box ul li:first-of-type{
      border-left: 0;
    }
    .content_box ul li div{
      width: 100%;
    }
    .content_box ul li div{
      text-align: center;
      line-height: 70px;
      color:#FFFFFF;
      font-size: 14px;
    }
    /*特征描述*/
    /*免费入口*/
    .go_entry{
      width: 167px;
      height: 58px;
      margin: 45px auto;
      border: 1px solid #676972;
      border-radius: 5px;
      cursor: pointer;
    }
    .go_entry div{
      font-size: 14px;
      text-align: center;
      line-height: 58px;
    }
    .go_entry:hover{
      border: 1px solid #FB7C45;
      color:#FB7C45 ;
    }
    /*免费入口*/
    /*主体部分*/


</style>
