<template>
    <div class="search">
      <div id="wrapper">
        <div class="related_colleges">
          <div class="title_box">
            <span>相关高校</span>
          </div>
          <ul class="school_box">
            <a v-for="item in school" :href="'#/school?sid='+item.schoolId">
              <li>
                <div class="img_box">
                  <img class="school_icon" :src="item.schoolIcon">
                </div>
                <div class="school_message">
                  <h1>{{item.school_name}}</h1>
                  <p>{{item.english_name}}</p>
                </div>
                <img class="right_arrow" src="./right_Shape.png">
              </li>
            </a>
            <!--<li><a>-->
            <!--<div class="img_box">-->
            <!--<img class="school_icon" src="../img/school2.png">-->
            <!--</div>-->
            <!--<div class="school_message">-->
            <!--<h1>广东外语外贸大学南国商学院</h1>-->
            <!--<p>Guangdong University of Foreign Studies South China Business College</p>-->
            <!--</div>-->
            <!--<img class="right_arrow" src="../img/right%20Shape.png">-->
            <!--</a></li>-->
          </ul>
        </div>
        <div class="related_events">
          <div class="rank_title">
            <div class="title_name">
              <img src="./list.png">
              <span>近期事件列表</span>
            </div>
          </div>
          <ul class="event_info">
            <a v-for="(item,index) in event" :href="'#/event/news?eid='+item.event_id+'&pid=1'">
              <li>
                <span class="order_num">{{index+1}}</span>
                <span class="event">{{item.event_title}}</span>
                <img  class="right_arrow" src="./right_Shape.png">
              </li>
            </a>
            <!--<li>-->
            <!--<span class="order_num">2</span>-->
            <!--<span class="event">背着背包、拄着拐杖，手里拿着小包装着零钱，是地铁乞讨者常见的形象。 </span>-->
            <!--<img  class="r2" src="../img/right%20Shape.png">-->
            <!--</li>-->
            <!--<li>-->
            <!--<span class="order_num">3</span>-->
            <!--<span class="event">潜逃三年的贪官自首：没钱就捡垃圾，病了不敢上医院。</span>-->
            <!--<img  class="r2" src="../img/right%20Shape.png">-->
            <!--</li>-->
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  var projectUrl = "http://120.79.211.191:8080";
  export default {
     data(){
       return {
          input:{},
          school:{},
          event:{}
       }
     },
     created(){
         this.input =this.$route.query.key
     },
     mounted(){
       this.$nextTick(()=>{
         this.$http.get(projectUrl+'/University/school/search?key='+this.input).then((response) => {
           response = response.data;
           console.log(response);
           this.school = response;
         });
         this.$http.get(projectUrl+'/University/event/search?key='+this.input).then((response) => {
           response = response.data;
           console.log(response);
           this.event = response;
         })
       })
     },
     methods:{

     },
     watch:{
       '$route' (to, from) {
         this.input =this.$route.query.key
         this.$nextTick(()=>{
           this.$http.get(projectUrl+'/University/school/search?key='+this.input).then((response) => {
             response = response.data;
             console.log(response);
             this.school = response;
           });
           this.$http.get(projectUrl+'/University/event/search?key='+this.input).then((response) => {
             response = response.data;
             console.log(response);
             this.event = response;
           })
         })
       }
     }
  }
</script>

<style scoped>
  /*主体部分*/
  #wrapper{
    width: 1024px;
    margin: 20px auto;
  }
  /*相关高校*/
  .title_box{
    position: relative;
    width: 100%;
    height: 40px;
    background: #676972;
  }
  .title_box span{
    position: absolute;
    left: 48%;
    line-height: 40px;
    color: #FFFFFF;
    font-size: 16px;
  }
  .school_box{
    width: 100%;
  }
  .school_box li{
    width: 1022px;
    height: 100px;
    background: #FFFFFF;
    border: 1px solid #E6E6E6;
  }
  .school_box li:hover{
    border: 1px solid #676972;
  }
  .img_box{
    width: 140px;
    height: 100px;
    float: left;
    text-align: center;
  }
  .school_icon{
    width:70px;
    height: 60px;
    padding-top: 20px;
  }
  .school_message{
    margin-top: 25px;
    float: left;
    padding-left: 40px;
    border-left: 1px solid #979797;
  }
  .school_message h1{
    font-style: normal;
    font-size: 20px;
    color: #585858;
  }
  .school_message p{
    font-size: 14px;
    font-style: normal;
    color:#585858;
  }
  .right_arrow{
    float: right;
    width: 14px;
    height: 14px;
    padding-right: 60px;
    padding-top: 43px;
  }
  /*相关高校*/


  /*相关事件*/
  .event_info .right_arrow{
    float: right;
    width: 14px;
    height: 14px;
    padding-right: 60px;
    padding-top: 20px;
  }
  #wrapper .related_events{
    width: 1024px;
    margin: 20px auto;
  }
  .rank_title{
    width: 100%;
    height: 40px;
    background: #676972;
    position: relative;
  }
  .rank_title .title_name{
    line-height: 40px;
    position: absolute;
    left: 45%;
  }
  .title_name img{
    position: relative;
    top:2px;
  }
  .title_name span{
    padding-left: 3px;
    font-size: 16px;
    color: #fff;
  }
  .related_events ul li{
    width: 1022px;
    height: 50px;
    border: 1px solid #E6E6E6;
    clear: both;
    cursor: pointer;
  }
  .related_events ul li:hover{
    border: 1px solid #676972;
  }
  .related_events ul a:nth-child(even) li{
    background: #F5F5F5;
  }
  .related_events ul a:nth-child(odd) li{
    background: #ffffff;
  }
  .related_events ul li span{
    display: inline-block;
    line-height: 50px;
    overflow: hidden;
    font-size: 14px;
    color: #858585;
  }
  .r2{
    display: inline-block;
    overflow: hidden;
    padding-top: 18px;
    padding-right: 60px;
    float: right;
    width: 14px;
    height: 14px;
  }
  .order_num{
    width: 115px;
    height: 50px;
    text-align: center;
  }
  /*相关事件*/
  /*主体部分*/
</style>
