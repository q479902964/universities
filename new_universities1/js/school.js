$(document).ready(function () {
    $(".title:first").click(function () {
        window.location.href = "../html/homepage.html"
    });
    var input =location.search;
    var projectUrl = "http://112.74.175.37:8080/University/school";

    //模板
    function templateReplace(template, data)
    {
        var reg = null;
        for(var key in data)
        {
            reg = new RegExp("{{\s*" + key + "\s*}}", 'g');
            template = template.replace(reg, data[key])
        }
        return template;
    }

    //高校信息获取
        $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl + "/schoolDetail"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                $(".chinese_name").text(result.school_name);
                $(".english_name").text(result.english_name);
                $(".introduce").text(result.introduce);
                $(".school_icon").attr("src",result.schoolIcon);
            }
        },
        error:function (errorMsg) {
            alert("热点事件列表数据加载失败");
        }
    });

    //活跃用户信息获取
        $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:"http://112.74.175.37:8080/University/school/activeUser"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++) {
                    for (var j = 0; j < result[i].user_name.length; j++) {
                        $(".user_ul").eq(i).append("<li>\n" +
                            "<span class=\"order_num\">" + (j + 1) + "</span>\n" +
                            "<span class=\"event\">" + result[i].user_name[j] + "</span>\n" +
                            "</li>")
                    }
                    $(".user_ul").eq(i).append("<div class=\"click_more\">\n" +
                        "<h1>更&nbsp;&nbsp;&nbsp;多</h1>\n" +
                        "</div>");
                }
                //活跃用户tab选项卡设置
                $(".tab_li a:first").css({"border-bottom":"2px solid #5CC6D0"});
                $(".user_ul:first").css("display","block");
                if($(".user_ul:first").find("li").length>4){
                    for(var i=4;i<=$(".user_ul:first").find("li").length;i++){
                        $(".user_ul:first").find("li").eq(i).hide();
                    }
                    $(".click_more").click(function () {
                        for(var i=4;i<=$(".user_ul:first").find("li").length;i++){
                            $(".user_ul:first").find("li").eq(i).show();
                        }
                        $(".click_more").eq(0).hide();
                    })
                }else{
                    $(".click_more").eq(0).hide();
                }
                $(".tab_li a").click(function () {
                    var index = $(this).index();
                    console.log($(".click_more").eq(index).css("display"));
                    if($(".click_more").eq(index).css("display")=="none"){
                        for(var i=4;i<=$(".user_ul").eq(index).find("li").length;i++){
                            $(".user_ul").eq(index).find("li").eq(i).show();
                        }
                    }else{
                        if($(".user_ul").eq(index).find("li").length>4){
                            // console.log($(".click_more").eq(index).css("display"));
                            // $(".click_more").eq(index).show();
                            for(var i=4;i<=$(".user_ul").eq(index).find("li").length;i++){
                                $(".user_ul").eq(index).find("li").eq(i).hide();
                            }
                            $(".click_more").click(function () {
                                for(var i=4;i<=$(".user_ul").eq(index).find("li").length;i++){
                                    $(".user_ul").eq(index).find("li").eq(i).show();
                                }
                                $(".click_more").eq(index).hide();
                            })
                        }else {
                            $(".click_more").eq(index).hide();
                        }
                    }
                    for(var i=0;i<$(".tab_li a").length;i++){
                        $(".tab_li a").css({"border-bottom":"0"});
                        $(".user_ul").eq(i).hide();
                    }
                    $(".tab_li a").eq(index).css({"border-bottom":"2px solid #5CC6D0"});
                    $(".user_ul").eq(index).show();
                });

            }
        },
        error:function (errorMsg) {
            alert("活跃用户信息加载失败");
        }
    });


    //高校热度概况图表
    var mychart = echarts.init(document.getElementById("heat_chart"));
    var dataStyle = {
        normal: {
            label: {show:false},
            labelLine: {show:false},
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                // 0% 处的颜色
                offset: 0, color: '#44ADEC'  },
                {
                    offset: 1, color: '#5CC6D0'
                }], false)
        }
    };
    var placeHolderStyle = {
        normal : {
            color: 'rgba(0,0,0,0)',
            label: {show:false},
            labelLine: {show:false}
        },
        emphasis : {
            color: 'rgba(0,0,0,0)'
        }
    };
    var option = {
        backgroundColor:"#fff",
        title: {
            text: '87.00',
            x: 'center',
            y: 'center',
            itemGap: 20,
            textStyle : {
                color : '#585858',
                fontFamily : 'SourceHanSansCN-Heavy',
                fontSize : 48
            }
        },
        tooltip : {
            show: true,
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : document.getElementById('heat_chart').offsetWidth / 2,
            y : 45,
            itemGap:12,
            data:[]
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        series : [
            {
                name:'访问来源',
                type:'pie',
                hoverAnimation:false,
                clockWise:false,
                radius : [80,95],
                itemStyle : dataStyle,
                data:[
                    {
                        value:80.00,
                        name:'影响力'
                    },
                    {
                        value:20.00,
                        name:'invisible',
                        itemStyle : placeHolderStyle
                    }
                ]
            }
        ]
    };
    mychart.setOption(option);
    //高校影响力指数图表配置
    var effect_value = null;
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl + "/schoolEffect"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                effect_value = result.effect_value;
                mychart.setOption({
                    title:{
                        text:result.effect_value
                    },
                    series: [{
                        data: [
                            {
                                value:effect_value,
                                name:'高校热度'
                            },
                            {
                                value:100-effect_value,
                                name:'invisible',
                                itemStyle : placeHolderStyle
                            }
                        ]
                    }]
                });
                mychart.hideLoading();    //隐藏加载动画
            }
        },
        error:function (errorMsg) {
            alert("高校热度图表加载失败");
            mychart.hideLoading();
        }
    });



    //关键词配置
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
    var key_word = echarts.init(document.getElementById("key_chart"));
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
        }]
    };
    key_word.setOption(key_option);
    //获取关键词信息
    var key_temp = {};
    var key_data = [];
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/getKeyword"+input,
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
    //学校事件列表
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/getEventList"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    var template = $("#event_template").html();
                    var html = templateReplace(template,{
                        event_id:result[i].event_id,
                        order_num:i+1,
                        event:result[i].event_title
                    });
                    $(".event_info").append(html);
                }
            }
        },
        error:function (errorMsg) {
            alert("学校事件列表加载失败");
        }
    });
});
