<template>
  <div id="app">
    <div class="login_box" v-show="login_show">
      <h1>管理员登录</h1>
      <span class="close" @click="login_show=false">×</span>
      <div class="login_input">
        <span>用户名</span><input type="text" placeholder="请输入用户名" v-model="username" @keyup.enter="admin_login" autofocus="autofocus" spellcheck="false"/>
        <span>密码</span><input type="password" placeholder="请输入密码" v-model="password" @keyup.enter="admin_login"/>
      </div>
      <div class="login" @click="admin_login">登录</div>
    </div>
    <div id="header-box">
      <div class="tab">
        <div class="h_box">
          <router-link to="/" class="main_title">高校舆情</router-link>
          <div class="login_btn" @click="login_show=true" v-show="!islogin">登录</div>
          <div class="login_btn" @click="admin_register" v-show="islogin">注销</div>
        </div>
        <ul>
          <li><router-link to="/Homepage">首页</router-link></li>
          <li><router-link to="/product">舆情产品</router-link></li>
          <li><router-link to="/cases">舆情案例</router-link></li>
          <li><router-link to="/about">关于我们</router-link></li>
        </ul>
        <div class="search-form" >
          <button @click="show_search" v-show="!flag"></button>
          <form class="form" @submit.prevent="submit()" >
            <transition name="fade">
              <input type="text" placeholder="输入你要查找的事件和学校" id="search-text" name="key" v-model="vkey" v-show="flag">
            </transition>
            <input type="submit" id="search-btn" value="" v-show="flag">
          </form>
        </div>
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
      flag:false,
      login_show:false,
      username:"",
      password:"",
      islogin:false
    }
  },
  created(){
    if(sessionStorage.getItem("username")){
      this.islogin = true;
    }else {
      this.islogin = false;
    }
  },
  mounted(){
  },
  methods: {
    admin_register(){
      sessionStorage.clear();
      console.log(sessionStorage.getItem("username")+"123")
      alert("注销成功!")
      this.$router.go(0);
    },
    admin_login(){
      var data = {username:this.username,password:this.password};
      this.$http.post('',data).then((res)=>{
        res = res.body;
        console.log(res);
        if(res.code == 1){
          alert("登陆成功!")
          sessionStorage.setItem("username",this.username);
          console.log(sessionStorage.getItem("username")+"123");
          // var obj = { username:this.username };
          // var str = JSON.stringify(obj);
          // sessionStorage.username = str;
          // setCookie('username',this.username,1000*60);
          this.login_show = false;
          this.$router.go(0);
        }else{
          alert("用户不存在或密码错误!")
        }
      }).catch(error => {
        alert("登录失败")
      });
      // if(this.username=="123"&&this.password=="123"){
      //   alert("登陆成功!")
      //   sessionStorage.setItem("username",this.username);
      //   console.log(sessionStorage.getItem("username")+"123");
      //   this.login_show = false;
      //   this.$router.go(0);
      // }else{
      //   alert("登录失败!")
      // }
    },
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
  .login_btn{
    display none;
    border:1px solid #dcdcdc;
    width 50px;
    height 30px;
    position absolute;
    text-align center;
    line-height 30px;
    left 30px;
    top:60px;
    cursor pointer;
    border-radius 3px;
  }
  .login_btn:hover{
    background #FB7C45;
    color:#fff;
  }
    .login_box{
      border-radius 3px;
      width 300px;
      height 220px;
      position absolute;
      top:50%;
      left:50%;
      margin-top -100px;
      margin-left -150px;
      background #fff;
      z-index 1000;
    }
   .login_box h1{
     height 40px;
     border-radius 3px 3px 0 0;
     background #FB7C45
     font-style normal;
     font-size 20px
     text-align center;
     color #fff;
     line-height 40px;
   }
  .login_box .close{
    font-size 30px;
    display inline-block;
    position absolute;
    top:-3px;
    left 90%;
    cursor pointer;
    color:#fff
  }
  .login_box .login_input span{
    display block;
    padding-left 10px;
    margin-top 10px
  }
  .login_box .login_input input{
    display inline-block;
    margin-left 10px;
  }
  .login{
    width:100px;
    height 30px;
    line-height 30px;
    border-radius 3px;
    background #FB7C45;
    font-size 18px;
    color:#fff;
    text-align center
    margin 20px auto;
    cursor pointer;
  }
  .login:hover{
    background #ff0000;
  }




  #header-box{
    width: 100%;
    height: 100px;
    background: #fff;
  }
  #header-box .tab{
    float: left;
    /*line-height: 100px;*/
    height 100px;
    padding-top 40px;
    overflow hidden
  }
  #header-box .tab .h_box{
    float: left;
    margin-left: 103px;
    position relative;
  }
  #header-box .tab .h_box:hover>.login_btn{
    display block;
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
    /*float: left;*/
    /*line-height: 100px;*/
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
  @media screen and (min-width: 1180px){
    #header-box .search-form{
      position: relative;
      z-index: 2;
      float right;
      /*line-height: 100px;*/
      margin-left: 62px;
    }
    .search-form #search-text{
      /*display: none;*/
      padding-right: 20px;
    }
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
</style>
