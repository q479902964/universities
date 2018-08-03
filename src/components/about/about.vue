<template>
  <div class="about">
    <div id="wrapper">
        <transition name="fade">
          <div class="wrap_box" v-show="flag">
            <div class="introduce">
              <div class="content">
                <h1>知识条件</h1>
                <p>项目成员来自广东外语外贸大学智能信息处理研究所-数据挖掘兴趣小组，对数据挖掘和自然语言处理研究有一定的知识积累，并掌握了较好的计算机专业基础，包括编程，网站系统的开发和项目管理方面的能力。</p>
              </div>
              <div class="bg2_box"></div>
            </div>
            <div class="interest">
              <h1>研究兴趣</h1>
              <p>项目组成员的主要研究方向是 web 数据挖掘和自然语言处理,对国内外的文本信息挖掘等相关研究现状有一定的了解,对于文本处理较为熟悉,包括网络文本数据获取、文本预处理、文本聚类和分类等方面。</p>
            </div>
            <div class="base">
              <h1>开展基础</h1>
              <p>近一年来，申请者所在的课题组致力于微博、知乎、贴吧数据以及高校新闻语料的获取工作。目前实验数据仍在不断地获取，同时已基本实现了结合评价对象进行立场检测的算法模块，已构建了一个简单的意见领袖识别模型，并已基本扩充好辅助情感分类的情感词典（近8000个词条）和副词词典（近 300个词条）；在微博和知乎文本内容挖掘方面，项目组成员的研究学习积累了一定的时间，实现了基于层次分析法的传播链刻画、意见领袖识别等技术。 在数据可视化模块中，现在系统经过完善与重构，正在进行Web端的系统改造工作，融入了更多种走势图、比例图模块，力求更简洁、清晰地展示对事件多维度分析的结果。</p>
            </div>
            <div class="experience">
              <div class="topic">
                <h1>比赛经历和获奖情况</h1>
              </div>
              <div class="sixteen year">
                <h1>2016</h1>
                <p>穗港IT一等奖<br>第一届我行我素大数据应用比赛冠军<br>计算机设计大赛一等奖</p>
              </div>
              <div class="seventeen year">
                <h1>2017</h1>
                <p>大创省级立项<br>挑战杯省赛特等奖、国赛三等奖<br>攀登计划一般项目立项<br>穗港IT二等奖<br>项目申报大赛创意类二等奖，实践类二等奖<br>中信杯二等奖</p>
              </div>
              <div class="eighteen year">
                <h1>2018</h1>
                <p>攀登计划一般项目立项<br>软件著作权一项</p>
              </div>
              <div class="line_box"></div>
            </div>
          </div>
        </transition>
        <transition name="move">
          <img class="int" src="./circle.png" v-show="flag">
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
  /*知识条件*/
  #wrapper{
    width: 100%;
  }
  #wrapper .wrap_box{
    margin-left: 15%;
  }
  .int{
    width: 30.8%;//
    /*height: 467px;*/
    position: absolute;
    right: 60px;
    top: 19px;
    z-index: 1;
    /*-webkit-animation:go 2s infinite linear*/
  }
    @media screen and (min-width: 1180px){
      .int{
        width: 30.8%;//
        top: 60px;
      }
    }
  @media screen and (min-width: 1440px){
    .int{
      width: 467px;
      top: 19px;
    }
  }
  .wrap_box .introduce{
    position: relative;
    width:100%;
    height: 426px;
    background:url("./bg.png");
  }
  .wrap_box .introduce .content{
    position: absolute;
    width: 465px;
    height: 110px;
    border-left: 3px solid #FB7C45;
    left: 106px;
    top: 93px;
  }
  .content h1,.content p{
    padding-left: 16px;
    color: #fff;
  }
  .content h1{
    padding-top: 10px;
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
  }
  .content p{
    padding-top: 20px;
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
  /*知识条件*/

  /*研究兴趣*/
  .interest{
    float: left;
    margin-top: 199px;
    margin-left: 106px;
    width: 343px;
    height: 135px;
    border-left: 3px solid #FB7C45;
  }
  .interest p,.interest h1{
    color: #676972;
    padding-left: 17px;
  }
  .interest h1{
    padding-top: 10px;
    font-size: 24px;
    font-weight: normal;
  }
  .interest p{
    padding-top: 10px;
    line-height: 24px;
    font-size:14px;
  }
  /*研究兴趣*/

  /*开展基础*/
  .base{
    float: left;
    margin-top: 199px;
    margin-left: 106px;
    width: 349px;
    height: 352px;
    border-left: 3px solid #FB7C45;
  }
  .base p,.base h1{
    color: #676972;
    padding-left: 17px;
  }
  .base h1{
    padding-top: 10px;
    font-size: 24px;
    font-weight: normal;
  }
  .base p{
    padding-top: 10px;
    line-height: 24px;
    font-size:14px;
  }
  /*开展基础*/

  /*比赛经历和获奖情况*/
.experience{
  position: relative;
  clear: both;
  padding-top: 190px;
  margin-left: 106px;
  height: 416px;
  margin-bottom: 196px;
}
  .experience .topic{
    height: 30px;
    border-left: 3px solid #FB7C45;
  }
  .experience .topic h1{
    padding-top: 7px;
    padding-left: 20px;
    font-weight: normal;
    font-size: 24px;
    color: #676972;
  }
  .experience .year {
    position: absolute;
  }
  .sixteen{
    left: 53px;
    top:519px
  }
  .seventeen{
    left: 250px;
    top:308px;
  }
  .eighteen{
    left: 522px;
    top:519px;
  }
  .experience .year h1{
    color:#676972;
    font-size: 18px;
    font-weight: normal;
  }
  .experience .year p{
    line-height: 24px;
    color: #676972;
    font-size: 14px;
  }
  .experience .line_box{
    position: absolute;
    width: 789px;
    height: 141px;
    left: 17px;
    top:439px;
    background: url("./line.png");
    background-size: 789px 141px;
    background-repeat: no-repeat;
  }
  /*比赛经历和获奖情况*/
  /*动画*/
  .fade-enter-active,.fade-leave-active{
    transition: all 1s;
  }
  .fade-enter {
    opacity 0;
    transform: translateX(100%);
  }
  .move-enter-active,.move-leave-active{
    transition: all 1s;
  }
  .move-enter {
    opacity 0;
    transform: translateX(100%);
    transform rotate(-180deg)
  }

  @-webkit-keyframes  go{
    0%{
       -webkit-transform:rotate(0deg)
    }
     50%{
       -webkit-transform:rotate(-180deg)
    }
    100%{
       -webkit-transform:rotate(-360deg)
    }
  }
  /*动画*/

</style>
