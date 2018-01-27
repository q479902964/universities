$(document).ready(function () {
    //点击logo回到首页
    $(".title:first").click(function () {
        window.location.href = "../html/homepage.html"
    });
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
    function trendicon(trend) {
        var icon=null;
        if(trend==0){
            icon ="../img/upTriangle.png";
        }else if(trend==-1){
            icon ="../img/upTriangle.png";
        }else{
            icon ="../img/downTriangle.png";
        }
        return icon;
    }
    function index_symbol(index) {
        var symbol=null;
        if(index>=0){
            symbol ="+";
        }else{
            symbol ="";
        }
        return symbol;
    }
    //ajax获取学校排行榜数据
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:"http://112.74.175.37:8080/University/school/schoolOrder",
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    var template = $("#school_data_template").html();
                    var html = templateReplace(template,{
                        school_id:result[i].school_id,
                        order_num:result[i].order_num,
                        school_icon:result[i].school_icon,
                        school_name:result[i].school_name,
                        heat_index:result[i].heat_index,
                        index_movement:index_symbol(result[i].index_movement)+result[i].index_movement,
                        trend_icon:trendicon(result[i].trend)
                    });
                    $(".school_rank ul").append(html);
                }
            }
        },
        error:function (errorMsg) {
            alert("学校排行榜数据加载失败");
        }
    });
    //ajax获取热点事件列表分类信息
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:"http://112.74.175.37:8080/University/event/index",
        dataType:'json',
        success:function (result) {
            if(result){
                $(".hot_events").append("<ul class=\"event_info\"></ul>");
                var template =$("#event_template").html();
                var l=0;
                for(var i=0;i<result.length;i++) {
                    for(var j=0;j<result[i].event_info.length;j++){
                        l++;
                        var html = templateReplace(template,{
                            id:result[i].event_info[j].id,
                            order_num:l,
                            event:result[i].event_info[j].event
                        });
                        $(".event_info:last-child").append(html);
                    }
                }
                for(var i=0;i<result.length;i++) {
                    $("#list ul").append("<li><div><span>"+result[i].obj+"</span></div></li>");
                    $(".hot_events").append("<ul class=\"event_info\" style='display: none'></ul>");
                    for(var j=0;j<result[i].event_info.length;j++){
                        var html = templateReplace(template,{
                            id:result[i].event_info[j].id,
                            order_num:j+1,
                            event:result[i].event_info[j].event
                        });
                        $(".event_info:last-child").append(html);
                    }
                }
                //事件类型过滤显示
                $(".obj_show:first").click(function () {
                    if($("#list").css("display")=="none"){
                        $("#list").slideDown(200);
                    }else {
                        $("#list").slideUp(200);
                    }
                })

                //事件类型过滤点击事件
                $("#list ul li").click(function () {
                    var index = $(this).index();
                    $("#list").hide();
                    for(var i=0;i<$(".event_info").length;i++){
                        $(".event_info").eq(i).hide();
                    }
                    $(".obj_show span").text($(this).find("div").find("span").text());
                    $(".event_info").eq(index+1).show();
                })
            }
        },
        error:function (errorMsg) {
            alert("热点事件列表数据加载失败");
        }
    });



});
