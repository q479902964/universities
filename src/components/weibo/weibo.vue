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
            <div class="no_drag_cs">
              <li v-for="item in newsList">
                <div class="news_box">
                <div class="new_title"><span>标题:</span><span class="news_title">{{item.news_title}}</span></div>
                <div class="new_title"><span>来源:</span><span class="news_author">{{item.news_author}}</span></div>
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
          <div class="edit caned" @click="caneditable('weibo_news')" onselectstart="return false">编辑</div>
          <div class="edit add" @click="addedit('weibo_news')" onselectstart="return false">新增</div>
          <div class="store edit" @click="storeedit('weibo_news')" onselectstart="return false">保存</div>
          <div class="cancel edit" @click="canceledit('weibo_news')" onselectstart="return false">取消</div>
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
            <div class="age_edit" style="display: none;">
              <div class="age_title">
                <span>年龄段</span>
                <span>占比值</span>
              </div>
              <ul>
              </ul>
            </div>
          </div>
          <div class="r-box">
            <div id="sex_pie"></div>
            <div class="sex_edit" style="display: none;">
              <div class="sex_title">
                <span>性别</span>
                <span>占比值</span>
              </div>
              <ul>
              </ul>
            </div>
          </div>
        </div>
        <div style="width: 100%;height: 30px;clear: both" class="admin_edit">
          <div class="edit_box" id="edit_box1">
            <div class="edit caned" @click="caneditable('age_pie')" onselectstart="return false">编辑</div>
            <div class="edit add" @click="addedit('age_pie')" onselectstart="return false">新增</div>
            <div class="store edit" @click="storeedit('age_pie')" onselectstart="return false">保存</div>
            <div class="cancel edit" @click="canceledit('age_pie')" onselectstart="return false">取消</div>
          </div>
          <div class="edit_box" id="edit_box2">
            <div class="edit caned" @click="caneditable('sex_pie')" onselectstart="return false">编辑</div>
            <div class="edit add" @click="addedit('sex_pie')" onselectstart="return false">新增</div>
            <div class="store edit" @click="storeedit('sex_pie')" onselectstart="return false">保存</div>
            <div class="cancel edit" @click="canceledit('sex_pie')" onselectstart="return false">取消</div>
          </div>
        </div>
        <div class="population_area">
          <div class="rank_title">
            <div class="title_name">
              <span>关注人群地域分析</span>
            </div>
          </div>
          <div id="map_chart"></div>
          <div class="map_edit" style="display: none;">
            <div class="map_title">
              <span>省份-占比值</span>
            </div>
            <ul>
            </ul>
          </div>
        </div>
        <div class="edit_box admin_edit" id="edit_box3">
          <div class="edit caned" @click="caneditable('population_area')" onselectstart="return false">编辑</div>
          <div class="add edit" @click="addedit('population_area')" onselectstart="return false">新增</div>
          <div class="store edit" @click="storeedit('population_area')" onselectstart="return false">保存</div>
          <div class="cancel edit" @click="canceledit('population_area')" onselectstart="return false">取消</div>
        </div>
        <div style="clear: both"></div>
        <div class="topic">
          <div class="ca_ti">
            <span>话&nbsp;&nbsp;题&nbsp;&nbsp;链</span>
          </div>
          <div class="ca_box">
            <ul>
              <li v-for="item in typeAndTopic.topic">
                <span>{{item}}</span>
              </li>
              <!--<li>中国教育</li>-->
              <!--<li>国情</li>-->
            </ul>
          </div>
          <div class="edit_box admin_edit" id="edit_box4">
            <div class="edit caned" @click="caneditable('topic')" onselectstart="return false">编辑</div>
            <div class="add edit" @click="addedit('topic')" onselectstart="return false">新增</div>
            <div class="store edit" @click="storeedit('topic')" onselectstart="return false">保存</div>
            <div class="cancel edit" @click="canceledit('topic')" onselectstart="return false">取消</div>
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
        <div class="edit_box admin_edit" id="edit_box5">
          <div class="edit caned" @click="caneditable('active_users')" onselectstart="return false">编辑</div>
          <div class="add edit" @click="addedit('active_users')" onselectstart="return false">新增</div>
          <div class="store edit" @click="storeedit('active_users')" onselectstart="return false">保存</div>
          <div class="cancel edit" @click="canceledit('active_users')" onselectstart="return false">取消</div>
        </div>
      </div>
    </div>
</template>

<script>
  var echarts = require('echarts');
  require('echarts-wordcloud');
  import china from 'echarts/map/js/china.js';
  import draggable from 'vuedraggable'
  import ddsort from './ddsort'
  import Qs from 'qs'
  var projectUrl = "http://120.79.211.191:8080/University/weibo";
  var newprojectUrl = "http://120.79.211.191";
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
          Username:{},
          old_text:"",
          new_text:"",
        }
      },
      components:{
        draggable
      },
      methods:{
        // 管理者可编辑模式
        caneditable(text){
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
          else if(text=='active_users'){
            this.old_text = $(".active_users ul").html();
            $("#edit_box5 .edit").css("display", "inline-block");
            $("#edit_box5 .caned").css("display", "none");
            $(".active_users ul li .event").attr("contentEditable", true);
            $(".active_users ul li .order_num").attr("contentEditable", false);
            for (var i = 0; i < $(".active_users ul li").length; i++) {
              var x = document.createElement("div");
              x.className = "delete_li";
              x.innerText = "×";
              x.contentEditable = false;
              x.addEventListener('click', function () {
                $(this).parent().remove();
              });
              $(".active_users ul li").eq(i).append(x);
            }
          }
          else if(text=='topic'){
            this.old_text = $("." + text + " .ca_box ul").html();
            $("." + text + " .ca_box ul li").attr("contentEditable", true);
            $("." + text + " .edit").css("display", "inline-block");
            $("." + text + " .caned").css("display", "none");
            for (var i = 0; i < $("." + text + " .ca_box ul li").length; i++) {
              var x = document.createElement("div");
              x.className = "delete_li2";
              x.innerText = "×";
              x.contentEditable = false;
              x.addEventListener('click', function () {
                $(this).parent().remove();
              })
              $("." + text + " .ca_box ul li").eq(i).append(x);
            }
          }
          else if(text=="population_area"){
            $("#edit_box3 .edit").css("display", "inline-block");
            $("#edit_box3 .caned").css("display", "none");
            $("#map_chart").hide();
            $(".map_edit").show();
            $(".map_edit ul").html("");
            for(var i=0;i<this.areaStatistics.length;i++){
              $(".map_edit ul").append("<li><input value='"+this.areaStatistics[i].areaName+"'></input><b>-</b><input value='"+this.areaStatistics[i].areaValue+"' type=\"" +
                "number\" placeholder=\"占比值\"/></li>");
              var x = document.createElement("div");
              x.className = "delete_li1";
              x.innerText = "×";
              x.contentEditable = false;
              x.addEventListener('click', function () {
                $(this).parent().remove();
              });
              $(".map_edit ul li").last().append(x);
            }
          }
          else if(text=="age_pie"){
            $("#edit_box1 .edit").css("display", "inline-block");
            $("#edit_box1 .caned").css("display", "none");
            $("#age_pie").hide();
            $(".age_edit").show();
            $(".age_edit ul").html("");
            for(var i=0;i<this.ageStatistics.length;i++){
              $(".age_edit ul").append("<li><input type=\"text\" placeholder=\"年龄段\" value" +
                "='"+this.ageStatistics[i].ageName+"'><b>-</b><input value='"+this.ageStatistics[i].ageValue+"' type=\"" +
                "number\" placeholder=\"占比值\"/></li>");
              var x = document.createElement("div");
              x.className = "delete_li1";
              x.innerText = "×";
              x.contentEditable = false;
              x.addEventListener('click', function () {
                $(this).parent().remove();
              });
              $(".age_edit ul li").last().append(x);
            }
          }
          else if(text=="sex_pie"){
            $("#edit_box2 .edit").css("display", "inline-block");
            $("#edit_box2 .caned").css("display", "none");
            $("#sex_pie").hide();
            $(".sex_edit").show();
            $(".sex_edit ul").html("");
            for(var i=0;i<this.sexStatistics.length;i++){
              $(".sex_edit ul").append("<li><input type=\"text\" placeholder=\"性别\" value" +
                "='"+this.sexStatistics[i].sexName+"'><b>-</b><input value='"+this.sexStatistics[i].sexValue+"' type=\"" +
                "number\" placeholder=\"占比值\"/></li>");
              var x = document.createElement("div");
              x.className = "delete_li1";
              x.innerText = "×";
              x.contentEditable = false;
              x.addEventListener('click', function () {
                $(this).parent().remove();
              });
              $(".sex_edit ul li").last().append(x);
            }
          }
        },
        addedit(text){
          if(text=='weibo_news'){
            $(".weibo_news ul .no_drag_cs").append("<li><div class=\"news_box\"><div class=\"new_title\">" +
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
          else if(text=='active_users'){
            $(".active_users ul").append("<li><span class=\"order_num\">"+($(".active_users ul li").length+1)+"</span>\n" +
              "<span class=\"event\"></span></li>");
            $(".active_users ul li .event").attr("contentEditable", true);
            var x = document.createElement("div");
            x.className = "delete_li";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".active_users ul li").last().append(x);
            $(".active_users ul li").last().find(".event").focus();
          }
          else if(text=='topic'){
            if($("."+text+" .ca_box ul li").length>3){
              alert("最多只能添加4项");
              return;
            }
            var x =  document.createElement("div");
            x.className = "delete_li2";
            x.innerText = "×";
            // x.style.cssText = "position:absolute;top:-10px;left:20px;color:#fb7c45;cursor:pointer;";
            x.addEventListener('click', function () {
              $(this).parent().remove();
            })
            var y = document.createElement("span");
            y.contentEditable = true;
            y.style.cssText = "display:inline-block;min-width:20px;";
            var v = document.createElement("li");
            v.style.cssText = "    float: left;\n" +
              "    padding-left:40px;\n" +
              "    padding-right: 40px;\n" +
              "    text-align: center;\n" +
              "    margin-top: 15px;\n" +
              "    font-size: 14px;\n" +
              "    color: #858585;\n" +
              "    border-left: 1px solid #979797;\n" +
              "    position: relative;outline: none;";
            v.appendChild(y);
            v.appendChild(x);
            $("."+text+" .ca_box ul").append(v);
            $("."+text+" .ca_box ul li").last().find("span").focus();
          }
          else if(text=="age_pie"){
            $(".age_edit ul").append("<li><input type=\"text\" placeholder=\"年龄段\" required><b>-</b><input required type=\"" +
              "number\" placeholder=\"占比值\"/></li>");
            var x = document.createElement("div");
            x.className = "delete_li1";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".age_edit ul li").last().append(x);
            $(".age_edit ul li").last().find("input").first().focus();
          }
          else if(text=="sex_pie"){
            $(".sex_edit ul").append("<li><input type=\"text\" placeholder=\"性别\" required><b>-</b><input required type=\"" +
              "number\" placeholder=\"占比值\"/></li>");
            var x = document.createElement("div");
            x.className = "delete_li1";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".sex_edit ul li").last().append(x);
            $(".sex_edit ul li").last().find("input").first().focus();
          }
          else if(text=="population_area"){
            $(".map_edit ul").append("<li><input type=\"text\" placeholder=\"省份\" required><b>-</b><input required type=\"" +
              "number\" placeholder=\"占比值\"/></li>");
            var x = document.createElement("div");
            x.className = "delete_li1";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".map_edit ul li").last().append(x);
            $(".map_edit ul li").last().find("input").first().focus();
          }
        },
        storeedit(text){
          if(text=='weibo_news'){
            for(var i=0;i<$(".weibo_news ul .drag_cs li").length;i++) {
              if ($(".weibo_news ul .no_drag_cs li").eq(i).find(".news_title").text() == "" && $(".weibo_news ul .no_drag_cs li").eq(i).find(".news_author").text()== ""
                &&$(".weibo_news ul .no_drag_cs li").eq(i).find(".news_content").text()== "" && $(".weibo_news ul .no_drag_cs li").eq(i).find(".forward_num").text()== ""
                && $(".weibo_news ul .no_drag_cs li").eq(i).find(".comment_num").text()== ""&& $(".weibo_news ul .no_drag_cs li").eq(i).find(".thumbsup_num").text()== "") {
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

            for(var i=0;i<$(".weibo_news ul .no_drag_cs li").length;i++){
              // $(".weibo_news ul .no_drag_cs li").eq(i).find(".delete_li").remove();
              temp = {news_title:$(".weibo_news ul .no_drag_cs li").eq(i).find(".news_title").text(),
                      news_author:$(".weibo_news ul .no_drag_cs li").eq(i).find(".news_author").text(),
                      news_content:$(".weibo_news ul .no_drag_cs li").eq(i).find(".news_content").text(),
                      forward_num:$(".weibo_news ul .no_drag_cs li").eq(i).find(".forward_num").text(),
                      comment_num:$(".weibo_news ul .no_drag_cs li").eq(i).find(".comment_num").text(),
                      thumbsup_num:$(".weibo_news ul .no_drag_cs li").eq(i).find(".thumbsup_num").text()
              };
              data.push(temp);
            }
            data = {newsList:JSON.stringify(data),id:this.input};
            console.log(data);
            // $(".news_title").attr("contentEditable", false);
            // $(".news_author").attr("contentEditable", false);
            // $(".news_content").attr("contentEditable", false);
            // $(".forward_num").attr("contentEditable", false);
            // $(".comment_num").attr("contentEditable", false);
            // $(".thumbsup_num").attr("contentEditable", false);

            this.$http.post(newprojectUrl+'/wb_news.php',Qs.stringify(data)).then((res)=>{
              res = res.data;
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
          else if(text=='active_users'){
            for(var i=0;i<$(".active_users ul li").length;i++) {
              if ($(".active_users ul li").eq(i).find(".event").text() == "") {
                alert("输入不能全为空");
                return;
              }
            }
            // $("#edit_box5 .edit").css("display", "none");
            // $("#edit_box5 .caned").css("display", "inline-block");

            var temp = [];
            for(var i=0;i<$(".active_users ul li").length;i++){
              // $(".active_users ul li").eq(i).find(".delete_li").remove();
              temp.push($(".active_users ul li").eq(i).find(".event").text());
            }

            var data = {username:JSON.stringify(temp),id:this.input};
            console.log(data)
            this.$http.post(newprojectUrl+'/wb_username.php',Qs.stringify(data)).then((res)=>{
              res = res.data;
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
          else if(text=='topic'){
            for(var i=0;i<$("."+text+" .ca_box ul li").length;i++){
              if($("."+text+" .ca_box ul li").eq(i).find("span").text()==""){
                alert("请输入内容")
                return;
              }
            }
            // $("."+text+" .ca_box ul li").attr("contentEditable", false);
            // $("."+text+" .edit").css("display","none");
            // $("."+text+" .caned").css("display","inline-block");
            // for(var i=0;i<$("."+text+" .ca_box ul li").length;i++){
            //   $("."+text+" .ca_box ul li").eq(i).find("div").remove();
            // }

            var temp = [];
            for(var i=0;i<$(".topic .ca_box ul li").length;i++){
              temp.push($(".topic .ca_box ul li").eq(i).find("span").text());
            }
            var data = {topic:JSON.stringify(temp),id:this.input};
            console.log(data)
            this.$http.post(newprojectUrl+'/wb_topic.php',Qs.stringify(data)).then((res)=>{
              res = res.data;
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
          else if(text=="population_area"){
            for(var i=0;i<$(".map_edit ul li").length;i++) {
              if ($(".age_edit ul li").eq(i).find("input").val() == "") {
                alert("输入不能为空");
                return;
              }
            }
            this.areaStatistics =[];
            var temp ={};
            for(var i=0;i<$(".map_edit ul li").length;i++) {
              temp = {areaName:$(".map_edit ul li").eq(i).find("input").eq(0).val(),areaValue:$(".map_edit ul li").eq(i).find("input").eq(1).val()};
              this.areaStatistics.push(temp);
            }
            // this.area_charts();
            // $("#edit_box3 .edit").css("display", "none");
            // $("#edit_box3 .caned").css("display", "inline-block");
            // $("#map_pie").show();
            // $(".map_edit").hide();

            var data = {areaStatistics:JSON.stringify(this.areaStatistics),id:this.input};
            console.log(data);
            this.$http.post(newprojectUrl+'/area.php',Qs.stringify(data)).then((res)=>{
              res = res.data;
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
          else if(text=="age_pie"){
            for(var i=0;i<$(".age_edit ul li").length;i++) {
              if ($(".age_edit ul li").eq(i).find("input").eq(0).val() == "" || $(".age_edit ul li").eq(i).find("input").eq(1).val() == "") {
                alert("输入不能为空");
                return;
              }
            }
            this.ageStatistics =[];
            var temp ={};
            for(var i=0;i<$(".age_edit ul li").length;i++) {
              temp = {ageName:$(".age_edit ul li").eq(i).find("input").eq(0).val(),ageValue:$(".age_edit ul li").eq(i).find("input").eq(1).val()};
              this.ageStatistics.push(temp);
            }
            // this.age_charts();
            // $("#edit_box1 .edit").css("display", "none");
            // $("#edit_box1 .caned").css("display", "inline-block");
            // $("#age_pie").show();
            // $(".age_edit").hide();

            var data = {ageStatistics:JSON.stringify(this.ageStatistics),id:this.input};
            console.log(data);
            this.$http.post(newprojectUrl+'/age.php',Qs.stringify(data)).then((res)=>{
              res = res.data;
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
          else if(text=="sex_pie"){
            for(var i=0;i<$(".sex_edit ul li").length;i++) {
              if ($(".sex_edit ul li").eq(i).find("input").eq(0).val() == "" || $(".sex_edit ul li").eq(i).find("input").eq(1).val() == "") {
                alert("输入不能为空");
                return;
              }
            }
            this.sexStatistics =[];
            var temp ={};
            for(var i=0;i<$(".sex_edit ul li").length;i++) {
              temp = {sexName:$(".sex_edit ul li").eq(i).find("input").eq(0).val(),sexValue:$(".sex_edit ul li").eq(i).find("input").eq(1).val()};
              this.sexStatistics.push(temp);
            }
            // this.sex_charts();
            // $("#edit_box2 .edit").css("display", "none");
            // $("#edit_box2 .caned").css("display", "inline-block");
            // $("#sex_pie").show();
            // $(".sex_edit").hide();

            var data = {sexStatistics:JSON.stringify(this.sexStatistics),id:this.input};
            console.log(data);
            this.$http.post(newprojectUrl+'/sex.php',Qs.stringify(data)).then((res)=>{
              res = res.data;
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
            $(".weibo_news ul").html(this.old_text);
            $("#edit_box .edit").css("display", "none");
            $("#edit_box .caned").css("display", "inline-block");
            $(".weibo_news ul").css("overflow","auto");
            $(".weibo_news ul").css("max-height","716px");
          }
          else if(text=='active_users'){
            $(".active_users ul").html(this.old_text);
            $("#edit_box5 .edit").css("display", "none");
            $("#edit_box5 .caned").css("display", "inline-block");
          }
          else if(text=="topic"){
            $("."+text+" .ca_box ul li").attr("contentEditable", false);
            $("."+text+" .edit").css("display","none");
            $("."+text+" .caned").css("display","inline-block");
            $("."+text+" .ca_box ul").html(this.old_text);
          }
          else if(text=="population_area"){
            $("#edit_box3 .edit").css("display", "none");
            $("#edit_box3 .caned").css("display", "inline-block");
            $("#map_chart").show();
            $(".map_edit").hide();
          }
          else if(text=="age_pie"){
            $(".age_edit ul").html("");
            $("#edit_box1 .edit").css("display", "none");
            $("#edit_box1 .caned").css("display", "inline-block");
            $("#age_pie").show();
            $(".age_edit").hide();
          }
          else if(text=="sex_pie"){
            $(".sex_edit ul").html("");
            $("#edit_box2 .edit").css("display", "none");
            $("#edit_box2 .caned").css("display", "inline-block");
            $("#sex_pie").show();
            $(".sex_edit").hide();
          }
        },
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
        $("*").attr("spellCheck",false);
      },
      mounted(){
        if(sessionStorage.getItem("username")){
          $(".admin_edit").show();
        }
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
        this.$http.get("http://120.79.211.191:8080/University/event/typeAndTopic?eid="+this.input+"&pid=2").then((response) => {
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

<style>
  .weibo .admin_edit{
    display: none;
  }
  /*编辑按钮样式*/
  .weibo #edit_box1,.weibo #edit_box2{
    display: inline-block;
    width: 502px;
  }
  .weibo #edit_box1{
    float: left;
  }
  .weibo #edit_box2{
    margin-left: 20px;
    float: left;
  }
  .weibo .edit:hover{
    background:  #FB7C45;
    color:#fff;
  }
  .weibo .store,.weibo .add,.weibo .cancel{
    display: none;
  }
  .weibo .edit_box{
    width: 100%;
    height: 30px;
    text-align: center;
  }
  .weibo .edit_box .edit{
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
  .weibo #edit_box4{
    width:auto;
    height: 30px;
    float: right;
  }
  .weibo #edit_box4 .edit{
    margin-right: 8px;
  }
  .weibo .delete_li{
    position:absolute;
    top:0px;
    left:5px;
    color:#fb7c45;
    cursor:pointer;
  }
  .weibo .delete_li1{
    color:#fb7c45;
    cursor:pointer;
    display: inline-block;
    margin-left: 2px;
    font-size: 20px;
  }
  .weibo .delete_li2{
    position:absolute;
    top:-10px;
    left:20px;
    color:#fb7c45;
    cursor:pointer;
  }
  /*编辑按钮样式*/
  /*主体部分*/
  /*事件信息*/
  #wrapper {
    width: 1024px;
    margin: 20px auto;
  }
  /*微博新闻*/
  .weibo .weibo_news{
    margin-top: 40px;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .weibo .weibo_news ul{
    max-height: 716px;
    overflow: auto;
  }
  .weibo .news_author,.news_title{
    min-width: 200px;
    display: inline-block;
  }
  .weibo .forward_num,.comment_num,.thumbsup_num{
    min-width: 50px;
    display: inline-block;
  }
  .weibo .news_content{
    min-height: 50px;
  }
  /*滚轮条样式*/
  .weibo .weibo_news ul::-webkit-scrollbar-track-piece{
    background-color:transparent;/*滚动条的背景颜色*/
    -webkit-border-radius:6px;/*滚动条的圆角宽度*/
  }
  .weibo .weibo_news ul::-webkit-scrollbar{
    width:12px;/*滚动条的宽度*/
    height:80px;/*滚动条的高度*/
  }
  .weibo .weibo_news ul::-webkit-scrollbar-thumb:vertical{/*垂直滚动条的样式*/

    background-color:#999;
    -webkit-border-radius:4px;
    outline:2px solid #fff;
    outline-offset:-2px;
  }
  /*滚轮条样式*/
  .weibo .weibo_news ul li{
    width: 1022px;
    min-height: 177px;
    border: 1px solid #E6E6E6;
    background: #fff;
    position: relative;
  }
  .weibo .rank_title{
    width: 100%;
    height: 40px;
    background: #676972;
  }
  .weibo .rank_title .title_name{
    line-height: 40px;
    text-align: center;
  }
  .weibo .title_name img{
    position: relative;
    top:2px;
  }
  .weibo .title_name span{
    padding-left: 3px;
    font-size: 16px;
    color: #fff;
  }
  .weibo .weibo_news ul li:nth-child(even){
    background: #F5F5F5;
  }
  .weibo .weibo_news ul li:nth-child(odd){
    background: #ffffff;
  }
  .weibo .new_title{
    width: 984px;
    margin-left: 20px;
  }
  .weibo .new_title:first-of-type{
    margin-top: 10px;
  }
  .weibo .new_title span:first-of-type{
    font-size: 12px;
    color: #858585;
  }
  .weibo .new_title span:nth-of-type(2){
    padding-left: 10px;
    font-size: 12px;
    color: #585858;
  }
  .weibo .t1{
    float: left;
    padding-top: 5px;
    padding-left: 20px;
    font-size: 12px;
    color: #858585;
  }
  .weibo .t2{
    width: 943px;
    height: 70px;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
    overflow: hidden;
    margin-bottom: 53px;
  }
  .weibo .news_content{
    width: 943px;
    display: inline-block;
    font-size: 12px;
    color: #585858;
  }
  .weibo .num_box{
    width: 480px;
    float: right;
    right: 20px;
    bottom:20px;
    position: absolute;
  }
  .weibo .num_box div{
    width: 140px;
    display: inline-block;
    padding-left: 10px;
    border-left: 3px solid #FB7C45;
  }
  .weibo .num_box div span:first-of-type{
    font-size: 14px;
    color: #858585;
  }
  .weibo .num_box div span:nth-of-type(2){
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
    height: 460px;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
    background: #fff;
  }
  .weibo .l-box,.weibo .r-box{
    width: 512px;
    min-height: 380px;
    float: left;
  }
  #age_pie,#sex_pie{
    width: 100%;
    min-height: 380px;
  }
  /*热度走势可编辑*/
  .age_title,.sex_title{
    padding: 8px;
  }
  .age_title span:nth-of-type(2){
    margin-left: 115px;
  }
  .sex_title span:nth-of-type(2){
    margin-left: 130px;
  }
  .age_edit ul li,.sex_edit ul li{
    padding: 5px 0 0 8px;
    display: inline-block;
  }

  /*关注人群属性分析*/

  /*关注人群地域分析*/
  .population_area{
    margin-top: 20px;
    width: 1024px;
    height: 700px;
    max-height: 700px;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
    background: #fff;
  }
  #map_chart{
    width: 100%;
    height: 660px;
  }
  /*地域可编辑*/
  .map_title{
    padding: 8px;
  }
  .map_title span:nth-of-type(2){
    margin-left: 145px;
  }
  .map_edit ul li{
    padding: 8px;
    display: inline-block;
  }
  /*关注人群地域分析*/

  /*话题链*/
  .weibo .topic{
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
    position: relative;
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
    position: relative;
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
  .active_users ul li .event{
    min-width: 100px;
    height: 50px;
  }
  /*意见领袖表*/
  /*主体部分*/
</style>
