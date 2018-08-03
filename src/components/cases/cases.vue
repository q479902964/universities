<template>
    <div class="cases">
      <div id="wrapper">
        <transition name="fade">
          <div class="wrp_box" v-show="flag">
          <div class="introduce">
            <div class="left-box">
              <img class="pic1" :src=get_img(current_img-1)  @click="change_img(0)" @mouseover="clear" @mouseout="play" onerror="this.src='../static/heng.png'">
              <img class="pic3" :src=get_img(current_img+1) @click="change_img(1)" @mouseover="clear" @mouseout="play" onerror="this.src='../static/heng.png'">
              <img class="pic2" :src=get_img(current_img) @mouseover="clear" @mouseout="play" onerror="this.src='../static/heng.png'">
            </div>
            <div class="right-box">
              <div class="line"></div>
              <div class="content">
                <h1>{{event_title[current_img]}}</h1>
                <p :title="event_introduce[current_img]">{{event_introduce[current_img]}}</p>
                <a :href="'#/event?eid='+event_nid[current_img]+'&pid=1'">了解更多</a>
              </div>
            </div>
          </div>
          <div class="title">
            <!--<div class="line3"></div>-->
            <ul>
              <li @click="event_tab(0)">全部</li>
              <li @click="event_tab(index+1)" v-for="(item,index) in event_type">{{item}}</li>
            </ul>
          </div>
          <div class="event_wrap">
            <!--<div class="event" v-for="(item,index) in event_id">-->
              <!--<a :href="'#/event?eid='+event_nid[index]+'&pid=1'">-->
                <!--<div class="event_box">-->
                <!--<div class="img_box">-->
                  <!--<img :src=get_img(index) onerror="this.src='../static/heng.png'">-->
                <!--</div>-->
                <!--<div class="content_box">-->
                  <!--<h1 class="title">{{event_title[index]}}</h1>-->
                  <!--<p class="date">{{event_date[index]}}</p>-->
                  <!--<p class="text" :title="event_introduce[index]">{{event_introduce[index]}}</p>-->
                  <!--<a :href="'#/event?eid='+event_nid[index]+'&pid=1'">了解更多</a>-->
                <!--</div>-->
              <!--</div>-->
              <!--</a>-->
            <!--</div>-->
            <div class="event" v-for="(item,index) in current">
              <a :href="'#/event?eid='+item.event_nid+'&pid=1'">
                <div class="event_box">
                  <div class="img_box">
                    <img :src=null_check(item.event_img)>
                  </div>
                  <div class="content_box">
                    <h1 class="title">{{item.event_title}}</h1>
                    <p class="date">{{item.event_date}}</p>
                    <p class="text" :title="item.event_introduce">{{item.event_introduce}}</p>
                    <a :href="'#/event?eid='+item.event_nid+'&pid=1'">了解更多</a>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        </transition>
      </div>
      <div style="clear: both"></div>
    </div>
</template>

<script>
  export default {
    data(){
      return{
        event:[],
        event_id:[],
        event_title:[],
        event_date:[],
        event_img:[],
        event_introduce:[],
        heng:"static/heng.png",
        event_nid:[],
        current_img:0,
        intId:{},
        current_event_index:0,
        event_type:[],
        current_event: [],
        nid_length:0,
        current:[],
        flag:false
      }
    },
      methods:{
        event_tab(ix){
          this.current_event_index = ix;
          for(var i =0;i<$(".title ul li").length;i++){
            if(i==this.current_event_index){
              $(".title ul li").eq(i).css("border-left","3px solid #FB7C45")
            }else{
              $(".title ul li").eq(i).css("border-left","0");
            }
          }
          this.current.splice(0,this.current.length)//清空当前数组内容
          var id;
          var title;
          var date;
          var img;
          var introduce;
          var temp;
          var id_index
          // console.log(this.event_nid)
          // console.log(this.event_title)
          // console.log(this.event_date)
          // console.log(this.event_img)
          // console.log(this.event_introduce)
          console.log(this.event)
          if(ix>0){
            id_index=0;
            for(var i=0;i<ix;i++){
              for(var j=0;j<this.event[i].event_info.length;j++){
                id_index++;
              }
            }
            console.log(this.event_img)
            for(var i=0;i<this.event[ix-1].event_info.length;i++){
              id = this.event_nid[id_index-this.event[ix-1].event_info.length+i];
              title = this.event_title[id_index-this.event[ix-1].event_info.length+i];
              date = this.event_date[id_index-this.event[ix-1].event_info.length+i];
              img = this.event_img[id_index-this.event[ix-1].event_info.length+i];
              introduce = this.event_introduce[id_index-this.event[ix-1].event_info.length+i];
              temp = {event_nid:id,event_title:title,event_date:date,event_img:img,event_introduce:introduce};
              this.current.push(temp);
              // this.current.event_nid.splice(0,this.event_nid.length);
              // this.current.event_title.splice(0,this.event_title.length);
              // this.current.event_date.splice(0,this.event_date.length);
              // this.current.event_img.splice(0,this.event_img.length);
              // this.current.event_introduce.splice(0,this.event_introduce.length);
              // this.event_nid.splice(i,0,id)
              // this.event_title.splice(i,0,title)
              // this.event_date.splice(i,0,date)
              // this.event_img.splice(i,0,img)
              // this.event_introduce.splice(i,0,introduce)
            }
            console.log(this.current)
          }else{
            for(var i = 0;i<this.event_nid.length;i++){
              id = this.event_nid[i];
              title = this.event_title[i];
              date = this.event_date[i];
              img = this.event_img[i];
              introduce = this.event_introduce[i];
              temp = {event_nid:id,event_title:title,event_date:date,event_img:img,event_introduce:introduce};
              this.current.push(temp);
            }
          }
          console.log(this.current)
        },
        clear(){
          clearInterval(this.intId)
        },
        change_img(index){
          if(index==0){
            this.current_img--
          }else{
            this.current_img++
          }
          if(this.current_img<0){
            this.current_img = this.event_id.length-1
          }else if(this.current_img>this.event_id.length-1){
            this.current_img=0
          }
          $(".right-box .content").hide();
          $(".right-box .content").fadeIn();
        },
        get_img(index){
          // console.log(this.current_img);
          if(index<0){
            if(this.event_img[this.event_id.length-1]==null){
              return this.heng
            }else{
              return this.event_img[this.event_id.length-1]
            }
          }else if(index>this.event_id.length-1){
            if(this.event_img[0]==null){
              return this.heng
            }else{
              return this.event_img[0]
            }
          }else{
            if(this.event_img[index]==null){
              return this.heng
            }else{
              return this.event_img[index]
            }
          }
        },
        null_check(img){
          if(img==null){
            return this.heng
          }else{
            return img
          }
        },
        autoPlay(){
          if (this.current_img === this.event_id.length-1) { //当遍历到最后一张图片置零
            this.current_img = 0
          }
          this.change_img(1);
        },
        play () {
          this.intId=setInterval(this.autoPlay, 3000)
        }
      },
    beforeDestroy(){
      clearInterval(this.intId);
      this.flag = false;
    },
    created(){
      this.play();
    },
      mounted(){
        this.flag=true;
        this.$http.get("http://120.79.211.191:8080/University/event/index").then((response) => {
          var id = [];
          var temp = {};
          response = response.data;
          for(var i =0;i<response.length;i++){
            id = [];
            for(var j=0;j<response[i].event_info.length;j++){
              this.event_id.push(response[i].event_info[j].id)
              id.push(response[i].event_info[j].id)
            }
            this.event_type.push(response[i].obj)
            temp = {event_info:id,event_type:response[i].obj};
            this.event.push(temp);
          }
          // console.log(this.event_id)
          this.current_event = this.event_id;
          // var id = [];
          // var temp = {};
          // for(var i =0;i<response.length;i++){
          //   id = [];
          //   for(var j=0;j<response[i].event_info.length;j++){
          //     id.push(response[i].event_info[j].id)
          //   }
          //   this.event_type.push(response[i].obj);
          //   temp = {event_info:id,event_type:response[i].obj};
          //   this.event.push(temp);
          // }
          // console.log(this.event)
        })
      },
      watch:{
        'current_event'() {
          var temp;
          this.$nextTick(()=>{
            for (var i = 0; i < this.event_id.length; i++) {
              this.$http.get("http://120.79.211.191:8080/University/event/eventDetail?eid=" + this.event_id[i] + "&pid=1").then((response) => {
                if (response) {
                  response = response.data;
                  this.event_nid.push(response.event_id);
                  this.event_title.push(response.event_title);
                  this.event_date.push(response.event_date);
                  this.event_img.push(response.event_img);
                  this.event_introduce.push(response.introduce);
                }
                this.nid_length=this.event_nid.length;
              })
            }
          })
          $(".title ul li").eq(0).css("border-left","3px solid #FB7C45")
          // console.log(this.event)
        },
        'nid_length'() {
          var id;
          var title;
          var date;
          var img;
          var introduce;
          var temp;
          if (this.event_nid.length == this.event_id.length) {
            for (var i = 0; i < this.event_id.length; i++) {
              for (var j = 0; j < this.event_id.length; j++) {
                if (this.event_nid[j] == this.event_id[i]) {
                  var index = this.event_nid.indexOf(this.event_nid[j]);
                  id = this.event_nid[index]
                  title = this.event_title[index]
                  date = this.event_date[index]
                  img = this.event_img[index]
                  introduce = this.event_introduce[index]
                  if (index > -1) {
                    this.event_nid.splice(index, 1);
                    this.event_title.splice(index, 1)
                    this.event_date.splice(index, 1)
                    this.event_img.splice(index, 1)
                    this.event_introduce.splice(index, 1)
                  }
                  this.event_nid.splice(i, 0, id)
                  this.event_title.splice(i, 0, title)
                  this.event_date.splice(i, 0, date)
                  this.event_img.splice(i, 0, img)
                  this.event_introduce.splice(i, 0, introduce)
                }
              }
            }
            for(var i = 0;i<this.event_nid.length;i++){
              id = this.event_nid[i];
              title = this.event_title[i];
              date = this.event_date[i];
              img = this.event_img[i];
              introduce = this.event_introduce[i];
              temp = {event_nid:id,event_title:title,event_date:date,event_img:img,event_introduce:introduce};
              this.current.push(temp);
            }
          }
        }
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

  @media screen and (max-width: 1200px){
    .fade-enter-active,.fade-leave-active{
      transition: all 1s;
    }
    .fade-enter{
      opacity 0;
      transform: translateX(100%);
    }
    #wrapper{
      width: 100%;

    }
    #wrapper .wrp_box{
      margin-left: 103px;
    }
    /*介绍*/
    #wrapper .introduce{
      width: 100%;
      height: 349px;
      position: relative;
    }
    #wrapper .introduce .left-box{
      position: absolute;
      left: 0;
      width:64% ;//639px
      height: 349px;
    }
    #wrapper .introduce .left-box .pic1{
      position: absolute;
      width: 40%;//257px
      height: 258px;
      left: 0;
      top:46px;
    }
    #wrapper .introduce .left-box .pic1:hover{
      left: 10px;
      top:36px;
    }
    #wrapper .introduce .left-box .pic2{
      width:64% ;//411px
      height: 349px;
      position: absolute;
      left: 128px;
      top:0;
    }
    #wrapper .introduce .left-box .pic3:hover{
      left: 390px;
      top:36px;
    }
    #wrapper .introduce .left-box .pic3{
      width: 40%;
      height: 258px;
      position: absolute;
      left: 380px;
      top:46px;
    }
    #wrapper .introduce .right-box{
      position: absolute;
      left: 739px;
      width: 287px;
      max-height:175px ;
    }
    .right-box .line{
      position: absolute;
      top:101px;
      left: 0;
      width: 3px;
      height: 98px;
      background: #FB7C45;
    }
    .right-box .content{
      position: relative;
      margin: 101px 19px;
    }
    .right-box .content h1{
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      color: #676972;
    }
    .right-box .content p{
      width:80%;
      line-height: 20px;
      max-height: 77px;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      overflow:hidden;
      margin-top: 18px;
      font-size: 14px;
      color: #676972;
    }
    .right-box .content a{
      position: absolute;
      top:160px;
      display: inline-block;
      font-size: 14px;
      color:#FB7C45;
    }
    /*介绍*/
    /*事件类别*/
    .title{
      position: relative;
      clear: both;
      padding-top: 56px;
    }
    /*.title .line3{*/
    /*position: absolute;*/
    /*left: 298px;*/
    /*top:56px;*/
    /*width: 3px;*/
    /*height: 20px;*/
    /*background:#FB7C45 ;*/
    /*}*/
    .title ul{
      margin-left: 87px;
    }
    .title ul li{
      cursor: pointer;
      font-size: 16px;
      color: #676972;
      float: left;
      width: 18%;
      /*border-left: 3px solid #FB7C45;*/
      padding-left: 13px;
    }
    /*.title ul li:first-of-type{*/
    /*width: 285px;*/
    /*text-align: center;*/
    /*}*/
    /*事件类别*/
    /*事件 */
    .event_wrap{
      margin-top: 54px;
      margin-bottom: 42px;
    }
    .event{
      margin-top: 20px;
      float: left;
      cursor: pointer;
    }
    .event_box{
      width:593px;
      height: 170px;
      padding: 10px 20px 20px 13px;
    }
    .event_box:hover{
      background: #DCDCDC;
    }
    .event:nth-of-type(odd){
      margin-left: 0;
    }
    .event:nth-of-type(even){
      margin-left:0;
    }
    .event_box .img_box{
      width: 270px;
      height: 170px;
      float: left;
    }
    .event_box .img_box img{
      width: 270px;
      height: 170px;
    }
    .event_box .content_box{
      position: relative;
      width: 295px;
      height: 170px;
      float: right;
    }
    .event_box .content_box .title{
      padding-top: 0;
      font-size: 16px;
      color: #676972;
      font-weight: normal;
    }
    .event_box .content_box .date{
      margin-top: 11px;
      font-size: 12px;
      color:#BFBFBF;
    }
    .event_box .content_box .text{
      display: -webkit-box;
      -webkit-line-clamp: 4;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      overflow: hidden;
      margin-top: 11px;
      font-size: 14px;
      color:#676972;
      line-height: 20px;
      max-height: 77px;
    }
    .event_box .content_box a{
      position: absolute;
      bottom: 0px;
      display: inline-block;
      margin-top: 15px;
      font-size: 14px;
      color: #FB7C45;
    }
    /*事件 */
  }





  @media screen and (min-width: 1201px){
    .fade-enter-active,.fade-leave-active{
      transition: all 1s;
    }
    .fade-enter{
      opacity 0;
      transform: translateX(100%);
    }
    #wrapper{
      width: 100%;

    }
    #wrapper .wrp_box{
      margin-left: 103px;
    }
    /*介绍*/
    #wrapper .introduce{
      width: 100%;
      height: 349px;
      position: relative;
    }
    #wrapper .introduce .left-box{
      position: absolute;
      left: 0;
      width: 639px;
      height: 349px;
    }
    #wrapper .introduce .left-box .pic1{
      position: absolute;
      width: 257px;
      height: 258px;
      left: 0;
      top:46px;
    }
    #wrapper .introduce .left-box .pic1:hover{
      left: 10px;
      top:36px;
    }
    #wrapper .introduce .left-box .pic2{
      width: 411px;
      height: 349px;
      position: absolute;
      left: 128px;
      top:0;
    }
    #wrapper .introduce .left-box .pic3:hover{
      left: 390px;
      top:36px;
    }
    #wrapper .introduce .left-box .pic3{
      width: 257px;
      height: 258px;
      position: absolute;
      left: 380px;
      top:46px;
    }
    #wrapper .introduce .right-box{
      position: absolute;
      left: 739px;
      width: 38%;
      max-height:175px ;
    }
    .right-box .line{
      position: absolute;
      top:101px;
      left: 0;
      width: 3px;
      height: 98px;
      background: #FB7C45;
    }
    .right-box .content{
      position: relative;
      margin: 101px 19px;
    }
    .right-box .content h1{
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      color: #676972;
    }
    .right-box .content p{
      width 80%;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      overflow:hidden;
      margin-top: 18px;
      font-size: 14px;
      color: #676972;
      line-height: 20px;
      max-height: 78px;
    }
    .right-box .content a{
      position: absolute;
      top:160px;
      display: inline-block;
      font-size: 14px;
      color:#FB7C45;
    }
    /*介绍*/
    /*事件类别*/
    .title{
      position: relative;
      clear: both;
      padding-top: 56px;
    }
    /*.title .line3{*/
      /*position: absolute;*/
      /*left: 298px;*/
      /*top:56px;*/
      /*width: 3px;*/
      /*height: 20px;*/
      /*background:#FB7C45 ;*/
    /*}*/
    .title ul{
      margin-left: 87px;
    }
    .title ul li{
      cursor: pointer;
      font-size: 16px;
      color: #676972;
      float: left;
      width: 18%;
      /*border-left: 3px solid #FB7C45;*/
      padding-left: 13px;
    }
    .title ul li:hover{
      color:#FB7C45;
    }
    /*.title ul li:first-of-type{*/
      /*width: 285px;*/
      /*text-align: center;*/
    /*}*/
    /*事件类别*/
    /*事件 */
    .event_wrap{
      margin-top: 54px;
      margin-bottom: 42px;
    }
    .event{
      width :45%;
      margin-top: 20px;
      float: left;
      cursor: pointer;
    }
    .event_box{
      /*width:100%;*/
      height: 170px;
      padding: 10px 20px 20px 13px;
    }
    .event_box:hover{
      background: #DCDCDC;
    }
    .event:nth-of-type(odd){
      margin-left: 0;
    }
    .event:nth-of-type(even){
      margin-left:20px;
    }
    .event_box .img_box{
      width: 45%;
      height: 170px;
      float: left;
    }
    .event_box .img_box img{
      width: 100%;//270px
      height: 170px;
    }
    .event_box .content_box{
      position: relative;
      width: 50%;//295px
      height: 170px;
      float: right;
    }
    .event_box .content_box .title{
      padding-top: 0;
      font-size: 16px;
      color: #676972;
      font-weight: normal;
    }
    .event_box .content_box .date{
      margin-top: 11px;
      font-size: 12px;
      color:#BFBFBF;
    }
    .event_box .content_box .text{
      display: -webkit-box;
      -webkit-line-clamp: 4;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      overflow: hidden;
      margin-top: 11px;
      font-size: 14px;
      color:#676972;
      line-height: 20px;
      max-height: 78px;
    }
    .event_box .content_box a{
      position: absolute;
      bottom: 0px;
      display: inline-block;
      margin-top: 15px;
      font-size: 14px;
      color: #FB7C45;
    }
    /*事件 */
  }
</style>
