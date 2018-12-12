<template>
    <div class="entry">
      <div id="wrapper">
        <div class="school_rank">
          <div class="rank_title">
            <div class="title_name">
              <img src="./list.png">
              <span>学校排行榜</span>
            </div>
          </div>
          <div class="rank_info">
            <span>名称</span>
            <span>热度指数</span>
            <span>指数变化</span>
          </div>
          <ul>
          <a v-for="(item,index) in schoolOrder" :href="'#/school?sid='+item.school_id">
            <li>
              <span class="order_num">{{index+1}}</span>
              <img  class="school_icon" :src="item.school_icon"></img>
              <span class="school_name">{{item.school_name}}</span>
              <div class="num_box">
                <span class="heat_index">{{item.heat_index}}</span>
                <div class="index_box">
                  <span class="index_movement">{{index_symbol(item.index_movement)}}{{item.index_movement}}</span>
                  <img  class="trend_icon" :src="trendicon(item.trend)">
                </div>
              </div>
            </li>
          </a>
        </ul>
        </div>
        <div class="hot_events">
          <div class="rank_title">
            <div class="title_name">
              <img src="./list.png">
              <span>事件专题</span>
            </div>
          </div>
          <div class="event_type">
            <div>
              <div class="obj_show">
                <span @click="list_show">专题选择</span>
                <img src="./blackTriangle.png" @click="list_show">
              </div>
              <div class="event_list" id="list" v-show="listshow" @click="list_show">
                <ul>
                  <li @click="change_event('全部',-1)"><div><span>全部</span></div></li>
                  <li v-for="(item,index) in event" @click="change_event(item,index)"><div><span>{{item.obj}}</span></div></li>
                  <!--<li><div><span>学生类事件</span></div></li>-->
                  <!--<li><div><span>教师类</span></div></li>-->
                  <!--<li><div><span>教育主管类部门</span></div></li>-->
                  <!--<li><div><span>学校类</span></div></li>-->
                </ul>
              </div>
            </div>
          </div>
          <div class="ul_box">
            <ul class="event_info_all">
              <a v-for="(event_info,index) in allEvents" :href="'#/event?eid='+event_info.id+'&pid=1'">
                <li>
                  <span class="order_num" >{{index+1}}</span>
                  <span class="event">{{event_info.event}}</span>
                  <img  class="right_arrow" src="./right_Shape.png">
                </li>
              </a>
            </ul>
            <ul class="event_info" v-for="info in event"  v-show="false">
              <a v-for="event_info in info.event_info" :href="'#/event?eid='+event_info.id+'&pid=1'">
                <li>
                  <span class="order_num" >{{getindex()}}</span>
                  <span class="event">{{event_info.event}}</span>
                  <img  class="right_arrow" src="./right_Shape.png">
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  var myindex = 0;
    export default {
      data () {
        return {
          schoolOrder: [],
          event:[],
          listshow:false,
          currentindex:0,
          upTriangle: "static/upTriangle.png",
          downTriangle:"static/downTriangle.png",
          allEvents:[]
        }
      },
      created () {
        myindex=0;
      },
      methods:{
        change_event(item,index){
          if(index==-1){
            $(".event_info_all").show();
            $(".event_info").hide();
            $("#list").hide();
            $(".obj_show span").text(item);
          }else {
            myindex = 0;
            this.currentindex = index;
            for(var i=0;i<$(".event_info").length;i++){
              if(i==this.currentindex){
                for(var j=0;j<$(".event_info").eq(i).find("li").length;j++){
                  $(".event_info").eq(i).find("li").eq(j).find(".order_num").text(j+1);
                }
                $(".event_info").eq(i).show();
              }else{
                $(".event_info").eq(i).hide();
              }
            }
            $(".event_info_all").hide();
            $("#list").hide();
            $(".obj_show span").text(item.obj);
          }
        },
        trendicon(trend) {
          var icon=null;
          if(trend==0){
            icon =this.upTriangle;
          }else if(trend==1){
            icon =this.upTriangle;
          }else{
            icon =this.downTriangle;
          }
          return icon;
        },
        index_symbol(index) {
          var symbol=null;
          if(index>=0){
            symbol ="+";
          }else{
            symbol ="";
          }
          return symbol;
        },
        list_show(){
          this.listshow = !this.listshow;
          myindex=0;
        },
        getindex(){
          myindex++;
          return myindex;
        }
      },
      mounted(){
        this.$http.get('http://120.79.211.191:8080/University/school/schoolOrder').then((response) => {
          response = response.data;
          this.schoolOrder = response;
        });
        this.$http.get('http://120.79.211.191:8080/University/event/index').then((response) => {
          response = response.data;
          this.event = response;
        })
      },
      watch:{
        'event'(){
          this.$nextTick(()=>{
            $(".event_info a:even").find("li").css("background","#F5F5F5");
            $(".event_info a:odd").find("li").css("background","#fff");
            this.event.map((item)=>{
              item.event_info.map((item)=>{
                var temp = {id:item.id,event:item.event}
                this.allEvents.push(temp);
              })
            })
            console.log(this.allEvents);
          })
        },
        'allEvents'(){
          this.$nextTick(()=>{
            $(".event_info_all a:even").find("li").css("background","#F5F5F5");
            $(".event_info_all a:odd").find("li").css("background","#fff");
          })
        }
      },
      computed:{

      }
    }
</script>

<style scoped>
  /*主体部分*/
  /*学校排行榜*/
  #wrapper .school_rank{
    width: 1024px;
    margin: 20px auto;
  }
  .school_rank ul{
    height: 430px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  /*滚轮条样式*/
  .school_rank ul::-webkit-scrollbar-track-piece{
    background-color:transparent;/*滚动条的背景颜色*/
    -webkit-border-radius:6px;/*滚动条的圆角宽度*/
  }
  .school_rank ul::-webkit-scrollbar{
    width:12px;/*滚动条的宽度*/
    height:80px;/*滚动条的高度*/
  }
  .school_rank ul::-webkit-scrollbar-thumb:vertical{/*垂直滚动条的样式*/

    background-color:#999;
    -webkit-border-radius:4px;
    outline:2px solid #fff;
    outline-offset:-2px;
  }
  /*滚轮条样式*/
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
  .rank_info{
    width: 1022px;
    height: 40px;
    background: #fff;
    border: 1px solid #E6E6E6;
  }
  .rank_info span{
    font-size: 14px;
    color: #585858;
    line-height:40px;
  }
  .rank_info span:first-child{
    padding-left: 124px;
  }
  .rank_info span:nth-child(2){
    padding-left: 594px;
  }
  .rank_info span:nth-child(3){
    padding-left: 71px;
  }
  .school_rank ul li{
    width: 1022px;
    height: 40px;
    border: 1px solid #E6E6E6;
    clear: both;
  }
  .school_rank ul li:hover{
    border: 1px solid #676972;
  }
  .school_rank ul a:nth-child(odd) li{
    background: #F5F5F5;
  }
  .school_rank ul a:nth-child(even) li{
    background: #ffffff;
  }
  .school_rank ul a li span{
    display: inline-block;
    line-height: 40px;
    overflow: hidden;
    font-size: 14px;
    color: #585858;
  }
  .ul_box{
    height: 420px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  /*滚轮条样式*/
  .ul_box::-webkit-scrollbar-track-piece{
    background-color:transparent;/*滚动条的背景颜色*/
    -webkit-border-radius:6px;/*滚动条的圆角宽度*/
  }
  .ul_box::-webkit-scrollbar{
    width:12px;/*滚动条的宽度*/
    height:80px;/*滚动条的高度*/
  }
  .ul_box::-webkit-scrollbar-thumb:vertical{/*垂直滚动条的样式*/
    background-color:#999;
    -webkit-border-radius:4px;
    outline:2px solid #fff;
    outline-offset:-2px;
  }
  /*滚轮条样式*/

  .num_box{
    float: right;
    width: 271px;
    height: 40px;
  }
  .school_icon{
    display: inline-block;
    overflow: hidden;
    width: 36px;
    height: 36px;
    padding-bottom: 2px;
    padding-left: 0;
  }
  .order_num{
    width: 115px;
    height: 40px;
    text-align: center;
  }
  .school_name{
    padding-left: 20px;
  }
  .heat_index{
    padding-left: 10px;
  }
  .index_box{
    float: right;
    width: 160px;
    height: 40px;
  }
  .index_movement{
    padding-left: 25px;
  }
  .trend_icon{
    display: inline-block;
    overflow: hidden;
    padding-bottom: 14px;
    padding-left: 6px;
    width: 11px;
    height: 11px;
  }
  /*学校排行榜*/

  /*热门事件列表*/
  #wrapper .hot_events{
    width: 1024px;
    margin: 20px auto;
  }
  /*.rank_title{*/
    /*width: 100%;*/
    /*height: 40px;*/
    /*background: #FB7C45;*/
  /*}*/
  /*.rank_title .title_name{*/
    /*line-height: 40px;*/
    /*text-align: center;*/
  /*}*/
  /*.title_name img{*/
    /*position: relative;*/
    /*top:2px;*/
  /*}*/
  /*.title_name span{*/
    /*padding-left: 3px;*/
    /*font-size: 16px;*/
    /*color: #fff;*/
  /*}*/
  .event_list{
    width: 1022px;
    position: absolute;
  }
  .event_list ul li{
    width: 100%;
    height: 40px;
    border: 1px solid #E6E6E6;
    clear: both;
    cursor: pointer;
    background: #fff;
  }
  .event_list ul div{
    text-align: center;
  }
  .event_type{
    width: 1022px;
    height: 40px;
    background: #fff;
    border: 1px solid #E6E6E6;
  }
  .event_type div{
    text-align: center;
  }
  .event_type div .obj_show{
    text-align: center;
  }
  .event_type span{
    padding-left: 35px;
    font-size: 14px;
    color:#585858;
    line-height: 40px;
    cursor: pointer;
  }
  .event_type img{
    padding-left: 12px;
    cursor: pointer;
  }
  .hot_events ul li{
    width: 1022px;
    height: 40px;
    border: 1px solid #E6E6E6;
    clear: both;
    cursor: pointer;
  }
  .hot_events ul li:hover{
    border: 1px solid #676972;
  }
  /*.hot_events ul a:nth-child(odd) li{*/
  /*background: #F5F5F5;*/
  /*}*/
  /*.hot_events ul a:nth-child(even) li{*/
  /*background: #ffffff;*/
  /*}*/
  .hot_events ul li span{
    display: inline-block;
    line-height: 40px;
    overflow: hidden;
    font-size: 14px;
    color: #858585;
  }
  #list ul li{
    background: #fff;
  }
  .right_arrow{
    display: inline-block;
    overflow: hidden;
    line-height: 40px;
    padding-top: 14px;
    padding-right: 60px;
    float: right;
    width: 14px;
    height: 14px;
  }
  /*热门事件列表*/
  /*主体部分*/
</style>
