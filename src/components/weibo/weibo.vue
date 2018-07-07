<template>
    <div class="weibo">
      <div id="wrapper">
        <div class="weibo_news">
          <div class="rank_title">
            <div class="title_name">
              <span>微博新闻</span>
            </div>
          </div>
          <ul>
            <li v-for="item in newsList">
              <div class="news_box">
                <div class="new_title"><span>标题:</span><span>{{item.news_title}}</span></div>
                <div class="new_title"><span>来源:</span><span>{{item.news_author}}</span></div>
                <span class="t1">内容:</span>
                <div class="t2"><span class="news_content">{{item.news_content}}</span></div>
                <div class="num_box">
                  <div>
                    <span>转发量:</span><span>{{item.forward_num}}</span>
                  </div>
                  <div>
                    <span>评论量:</span><span>{{item.comment_num}}</span>
                  </div>
                  <div>
                    <span>点赞量:</span><span>{{item.thumbsup_num}}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="propagation_chain">
          <div class="rank_title">
            <div class="title_name">
              <span>微博传播链</span>
            </div>
          </div>
          <div id="chain_charts"></div>
        </div>
        <div class="population_attribute">
          <div class="rank_title">
            <div class="title_name">
              <span>关注人群属性分析</span>
            </div>
          </div>
          <div class="l-box">
            <div id="age_pie"></div>
          </div>
          <div class="r-box">
            <div id="sex_pie"></div>
          </div>
        </div>
        <div class="population_area">
          <div class="rank_title">
            <div class="title_name">
              <span>关注人群地域分析</span>
            </div>
          </div>
          <div id="map_chart"></div>
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
        <div class="active_users">
          <div class="rank_title">
            <div class="title_name">
              <span>意见领袖表</span>
            </div>
          </div>
          <ul class="user_ul">
            <li v-for="(item,index) in Username">
            <span class="order_num">{{index+1}}</span>
            <span class="event">{{item}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  var echarts = require('echarts');
  require('echarts-wordcloud');
  import china from 'echarts/map/js/china.js';

    export default {
      data(){
        return {
          input:{},
          newsList:{},
          transTree:{},
          ageStatistics:{},
          sexStatistics:{},
          areaStatistics:{},
          typeAndTopic:{},
          Username:{}
        }
      },
      methods:{
        chain_charts(){
          var chain_line = echarts.init(document.getElementById("chain_charts"));
          chain_line.setOption({
            series : [
              {
                name:'树图',
                type:'tree',
                orient: 'horizontal',  // vertical horizontal
                rootLocation: {x: 0, y: 0}, // 根节点位置
                nodePadding: 20,
                layerPadding: 100,
                hoverable: true,
                expandAndCollapse:true,
                initialTreeDepth:0,
                roam: true,
                symbolSize: 15,
                itemStyle: {
                  normal: {
                    color: '#4883b4',
                    label: {
                      show: true,
                      position: 'right',
                      formatter: "{b}",
                      textStyle: {
                        color: '#000',
                        fontSize: 20
                      }
                    },
                    lineStyle: {
                      color: '#ccc',
                      type: 'curve' // 'curve'|'broken'|'solid'|'dotted'|'dashed'

                    }
                  },
                  emphasis: {
                    color: '#ff0000',
                    label: {
                      show: false
                    },
                    borderWidth: 1
                  }
                },

                data: [this.transTree]
              }
            ]
          })
        },
        age_charts(){
          //关注者年龄分布图表
          var age_pie = echarts.init(document.getElementById("age_pie"));
          var age_option = {
            title : {
              text: '关注者年龄分布',
              textStyle:{
                color:"#585858",
                fontSize:18
              },
              x:'20',
              y:"70"
            },
            tooltip : {
              trigger: 'item',
              formatter: "{b}\n{d}%"
            },
            legend: {
              orient : 'vertical',
              x : '20px',
              y:'110px',
              data:['直接访问','邮件营销','联盟广告','视频广告',"搜索引擎"],
              itemGap:20,
              textStyle:{
                color:"#585858",
                fontSize:14
              }
            },
            // color:['#4482EC', ' #44CBEC','#44ADEC','#44ECE5'],
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
          age_pie.setOption(age_option);
          //ajax获取关注者年龄分布图表数据
          var age_data = [];
          var age_temp = {};
          var legend_age = [];
          for(var i=0;i<this.ageStatistics.length;i++){
            age_temp = {value:this.ageStatistics[i].ageValue,name:this.ageStatistics[i].ageName};
            legend_age.push(this.ageStatistics[i].ageName);
            age_data.push(age_temp);
          }
          age_pie.setOption({
            series:[
              {
                data:age_data
              }
            ],
            legend:{
              data:legend_age
            }
          });
          age_pie.hideLoading();    //隐藏加载动画
        },
        sex_charts(){
          //性别分布图表
          var sex_pie = echarts.init(document.getElementById("sex_pie"));
          var sex_option = {
            title : {
              text: '性别分布',
              textStyle:{
                color:"#585858",
                fontSize:18
              },
              x:'20',
              y:"70"
            },
            tooltip : {
              trigger: 'item',
              formatter: "{b}\n{d}%"
            },
            legend: {
              orient : 'vertical',
              x : '20px',
              y:'110px',
              data:['男性','女性'],
              itemGap:20,
              textStyle:{
                color:"#585858",
                fontSize:14
              }
            },
            color:['#61a0a8',"#c23531"],
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
                  {value:315, name:'女性'},
                  {value:290, name:'男性'}
                ]
              }
            ]
          };
          sex_pie.setOption(sex_option);
          // ajax获取性别分布数据
          var sex_data = [];
          var sex_temp = {};
          var legend_sex = [];
          for(var i=0;i<this.sexStatistics.length;i++){
            sex_temp = {value:this.sexStatistics[i].sexValue,name:this.sexStatistics[i].sexName};
            legend_sex.push(this.sexStatistics[i].sexName);
            sex_data.push(sex_temp);
          }
          sex_pie.setOption({
            series:[
              {
                data:sex_data
              }
            ],
            legend:{
              data:legend_sex
            }
          });
          sex_pie.hideLoading();    //隐藏加载动画
        },
        area_charts(){
          //关注人群地域分析
          var area_map = echarts.init(document.getElementById("map_chart"));
          var area_option = {
            tooltip : {
              trigger: 'item'
            },
            dataRange: {
              min:0,
              max:500,
              x: 'left',
              y: '400px',
              text:['高','低'],           // 文本，默认为数值文本
              calculable : true
            },
            series : [
              {
                name: '关注人群地域分析',
                type: 'map',
                mapType: 'china',
                itemStyle:{
                  normal:{label:{show:true}},
                  emphasis:{label:{show:true}}
                },
                data:[
                  {name: '北京',value: 20},
                  {name: '天津',value: 150},
                  {name: '上海',value: 200},
                  {name: '广东',value: 300},
                  {name: '台湾',value: 50},
                  {name: '香港',value: 100},
                  {name: '澳门',value: 60}
                ]
              }
            ]
          };
          area_map.setOption(area_option);
          //地图配置
          var area_data = [];
          var area_temp = {};
          var legend_area = [];
          for(var i=0;i<this.areaStatistics.length;i++){
            area_temp = {value:this.areaStatistics[i].areaValue,name:this.areaStatistics[i].areaName};
            legend_area.push(this.areaStatistics[i].areaName);
            area_data.push(area_temp);
          }
          area_map.setOption({
            series:[
              {
                data:area_data
              }
            ],
            legend:{
              data:legend_area
            }
          });
          area_map.hideLoading();    //隐藏加载动画
        }
      },
      created(){
        this.input =this.$route.query.eid;
      },
      mounted(){
        this.$http.get(projectUrl+'/newsList?eid='+this.input+"&pid=2").then((response) => {
          response = response.data;
          // console.log(response);
          this.newsList = response;
        })
        this.$http.get(projectUrl+'/transTree?eid='+this.input+"&pid=2").then((response) => {
          response = response.data;
          // console.log(response);
          this.transTree = response;
          this.chain_charts()
        })
        this.$http.get(projectUrl+'/ageStatistics?eid='+this.input+"&pid=2").then((response) => {
          response = response.data;
          // console.log(response);
          this.ageStatistics = response;
          this.age_charts()
        })
        this.$http.get(projectUrl+'/sexStatistics?eid='+this.input+"&pid=2").then((response) => {
          response = response.data;
          // console.log(response);
          this.sexStatistics = response;
          this.sex_charts()
        })
        this.$http.get(projectUrl+'/areaStatistics?eid='+this.input+"&pid=2").then((response) => {
          response = response.data;
          // console.log(response);
          this.areaStatistics = response;
          this.area_charts()
        })
        this.$http.get().then((response) => {
          response = response.data;
          // console.log(response);
          this.typeAndTopic = response;
        })
        this.$http.get(projectUrl+'/getUsername?eid='+this.input+"&pid=2").then((response) => {
          response = response.data;
          console.log(response);
          this.Username = response[0].username;
        })
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
  /*微博新闻*/
  .weibo_news{
    margin-top: 40px;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .weibo_news ul{
    max-height: 716px;
    overflow: auto;
  }
  /*滚轮条样式*/
  .weibo_news ul::-webkit-scrollbar-track-piece{
    background-color:transparent;/*滚动条的背景颜色*/
    -webkit-border-radius:6px;/*滚动条的圆角宽度*/
  }
  .weibo_news ul::-webkit-scrollbar{
    width:12px;/*滚动条的宽度*/
    height:80px;/*滚动条的高度*/
  }
  .weibo_news ul::-webkit-scrollbar-thumb:vertical{/*垂直滚动条的样式*/

    background-color:#999;
    -webkit-border-radius:4px;
    outline:2px solid #fff;
    outline-offset:-2px;
  }
  /*滚轮条样式*/
  .weibo_news ul li{
    width: 1022px;
    min-height: 177px;
    border: 1px solid #E6E6E6;
    background: #fff;
    position: relative;
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
  .weibo_news ul li:nth-child(even){
    background: #F5F5F5;
  }
  .weibo_news ul li:nth-child(odd){
    background: #ffffff;
  }
  .new_title{
    width: 984px;
    margin-left: 20px;
  }
  .new_title:first-of-type{
    margin-top: 10px;
  }
  .new_title span:first-of-type{
    font-size: 12px;
    color: #858585;
  }
  .new_title span:nth-of-type(2){
    padding-left: 10px;
    font-size: 12px;
    color: #585858;
  }
  .t1{
    float: left;
    padding-top: 5px;
    padding-left: 20px;
    font-size: 12px;
    color: #858585;
  }
  .t2{
    width: 943px;
    height: 70px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
    overflow: hidden;
    margin-bottom: 53px;
  }
  .news_content{
    width: 943px;
    display: inline-block;
    font-size: 12px;
    color: #585858;
  }
  .num_box{
    width: 480px;
    float: right;
    right: 20px;
    bottom:20px;
    position: absolute;
  }
  .num_box div{
    width: 140px;
    display: inline-block;
    padding-left: 10px;
    border-left: 3px solid #FB7C45;
  }
  .num_box div span:first-of-type{
    font-size: 14px;
    color: #858585;
  }
  .num_box div span:nth-of-type(2){
    font-size: 14px;
    color: #585858;
    margin-left: 10px;
  }
  /*微博新闻*/

  /*微博传播链*/
  .propagation_chain{
    margin-top: 20px;
    width: 1024px;
    height: 500px;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
    background: #fff;
  }
  #chain_charts{
    width: 100%;
    height: 100%;
  }
  /*微博传播链*/


  /*关注人群属性分析*/
  .population_attribute{
    margin-top: 20px;
    width: 1024px;
    height: 420px;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
    background: #fff;
  }
  .l-box,.r-box{
    width: 512px;
    height: 380px;
    float: left;
  }
  #age_pie,#sex_pie{
    width: 100%;
    height: 100%;
  }
  /*关注人群属性分析*/

  /*关注人群地域分析*/
  .population_area{
    margin-top: 20px;
    width: 1024px;
    height: 700px;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
    background: #fff;
  }
  #map_chart{
    width: 100%;
    height: 100%;
  }
  /*关注人群地域分析*/

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
    background:#676972;
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

  /*意见领袖表*/
  .active_users{
    clear: both;
    width: 100%;
    margin-top: 20px;
    background: #5CC6D0;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .active_title{
    width: 100%;
    height: 40px;
    text-align: center;
    background: #5CC6D0;
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
  /*意见领袖表*/
  /*主体部分*/
</style>
