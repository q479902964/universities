<template>
    <div class="product">
      <div id="wrapper">
        <transition name="fade">
          <div class="wrp_box" v-show="flag">

            <div class="introduce">
              <div class="content">
                <h1>系统简介</h1>
                <p>本系统以高校与高校事件为研究对象，依托互联网信息采集技术对新闻网站、微博、知乎、贴吧、微信公众号等平台对学校评价与事件内容及其评论进行监测，利用数据挖掘与自然语言处理技术，监测校内群体教师和学生对于高校事件、热点问题的讨论，实现对高校事件的检测、评估、聚合与跟踪，对事件内容与性质进行多维细粒度刻画，分析事件关注度与监控事件传播，分析媒体观点与舆论，有助于高校管理者对热点事件进行积极引导，避免酿成突发事件；并监测公共网络对学校口碑的评论，如学校形象、教学质量、学校招生、招聘等问题的舆情，并对评论进行观点抽取与情感倾向判断，挖掘高校网络的意见领袖，并实现基于高校事件与高校的舆情分析可视化系统，为高校管理者提供参考数据、分析意见以及舆情的发展形势，便于高校管理者对高校事件及时做出合理的决策，了解教师与学生群体对学校评价与建议，增强学校管理者、教师与学生之间的相互交流。</p>
              </div>
              <div class="bg2_box"></div>
            </div>
            <div class="innovate">
              <div class="left-box">
                <img src="./new.png">
              </div>
              <div class="right-box">
                <h1>系统创新</h1>
                <p>系统技术应用创新</p>
                <p>系统功能应用创新</p>
                <p>本系统把研究对象分为高校事件和高校本体，迁移了监测事件舆情与监测产品舆情的方法。</p>
              </div>
            </div>
            <div class="function">
              <div class="title">
                <span>系统功能</span>
              </div>
              <div class="charts_box">
                <div class="chart">
                  <img src="./c1.png">
                  <div class="des">
                    <span>分布式数据获取中心</span>
                  </div>
                </div>
                <div class="chart">
                  <img src="./c2.png">
                  <div class="des">
                    <span>全面舆情综合分析</span>
                  </div>
                </div>
                <div class="chart">
                  <img src="./c3.png">
                  <div class="des">
                    <span>自动生成舆情报表</span>
                  </div>
                </div>
                <div class="chart">
                  <img src="./c4.png">
                  <div class="des">
                    <span>可视化的数据结果</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <transition name="move" >
          <img class="int" src="./int.png" v-show="flag">
        </transition>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
          return{
            flag:false
          }
        },
        mounted(){
          this.flag = true
        }
    }
</script>

<style scoped lang="stylus">
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
    cursor: pointer;
  }
  /*主体部分*/
  /*系统简介*/
  #wrapper{
    width: 100%;
  }
  #wrapper .wrp_box{
    margin-left: 15%;
  }
  .int{
    width: 26%;
    height: 549px;
    position: absolute;
    right: 90px;
    top: 4px;
    z-index: 1;
  }
  .wrp_box .introduce{
    position: relative;
    width:100%;
    min-height: 426px;
    background:url("./bg.png");
  }
  .wrp_box .introduce .content{
    position: absolute;
    /*width: 640px;*/
    width: 50%;
    min-height: 267px;
    border-left: 3px solid #FB7C45;
    left: 105px;
    top: 64px;
  }
  .content h1,p{
    padding-left: 26px;
    color: #fff;
  }
  .content h1{
    padding-top: 21px;
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
  }
  .content p{
    padding-top: 18px;
    font-weight: normal;
    font-style: normal;
    font-size: 14px;
    line-height: 23px;
  }
  .introduce .bg2_box{
    position: absolute;
    right: 0;
    width: 20px;
    height: 100%;
    background: url("./bg2.jpg");
    background-size: 20px 100%;
  }
  /*系统简介*/

  /*系统创新*/
  .innovate{
    margin-top: 89px;
  }
  .innovate .left-box{
    float: left;
    width: 322px;
    height: 318px;
    margin-left: 36px;
  }
  .innovate .left-box img{
    width: 322px;
    height: 318px;
  }
  .innovate .right-box{
    float: left;
    width: 441px;
    height: 120px;
    border-left: 3px solid #FB7C45;
    margin-left: 218px;
    margin-top: 97px;
  }
  .innovate .right-box h1,.innovate .right-box p{
    padding-left: 17px;
    color: #676972;
    font-weight: normal;
    font-style: normal;
  }
  .innovate .right-box p:first-of-type{
    padding-top: 17px;
  }
  .innovate .right-box h1{
    padding-top: 20px;
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
  }
  .innovate .right-box p:nth-of-type(1){
    font-size: 18px;
  }
  .innovate .right-box p:nth-of-type(2){
    font-size: 18px;
  }
  .innovate .right-box p:nth-of-type(3){
    font-size: 14px;
  }
  /*系统创新*/

  /*系统功能  */
.function{
  clear: both;
  padding-top: 107px;
}
.function .title{
  height: 36px;
  border-left: 3px solid #FB7C45;
  margin-left: 105px;
}
  .function .title span{
  display: inline-block;
  padding-left:26px;
  padding-top: 2px;
  font-size: 30px;
  color: #676972;
}
  .function .charts_box{
    margin-left: 62px;
    height: 210px;
    margin-top: 67px;
    background: #fff;
  }
  .function .charts_box .chart{
    float: left;
    padding:13px 48px 36px 39px;
    background: #fff;
  }

  .function .charts_box .chart:hover{
    background: url("./bg3.png");
  }
  .function .charts_box .chart img{
    width: 122px;
    height: 100px;
    padding: 0 23px;
  }
  .function .charts_box .des{
    margin-top: 23px;
    width:175px;
    height: 40px;
    text-align: center;
    background: #676972;
  }
  .function .charts_box .des span{
    line-height: 40px;
    font-size: 14px;
    color: #fff;
  }
  /*系统功能  */
  /*主体部分*/

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
</style>
