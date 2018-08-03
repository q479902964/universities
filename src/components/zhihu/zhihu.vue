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
            <div class="no_drag_cs" >
              <li v-for="item in newsList">
                <div class="news_box">
                  <div class="new_title"><span>标题:</span><span class="news_title">{{item.news_title}}</span></div>
                  <div class="new_title"><span>来源:</span><span class="news_author" >{{item.news_author}}</span></div>
                  <span class="t1">内容:</span>
                  <div class="t2"><span class="news_content">{{item.news_content}}</span></div>
                  <div class="num_box">
                    <div>
                      <span>转发量:</span><span class="forward_num">{{item.forward_num}}</span>
                    </div>
                    <div>
                      <span>评论量:</span><span class="comment_num">{{item.comment_num}}</span>
                    </div>
                    <div>
                      <span>点赞量:</span><span class="thumbsup_num">{{item.thumbsup_num}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <div class="edit_box admin_edit" id="edit_box">
          <div class="edit caned" @click="caneditable('weibo_news')">编辑</div>
          <div class="edit add" @click="addedit('weibo_news')">新增</div>
          <div class="store edit" @click="storeedit('weibo_news')">保存</div>
          <div class="cancel edit" @click="canceledit('weibo_news')">取消</div>
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
            <!--<div class="edit_box admin_edit" id="edit_box1">-->
              <!--<div class="edit caned" @click="caneditable('active_users')">编辑</div>-->
              <!--<div class="add edit" @click="addedit('active_users')">新增</div>-->
              <!--<div class="store edit" @click="storeedit('active_users')">保存</div>-->
              <!--<div class="cancel edit" @click="canceledit('active_users')">取消</div>-->
            <!--</div>-->
          </div>
          <div class="viewpoint">
            <div class="rank_title">
              <div class="title_name">
                <span>观点</span>
              </div>
            </div>
            <ul class="user_ul">
              <li v-for="(item,index) in Username" class="user_li">
                <span class="user_name">{{item.username}}</span>
                <ul class="comment_word">
                  <li v-for="info in item.comment_word">
                    <span>{{info}}</span>
                  </li>
                </ul>
              </li>
            </ul>
            <div class="edit_box admin_edit" id="edit_box2">
              <div class="edit caned" @click="caneditable('viewpoint')">编辑</div>
              <div class="add edit" @click="addedit('viewpoint')">新增</div>
              <div class="store edit" @click="storeedit('viewpoint')">保存</div>
              <div class="cancel edit" @click="canceledit('viewpoint')">取消</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  var projectUrl = "http://120.79.211.191:8080/University/weibo";
  import ddsort from './ddsort'
  export default {
    data(){
      return{
        input:{},
        newsList:{},
        Username:{}
      }
    },
    methods:{
      caneditable(text){
        // if(text=='active_users'){
        //   this.old_text = $(".opinion ul").html();
        //   $("#edit_box1 .edit").css("display", "inline-block");
        //   $("#edit_box1 .caned").css("display", "none");
        //   $(".opinion ul li .event").attr("contentEditable", true);
        //   $(".opinion ul li .order_num").attr("contentEditable", false);
        //   for (var i = 0; i < $(".opinion ul li").length; i++) {
        //     var x = document.createElement("div");
        //     x.className = "delete_li";
        //     x.innerText = "×";
        //     x.contentEditable = false;
        //     x.addEventListener('click', function () {
        //       $(this).parent().remove();
        //     });
        //     $(".opinion ul li").eq(i).append(x);
        //   }
        // }
        if(text=='weibo_news'){
          $('.no_drag_cs').DDSort({
            target: 'li'           //示例而用，默认即'li'
          });
          this.old_text = $(".weibo_news ul").html();
          $("#edit_box .edit").css("display", "inline-block");
          $("#edit_box .caned").css("display", "none");
          $(".news_title").attr("contentEditable", true);
          $(".news_author").attr("contentEditable", true);
          $(".news_content").attr("contentEditable", true);
          $(".forward_num").attr("contentEditable", true);
          $(".comment_num").attr("contentEditable", true);
          $(".thumbsup_num").attr("contentEditable", true);
          $(".weibo_news ul").css("overflow","visible");
          $(".weibo_news ul").css("max-height","1000000px");
          for (var i = 0; i < $(".weibo_news ul li").length; i++) {
            var x = document.createElement("div");
            x.className = "delete_li";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".weibo_news ul li").eq(i).append(x);
          }
        }
        else if(text=='viewpoint'){
          this.old_text = $(".viewpoint .user_ul").html();
          $("#edit_box2 .edit").css("display", "inline-block");
          $("#edit_box2 .caned").css("display", "none");
          $(".viewpoint .user_ul li").attr("contentEditable", false);
          $(".viewpoint .user_ul li .user_name").attr("contentEditable", true);
          for(var i=0;i<$(".viewpoint .user_ul li .comment_word li").length;i++){
            $(".viewpoint ul li .comment_word li").eq(i).attr("contentEditable", true);
          }
          for (var i = 0; i < $(".viewpoint .user_ul li").length; i++) {
            var x = document.createElement("div");
            x.className = "delete_li";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            var y = document.createElement("span");
            y.className="add_img";
            y.innerText = "+";
            y.contentEditable = false;
            y.addEventListener('click',function () {
              $(this).parent().find(".comment_word").append("<li><span contenteditable='true'></span><div class=\"delete_li\" contenteditable=\"false\">×</div></li>")
              $(".delete_li").click(function () {
                $(this).parent().remove();
              })
            });
            $(".viewpoint .user_ul .user_li").eq(i).append(x);
            $(".viewpoint .user_ul .user_li").eq(i).append(y);
          }
          for (var i = 0; i < $(".viewpoint .user_ul li").length; i++) {
            for(var j=0;j<$(".viewpoint .user_ul li").eq(i).find(".comment_word li").length;j++){
              var x = document.createElement("div");
              x.className = "delete_li";
              x.innerText = "×";
              x.contentEditable = false;
              x.addEventListener('click', function () {
                $(this).parent().remove();
              });
              $(".viewpoint .user_ul li").eq(i).find(".comment_word li").eq(j).append(x);
            }
          }
        }
      },
      addedit(text){
        if(text=='weibo_news'){
          $(".weibo_news ul").append("<li><div class=\"news_box\"><div class=\"new_title\">" +
            "<span>标题:</span><span class=\"news_title\" contenteditable='true'></span></div>" +
            " <div class=\"new_title\"><span>来源:</span><span class=\"news_author\" contenteditable='true'></span></div>" +
            " <span class=\"t1\">内容:</span> <div class=\"t2\"><span class=\"news_content\" contenteditable='true'></span></div> " +
            "<div class=\"num_box\"><div><span>转发量:</span><span class=\"forward_num\" contenteditable='true'></span></div> " +
            "<div><span>评论量:</span><span class=\"comment_num\" contenteditable='true'></span></div> " +
            "<div><span>点赞量:</span><span class=\"thumbsup_num\" contenteditable='true'></span></div></div></div></li>")
          var x = document.createElement("div");
          x.className = "delete_li";
          x.innerText = "×";
          x.contentEditable = false;
          x.addEventListener('click', function () {
            $(this).parent().remove();
          });
          $(".weibo_news ul li").last().append(x);
          $(".weibo_news ul li").last().find(".news_title").focus();
        }
        // else if(text=='active_users'){
        //   $(".opinion ul").append("<li><span class=\"order_num\">"+($(".opinion ul li").length+1)+"</span>\n" +
        //     "<span class=\"event\"></span></li>");
        //   $(".opinion ul li .event").attr("contentEditable", true);
        //   var x = document.createElement("div");
        //   x.className = "delete_li";
        //   x.innerText = "×";
        //   x.contentEditable = false;
        //   x.addEventListener('click', function () {
        //     $(this).parent().remove();
        //   });
        //   $(".opinion ul li").last().append(x);
        //   $(".opinion ul li").last().find(".event").focus();
        // }
        else if(text=='viewpoint'){
          $(".viewpoint .user_ul").append("              <li class=\"user_li\">\n" +
            "                <span class=\"user_name\" contenteditable='true'></span>\n" +
            "                <ul class=\"comment_word\">\n" +
            "                </ul>\n" +
            "              </li>")
          var x = document.createElement("div");
          x.className = "delete_li";
          x.innerText = "×";
          x.contentEditable = false;
          x.addEventListener('click', function () {
            $(this).parent().remove();
          });
          var y = document.createElement("span");
          y.className="add_img";
          y.innerText = "+";
          y.contentEditable = false;
          y.addEventListener('click',function () {
            $(this).parent().find(".comment_word").append("<li><span contenteditable='true'></span><div class=\"delete_li\" contenteditable=\"false\">×</div></li>")
            $(".delete_li").click(function () {
              $(this).parent().remove();
            })
          });
          $(".viewpoint .user_ul li").last().append(x);
          $(".viewpoint .user_ul li").last().append(y);
          $(".viewpoint .user_ul li").last().find(".user_name").focus();
        }
      },
      storeedit(text){
        if(text=='weibo_news'){
          $('.no_drag_cs').DDSort({
            target: ''           //示例而用，默认即'li'
          });
          for(var i=0;i<$(".weibo_news ul li").length;i++) {
            if ($(".weibo_news ul li").eq(i).find(".news_title").text() == "" && $(".weibo_news ul li").eq(i).find(".news_author").text()== ""
              &&$(".weibo_news ul li").eq(i).find(".news_content").text()== "" && $(".weibo_news ul li").eq(i).find(".forward_num").text()== ""
              && $(".weibo_news ul li").eq(i).find(".comment_num").text()== ""&& $(".weibo_news ul li").eq(i).find(".thumbsup_num").text()== "") {
              alert("输入不能全为空");
              return;
            }
          }
          // $("#edit_box .edit").css("display", "none");
          // $("#edit_box .caned").css("display", "inline-block");
          // $(".weibo_news ul").css("overflow","auto");
          // $(".weibo_news ul").css("max-height","716px");


          var temp ={}
          var data =[];
          for(var i=0;i<$(".weibo_news ul li").length;i++){
            // $(".weibo_news ul li").eq(i).find(".delete_li").remove();
            temp = {news_title:$(".weibo_news ul li").eq(i).find(".news_title").text(),
              news_author:$(".weibo_news ul li").eq(i).find(".news_author").text(),
              news_content:$(".weibo_news ul li").eq(i).find(".news_content").text(),
              forward_num:$(".weibo_news ul li").eq(i).find(".forward_num").text(),
              comment_num:$(".weibo_news ul li").eq(i).find(".comment_num").text(),
              thumbsup_num:$(".weibo_news ul li").eq(i).find(".thumbsup_num").text()
            }
            data.push(temp);
          }
          data = {newsList:data};
          console.log(data);

          // $(".news_title").attr("contentEditable", false);
          // $(".news_author").attr("contentEditable", false);
          // $(".news_content").attr("contentEditable", false);
          // $(".forward_num").attr("contentEditable", false);
          // $(".comment_num").attr("contentEditable", false);
          // $(".thumbsup_num").attr("contentEditable", false);

          this.$http.post('',data).then((res)=>{
            res = res.body;
            console.log(res);
            if(res.code == 1){
              alert("修改成功!")
              this.$router.go(0);
            }else{
              alert("修改失败!")
            }
          }).catch(error => {
            alert("修改失败!")
          });

        }
        // else if(text=='active_users'){
        //   for(var i=0;i<$(".opinion ul li").length;i++) {
        //     if ($(".opinion ul li").eq(i).find(".event").text() == "") {
        //       alert("输入不能全为空");
        //       return;
        //     }
        //   }
        //   $("#edit_box1 .edit").css("display", "none");
        //   $("#edit_box1 .caned").css("display", "inline-block");
        //   for(var i=0;i<$(".opinion ul li").length;i++){
        //     $(".opinion ul li").eq(i).find(".delete_li").remove();
        //     $(".opinion ul li").eq(i).find(".event").attr("contentEditable", false);
        //   }
        // }
        else if(text=='viewpoint'){
          var temp = {};
          var data =[];
          var comment_word = [];

          for(var i=0;i<$(".viewpoint .user_ul .user_li").length;i++) {
              comment_word = []
              if ($(".viewpoint .user_ul .user_li").eq(i).find(".user_name").text() == "") {
                alert("输入不能为空");
                return;
              }
            for(var j=0;j<$(".viewpoint .user_ul .user_li").eq(i).find(".comment_word li").length;j++){
              if ($(".viewpoint .user_ul .user_li").eq(i).find(".comment_word li").eq(j).find("span").text() == "") {
                alert("输入不能为空");
                return;
              }
              comment_word.push($(".viewpoint .user_ul .user_li").eq(i).find(".comment_word li").eq(j).find("span").text())
            }
            temp = {username:$(".viewpoint .user_ul .user_li").eq(i).find(".user_name").text(),comment_word:comment_word};
            data.push(temp);
          }
          data = {username_list:data};
          console.log(data);

          // $("#edit_box2 .edit").css("display", "none");
          // $("#edit_box2 .caned").css("display", "inline-block");
          // $(".opinion ul").html("");
          // for(var i=0;i<$(".viewpoint .user_ul .user_li").length;i++){
          //   $(".viewpoint .user_ul .user_li").eq(i).find(".delete_li").remove();
          //   $(".viewpoint .user_ul .user_li").eq(i).find(".add_img").remove();
          //   $(".opinion ul").append("<li><span class=\"order_num\">"+(i+1)+"</span>\n" +
          //     "<span class=\"event\">"+$(".viewpoint .user_ul .user_li").eq(i).find(".user_name").text()+"</span></li>");
          // }
          // $(".viewpoint .user_ul li").attr("contentEditable", false);
          // $(".viewpoint .user_ul .user_li").find(".user_name").attr("contentEditable", false);
          // $(".viewpoint .user_ul .user_li").find(".comment_word span").attr("contentEditable", false);

          this.$http.post('',data).then((res)=>{
            res = res.body;
            console.log(res);
            if(res.code == 1){
              alert("修改成功!")
              this.$router.go(0);
            }else{
              alert("修改失败!")
            }
          }).catch(error => {
            alert("修改失败!")
          });

        }
      },
      canceledit(text){
        if(text=='weibo_news'){
          $('.no_drag_cs').DDSort({
            target: ''           //示例而用，默认即'li'
          });
          $(".weibo_news ul").html(this.old_text);
          $("#edit_box .edit").css("display", "none");
          $("#edit_box .caned").css("display", "inline-block");
          $(".weibo_news ul").css("overflow","auto");
          $(".weibo_news ul").css("max-height","716px");
        }
        else if(text=='viewpoint'){
         $(".viewpoint .user_ul").html(this.old_text);
          $("#edit_box2 .edit").css("display", "none");
          $("#edit_box2 .caned").css("display", "inline-block");
        }
        // else if(text=='active_users'){
        //   $(".opinion ul").html(this.old_text);
        //   $("#edit_box1 .edit").css("display", "none");
        //   $("#edit_box1 .caned").css("display", "inline-block");
        // }
      }
    },
    created(){
      this.input =this.$route.query.eid;
    },
    mounted(){
      if(sessionStorage.getItem("username")){
        $(".admin_edit").show();
      }
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

<style>
  /*管理员可编辑模式*/
  .zhihu .admin_edit{
    display: none;
  }
  .zhihu .edit_box{
    width: 100%;
    height: 30px;
    text-align: center;
  }
  .zhihu .edit_box .edit{
    width: 50px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: 1px solid #676972;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    margin: 10px auto 0 auto ;
  }
  .zhihu .edit:hover{
    background:  #FB7C45;
    color:#fff;
  }
  .zhihu .store,.add,.cancel{
    display: none;
  }
  .zhihu #edit_box1,.zhihu #edit_box2{
    width:auto;
    height: 30px;
    float: right;
  }
  .weibo #edit_box1 .edit,.weibo #edit_box2 .edit{
    margin-right: 8px;
  }
  .zhihu .delete_li{
    position:absolute;
    top:0px;
    left:5px;
    color:#fb7c45;
    cursor:pointer;
  }
  .zhihu .add_img{
    position: absolute;
    top:5px;
    left: 135px;
    color:#585858;
    font-size: 20px;
    cursor: pointer;
    border-radius: 50%;
    border: 1px solid #585858;
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    text-align: center;
  }
  .zhihu .add_img:hover{
    color: #fff;
    background:#fb7c45 ;
    border: 1px solid #fff;
  }
  #wrapper{
    width: 1024px;
    margin: 20px auto;
  }
  /*微博新闻*/
  .zhihu .weibo_news{
    margin-top: 40px;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .zhihu .weibo_news ul{
    max-height: 716px;
    overflow: auto;
  }
  /*滚轮条样式*/
  .zhihu .weibo_news ul::-webkit-scrollbar-track-piece{
    background-color:transparent;/*滚动条的背景颜色*/
    -webkit-border-radius:6px;/*滚动条的圆角宽度*/
  }
  .zhihu .weibo_news ul::-webkit-scrollbar{
    width:12px;/*滚动条的宽度*/
    height:80px;/*滚动条的高度*/
  }
  .zhihu .weibo_news ul::-webkit-scrollbar-thumb:vertical{/*垂直滚动条的样式*/

    background-color:#999;
    -webkit-border-radius:4px;
    outline:2px solid #fff;
    outline-offset:-2px;
  }
  /*滚轮条样式*/
  .zhihu .weibo_news ul li{
    width: 1022px;
    min-height: 177px;
    border: 1px solid #E6E6E6;
    background: #fff;
    position: relative;
  }
  .zhihu .rank_title{
    width: 100%;
    height: 40px;
    background: #676972;
  }
  .zhihu .rank_title .title_name{
    line-height: 40px;
    text-align: center;
  }
  .zhihu .title_name img{
    position: relative;
    top:2px;
  }
  .zhihu .title_name span{
    padding-left: 3px;
    font-size: 16px;
    color: #fff;
  }
  .zhihu .weibo_news ul li:nth-child(even){
    background: #F5F5F5;
  }
  .zhihu .weibo_news ul li:nth-child(odd){
    background: #ffffff;
  }
  .zhihu .new_title{
    width: 984px;
    margin-left: 20px;
  }
  .zhihu .new_title:first-of-type{
    margin-top: 10px;
  }
  .zhihu .new_title span:first-of-type{
    font-size: 12px;
    color: #858585;
  }
  .zhihu .new_title span:nth-of-type(2){
    padding-left: 10px;
    font-size: 12px;
    color: #585858;
  }
  .zhihu .t1{
    float: left;
    padding-top: 5px;
    padding-left: 20px;
    font-size: 12px;
    color: #858585;
  }
  .zhihu .t2{
    width: 943px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 53px;
  }
  .zhihu .news_content{
    width: 943px;
    display: inline-block;
    font-size: 12px;
    color: #585858;
  }
  .zhihu .num_box{
    width: 480px;
    float: right;
    position: absolute;
    right: 20px;
    bottom: 20px;
  }
  .zhihu .num_box div{
    width: 140px;
    display: inline-block;
    padding-left: 10px;
    border-left: 3px solid #FB7C45;
  }
  .zhihu .num_box div span:first-of-type{
    font-size: 14px;
    color: #858585;
  }
  .zhihu .num_box div span:nth-of-type(2){
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
    position: relative;
  }
  .opinion ul li .event{
    min-width: 100px;
    height: 50px;
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
    position: relative;
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
    position: relative;
    display: inline-block;
    padding-left: 20px;
    border: 0;
    font-size: 14px;
    color: #858585;
  }
  .comment_word li span{
    display: inline-block;
    min-width: 50px;
  }
  /*意见领袖表和观点挖掘*/

  /*主体部分*/
</style>
