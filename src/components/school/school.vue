<template>
    <div class="school">
      <div id="wrapper">
        <div class="school_message">
          <div class="l-box">
            <div class="school_name">
              <h1 class="chinese_name">{{this.schoolDetail.school_name}}</h1>
              <p class="english_name">{{this.schoolDetail.english_name}}</p>
            </div>
            <p class="introduce">{{this.schoolDetail.introduce}}</p>
          </div>
          <div class="r-box">
            <img class="school_icon" :src="this.schoolDetail.schoolIcon">
          </div>
        </div>
        <div class="heat_condition">
          <div class="heat_title">
            <h1>高校热度概况</h1>
          </div>
          <div id="heat_chart"></div>
        </div>
        <div class="keyword">
          <div class="key_title">
            <h1>关键词云</h1>
          </div>
          <div id="key_chart"></div>
        </div>
        <div style="clear: both"></div>
        <div class="active_users">
          <div class="active_title">
            <h1>活跃用户</h1>
          </div>
          <div class="tab_li">
            <a @click="change(0)">微&nbsp;&nbsp;&nbsp;博</a>
            <a @click="change(1)">知&nbsp;&nbsp;&nbsp;乎</a>
            <a @click="change(2)">公众号</a>
          </div>
          <ul class="user_ul" v-for="(item,index) in activeUser" v-show="first_show(index)">
            <li v-for="(info,index) in item.user_name">
              <span class="order_num">{{index+1}}</span>
              <span class="event">{{info}}</span>
            </li>
            <div class="click_more" v-show="more_show" @click="more_click(currentIndex)">
                <h1>更&nbsp;&nbsp;&nbsp;多</h1>
            </div>
          </ul>
        </div>
        <div class="hot_events">
          <div class="rank_title">
            <div class="title_name">
              <img src="./list.png">
              <span>学校事件列表</span>
            </div>
          </div>
          <ul class="event_info">
            <a v-for="(item,index) in EventList" :href="'#/event/news?eid='+item.event_id+'&pid=1'">
              <li>
                <span class="order_num">{{index+1}}</span>
                <span class="event">{{item.event_title}}</span>
                <img  class="right_arrow" src="./right_Shape.png">
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  var echarts = require('echarts');
  require('echarts-wordcloud');

  const dataStyle = {
    normal: {
      label: {show:false},
      labelLine: {show:false},
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        // 0% 处的颜色
        offset: 0, color: '#FB7C45'  },
        {
          offset: 1, color: '#FB7C45'
        }], false)
    }
  };
  const placeHolderStyle = {
    normal : {
      color: 'rgba(0,0,0,0)',
      label: {show:false},
      labelLine: {show:false}
    },
    emphasis : {
      color: 'rgba(0,0,0,0)'
    }
  };
  var input = "";
  export default {
    data(){
      return{
        schoolDetail:[],
        activeUser:{},
        Keyword:[],
        EventList:[],
        schoolEffect:[],
        currentIndex:0,
        more_show:false
      }
    },
    methods:{
      more_click(more_index){
        this.more_show = false;
        for(var j=1;j<$('.user_ul').eq(more_index).find('li').length;j++){
          $('.user_ul').eq(more_index).find('li').eq(j).show()
        }
      },
      first_show(index){
        if(index==0){
          return true;
        }else{
          return false
        }
      },
      _inittab(){
        $(".tab_li a:first").css({"border-bottom":"2px solid #FB7C45"});
      },
      change(index){
        this.currentIndex = index;
        for(var j=0;j<$(".tab_li a").length;j++){
          $(".tab_li a").eq(j).css({"border-bottom":"0"});
        }
        for(var i=0;i<$('.user_ul').length;i++){
          if(i==this.currentIndex){
            $('.user_ul').eq(i).show()
            $(".tab_li a").eq(i).css({"border-bottom":"2px solid #FB7C45"});
            if($('.user_ul').eq(i).find('li').length>3){
              for(var j=1;j<$('.user_ul').eq(i).find('li').length;j++){
                $('.user_ul').eq(i).find('li').eq(j).hide()
              }
              this.more_show = true;
            }
          }else{
            $('.user_ul').eq(i).hide()
          }
        }
      },
      heat_charts(){
        //高校热度概况图表
        var mychart = echarts.init(document.getElementById("heat_chart"));
        var option = {
          backgroundColor:"#fff",
          title: {
            text: '87.00',
            x: 'center',
            y: 'center',
            itemGap: 20,
            textStyle : {
              color : '#585858',
              fontFamily : 'SourceHanSansCN-Heavy',
              fontSize : 48
            }
          },
          tooltip : {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient : 'vertical',
            x : document.getElementById('heat_chart').offsetWidth / 2,
            y : 45,
            itemGap:12,
            data:[]
          },
          toolbox: {
            show : false,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          series : [
            {
              name:'访问来源',
              type:'pie',
              hoverAnimation:false,
              clockWise:false,
              radius : [80,95],
              itemStyle : dataStyle,
              data:[
                {
                  value:80.00,
                  name:'影响力'
                },
                {
                  value:20.00,
                  name:'invisible',
                  itemStyle : placeHolderStyle
                }
              ]
            }
          ]
        };
        mychart.setOption(option);
        var effect_value = null;
        effect_value = this.schoolEffect.effect_value;
        mychart.setOption({
          title:{
            text:this.schoolEffect.effect_value
          },
          series: [{
            data: [
              {
                value:effect_value,
                name:'高校热度'
              },
              {
                value:100-effect_value,
                name:'invisible',
                itemStyle : placeHolderStyle
              }
            ]
          }]
        });
        mychart.hideLoading();    //隐藏加载动画
      },
      createRandomItemStyle() {
        return {
          normal: {
            color: 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')'
          }
        };
      },
      key_charts(){
        var key_word = echarts.init(document.getElementById("key_chart"));
        var key_option = {
          backgroundColor:"#fff",
          tooltip: {
            show: true
          },
          series: [{
            name: 'Google Trends',
            type: 'wordCloud',
            size: ['80%', '80%'],
            textRotation : [0, 45, 90, -45],
            textPadding: 0,
            rotationRange: [0, 0],
            autoSize: {
              enable: true,
              minSize: 14
            },
            data: [
              {
                name: "Sam S Club",
                value: 10000,
                textStyle: this.createRandomItemStyle()
              },
              {
                name: "Macys",
                value: 10000,
                textStyle: this.createRandomItemStyle()
              },
              {
                name: "Amy Schumer",
                value: 4386,
                textStyle: this.createRandomItemStyle()
              },
              {
                name: "Jurassic World",
                value: 4055,
                textStyle: this.createRandomItemStyle()
              },
              {
                name: "Charter Communications",
                value: 2467,
                textStyle: this.createRandomItemStyle()
              },
              {
                name: "胡伟",
                value: 10,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Planet Fitness",
                value: 1898,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Pitch Perfect",
                value: 1484,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Express",
                value: 1112,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Home",
                value: 965,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Johnny Depp",
                value: 847,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Lena Dunham",
                value: 582,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Lewis Hamilton",
                value: 555,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "KXAN",
                value: 550,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Mary Ellen Mark",
                value: 462,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Farrah Abraham",
                value: 366,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Rita Ora",
                value: 360,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Serena Williams",
                value: 282,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "NCAA baseball tournament",
                value: 273,
                itemStyle: this.createRandomItemStyle()
              },
              {
                name: "Point Break",
                value: 265,
                itemStyle: this.createRandomItemStyle()
              }
            ]
          }]
        };
        key_word.setOption(key_option);
        var key_temp = {};
        var key_data = [];
        for(var i=0;i<this.Keyword.length;i++){
          key_temp = {name:this.Keyword[i].keywordName,value:this.Keyword[i].keywordValue,textStyle:this.createRandomItemStyle()};
          key_data.push(key_temp);
        }
        console.log(this.Keyword)
        key_word.setOption({
          series:[
            {
              data:key_data
            }
          ]
        });
        key_word.hideLoading();    //隐藏加载动画
      }
    },
    created(){
      input =this.$route.query.sid;
    },
    mounted(){
      this.$http.get(projectUrl+'/schoolDetail?sid='+input).then((response) => {
        response = response.data;
        this.schoolDetail = response;
      });
      this.$http.get(projectUrl+'/activeUser?sid='+input).then((response) => {
        response = response.data;
        this.activeUser = response;
      });
      this.$http.get(projectUrl+'/schoolEffect?sid='+input).then((response) => {
        response = response.data;
        this.schoolEffect = response;
        this.heat_charts();
      });
      this.$http.get(projectUrl+'/getKeyword?sid='+input).then((response) => {
        response = response.data;
        // console.log(response);
        this.Keyword = response;
        this.key_charts();
      })
      this.$http.get(projectUrl+'/getEventList?sid='+input).then((response) => {
        response = response.data;
        // console.log(response);
        this.EventList = response;
      })
      this._inittab()
    },
    watch:{
      "activeUser"(){
        this.$nextTick(()=>{
          if($('.user_ul').eq(this.currentIndex).find('li').length>3){
            for(var j=1;j<$('.user_ul').eq(this.currentIndex).find('li').length;j++){
              $('.user_ul').eq(this.currentIndex).find('li').eq(j).hide()
            }
            this.more_show = true;
          }
        })
      }
    },
    computed:{
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding:0;
  }
  li{
    list-style: none;
  }
  body{
    font-family:SourceHanSansCN-Medium;
    color: #585858;
    background: #f7f7f7;
  }
  a{
    text-decoration: none;
  }

  /*主体部分*/
  /*高校介绍部分*/
  #wrapper{
    width: 1024px;
    margin: 20px auto;
  }
  #wrapper .school_message{
    position: relative;
    width: 100%;
    min-height: 240px;
    background: #fff;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
    overflow: hidden;
  }
  .school_message .l-box{
    float: left;
    padding-top: 40px;
    padding-left: 20px;
  }
  .l-box .school_name{
    border-left: 4px solid #676972;
  }
  .l-box h1{
    padding-left: 20px;
    font-style: normal;
    font-size: 32px;
    color: #585858;
  }
  .l-box p{
    padding-left: 20px;
    font-size: 14px;
    color: #585858;
  }
  .l-box h1,.l-box p{
    width: 756px;
  }
  .introduce{
    padding-top: 18px;
    text-indent: 1.6em;
    line-height: 22px;
    padding-bottom: 40px;
  }
  .r-box{
    float: right;
    position: absolute;
    right: 0;
    width: 200px;
    height: 200px;
    padding-top: 20px;
    padding-right: 10px;
  }
  .r-box .school_icon{
    width: 100%;
    height: 100%;
  }
  /*高校介绍部分*/

  /*高校热度概况和关键词云部分*/
  .heat_condition{
    margin-top: 20px;
    width: 260px;
    height: 300px;
    float: left;
  }
  .heat_title{
    width: 100%;
    height: 40px;
    text-align: center;
    background: #676972;
  }
  .heat_title h1{
    font-style: normal;
    font-size: 16px;
    color: #fff;
    line-height: 40px;
  }
  #heat_chart{
    width: 100%;
    height: 260px;
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .keyword{
    margin-top: 20px;
    float: right;
    width: 743px;
    height: 300px;
  }
  .key_title{
    width: 100%;
    height: 40px;
    text-align: center;
    background: #676972;
  }
  .key_title h1{
    font-style: normal;
    font-size: 16px;
    color: #fff;
    line-height: 40px;
  }
  #key_chart{
    width: 100%;
    height: 260px;
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  /*高校热度概况和关键词云部分*/

  /*活跃用户部分*/
  .active_users{
    clear: both;
    width: 100%;
    margin-top: 20px;
    background: #676972;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .active_title{
    width: 100%;
    height: 40px;
    text-align: center;
    background: #676972;
  }
  .active_title h1{
    font-style: normal;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 40px;
  }
  .tab_li{
    width:1022px;
    height: 60px;
    background: #FFFFFF;
    border: 1px solid #E6E6E6;
    text-align: center;
  }
  .tab_li a{
    font-size: 16px;
    color: #585858;
    width: 50px;
    height: 45px;
    /*border-bottom:2px solid #5CC6D0;*/
    line-height: 60px;
    padding-bottom: 10px;
    cursor: pointer;
  }
  .tab_li a:first-child{
    margin-right: 80px;
  }
  .tab_li a:nth-child(3){
    margin-left: 80px;
  }
  .order_num{
    width: 115px;
    height: 50px;
    text-align: center;
  }
  .active_users ul li{
    width: 1022px;
    height: 50px;
    border: 1px solid #E6E6E6;
    clear: both;
  }
  .active_users ul li:nth-child(odd){
    background: #F5F5F5;
  }
  .active_users ul li:nth-child(even){
    background: #ffffff;
  }
  .active_users ul li span{
    display: inline-block;
    line-height: 50px;
    overflow: hidden;
    font-size: 14px;
    color: #858585;
  }
  .click_more{
    width:1022px;
    height: 50px;
    text-align: center;
    background: #fff;
    cursor: pointer;
    border: 1px solid #E6E6E6;
  }
  .click_more h1{
    font-style: normal;
    font-size: 12px;
    color: #858585;
    line-height: 50px;
  }
  .user_ul{
    /*display: none;*/
  }
  /*活跃用户部分*/

  /*热门事件列表*/
  #wrapper .hot_events{
    width: 1024px;
    margin: 20px auto;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .rank_title{
    width: 100%;
    height: 40px;
    background: #676972;
  }
  .rank_title .title_name{
    line-height: 40px;
    text-align: center;
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
    height: 50px;
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
    line-height: 50px;
    cursor: pointer;
  }
  .event_type img{
    padding-left: 12px;
    cursor: pointer;
  }
  .hot_events ul li{
    width: 1022px;
    height: 50px;
    border: 1px solid #E6E6E6;
    clear: both;
    cursor: pointer;
  }
  .hot_events ul li:hover{
    border: 1px solid #676972;
  }
  .hot_events ul a:nth-child(odd) li{
    background: #F5F5F5;
  }
  .hot_events ul a:nth-child(even) li{
    background: #ffffff;
  }
  .hot_events ul li span{
    display: inline-block;
    line-height: 50px;
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
