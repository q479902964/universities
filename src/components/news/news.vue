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
              <li v-for="item in typeAndTopic.classification">
                <span>{{item}}</span>
              </li>
              <!--<li>教师类事件</li>-->
            </ul>
          </div>
          <div class="admin_edit">
            <div class="edit caned" @click="caneditable('event_catelogy')" onselectstart="return false">编辑</div>
            <div class="cancel edit" @click="canceledit('event_catelogy',typeAndTopic.classification)" onselectstart="return false">取消</div>
            <div class="store edit" @click="storeedit('event_catelogy')" onselectstart="return false">保存</div>
            <div class="add edit" @click="addedit('event_catelogy')" onselectstart="return false">新增</div>
          </div>
        </div>
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
          <div class="admin_edit">
            <div class="edit caned" @click="caneditable('topic')" onselectstart="return false">编辑</div>
            <div class="cancel edit" @click="canceledit('topic')" onselectstart="return false">取消</div>
            <div class="store edit" @click="storeedit('topic')" onselectstart="return false">保存</div>
            <div class="add edit" @click="addedit('topic')" onselectstart="return false" >新增</div>
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
              <div class="no_drag_cs">
                <li v-for="(item,index) in Development">
                  <span class="event_date">{{item.event_date}}</span>
                  <span class="event_content" :title="item.event_content">{{item.event_content}}</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div class="edit_box admin_edit" id="edit_box">
          <div class="edit_1 caned" @click="caneditable('event_box')" onselectstart="return false">编辑</div>
          <div class="add edit_1" @click="addedit('event_box')" onselectstart="return false">新增</div>
          <div class="store edit_1" @click="storeedit('event_box')" onselectstart="return false">保存</div>
          <div class="cancel edit_1" @click="canceledit('event_box')" onselectstart="return false">取消</div>
        </div>
        <div class="position_detection">
          <div class="rank_title">
            <div class="title_name">
              <span>立场检测</span>
            </div>
          </div>
          <div class="comment_box">
            <div class="c_box" v-for="(item,index) in ObjStatistics">
              <div class="comment_position">
                <div class="favor_line"></div>
                <span @keyup="line_adapt()">{{item.obj}}</span>
                <div class="opposition_line"></div>
              </div>
              <ul class="change_box smoothchange1" style="margin-left: 0px;">
                <li class="li1 li">
                  <div class="obj_comment">
                    <div class="circle2"></div>
                    <span>支持评论</span>
                    <span>占比<span class="percent_info">{{item.favor*100}}</span>%</span>
                  </div>
                  <ul>
                    <li v-for="info in item.favor_comment" :title="info"><span>{{info}}</span></li>
                  </ul>
                  <div class="add edit_1" @click="addcomment(index,0)">新增</div>
                </li>
                <li class="li2 li">
                  <div class="obj_comment">
                    <div class="circle3"></div>
                    <span>反对评论</span>
                    <span>占比<span class="percent_info">{{item.opposition*100}}</span>%</span>
                  </div>
                  <ul>
                    <li v-for="info in item.opposition_comment" :title="info"><span>{{info}}</span></li>
                  </ul>
                  <div class="add edit_1" @click="addcomment(index,1)">新增</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="edit_box1 admin_edit" id="edit_box1">
          <div class="edit_1 caned" @click="caneditable('position_detection')" onselectstart="return false">编辑</div>
          <div class="edit_1 add" @click="addedit('position_detection')" onselectstart="return false">新增</div>
          <div class="store edit_1" @click="storeedit('position_detection')" onselectstart="return false">保存</div>
          <div class="cancel edit_1" @click="canceledit('position_detection')" onselectstart="return false">取消</div>
        </div>
        <div class="hot_trend">
          <div class="rank_title">
            <div class="title_name">
              <span>热度走势</span>
            </div>
          </div>
          <div id="trend_chart"></div>
          <div class="hot_trend_edit" style="display: none;">
              <div class="trend_title">
                <span>x轴</span>
                <span>y轴</span>
              </div>
              <ul>
              </ul>
          </div>
        </div>
        <div class="edit_box1 admin_edit" id="edit_box2">
          <div class="edit_1 caned" @click="caneditable('hot_trend')" onselectstart="return false">编辑</div>
          <div class="edit_1 add" @click="addedit('hot_trend')" onselectstart="return false">新增</div>
          <div class="store edit_1" @click="storeedit('hot_trend')" onselectstart="return false">保存</div>
          <div class="cancel edit_1" @click="canceledit('hot_trend')" onselectstart="return false">取消</div>
        </div>
        <div class="percent_chart">
          <div class="l-box">
            <div class="rank_title">
              <div class="title_name">
                <span>新闻网站报道量占比</span>
              </div>
            </div>
            <div id="news_pie"></div>
            <div class="news_edit" style="display: none;">
              <div class="news_title">
                <span>新闻名字</span>
                <span>占比值</span>
              </div>
              <ul>
              </ul>
            </div>
          </div>
          <div class="r-box">
            <div class="rank_title">
              <div class="title_name">
                <span>情绪量占比</span>
              </div>
            </div>
            <div id="emotion_pie"></div>
            <div class="emotions_edit" style="display: none;">
              <div class="news_title">
                <span>情绪名字</span>
                <span>占比值</span>
              </div>
              <ul>
              </ul>
            </div>
          </div>
        </div>
        <div style="width: 100%;height: 30px" class="admin_edit">
          <div class="edit_box1" id="edit_box3">
            <div class="edit_1 caned" @click="caneditable('news_percent')" onselectstart="return false">编辑</div>
            <div class="edit_1 add" @click="addedit('news_percent')" onselectstart="return false">新增</div>
            <div class="store edit_1" @click="storeedit('news_percent')" onselectstart="return false">保存</div>
            <div class="cancel edit_1" @click="canceledit('news_percent')" onselectstart="return false">取消</div>
          </div>
          <div class="edit_box1" id="edit_box4">
            <div class="edit_1 caned" @click="caneditable('emotions_percent')" onselectstart="return false">编辑</div>
            <div class="edit_1 add" @click="addedit('emotions_percent')" onselectstart="return false">新增</div>
            <div class="store edit_1" @click="storeedit('emotions_percent')" onselectstart="return false">保存</div>
            <div class="cancel edit_1" @click="canceledit('emotions_percent')" onselectstart="return false">取消</div>
          </div>
        </div>
        <div class="key_word">
          <div class="rank_title">
            <div class="title_name">
              <span>关键词云</span>
            </div>
          </div>
          <div id="keyword"></div>
          <div class="keyword_edit" style="display: none;">
            <div class="news_title">
              <span>关键词</span>
              <span>占比值</span>
            </div>
            <ul>
            </ul>
          </div>
        </div>
        <div class="edit_box1 admin_edit" id="edit_box5">
          <div class="edit_1 caned" @click="caneditable('key_word')" onselectstart="return false">编辑</div>
          <div class="edit_1 add" @click="addedit('key_word')" onselectstart="return false">新增</div>
          <div class="store edit_1" @click="storeedit('key_word')" onselectstart="return false">保存</div>
          <div class="cancel edit_1" @click="canceledit('key_word')" onselectstart="return false">取消</div>
        </div>
      </div>
    </div>
</template>

<script>
  var echarts = require('echarts');
  require('echarts-wordcloud');
  import draggable from 'vuedraggable'
  import ddsort from './ddsort'
  import Qs from 'qs'
  var projectUrl = "http://120.79.211.191:8080/University/event";
  var newprojectUrl = "http://120.79.211.191";
  export default {
    components:{
      draggable
    },
    data(){
      return{
        input:{},
        typeAndTopic:{},
        Development:{},
        ObjStatistics:{},
        EmotionTrend:[],
        NewsStatistics:{},
        EmotionStatistics:{},
        EventKeyword:{},
        blueline:0,
        old_text:"",
      }
    },
    methods:{
      //百分比条适应
      line_adapt(){
        this.$nextTick(()=>{
          for(var i =0;i<$(".comment_position").length;i++){
            $(".opposition_line").eq(i).width(this.ObjStatistics[i].opposition*(944-$(".comment_position").eq(i).find("span").width()));
            $(".favor_line").eq(i).width(this.ObjStatistics[i].favor*(944-$(".comment_position").eq(i).find("span").width()));
          }
        })
      },
      //增加评论
      addcomment(index1,index2){
        var x = document.createElement("div");
        x.className = "delete_li2";
        x.innerText = "×";
        x.contentEditable = false;
        x.addEventListener('click', function () {
          $(this).parent().remove();
        });
        var y = document.createElement("span");
        y.contentEditable = true;
        var z = document.createElement("li");
        z.contentEditable = false;
        z.appendChild(y);
        z.appendChild(x);
        if(index2==0){
          $(".c_box").eq(index1).find(".li1 ul").append(z);
        }else{
          $(".c_box").eq(index1).find(".li2 ul").append(z)
        }
      },
      //管理员可编辑模式
      caneditable(text){
        if(text=='event_box') {
          $(".event_chain").css('position',"static");
          $('.no_drag_cs').DDSort({
            target: 'li'           //示例而用，默认即'li'
          });
          this.old_text = $(".event_box ul").html();
          $("#edit_box .edit_1").css("display", "inline-block");
          $("#edit_box .caned").css("display", "none");
          $(".event_box ul li span").attr("contentEditable", true);
          $(".line").hide();
          $(".event_box").css("overflow","visible");
          $(".event_box").css("max-height","1000000px");
          for (var i = 0; i < $(".event_box ul li").length; i++) {
            var x = document.createElement("div");
            x.className = "delete_li1";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".event_box ul li").eq(i).append(x);
          }
          }
          else if(text=="key_word"){
          $("#edit_box5 .edit_1").css("display", "inline-block");
          $("#edit_box5 .caned").css("display", "none");
          $("#keyword").hide();
          $(".keyword_edit").show();
          $(".keyword_edit ul").html("");
          for(var i=0;i<this.EventKeyword.length;i++){
            $(".keyword_edit ul").append("<li><input type=\"text\" placeholder=\"情绪名字\" value" +
              "='"+this.EventKeyword[i].keywordName+"'><b>-</b><input value='"+this.EventKeyword[i].keywordValue+"' type=\"" +
              "number\" placeholder=\"占比值\"/></li>");
            var x = document.createElement("div");
            x.className = "delete_li3";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".keyword_edit ul li").last().append(x);
          }
          }
          else if(text=="emotions_percent"){
          $("#edit_box4 .edit_1").css("display", "inline-block");
          $("#edit_box4 .caned").css("display", "none");
          $("#emotion_pie").hide();
          $(".emotions_edit").show();
          $(".emotions_edit ul").html("");
          for(var i=0;i<this.EmotionStatistics.length;i++){
            $(".emotions_edit ul").append("<li><input type=\"text\" placeholder=\"情绪名字\" value" +
              "='"+this.EmotionStatistics[i].emotionName+"'><b>-</b><input value='"+this.EmotionStatistics[i].emotionValue+"' type=\"" +
              "number\" placeholder=\"占比值\"/></li>");
            var x = document.createElement("div");
            x.className = "delete_li3";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".emotions_edit ul li").last().append(x);
          }
          }
          else if(text=='news_percent'){
            $("#edit_box3 .edit_1").css("display", "inline-block");
            $("#edit_box3 .caned").css("display", "none");
            $("#news_pie").hide();
            $(".news_edit").show();
          $(".news_edit ul").html("");
          for(var i=0;i<this.NewsStatistics.length;i++){
            $(".news_edit ul").append("<li><input type=\"text\" placeholder=\"新闻名字\" value" +
              "='"+this.NewsStatistics[i].newsName+"'><b>-</b><input value='"+this.NewsStatistics[i].newsValue+"' type=\"" +
              "number\" placeholder=\"占比值\"/></li>");
            var x = document.createElement("div");
            x.className = "delete_li3";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".news_edit ul li").last().append(x);
          }
          }
          else if(text=="hot_trend"){
            this.old_text = this.EmotionTrend;
            $("#edit_box2 .edit_1").css("display", "inline-block");
            $("#edit_box2 .caned").css("display", "none");
            $("#trend_chart").hide();
            $(".hot_trend_edit").show();
            $(".hot_trend_edit ul").html("");
            for(var i=0;i<this.EmotionTrend.length;i++){
              $(".hot_trend_edit ul").append("<li><input type=\"text\" placeholder=\"日期\" value" +
                "='"+this.EmotionTrend[i].xData+"'><b>-</b><input value='"+this.EmotionTrend[i].yData+"' type=\"" +
                "number\" placeholder=\"y值\"/></li>");
                var x = document.createElement("div");
                x.className = "delete_li3";
                x.innerText = "×";
                x.contentEditable = false;
                x.addEventListener('click', function () {
                  $(this).parent().remove();
                });
              $(".hot_trend_edit ul li").last().append(x);
            }

          }
          else if(text=='position_detection'){
            this.old_text = $(".comment_box").html();
            for(var i =0;i<$(".comment_position").length;i++){
              $(".comment_position").eq(i).find("span").attr("contentEditable", true);
              var x = document.createElement("div");
              x.className = "delete_li4";
              x.innerText = "×";
              x.contentEditable = false;
              x.addEventListener('click', function () {
                $(this).parent().parent().remove();
              });
              $(".comment_position").eq(i).append(x)
            }
            $(".percent_info").attr("contentEditable", true);
            $(".comment_box .edit_1").css("display", "inline-block");
            $("#edit_box1 .edit_1").css("display", "inline-block");
            $("#edit_box1 .caned").css("display", "none");
            for (var i = 0; i < $(".li").length; i++) {
              for(var j=0;j<$(".li").eq(i).find("ul li").length;j++){
                var x = document.createElement("div");
                x.className = "delete_li2";
                x.innerText = "×";
                x.contentEditable = false;
                x.addEventListener('click', function () {
                  $(this).parent().remove();
                });
                $(".li").eq(i).find("ul li").eq(j).append(x);
                $(".li").eq(i).find("ul li").find("span").attr("contentEditable", true);
              }
              }

         }
         else{
            this.old_text = $("." + text + " .ca_box ul").html();
            $("." + text + " .ca_box ul li").attr("contentEditable",false);
          $("." + text + " .ca_box ul li span").attr("contentEditable",true);
            $("." + text + " .edit").css("display", "inline-block");
            $("." + text + " .caned").css("display", "none");
            for (var i = 0; i < $("." + text + " .ca_box ul li").length; i++) {
              var x = document.createElement("div");
              x.className = "delete_li";
              x.innerText = "×";
              x.contentEditable = false;
              x.addEventListener('click', function () {
                $(this).parent().remove();
              })
              $("." + text + " .ca_box ul li").eq(i).append(x);
            }

          }
        },
      //取消编辑模式
      canceledit(text){
        if(text=='event_box') {
          $(".event_chain").css('position',"relative");
          $('.no_drag_cs').DDSort({
            target: ''           //示例而用，默认即'li'
          });
          $(".line").show();
          $(".event_box").css("overflow","auto");
          $(".event_box").css("max-height","314px");
          $(".event_box ul li").attr("contentEditable", false);
          $("#edit_box .edit_1").css("display","none");
          $("#edit_box .caned").css("display","inline-block");
          $(".event_box ul").html(this.old_text);
        }
        else if(text=="key_word"){
          $(".keyword_edit ul").html("");
          $("#edit_box5 .edit_1").css("display", "none");
          $("#edit_box5 .caned").css("display", "inline-block");
          $("#keyword").show();
          $(".keyword_edit").hide();
        }
        else if(text=="emotions_percent"){
          $(".emotions_edit ul").html("");
          $("#edit_box4 .edit_1").css("display", "none");
          $("#edit_box4 .caned").css("display", "inline-block");
          $("#emotion_pie").show();
          $(".emotions_edit").hide();
        }
        else if(text=='news_percent'){
          $(".news_edit ul").html("");
          $("#edit_box3 .edit_1").css("display", "none");
          $("#edit_box3 .caned").css("display", "inline-block");
          $("#news_pie").show();
          $(".news_edit").hide();
        }
        else if(text=='hot_trend'){
          $(".hot_trend_edit ul").html("");
          $("#edit_box2 .edit_1").css("display", "none");
          $("#edit_box2 .caned").css("display", "inline-block");
          $("#trend_chart").show();
          $(".hot_trend_edit").hide();
        }
        else if(text=='position_detection'){
          $(".comment_box").html(this.old_text);
          for(var i =0;i<$(".comment_position").length;i++){
            $(".comment_position").eq(i).find("span").attr("contentEditable", false);
            $(".comment_position").eq(i).find(".delete_li4").remove();
          }
          $(".percent_info").attr("contentEditable", false);
          $(".comment_box .edit_1").css("display", "none");
          $("#edit_box1 .edit_1").css("display", "none");
          $("#edit_box1 .caned").css("display", "inline-block");
          this.rotation();
        }
        else{
          $("."+text+" .ca_box ul li").attr("contentEditable", false);
          $("."+text+" .edit").css("display","none");
          $("."+text+" .caned").css("display","inline-block");
          $("."+text+" .ca_box ul").html(this.old_text);
        }
      },
      //保存编辑
      storeedit(text){
        if(text=='event_box'){
          // $(".line").show();
          // $(".event_box").css("overflow","auto");
          // $(".event_box").css("max-height","314px");
          // $(".event_box ul li span").attr("contentEditable", false);
          // $("#edit_box .edit_1").css("display","none");
          // $("#edit_box .caned").css("display","inline-block");
          // for(var i=0;i<$(".event_box ul li").length;i++){
          //   $(".event_box ul li").eq(i).find("div").remove();
          // }

          // $(".line").html("<div class=\"circle\"></div>");
          // for(var i=0;i<$("#event_box").height()/50-2;i++){
          //   $(".line").prepend("<div class=\"line_box\">\n" +
          //     "<div class=\"circle\"></div>\n" +
          //     "<div class=\"rectangle\"></div>\n" +
          //     "</div>")
          // }
          var data=[];
          var temp={}
          for(var i=0;i<$(".event_box ul li").length;i++){
            temp = {event_date:$(".event_box ul li").eq(i).find(".event_date").text(),event_content:$(".event_box ul li").eq(i).find(".event_content").text()}
            data.push(temp);
          }
          data = {Development:JSON.stringify(data),id:this.input};
          console.log(data);
          this.$http.post(newprojectUrl+'/event_development.php',Qs.stringify(data)).then((res)=>{
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
        else if(text=="key_word"){
          for(var i=0;i<$(".keyword_edit ul li").length;i++) {
            if ($(".keyword_edit ul li").eq(i).find("input").eq(0).val() == "" || $(".keyword_edit ul li").eq(i).find("input").eq(1).val() == "") {
              alert("输入不能为空");
              return;
            }
          }
          this.EventKeyword =[];
          var temp ={};
          for(var i=0;i<$(".keyword_edit ul li").length;i++) {
            temp = {keywordName:$(".keyword_edit ul li").eq(i).find("input").eq(0).val(),keywordValue:$(".keyword_edit ul li").eq(i).find("input").eq(1).val()};
            this.EventKeyword.push(temp);
          }
          // this.keyword_charts();
          // $("#edit_box5 .edit_1").css("display", "none");
          // $("#edit_box5 .caned").css("display", "inline-block");
          // $("#keyword").show();
          // $(".keyword_edit").hide();

          var data = {EventKeyword:JSON.stringify(this.EventKeyword),id:this.input};
          console.log(data);
          this.$http.post(newprojectUrl+'/EventKeyword.php',Qs.stringify(data)).then((res)=>{
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
        else if(text=="emotions_percent"){
          for(var i=0;i<$(".emotions_edit ul li").length;i++) {
            if ($(".emotions_edit ul li").eq(i).find("input").eq(0).val() == "" || $(".emotions_edit ul li").eq(i).find("input").eq(1).val() == "") {
              alert("输入不能为空");
              return;
            }
          }
          this.EmotionStatistics =[];
          var temp ={};
          for(var i=0;i<$(".emotions_edit ul li").length;i++) {
            temp = {emotionName:$(".emotions_edit ul li").eq(i).find("input").eq(0).val(),emotionValue:$(".emotions_edit ul li").eq(i).find("input").eq(1).val()};
            this.EmotionStatistics.push(temp);
          }
          // this.emotion_charts();
          // $("#edit_box4 .edit_1").css("display", "none");
          // $("#edit_box4 .caned").css("display", "inline-block");
          // $("#emotion_pie").show();
          // $(".emotions_edit").hide();

          var data = {EmotionStatistics:JSON.stringify(this.EmotionStatistics),id:this.input};
          console.log(data);
          this.$http.post(newprojectUrl+'/EmotionStatistics.php',Qs.stringify(data)).then((res)=>{
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
        else if(text=='news_percent'){
          for(var i=0;i<$(".news_edit ul li").length;i++) {
            if ($(".news_edit ul li").eq(i).find("input").eq(0).val() == "" || $(".news_edit ul li").eq(i).find("input").eq(1).val() == "") {
              alert("输入不能为空");
              return;
            }
          }
          this.NewsStatistics =[];
          var temp ={};
          for(var i=0;i<$(".news_edit ul li").length;i++) {
            temp = {newsName:$(".news_edit ul li").eq(i).find("input").eq(0).val(),newsValue:$(".news_edit ul li").eq(i).find("input").eq(1).val()};
            this.NewsStatistics.push(temp);
          }
          // this.news_charts();
          // $("#edit_box3 .edit_1").css("display", "none");
          // $("#edit_box3 .caned").css("display", "inline-block");
          // $("#news_pie").show();
          // $(".news_edit").hide();

          var data = {NewsStatistics:JSON.stringify(this.NewsStatistics),id:this.input};
          console.log(data);
          this.$http.post(newprojectUrl+'/NewsStatistics.php',Qs.stringify(data)).then((res)=>{
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
        else if(text=='hot_trend'){
          // temp = {value:this.NewsStatistics[i].newsValue,name:this.NewsStatistics[i].newsName};
          for(var i=0;i<$(".hot_trend ul li").length;i++) {
            if ($(".hot_trend ul li").eq(i).find("input").eq(0).val() == "" || $(".hot_trend ul li").eq(i).find("input").eq(1).val() == "") {
              alert("输入不能为空");
              return;
            }
          }
          this.EmotionTrend =[];
          var temp ={};
          for(var i=0;i<$(".hot_trend ul li").length;i++) {
            temp = {xData:$(".hot_trend ul li").eq(i).find("input").eq(0).val(),yData:$(".hot_trend ul li").eq(i).find("input").eq(1).val()};
            this.EmotionTrend.push(temp);
          }
          // this.trend_charts();
          // $("#edit_box2 .edit_1").css("display", "none");
          // $("#edit_box2 .caned").css("display", "inline-block");
          // $("#trend_chart").show();
          // $(".hot_trend_edit").hide();

          var data = {EmotionTrend:JSON.stringify(this.EmotionTrend),id:this.input};
          console.log(data);
          this.$http.post(newprojectUrl+'/EmotionTrend.php',Qs.stringify(data)).then((res)=>{
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
        else if(text=='position_detection'){
          for(var i=0;i<$(".c_box").length;i++){
            if(Number($(".c_box").eq(i).find("ul .li1 .percent_info").text())+Number($(".c_box").eq(i).find("ul .li2 .percent_info").text())!=100
              ||$(".c_box").eq(i).find(".comment_position span").text()==""
              ||$(".c_box").eq(i).find(".li ul li span").text()==""){
              alert("你的输入有误")
              return;
            }
          }
          // for(var i =0;i<$(".comment_position").length;i++){
          //   $(".comment_position").eq(i).find("span").attr("contentEditable", false);
          // }
          // $(".percent_info").attr("contentEditable", false);
          // $(".comment_box .edit_1").css("display", "none");
          // $("#edit_box1 .edit_1").css("display", "none");
          // $("#edit_box1 .caned").css("display", "inline-block");
          //
          //
          // for (var i = 0; i < $(".li").length; i++) {
          //   for(var j=0;j<$(".li").eq(i).find("ul li").length;j++){
          //     $(".li").eq(i).find("ul li").find("div").remove();
          //     $(".li").eq(i).find("ul li").find("span").attr("contentEditable", false);
          //   }
          // }
          var temp ={};
          var data = [];
          for (var i = 0; i < $(".comment_box .c_box").length; i++) {
            var op_cm = [];
            var fa_cm = [];
            for(var j=0;j<$(".comment_box .c_box").eq(i).find(".li1 ul li").length;j++){
              fa_cm.push($(".comment_box .c_box").eq(i).find(".li1 ul li").eq(j).find("span").text())
            }
            for(var k=0;k<$(".comment_box .c_box").eq(i).find(".li2 ul li").length;k++){
              op_cm.push($(".comment_box .c_box").eq(i).find(".li2 ul li").eq(k).find("span").text())
            }
            temp = {obj:$(".comment_box .c_box").eq(i).find(".comment_position span").text(),
              opposition:Number($(".comment_box .c_box").eq(i).find(".li2 .percent_info").text())/100,
              favor:Number($(".comment_box .c_box").eq(i).find(".li1 .percent_info").text())/100,
              opposition_comment:op_cm,favor_comment:fa_cm}
            data.push(temp);
          }
          data = {ObjStatistics:JSON.stringify(data),id:this.input};
          this.$http.post(newprojectUrl+'/ObjStatistics.php',Qs.stringify(data)).then((res)=>{
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
        else{
          // $("."+text+" .ca_box ul li").attr("contentEditable", false);
          // $("."+text+" .edit").css("display","none");
          // $("."+text+" .caned").css("display","inline-block");
          // for(var i=0;i<$("."+text+" .ca_box ul li").length;i++){
          //   $("."+text+" .ca_box ul li").eq(i).find("div").remove();
          // }
          if(text=='event_catelogy'){
            var temp = [];
            for(var i=0;i<$(".event_catelogy .ca_box ul li").length;i++){
              temp.push($(".event_catelogy .ca_box ul li").eq(i).find("span").text());
            }
            if(temp.length>1){
              alert("最多只能存在一个事件类型");
              return;
            }
            var data = {event_catelogy:JSON.stringify(temp),id:this.input};
            console.log(data)
            this.$http.post(newprojectUrl+'/catelogy.php',Qs.stringify(data)).then((res)=>{
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
          }else if(text=='topic'){
            var temp = [];
            for(var i=0;i<$(".topic .ca_box ul li").length;i++){
              temp.push($(".topic .ca_box ul li").eq(i).find("span").text());
            }
            var data = {topic:JSON.stringify(temp),id:this.input};
            console.log(data)
            this.$http.post(newprojectUrl+'/event_topic.php',Qs.stringify(data)).then((res)=>{
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
        }
      },
      //添加内容
      addedit(text){
        this.$nextTick(()=>{
          if(text=='event_box'){
            var x = document.createElement("div");
            x.className = "delete_li1";
            x.innerText = "×";
            x.contentEditable = false;
            // x.style.cssText = "position:absolute;top:0;left:5px;color:#fb7c45;cursor:pointer;";
            x.addEventListener('click', function () {
              $(this).parent().remove();
            })
            var y1 = document.createElement("span");
            y1.contentEditable = true;
            y1.className = "event_date";
            // y1.style.cssText="display: inline-block;\n" +
            //   "    line-height: 50px;\n" +
            //   "    text-overflow: ellipsis;\n" +
            //   "    overflow: hidden;\n" +
            //   "    white-space: nowrap;\n" +
            //   "    font-size: 14px;width: 202px;\n" +
            //   "    height: 50px;\n" +
            //   "    padding-left: 40px;\n" +
            //   "    color: #585858;";
            // y1.required = true;
            var y2 = document.createElement("span");
            y2.contentEditable = true;
            y2.className = "event_content";
            y2.style.cssText = "padding-left:5px;";
            var v = document.createElement("li");
            v.contentEditable = false;
            // v.style.cssText="width: 1022px;\n" +
            //   "    height: 50px;\n" +
            //   "    border: 1px solid #E6E6E6;\n" +
            //   "    position: relative;";
            v.appendChild(y1);
            v.appendChild(y2);
            v.appendChild(x);
            $(".event_box ul .no_drag_cs").append(v);
            $(".event_box ul .no_drag_cs li").last().find("span").eq(0).focus();
          }
          else if(text=="key_word"){
            $(".keyword_edit ul").append("<li><input type=\"text\" placeholder=\"关键词\" required><b>-</b><input required type=\"" +
              "number\" placeholder=\"占比值\"/></li>");
            var x = document.createElement("div");
            x.className = "delete_li3";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".keyword_edit ul li").last().append(x);
          }
          else if(text=="emotions_percent"){
            if($(".emotions_edit ul li").length>7){
              alert("最多只能添加八个元素")
              return;
            }
            $(".emotions_edit ul").append("<li><input type=\"text\" placeholder=\"情绪名字\" required><b>-</b><input required type=\"" +
              "number\" placeholder=\"占比值\"/></li>");
            var x = document.createElement("div");
            x.className = "delete_li3";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".emotions_edit ul li").last().append(x);
          }
          else if(text=='news_percent'){
            if($(".news_edit ul li").length>7){
              alert("最多只能添加八个元素")
              return;
            }
            $(".news_edit ul").append("<li><input type=\"text\" placeholder=\"新闻名字\" required><b>-</b><input required type=\"" +
              "number\" placeholder=\"占比值\"/></li>");
            var x = document.createElement("div");
            x.className = "delete_li3";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".news_edit ul li").last().append(x);
          }
          else if(text=='hot_trend'){
            $(".hot_trend_edit ul").append("<li><input type=\"text\" placeholder=\"日期\" required><b>-</b><input required type=\"" +
              "number\" placeholder=\"y值\"/></li>");
            var x = document.createElement("div");
            x.className = "delete_li3";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().remove();
            });
            $(".hot_trend_edit ul li").last().append(x);
          }
          else if(text=='position_detection'){
            $(".comment_box").append("            <div class=\"c_box\">\n" +
              "              <div class=\"comment_position\">\n" +
              "                <div class=\"favor_line\"></div>\n" +
              "                <span contenteditable='true'></span>\n" +
              "                <div class=\"opposition_line\"></div>\n" +
              "              </div>\n" +
              "              <ul class=\"change_box smoothchange1\" style=\"margin-left: 0px;\">\n" +
              "                <li class=\"li1 li\">\n" +
              "                  <div class=\"obj_comment\">\n" +
              "                    <div class=\"circle2\"></div>\n" +
              "                    <span>支持评论</span>\n" +
              "                    <span>占比<span class=\"percent_info\" contenteditable='true'>40</span>%</span>\n" +
              "                  </div>\n" +
              "                  <ul>\n" +
              "                  </ul>\n" +
              "                  <div class=\"add edit_1\">新增</div>\n" +
              "                </li>\n" +
              "                <li class=\"li2 li\">\n" +
              "                  <div class=\"obj_comment\">\n" +
              "                    <div class=\"circle3\"></div>\n" +
              "                    <span>反对评论</span>\n" +
              "                    <span>占比<span class=\"percent_info\" contenteditable='true'>60</span>%</span>\n" +
              "                  </div>\n" +
              "                  <ul>\n" +
              "                  </ul>\n" +
              "                  <div class=\"add edit_1\">新增</div>\n" +
              "                </li>\n" +
              "              </ul>\n" +
              "            </div>")
            $(".c_box .add").css("display","inline-block");
            var x = document.createElement("div");
            x.className = "delete_li4";
            x.innerText = "×";
            x.contentEditable = false;
            x.addEventListener('click', function () {
              $(this).parent().parent().remove();
            });
            $(".comment_position").last().append(x)

            $(".opposition_line").last().width(Number($(".c_box").last().find(".li2 .percent_info").text())/100*(944-$(".comment_position").last().find("span").width()));
            $(".favor_line").last().width(Number($(".c_box").last().find(".li1 .percent_info").text())/100*(944-$(".comment_position").last().find("span").width()));

            var x = $(".c_box").length;
            $(".comment_position").last().find("span").on('keyup',function () {
                $(this).parent().parent().find(".opposition_line").width(Number($(this).parent().parent().find(".li2 .percent_info").text())/100*(944-$(this).width()));
                $(this).parent().parent().find(".favor_line").width(Number($(this).parent().parent().find(".li1 .percent_info").text())/100*(944-$(this).width()));
            })
            $(".c_box").last().find(".li1 .add").on('click',function () {
              var x = document.createElement("div");
              x.className = "delete_li2";
              x.innerText = "×";
              x.contentEditable = false;
              x.addEventListener('click', function () {
                $(this).parent().remove();
              });
              var y = document.createElement("span");
              y.contentEditable = true;
              var z = document.createElement("li");
              z.contentEditable = false;
              z.appendChild(y);
              z.appendChild(x);
              $(this).parent().find("ul").append(z)
            })

            $(".c_box").last().find(".li2 .add").on('click',function () {
              var x = document.createElement("div");
              x.className = "delete_li2";
              x.innerText = "×";
              x.contentEditable = false;
              x.addEventListener('click', function () {
                $(this).parent().remove();
              });
              var y = document.createElement("span");
              y.contentEditable = true;
              var z = document.createElement("li");
              z.contentEditable = false;
              z.appendChild(y);
              z.appendChild(x);
              $(this).parent().find("ul").append(z)
            })
            this.rotation()
          }
          else{
            if($("."+text+" .ca_box ul li").length>3){
              alert("最多只能添加4项");
              return;
            }
            var x =  document.createElement("div");
            x.className = "delete_li";
            x.innerText = "×";
            // x.style.cssText = "position:absolute;top:-10px;left:20px;color:#fb7c45;cursor:pointer;";
            x.addEventListener('click', function () {
              $(this).parent().remove();
            })
            var y = document.createElement("span");
            y.contentEditable = true;
            y.style.cssText = "display:inline-block;min-width:10px;";
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
        })

       },
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
            // name: 'Google Trends',
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
      $("*").attr("spellCheck",false);
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
          // this.blueline = $("#event_box").height()/50-2;
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
      if(sessionStorage.getItem("username")){
        $(".admin_edit").show();
      }
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
    }
  }
</script>

<style>
  /*删除按钮*/
  .news .admin_edit{
    display: none;
  }
  .news .delete_li{
    position:absolute;
    top:-10px;
    left:20px;
    color:#fb7c45;
    cursor:pointer;
  }
  .news .delete_li1{
    position:absolute;
    top:0;
    left:5px;
    color:#fb7c45;
    cursor:pointer;
  }
  .news .delete_li2{
       position:absolute;
       top:-17px;
       left:2px;
       color:#fb7c45;
       cursor:pointer;
     }
  .news .delete_li3{
    color:#fb7c45;
    cursor:pointer;
    display: inline-block;
    margin-left: 2px;
    font-size: 20px;
  }
  .news .delete_li4{
    position:absolute;
    top:0;
    left:-10px;
    color:#fb7c45;
    cursor:pointer;
  }
  /*删除按钮*/
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
    position: relative;
  }
  .ca_box ul li span{
    min-width: 20px;
    display: inline-block;
  }
  .ca_box ul li:first-of-type{
    border-left: 0;
  }
  .news .edit{
    width: 50px;
    height: 30px;
    float: right;
    line-height: 30px;
    border-radius: 3px;
    border: 1px solid #676972;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    cursor: pointer;
    margin-right: 8px;
  }
  .news .edit:hover{
    background:  #FB7C45;
    color:#fff;
  }
  .news .store,.news .add,.news .cancel{
    display: none;
  }

  /*事件类型*/

  /*话题链*/
  .news .topic{
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
    outline:none;
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
  .news .line{
    position: absolute;
    top:64px;
    left: 180px;
    z-index: 1000;
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
    position: relative;
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
    margin-left:5px;
    min-width: 100px;
  }
  .news .edit_box,.news .edit_box1{
   width: 100%;
   height: 30px;
   text-align: center;
  }
  .news .edit_box .edit_1,.news .edit_box1 .edit_1,.news .comment_box .edit_1{
    width: 50px;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
    border: 1px solid #676972;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    margin: 10px auto;
  }
  .edit_box .edit_1:hover,.edit_box1 .edit_1:hover,.comment_box .edit_1:hover{
    background:  #FB7C45;
    color:#fff;
  }
  .news #edit_box3,.news #edit_box4{
    display: inline-block;
    width: 502px;
  }
  .news #edit_box3{
    float: left;
  }
  .news #edit_box4{
    margin-left: 20px;
    float: left;
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
    position: relative;
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
  .li{
    width: 984px;
  }
  .li ul{
    padding-top: 10px;
    clear: both;
  }
  .li ul li{
    width: 940px;
    height: 50px;
    line-height: 50px;
    border: 1px solid #E6E6E6;
    padding-left: 21px;
    padding-right: 21px;
    text-overflow:ellipsis;
    overflow:hidden;
    white-space: nowrap;
    position: relative;
  }
  .li ul li span{
    min-width: 100px;
    display: inline-block;
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
    min-height: 460px;
    margin-top: 20px;
    background: #fff;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  #trend_chart{
    width: 100%;
    height: 420px;
  }
  /*热度走势可编辑*/
  .trend_title{
    padding: 8px;
  }
  .trend_title span:nth-of-type(2){
    margin-left: 145px;
  }
  .hot_trend_edit ul li{
    padding: 8px;
    display: inline-block;
  }
  /*热度走势*/

  /*占比图表*/
  .percent_chart{
    width: 100%;
    margin-top: 20px;
    min-height: 420px;
    background: transparent;
  }
  .news .l-box{
    float: left;
    width: 502px;
    min-height: 420px;
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  .news .r-box{
    float: right;
    width: 502px;
    min-height: 420px;
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  #news_pie,#emotion_pie{
    width: 100%;
    height: 380px;
  }
  /*新闻占比可编辑*/

  .news_title{
    padding: 8px;
  }
  .news_title span:nth-of-type(2){
    margin-left: 100px;
  }
  .keyword_edit ul{
    width: 100%;
    min-height:300px ;
  }
  .keyword_edit ul li{
    display: inline-block;
    width: 400px;
    padding-left: 8px;
  }
  /*占比图表*/

  /*关键词云*/
  .key_word{
    margin-top: 20px;
    width: 100%;
    min-height: 340px;
    background: #fff;
    box-shadow: 0 4px 4px 0 rgba(224,224,224,0.50);
  }
  #keyword{
    width: 100%;
    height: 300px;
  }
  /*关键词编辑*/
  .trend_title{
    padding: 8px;
  }
  .trend_title span:nth-of-type(2){
    margin-left: 145px;
  }
  /*关键词云*/
  /*主体部分*/
</style>
