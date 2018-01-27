$(document).ready(function () {

    $(".title:first").click(function () {
        window.location.href = "../html/homepage.html"
    });
    var arr =location.search;
    var f_input = arr.split("&",1);
    var input = f_input + "&pid=1";
    //tab跳转设置
    $(".tab_box a").eq(0).attr("href","../html/news.html"+f_input+"&pid=1");
    $(".tab_box a").eq(1).attr("href","../html/weibo.html"+f_input+"&pid=2");
    $(".tab_box a").eq(2).attr("href","../html/zhihu.html"+f_input+"&pid=3");

    //var projectUrl = "http://112.74.175.37:8080/University/event";
    var projectUrl = "http://112.74.175.37:8080/University/event";
    //模板
    function templateReplace(template,data) {
        var reg = null;
        for(var key in data){
            reg = new RegExp("{{\s*" + key + "\s*}}");
            template = template.replace(reg,data[key]);
        }
        return template;
    }
    //ajax获取事件信息
        $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/eventDetail"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                $("#event_topic").text(result.event_title);
                $("#event_date").text(result.event_date);
                $("#introduce").text(result.introduce);
                $(".event_message").css("background-image","url(\""+result.event_img+"\")");
            }
        },
        error:function (errorMsg) {
            alert("事件数据加载失败");
        }
    });

    //事件类别和话题链信息获取
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/typeAndTopic"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.classification.length;i++){
                    $(".ca_box ul").eq(0).append("<li>"+result.classification[i]+"</li>")
                }
                for(var i=0;i<result.topic.length;i++){
                    $(".ca_box ul").eq(1).append("<li>"+result.topic[i]+"</li>")
                }
            }
        },
        error:function (errorMsg) {
            alert("事件类别和话题链数据加载失败");
        }
    });

    //时间链列表获取
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/getEventDevelopment"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    $(".event_box ul").append("<li>\n" +
                        "<span class=\"event_date\">"+result[i].event_date+"</span>\n" +
                        "<span class=\"event_content\">"+result[i].event_content+"</span>\n" +
                        "</li>");
                }
                //蓝条长度获取
                for(var i=0;i<$("#event_box").height()/50-2;i++){
                    $(".line").prepend("<div class=\"line_box\">\n" +
                        "<div class=\"circle\"></div>\n" +
                        "<div class=\"rectangle\"></div>\n" +
                        "</div>")
                }
            }
        },
        error:function (errorMsg) {
            alert("事件类别和话题链数据加载失败");
        }
    });
    //获取立场检测数据
    var coment_position = document.getElementsByClassName("comment_position");
    var change_box = document.getElementsByClassName("change_box");
    var opl = document.getElementsByClassName("opposition_line");
    var fal = document.getElementsByClassName("favor_line");
    $.get(projectUrl+"/getObjStatistics"+input+"&pid=1",function (data) {
        console.log(data);
        for(var i=0;i<data.length;i++){
            // $(".comment_box").append("                <div class=\"comment_position\">\n" +
            //     "                    <div class=\"favor_line\"></div>\n" +
            //     "                    <span>"+data[i].obj+"</span>\n" +
            //     "                    <div class=\"opposition_line\"></div>\n" +
            //     "                </div>\n" +
            //     "                <ul class=\"change_box smoothchange1\" style=\"margin-left: 0px;\">\n" +
            //     "                    <li class=\"li1 li\">\n" +
            //     "                        <div class=\"obj_comment\">\n" +
            //     "                            <div class=\"circle2\"></div>\n" +
            //     "                            <span>支持评论</span>\n" +
            //     "                            <span>"+"占比"+data[i].favor*100+"%"+"</span>\n" +
            //     "                        </div>\n" +
            //     "                        <ul>\n" +
            //     "                        </ul>\n" +
            //     "                    </li>\n" +
            //     "                    <li class=\"li2 li\">\n" +
            //     "                        <div class=\"obj_comment\">\n" +
            //     "                            <div class=\"circle3\"></div>\n" +
            //     "                            <span>反对评论</span>\n" +
            //     "                            <span>"+"占比"+data[i].opposition*100+"%"+"</span>\n" +
            //     "                        </div>\n" +
            //     "                        <ul>\n" +
            //     "                        </ul>\n" +
            //     "                    </li>\n" +
            //     "                </ul>");
            var template = $("#objstatistics_template").html();
            var html = templateReplace(template,{
                obj:data[i].obj,
                favor:data[i].favor*100,
                opposition:data[i].opposition*100
            });
            $(".comment_box").append(html);
            $(".opposition_line").eq(i).width(data[i].opposition*(944-$(".comment_position").eq(i).find("span").width()));
            $(".favor_line").eq(i).width(data[i].favor*(944-$(".comment_position").eq(i).find("span").width()));
            for(var j=0;j<data[i].opposition_comment.length;j++){
                $(".li2").eq(i).find("ul").append("<li>"+data[i].opposition_comment[j]+"</li>")
            }
            for(var k=0;k<data[i].favor_comment.length;k++){
                $(".li1").eq(i).find("ul").append("<li>"+data[i].favor_comment[k]+"</li>")
            }
        }
        //反对评论与支持评论轮换
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
    },"json");

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
                data: ["一", "二", "三", "四", "五", "六", "七", "八", "九"],
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
                type: "log",
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
                data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669],
                itemStyle:{
                    normal: {
                        color:"#5CC6D0",
                        borderWidth:8,
                        lineStyle: {        // 系列级个性化折线样式
                            width: 3,
                            color:"#5CC6D0"
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
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/getEmotionTrend"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    line_x.push(result[i].xData);    //挨个取出类别并填入类别数组
                }
                for(var f=0;f<result.length;f++){
                    line_y.push(result[f].yData);    //挨个取出销量并填入销量数组
                }
                trend_line.setOption({
                    xAxis: {
                        data: line_x
                    },
                    series: [{
                        data: line_y
                    }]
                });
                trend_line.hideLoading();    //隐藏加载动画
            }
        },
        error:function (errorMsg) {
            alert("热度走势图表加载失败");
            trend_line.hideLoading();
        }
    });


    //新闻网络报道量占比
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
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/getNewsStatistics"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    temp = {value:result[i].newsValue,name:result[i].newsName};
                    legend_data.push(result[i].newsName);
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
            }
        },
        error:function (errorMsg) {
            alert("情感分析图表加载失败");
            news_percent.hideLoading();
        }
    });

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
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/getEmotionStatistics"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    temp1 = {value:result[i].emotionValue,name:result[i].emotionName};
                    legend_data1.push(result[i].emotionName);
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
            }
        },
        error:function (errorMsg) {
            alert("情感分析图表加载失败");
            emotion_percent.hideLoading();
        }
    });

    //关键词词云
    function createRandomItemStyle() {
        return {
            normal: {
                color: 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')'
            }
        };
    }
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
                    textStyle: createRandomItemStyle()
                },
                {
                    name: "Macys",
                    value: 10000,
                    textStyle: createRandomItemStyle()
                },
                {
                    name: "Amy Schumer",
                    value: 4386,
                    textStyle: createRandomItemStyle()
                },
                {
                    name: "Jurassic World",
                    value: 4055,
                    textStyle: createRandomItemStyle()
                },
                {
                    name: "Charter Communications",
                    value: 2467,
                    textStyle: createRandomItemStyle()
                },
                {
                    name: "胡伟",
                    value: 10,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Planet Fitness",
                    value: 1898,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Pitch Perfect",
                    value: 1484,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Express",
                    value: 1112,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Home",
                    value: 965,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Johnny Depp",
                    value: 847,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Lena Dunham",
                    value: 582,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Lewis Hamilton",
                    value: 555,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "KXAN",
                    value: 550,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Mary Ellen Mark",
                    value: 462,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Farrah Abraham",
                    value: 366,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Rita Ora",
                    value: 360,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Serena Williams",
                    value: 282,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "NCAA baseball tournament",
                    value: 273,
                    itemStyle: createRandomItemStyle()
                },
                {
                    name: "Point Break",
                    value: 265,
                    itemStyle: createRandomItemStyle()
                }
            ]
        }
        ]
    };
    key_word.setOption(key_option);

    //获取关键词信息
    var key_temp = {};
    var key_data = [];
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/getEventKeyword"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    key_temp = {name:result[i].keywordName,value:result[i].keywordValue,textStyle:createRandomItemStyle()};
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
        error:function (errorMsg) {
            alert("关键词图表加载失败");
            key_word.hideLoading();
        }
    });
});
