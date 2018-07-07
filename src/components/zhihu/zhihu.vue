<template>
    <div class="zhihu">
      <div id="wrapper">
        <div class="weibo_news">
          <div class="rank_title">
            <div class="title_name">
              <span>知乎问答</span>
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
        <div class="user_box">
          <div class="opinion">
            <div class="rank_title">
              <div class="title_name">
                <span>意见领袖表</span>
              </div>
            </div>
            <ul class="user_ul">
              <li v-for="(item,index) in Username">
                <span class="order_num">{{index+1}}</span>
                <span class="event">{{item.username}}</span>
              </li>
            </ul>
          </div>
          <div class="viewpoint">
            <div class="rank_title">
              <div class="title_name">
                <span>观点</span>
              </div>
            </div>
            <ul class="user_ul">
              <li v-for="(item,index) in Username">
                <span class="user_name">{{item.username}}</span>
                <ul class="comment_word">
                  <li v-for="info in item.comment_word">
                  {{info}}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  var projectUrl = "http://120.79.211.191:8080/University/weibo";
  export default {
    data(){
      return{
        input:{},
        newsList:{},
        Username:{}
      }
    },
    methods:{

    },
    created(){
      this.input =this.$route.query.eid;
    },
    mounted(){
      this.$http.get(projectUrl+'/newsList?eid='+this.input+"&pid=3").then((response) => {
        response = response.data;
        // console.log(response);
        this.newsList = response;
      })
      this.$http.get(projectUrl+'/getUsername?eid='+this.input+"&pid=3").then((response) => {
        response = response.data;
        // console.log(response);
        this.Username = response;
      })
    }
  }
</script>

<style scoped>
  #wrapper{
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
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
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
    position: absolute;
    right: 20px;
    bottom: 20px;
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

  /*意见领袖表和观点挖掘*/
  .user_box{
    margin-top: 20px;
    width: 1024px;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .opinion{
    width: 502px;
    float: left;
    background: #fff;
  }
  .order_num{
    width: 88px;
    height: 50px;
    text-align: center;
  }
  .opinion ul li{
    width: 500px;
    height: 50px;
    border: 1px solid #E6E6E6;
    clear: both;
  }
  .opinion ul li:nth-child(odd){
    background: #F5F5F5;
  }
  .opinion ul li:nth-child(even){
    background: #ffffff;
  }
  .opinion ul li span{
    display: inline-block;
    line-height: 50px;
    overflow: hidden;
    font-size: 14px;
    color: #858585;
  }
  .viewpoint{
    width: 502px;
    float: right;
    background: #fff;
  }
  .viewpoint>ul>li{
    width: 500px;
    min-height: 50px;
    border: 1px solid #E6E6E6;
    clear: both;
    /*position: relative;*/
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .user_name{
    display: inline-block;
    width:150px;
    text-align: center;
    /*margin-top: 15px;*/
    font-size: 14px;
    color: #858585;
    border-right: 3px solid  #FB7C45;
  }
  .comment_word{
    overflow: hidden;
    display: inline-block;
    width: 330px;
    /*position: absolute;*/
    /*top:15px;*/
  }
  .comment_word li{
    display: inline-block;
    padding-left: 20px;
    border: 0;
    font-size: 14px;
    color: #858585;
  }
  /*意见领袖表和观点挖掘*/

  /*主体部分*/
</style>
