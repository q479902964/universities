<template>
  <div id="app">
    <div id="header-box">
      <div class="tab">
        <div class="h_box"><router-link to="/">高校舆情</router-link></div>
        <ul>
          <li><router-link to="/Homepage">首页</router-link></li>
          <li><router-link to="/product">舆情产品</router-link></li>
          <li><router-link to="/cases">舆情案例</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
          <li>

            <div class="search-form" >
              <button @click="show_search" v-show="!flag"></button>
                <form class="form" @submit.prevent="submit()" >
                  <transition name="fade">
                  <input type="text" placeholder="输入你要查找的事件和学校" id="search-text" name="key" v-model="vkey" v-show="flag">
                  </transition>
                  <input type="submit" id="search-btn" value="" v-show="flag">
                </form>
            </div>

          </li>
        </ul>
      </div>
      <!--<div class="search-form" >-->
        <!--<button @click="show_search"></button>-->
        <!--<form class="form" @submit.prevent="submit()" >-->
          <!--<input type="text" placeholder="输入你要查找的事件和学校" id="search-text" name="key" v-model="vkey">-->
          <!--<input type="submit" id="search-btn" value="">-->
        <!--</form>-->
      <!--</div>-->
    </div>
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    <div style="clear: both"></div>
    <div class="footer">
      <p>中国广州市番禺区小谷围广州大学城510006（南校区）</p>
      <p>Copyright©2017 数据挖掘</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      vkey:"",
      transitionName: 'slide-right',
      flag:false
    }
  },
  methods: {
    show_search() {
      // $('.search-form button').hide();
      this.flag = true;
    },
    submit(){
      // console.log(this.$router);
      this.$router.replace({ path: '/search?key='+this.vkey ,query:{}})
      // this.$router.push( { path: '/search' })
      // this.$router.replace({ path: '/search', query: { key: this.vkey }})
      // this.$router.redirect({ path: '/search?key='+this.vkey })
    }
  },
  mounted(){
  }
}
</script>

<style scoped lang="stylus">
  .fade-enter-active,.fade-leave-active{
    transition: all 1s;
  }
  .fade-enter{
    opacity 0;
    transform: translateX(100%);
  }
  /*头部导航栏*/
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
    font-style: normal;
  }
  @media screen and (max-width: 1440px){
    #header-box{
      width: 100%;
      height: 100px;
      background: #fff;
    }
    #header-box .tab{
      float: left;
      line-height: 100px;
    }
    #header-box .tab .h_box{
      float: left;
      margin-left: 103px;
    }
    #header-box .tab ul{
      display: inline-block;
    }
    #header-box .tab ul li{
      float: left;
      margin-left:78px ;
      font-size: 16px;
    }
    #header-box .tab ul li a:hover{
      color:#FB7C45
    }
    #header-box .tab ul li:first-of-type{
      margin-left:100px ;
    }
    #header-box .tab ul li a{
      color:#676972;
    }
    #header-box .tab ul li a.active{
      color:#FB7C45
    }
    .h_box a{
      color:#676972;
    }
    /*头部导航栏*/
    /*搜索栏部分*/
    #header-box .search-form{
      position: relative;
      z-index: 2;
      float: left;
      line-height: 100px;
      /*margin-left: 92px;*/
    }
    .search-form #search-text{
      /*display: none;*/
      background: transparent;
      color: #585858;
      font-size: 14px;
      text-align:justify;
      padding-right: 80px;
      padding-left: 20px;
      outline:none;
      border: 0;
      border-left: 1px solid #979797;
      border-right: 1px solid #979797;
    }
    .search-form button{
      width: 13px;
      height: 13px;
      background: url(./Search.png) no-repeat;
      vertical-align: middle;
      border: 0;
      margin-left: 10px;
      padding-right: 30px;
      outline:none;
      cursor: pointer;
    }
    .search-form #search-btn{
      /*display: none;*/
      background: url(./Search.png) no-repeat;
      vertical-align: middle;
      border: 0;
      margin-left: 10px;
      padding-right: 30px;
      outline:none;
      cursor: pointer;
    }
    /*搜索栏部分*/
    /*底部*/
    .footer{
      margin-top: 60px;
      margin-bottom: 40px;
    }
    .footer p{
      text-align: center;
      font-size: 10px;
      color:#858585;
    }
    /*底部*/
  }
  @media screen and (min-width: 1440px){
    #header-box{
      width: 100%;
      height: 100px;
      background: #fff;
    }
    #header-box .tab{
      float: left;
      line-height: 100px;
    }
    #header-box .tab .h_box{
      float: left;
      margin-left: 103px;
    }
    #header-box .tab ul{
      display: inline-block;
    }
    #header-box .tab ul li{
      float: left;
      margin-left:78px ;
      font-size: 16px;
    }
    #header-box .tab ul li a:hover{
      color:#FB7C45
    }
    #header-box .tab ul li:first-of-type{
      margin-left:132px ;
    }
    #header-box .tab ul li a{
      color:#676972;
    }
    #header-box .tab ul li a.active{
      color:#FB7C45
    }
    .h_box a{
      color:#676972;
    }
    /*头部导航栏*/
    /*搜索栏部分*/
    #header-box .search-form{
      position: relative;
      z-index: 2;
      float: left;
      line-height: 100px;
      margin-left: 92px;
    }
    .search-form #search-text{
      /*display: none;*/
      background: transparent;
      color: #585858;
      font-size: 14px;
      text-align:justify;
      padding-right: 80px;
      padding-left: 20px;
      outline:none;
      border: 0;
      border-left: 1px solid #979797;
      border-right: 1px solid #979797;
    }
    .search-form button{
      width: 13px;
      height: 13px;
      background: url(./Search.png) no-repeat;
      vertical-align: middle;
      border: 0;
      margin-left: 10px;
      padding-right: 30px;
      outline:none;
      cursor: pointer;
    }
    .search-form #search-btn{
      /*display: none;*/
      background: url(./Search.png) no-repeat;
      vertical-align: middle;
      border: 0;
      margin-left: 10px;
      padding-right: 30px;
      outline:none;
      cursor: pointer;
    }
    /*搜索栏部分*/
    /*底部*/
    .footer{
      margin-top: 60px;
      margin-bottom: 40px;
    }
    .footer p{
      text-align: center;
      font-size: 10px;
      color:#858585;
    }
    /*底部*/
  }

</style>
