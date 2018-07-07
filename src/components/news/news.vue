<template>
    <div class="news">
      <!--<vheader></vheader>-->
      <div id="wrapper">
        <div class="event_catelogy">
          <div class="ca_ti">
            <span>事件类别</span>
          </div>
          <div class="ca_box">
            <ul>
              <li v-for="item in typeAndTopic.classification">{{item}}</li>
              <!--<li>教师类事件</li>-->
            </ul>
          </div>
        </div>
        <div class="topic">
          <div class="ca_ti">
            <span>话&nbsp;&nbsp;题&nbsp;&nbsp;链</span>
          </div>
          <div class="ca_box">
            <ul>
              <li v-for="item in typeAndTopic.topic">{{item}}</li>
              <!--<li>中国教育</li>-->
              <!--<li>国情</li>-->
            </ul>
          </div>
        </div>
        <div class="event_chain">
          <div class="rank_title">
            <div class="title_name">
              <span>时&nbsp;&nbsp;间&nbsp;&nbsp;链</span>
            </div>
          </div>
          <div class="event_box " id="event_box">
            <div class="line">
              <div class="line_box" v-for="item in Math.ceil(blueline)">
                <div class="circle"></div>
                <div class="rectangle"></div>
              </div>
              <div class="circle"></div>
            </div>
            <ul>
              <li v-for="item in Development">
                <span class="event_date">{{item.event_date}}</span>
                <span class="event_content" :title="item.event_content">{{item.event_content}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="position_detection">
          <div class="rank_title">
            <div class="title_name">
              <span>立场检测</span>
            </div>
          </div>
          <div class="comment_box">
            <div class="c_box" v-for="item in ObjStatistics">
              <div class="comment_position">
                <div class="favor_line"></div>
                <span>{{item.obj}}</span>
                <div class="opposition_line"></div>
              </div>
              <ul class="change_box smoothchange1" style="margin-left: 0px;">
                <li class="li1 li">
                  <div class="obj_comment">
                    <div class="circle2"></div>
                    <span>支持评论</span>
                    <span>占比{{item.favor}}%</span>
                  </div>
                  <ul>
                    <li v-for="info in item.favor_comment" :title="info">{{info}}</li>
                  </ul>
                </li>
                <li class="li2 li">
                  <div class="obj_comment">
                    <div class="circle3"></div>
                    <span>反对评论</span>
                    <span>占比{{item.opposition}}%</span>
                  </div>
                  <ul>
                    <li v-for="info in item.opposition_comment" :title="info">{{info}}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="hot_trend">
          <div class="rank_title">
            <div class="title_name">
              <span>热度走势</span>
            </div>
          </div>
          <div id="trend_chart"></div>
        </div>
        <div class="percent_chart">
          <div class="l-box">
            <div class="rank_title">
              <div class="title_name">
                <span>新闻网站报道量占比</span>
              </div>
            </div>
            <div id="news_pie"></div>
          </div>
          <div class="r-box">
            <div class="rank_title">
              <div class="title_name">
                <span>情绪量占比</span>
              </div>
            </div>
            <div id="emotion_pie"></div>
          </div>
        </div>
        <div class="key_word">
          <div class="rank_title">
            <div class="title_name">
              <span>关键词云</span>
            </div>
          </div>
          <div id="keyword"></div>
        </div>
      </div>
    </div>
</template>

<script>
  var echarts = require('echarts');
  require('echarts-wordcloud');

  export default {
    data(){
      return{
        input:{},
        typeAndTopic:{},
        Development:{},
        ObjStatistics:{},
        EmotionTrend:{},
        NewsStatistics:{},
        EmotionStatistics:{},
        EventKeyword:{},
        blueline:0
      }
    },
    methods:{
      rotation(){
        //反对评论与支持评论轮换
        var coment_position = document.getElementsByClassName("comment_position");
        var change_box = document.getElementsByClassName("change_box");
        var opl = document.getElementsByClassName("opposition_line");
        var fal = document.getElementsByClassName("favor_line");
        var opl = document.getElementsByClassName("opposition_line");
        var fal = document.getElementsByClassName("favor_line");
        for(var i=0;i<opl.length;i++) {
          opl[i].index = i;
          change_box[i].index = i;
          $(".opposition_line").mouseover(function () {
            console.log(this.index);
            // smoothchange(this.index);
            $(".change_box").eq(this.index).removeClass("smoothchange1");
            $(".change_box").eq(this.index).addClass("smoothchange");
          });
        }
        for(var i=0;i<opl.length;i++) {
          fal[i].index = i;
          change_box[i].index = i;
          $(".favor_line").mouseover(function () {
            console.log(this.index);
            // smoothchange1(this.index);
            $(".change_box").eq(this.index).removeClass("smoothchange");
            $(".change_box").eq(this.index).addClass("smoothchange1");
          });
        }
        //评论点击显示
        for(var i =0;i<coment_position.length;i++){
          coment_position[i].index = i;
          change_box[i].index = i;
          coment_position[i].onclick = function () {
            if($(".change_box").eq(this.index).css("display")=="block"){
              $(".change_box").eq(this.index).hide();
            }else {
              for (var j = 0; j < change_box.length; j++) {
                // st_comment[j].style.display = "none";
                $(".change_box").eq(j).hide();
              }
              // st_comment[this.index].style.display = "block";
              $(".change_box").eq(this.index).show();
            }
          };
        }
      },
      trend_charts(){
        //热度走势图表
        var trend_line = echarts.init(document.getElementById("trend_chart"));
        var trend_option = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c}"
          },
          legend: {
            x: 'left',
            data: ["热度走势"]
          },
          xAxis: [
            {
              type: "category",
              name: "时间",
              splitLine: {show: false},
              data: ["2018-05-05", "2018-05-06", "2018-05-07", "2018-05-08", "2018-05-09", "2018-05-10", "2018-05-11", "2018-05-12"],
              nameTextStyle:{
                color:"#A8A8A8",
                fontSize : '14px'
              },
              axisLabel: {
                textStyle: {
                  color:"#A8A8A8",
                  fontSize : '14px'
                }
              },
              axisLine:{
                show:true,
                lineStyle:{
                  color:'#A8A8A8',
                  width:1//这里是为了突出显示加上的
                }
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "热度走势",
              nameTextStyle:{
                color:"#A8A8A8",
                fontSize : '14px'
              },
              axisLabel: {
                textStyle: {
                  color:"#A8A8A8",
                  fontSize : '14px'
                }
              },
              axisLine:{
                show:true,
                lineStyle:{
                  color:'#A8A8A8',
                  width:1//这里是为了突出显示加上的
                }
              }
            }
          ],
          calculable: true,
          series: [
            {
              name: "热度走势",
              type: "line",
              data: [90,603,562,90,30,529,437,0],
              itemStyle:{
                normal: {
                  color:"#B3CAD2",
                  borderWidth:8,
                  lineStyle: {        // 系列级个性化折线样式
                    width: 3,
                    color:"#B3CAD2"
                    // new echarts.graphic.LinearGradient(
                    //     0, 0, 1, 0,
                    //     [
                    //         {offset: 0, color: '#5CC6D0'},
                    //         {offset: 1, color: '#44ADEC'}
                    //     ]
                    // )
                  }
                }
              }
            }
          ]
        };
        trend_line.setOption(trend_option);
        //获取热度走势数据
        var line_x = [];
        var line_y = [];
        for(var i=0;i<this.EmotionTrend.length;i++){
          line_x.push(this.EmotionTrend[i].xData);    //挨个取出类别并填入类别数组
        }
        for(var f=0;f<this.EmotionTrend.length;f++){
          line_y.push(this.EmotionTrend[f].yData);    //挨个取出销量并填入销量数组
        }
        console.log("line_x"+line_x)
        console.log("line_y"+line_y)
        trend_line.setOption({
          xAxis: {
            data: line_x
          },
          series: [{
            data: line_y
          }]
        });
        trend_line.hideLoading();    //隐藏加载动画
      },
      news_charts(){
        var news_percent = echarts.init(document.getElementById("news_pie"));
        var news_percent_option = {
          tooltip : {
            trigger: 'item',
            formatter: "{b}\n{d}%"
          },
          legend: {
            orient : 'vertical',
            x : '20px',
            y:'20px',
            data:['直接访问','邮件营销','联盟广告','视频广告',"搜索引擎"],
            textStyle:{
              color:"#585858",
              fontSize:14
            }
          },
          color:['#4482EC', ' #44CBEC','#44ADEC','#44ECE5'],
          calculable :false,
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : ['25%', '40%'],
              center: ['60%', '50%'],
              itemStyle : {
                normal : {
                  borderWidth: 5,
                  borderColor: "#fff",
                  label : {
                    show :true,
                    color:"#585858",
                    formatter: "{b}\n{d}%"
                  },
                  labelLine : {
                    show : true
                  }
                },
                emphasis : {
                  label : {
                    show : true,
                    position : 'center',
                    textStyle : {
                      fontSize : '14',
                      color: "#585858"
                    }
                  }
                }
              },
              data:[
                {value:315, name:'直接访问'},
                {value:290, name:'邮件营销'},
                {value:214, name:'联盟广告'},
                {value:115, name:'视频广告'},
                {value:1528, name:'搜索引擎'}
              ]
            }
          ]
        };
        news_percent.setOption(news_percent_option);
        //新闻占比数据获取
        var news_data = [];
        var temp = {};
        var legend_data = [];
        for(var i=0;i<this.NewsStatistics.length;i++){
          temp = {value:this.NewsStatistics[i].newsValue,name:this.NewsStatistics[i].newsName};
          legend_data.push(this.NewsStatistics[i].newsName);
          news_data.push(temp);
        }
        news_percent.setOption({
          series:[
            {
              data:news_data
            }
          ],
          legend:{
            data:legend_data
          }
        });
        news_percent.hideLoading();    //隐藏加载动画
      },
      emotion_charts(){
        //情绪量占比
        var emotion_percent = echarts.init(document.getElementById("emotion_pie"));
        var emotion_option = {
          tooltip : {
            trigger: 'item',
            formatter: "{b}\n{d}%"
          },
          legend: {
            orient : 'vertical',
            x : '20px',
            y:'20px',
            data:['愤怒','焦虑','喜欢','悲伤','厌恶','怨恨','愉快','同情'],
            textStyle:{
              color:["#666666",
                "#000000",
                "#ff6699",
                "#ff9900",

                "#00b050",
                "#e06a09",
                "#663399",
                "#ff0000"],
              fontSize:14
            }
          },
          color:["#666666",
            "#000000",
            "#ff6699",
            "#ff9900",

            "#00b050",
            "#e06a09",
            "#663399",
            "#ff0000"],
          calculable :false,
          series : [
            {
              name:'访问来源',
              type:'pie',
              radius : ['25%', '40%'],
              center: ['60%', '50%'],
              itemStyle : {
                normal : {
                  borderWidth: 5,
                  borderColor: "#fff",
                  label : {
                    show :true,
                    color:"#585858",
                    formatter: "{b}\n{d}%"
                  },
                  labelLine : {
                    show : true
                  }
                },
                emphasis : {
                  label : {
                    show : true,
                    position : 'center',
                    textStyle : {
                      fontSize : '14',
                      color: "#585858"
                    }
                  }
                }
              },
              data:[
                {value:20, name:'愤怒'},
                {value:40, name:'焦虑'},
                {value:1.2, name:'喜欢'},
                {value:8, name:'悲伤'},
                {value:10, name:'厌恶'},
                {value:8.8, name:'怨恨'},
                {value:0, name:'愉快'},
                {value:12, name:'同情'}
              ]
            }
          ]
        };
        emotion_percent.setOption(emotion_option);

        //情绪占比数据获取
        var emotion_data = [];
        var temp1 = {};
        var legend_data1 = [];
        for(var i=0;i<this.EmotionStatistics.length;i++){
          temp1 = {value:this.EmotionStatistics[i].emotionValue,name:this.EmotionStatistics[i].emotionName};
          legend_data1.push(this.EmotionStatistics[i].emotionName);
          emotion_data.push(temp1);
        }
        emotion_percent.setOption({
          series:[
            {
              data:emotion_data
            }
          ],
          legend:{
            data:legend_data1
          }
        });
        emotion_percent.hideLoading();    //隐藏加载动画
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
      keyword_charts(){
        var key_word = echarts.init(document.getElementById("keyword"));
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
          }
          ]
        };
        key_word.setOption(key_option);

        //获取关键词信息
        var key_temp = {};
        var key_data = [];
        for(var i=0;i<this.EventKeyword.length;i++){
          key_temp = {name:this.EventKeyword[i].keywordName,value:this.EventKeyword[i].keywordValue,textStyle:this.createRandomItemStyle()};
          key_data.push(key_temp);
        }
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
      this.input =this.$route.query.eid;
    },
    watch:{
      'input'(){
        $(".tab_box a").eq(0).attr("href","#/news?eid="+this.input+"&pid=1");
        $(".tab_box a").eq(1).attr("href","#/weibo?eid="+this.input+"&pid=2");
        $(".tab_box a").eq(2).attr("href","#/zhihu?eid="+this.input+"&pid=3");
      },
      'Development'(){
        //蓝条长度获取
        this.$nextTick(() =>{
          this.blueline = $("#event_box").height()/50-2;
          for(var i=0;i<$("#event_box").height()/50-2;i++){
            $(".line").prepend("<div class=\"line_box\">\n" +
              "<div class=\"circle\"></div>\n" +
              "<div class=\"rectangle\"></div>\n" +
              "</div>")
          }
        })
      },
      'ObjStatistics'(){
        this.$nextTick(()=>{
          for(var i =0;i<$(".comment_position").length;i++){
            $(".opposition_line").eq(i).width(this.ObjStatistics[i].opposition*(944-$(".comment_position").eq(i).find("span").width()));
            $(".favor_line").eq(i).width(this.ObjStatistics[i].favor*(944-$(".comment_position").eq(i).find("span").width()));
          }
          this.rotation()
        })
      }
    },
    mounted(){
      this.$http.get(projectUrl+'/typeAndTopic?eid='+this.input+"&pid=1").then((response) => {
        response = response.data;
        console.log(response);
        this.typeAndTopic = response;
      })
      this.$http.get(projectUrl+'/getEventDevelopment?eid='+this.input+"&pid=1").then((response) => {
        response = response.data;
        // console.log(response);
        this.Development = response;
      })
      this.$http.get(projectUrl+'/getObjStatistics?eid='+this.input+"&pid=1").then((response) => {
        response = response.data;
        // console.log(response);
        this.ObjStatistics = response;
      })
      this.$http.get(projectUrl+'/getEmotionTrend?eid='+this.input+"&pid=1").then((response) => {
        response = response.data;
        // console.log(response);
        this.EmotionTrend = response;
        this.trend_charts()
      })
      this.$http.get(projectUrl+'/getNewsStatistics?eid='+this.input+"&pid=1").then((response) => {
        response = response.data;
        // console.log(response);
        this.NewsStatistics = response;
        this.news_charts()
      })
      this.$http.get(projectUrl+'/getEmotionStatistics?eid='+this.input+"&pid=1").then((response) => {
        response = response.data;
        console.log(response);
        this.EmotionStatistics = response;
        this.emotion_charts()
      })
      this.$http.get(projectUrl+'/getEventKeyword?eid='+this.input+"&pid=1").then((response) => {
        response = response.data;
        // console.log(response);
        this.EventKeyword = response;
        this.keyword_charts()
      })
    },
    activated(){

    }
  }
</script>

<style scoped>
  /*主体部分*/
  /*事件信息*/
  #wrapper {
    width: 1024px;
    margin: 20px auto;
  }
  /*事件类型*/
  .event_catelogy{
    margin-top: 45px;
    width: 100%;
    height: 50px;
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .ca_ti{
    float: left;
    background: #676972;
    width: 140px;
    height: 50px;
    text-align: center;
  }
  .ca_ti span{
    font-size: 16px;
    color: #FFFFFF;
    line-height: 50px;
  }
  .ca_box{
    float: left;
  }
  .ca_box ul li{
    float: left;
    padding-left:40px;
    padding-right: 40px;
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
    color: #858585;
    border-left: 1px solid #979797;
  }
  .ca_box ul li:first-of-type{
    border-left: 0;
  }
  /*事件类型*/

  /*话题链*/
  .topic{
    margin-top: 20px;
    width: 100%;
    height: 50px;
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .ca_ti{
    float: left;
    background: #676972;
    width: 140px;
    height: 50px;
    text-align: center;
  }
  .ca_ti span{
    font-size: 16px;
    color: #FFFFFF;
    line-height: 50px;
  }
  .ca_box{
    float: left;
  }
  .ca_box ul li{
    float: left;
    padding-left:40px;
    padding-right: 40px;
    text-align: center;
    margin-top: 15px;
    font-size: 14px;
    color: #858585;
    border-left: 1px solid #979797;
  }
  .ca_box ul li:first-of-type{
    border-left: 0;
  }
  /*话题链*/

  /*事件链*/
  /*滚轮条样式*/
  .event_box::-webkit-scrollbar-track-piece{
    background-color:transparent;/*滚动条的背景颜色*/
    -webkit-border-radius:6px;/*滚动条的圆角宽度*/
  }
  .event_box::-webkit-scrollbar{
    width:12px;/*滚动条的宽度*/
    height:80px;/*滚动条的高度*/
  }
  .event_box::-webkit-scrollbar-thumb:vertical{/*垂直滚动条的样式*/

    background-color:#999;
    -webkit-border-radius:4px;
    outline:2px solid #fff;
    outline-offset:-2px;
  }
  /*滚轮条样式*/
  .event_chain{
    width: 1024px;
    margin-top: 20px;
    position: relative;
  }
  .event_box{
    width: 1024px;
    max-height: 314px;
    overflow:auto;
  }
  .circle{
    width: 8px;
    height: 8px;
    background: #FB7C45;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
  }
  .line{
    position: absolute;
    top:64px;
    left: 180px;
  }
  .rectangle{
    width: 2px;
    height: 44px;
    background: #FB7C45;
    margin-left: 3px;
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
  .event_chain ul li{
    width: 1022px;
    height: 50px;
    border: 1px solid #E6E6E6;
  }
  .event_chain ul li:nth-child(even){
    background: #F5F5F5;
  }
  .event_chain ul li:nth-child(odd){
    background: #ffffff;
  }
  .event_chain ul li span{
    display: inline-block;
    line-height: 50px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space: nowrap;
    font-size: 14px;
  }
  .event_date{
    width: 202px;
    height: 50px;
    padding-left: 40px;
    color:#585858;
  }
  .event_content{
    color:#858585;
    max-width: 720px;
  }
  /*事件链*/
  /*立场检测*/
  /*反对和支持评论轮换动画*/
  @keyframes smoothchange
  {
    0%   {margin-left: 0px}
    100% {margin-left: -1004px}
  }
  @-moz-keyframes smoothchange /* Firefox */
  {
    0%   {margin-left: 0px}
    100% {margin-left: -1004px}
  }

  @-webkit-keyframes smoothchange /* Safari 和 Chrome */
  {
    0%   {margin-left: 0px}
    100% {margin-left: -1004px}
  }

  @-o-keyframes smoothchange /* Opera */
  {
    0%   {margin-left: 0px}
    100% {margin-left: -1004px}
  }
  @keyframes smoothchange1
  {
    0%   {margin-left: -1004px}
    100% {margin-left: 0px}
  }
  @-moz-keyframes smoothchange1 /* Firefox */
  {
    0%   {margin-left: -1004px}
    100% {margin-left: 0px}
  }

  @-webkit-keyframes smoothchange1 /* Safari 和 Chrome */
  {
    0%   {margin-left: -1024px}
    100% {margin-left: 0px}
  }

  @-o-keyframes smoothchange1 /* Opera */
  {
    0%   {margin-left: -940px}
    100% {margin-left: 0px}
  }


  .smoothchange{
    animation: smoothchange 1s;
    -moz-animation:smoothchange 1s;	/* Firefox */
    -webkit-animation:smoothchange 1s;	/* Safari 和 Chrome */
    -o-animation: smoothchange 1s;
    animation-fill-mode:forwards;
  }
  .smoothchange1{
    animation: smoothchange1 1s;
    -moz-animation:smoothchange1 1s;	/* Firefox */
    -webkit-animation:smoothchange1 1s;	/* Safari 和 Chrome */
    -o-animation: smoothchange1 1s;
    animation-fill-mode:forwards;
  }
  .position_detection{
    margin-top: 20px;
    width: 1024px;
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .comment_box{
    overflow: hidden;
    padding: 20px;
    background: transparent;
  }
  .comment_position{
    width: 100%;
    clear: both;
    padding-top: 20px;
  }
  .favor_line{
    float: left;
    height: 30px;
    border-radius: 6px;
    background:#B3CAD2;
  }
  .opposition_line{
    float: right;
    height: 30px;
    border-radius: 6px;
    background: #FFC9D0;
  }
  .comment_position span{
    display: inline-block;
    padding: 0 20px;
    line-height: 30px;
    cursor: pointer;
    font-size: 16px;
    color: #585858;
  }
  .circle2{
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #44ADEC;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
  }
  .circle3{
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #FFC9D0;
    -moz-border-radius: 50px;
    -webkit-border-radius: 50px;
    border-radius: 50px;
  }
  .comment_box .change_box{
    width: 5000px;
    height: auto;
    overflow: hidden;
    display: none;
  }
  .change_box .li1,.li2{
    float: left;
    overflow: hidden;
  }
  .li2{
    margin-left: 20px;
  }
  .obj_comment{
    float: left;
    margin-top: 5px;
  }
  .obj_comment span{
    font-size: 12px;
    color: #858585;
  }
  .obj_comment span:first-of-type{
    padding-left: 5px;
  }
  .obj_comment span:nth-of-type(2){
    padding-left: 15px;
  }
  .li ul{
    padding-top: 10px;
    clear: both;
  }
  .li ul li{
    width: 940px;
    line-height: 50px;
    border: 1px solid #E6E6E6;
    padding-left: 21px;
    padding-right: 21px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space: nowrap;
  }
  .li ul li:nth-child(even){
    background: #ffffff;
  }
  .li ul li:nth-child(odd){
    background: #F5F5F5;
  }
  /*立场检测*/

  /*热度走势*/
  .hot_trend{
    width: 1024px;
    height: 460px;
    margin-top: 20px;
    background: #fff;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  #trend_chart{
    width: 100%;
    height: 420px;
  }
  /*热度走势*/

  /*占比图表*/
  .percent_chart{
    width: 100%;
    margin-top: 20px;
    height: 420px;
    background: transparent;
  }
  .l-box{
    float: left;
    width: 502px;
    height: 420px;
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .r-box{
    float: right;
    width: 502px;
    height: 420px;
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  #news_pie,#emotion_pie{
    width: 100%;
    height: 380px;
  }
  /*占比图表*/

  /*关键词云*/
  .key_word{
    margin-top: 20px;
    width: 100%;
    height: 340px;
    background: #fff;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  #keyword{
    width: 100%;
    height: 300px;
  }
  /*关键词云*/
  /*主体部分*/
</style>
