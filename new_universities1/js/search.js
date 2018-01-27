$(document).ready(function () {
    $(".title:first").click(function () {
        window.location.href = "../html/homepage.html"
    });
    var input =location.search;//搜索内容
    //模板
    function templateReplace(template,data) {
        var reg = null;
        for(var key in data){
            reg = new RegExp("{{\s*" + key + "\s*}}",'g');
            template = template.replace(reg,data[key]);
        }
        return template;
    }
    //获取相关高校数据
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:"http://112.74.175.37:8080/University/school/search"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    var template = $("#schooldata_template").html();
                    var html = templateReplace(template,{
                        schoolId:result[i].schoolId,
                        schoolIcon:result[i].schoolIcon,
                        school_name:result[i].school_name,
                        english_name:result[i].english_name
                    });
                    $(".school_box").append(html);
                };

            }
        },
        error:function (errorMsg) {
            console.log(errorMsg);
        }

    });
    //获取相关事件数据
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:"http://112.74.175.37:8080/University/event/search"+input,
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
                    $(".related_events .event_info").append(html);
                }
            }
        },
        error:function (errorMsg) {
        }

    })

});
