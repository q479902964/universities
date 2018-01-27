$(document).ready(function () {
    $(".title:first").click(function () {
        window.location.href = "../html/homepage.html"
    });
    var arr =location.search;
    var f_input = arr.split("&",1);
    var input = f_input + "&pid=2";
    //tab跳转设置
    $(".tab_box a").eq(0).attr("href","../html/news.html"+f_input+"&pid=1");
    $(".tab_box a").eq(1).attr("href","../html/weibo.html"+f_input+"&pid=2");
    $(".tab_box a").eq(2).attr("href","../html/zhihu.html"+f_input+"&pid=3");

    var projectUrl = "http://112.74.175.37:8080/University/weibo";

    //模板
    function templateReplace(template,data) {
        var reg = null;
        for(var key in data){
            reg = new RegExp("{{\s*" +key+"\s*}}",'g');
            template = template.replace(reg,data[key]);
        }
        return template;
    }
    //ajax获取事件信息
        $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:"http://112.74.175.37:8080/University/event/eventDetail"+input,
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

    //ajax获取微博新闻列表
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/newsList"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    var template = $("#weibo_news_template").html();
                    var html = templateReplace(template,{
                        news_title:result[i].news_title,
                        news_author:result[i].news_author,
                        news_content:result[i].news_content,
                        forward_num:result[i].forward_num,
                        comment_num:result[i].comment_num,
                        thumbsup_num:result[i].thumbsup_num
                    });
                    $(".weibo_news ul").append(html);
                }
            }
        },
        error:function (errorMsg) {
            alert("微博新闻列表加载失败");
        }
    });
    //微博传播链图表
    var chain_line = echarts.init(document.getElementById("chain_charts"));
    //ajax获取新闻传播链数据
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/transTree"+input,
        dataType:'json',
        success:function (result) {
            if(result){
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

                            data: [result]
                        }
                    ]
                })
            }
        },
        error:function (errorMsg) {
            alert("新闻传播链数据加载失败");
        }
    });
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
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/ageStatistics"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    age_temp = {value:result[i].ageValue,name:result[i].ageName};
                    legend_age.push(result[i].ageName);
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
            }
        },
        error:function (errorMsg) {
            alert("关注者年龄分布图表数据加载失败");
            age_pie.hideLoading();
        }
    });
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
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/sexStatistics"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    sex_temp = {value:result[i].sexValue,name:result[i].sexName};
                    legend_sex.push(result[i].sexName);
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
            }
        },
        error:function (errorMsg) {
            alert("性别分布图表数据加载失败");
            sex_pie.hideLoading();
        }
    });
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
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/areaStatistics"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    area_temp = {value:result[i].areaValue,name:result[i].areaName};
                    legend_area.push(result[i].areaName);
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
        error:function (errorMsg) {
            alert("地图数据加载失败");
            area_map.hideLoading();
        }
    });

    //ajax话题链数据获取
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:"http://112.74.175.37:8080/University/event/typeAndTopic"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.topic.length;i++){
                    $(".ca_box ul").append("<li>"+result.topic[i]+"</li>")
                }
            }
        },
        error:function (errorMsg) {
            alert("话题链数据加载失败");
        }
    });

    //ajax获取意见领袖表数据
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/getUsername"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result[0].username.length;i++){
                    $(".user_ul:first").append("<li>\n" +
                        "<span class=\"order_num\">"+(i+1)+"</span>\n" +
                        "<span class=\"event\">"+result[0].username[i]+"</span>\n" +
                        "</li>");
                }
            }
        },
        error:function (errorMsg) {
            alert("意见领袖表数据加载失败");
        }
    });
});
