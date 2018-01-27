$(document).ready(function () {
    $(".title:first").click(function () {
        window.location.href = "../html/homepage.html"
    });
    var arr =location.search;
    var f_input = arr.split("&",1);
    var input = f_input + "&pid=3";
    //tab跳转设置
    $(".tab_box a").eq(0).attr("href","../html/news.html"+f_input+"&pid=1");
    $(".tab_box a").eq(1).attr("href","../html/weibo.html"+f_input+"&pid=2");
    $(".tab_box a").eq(2).attr("href","../html/zhihu.html"+f_input+"&pid=3");

    var projectUrl = "http://112.74.175.37:8080/University/weibo";
    //模板
    function templateReplace(template,data) {
        var reg = null;
        for(var key in data){
            reg = new RegExp("{{\s*" + key + "\s*}}",'g');
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
                    var template = $("#zhihu_news_template").html();
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

    //获取意见领袖表和观点挖掘数据
    $.ajax({
        type:"get",
        async : true,
        timeout:5000,
        url:projectUrl+"/getUsername"+input,
        dataType:'json',
        success:function (result) {
            if(result){
                for(var i=0;i<result.length;i++){
                    $(".user_ul:first").append("<li>\n" +
                        "<span class=\"order_num\">"+(i+1)+"</span>\n" +
                        "<span class=\"event\">"+result[i].username+"</span>\n" +
                        "</li>");
                    $(".user_ul").eq(1).append("<li>\n" +
                        "<span class=\"user_name\">"+result[i].username+"</span>\n" +
                        "<ul class=\"comment_word\">\n" +
                        "</ul>\n" +
                        "</li>");
                    for(var j=0;j<result[i].comment_word.length;j++){
                        $(".comment_word:last").append("<li>"+result[i].comment_word[j]+"</li>")
                    }
                }
            }
        },
        error:function (errorMsg) {
            alert("意见领袖表和观点挖掘数据加载失败");
        }
    });
});
