$("#chatbot-icon, #couns_chat").click(function () {
	$("#icon").css("display", "none");
	$("#div-cross-icon").css("display", "flex");
	$(".chat-screen").css("display", "block");
	start_chat();
});

$("#cross-icon, #cross-icon-m").click(function () {
	$("#div-cross-icon").css("display", "none");
	$("#icon").css("display", "block");
	$(".chat-screen").css("display", "none");
});

function start_chat(){
	jQuery(document).ready(function () {

        var request = jQuery.ajax({
            url: "/chatbot/start-chatting.php",
            method: "POST",
            success: function (data) {
                if(data == "Already__Enabled"){                    
                    //$(".c-content .chats").html("<div class='message new'><figure class='avatar'><img src='/blog/images/favicon.png'></figure>Hey! This is not the first time you are here. What would you like to do?<button onclick='refresh();'>Start Again</button><button onclick='show_chat();'>Continue</button></div>")
                    $("#chatbot-typing").css("display", "none");
                    show_chat();
                }
                else{
                    var str_array = data.split('<!-|||-->');

                    setTimeout(function(){
                        $(".c-content .chats").append(str_array[0]);
                    }, 1000);
                    setTimeout(function(){
                        $(".c-content .chats").append(str_array[1]);
                    }, 3000);
                    setTimeout(function(){
                        $(".c-content .chats").append(str_array[2]);
                        enable_disable("enable");
                        $("#chatbot-typing").css("display", "none");
                    }, 5000);
                }
            }
        });
    });
}

function continue_chat(){
    jQuery(document).ready(function () {

        var msg = $("#message").val();

        if(msg != ""){
            $(".c-content .chats").append("<div class='message message-personal new'>"+msg+"</div>");
            $("#message").val("");
            scrollToBottom();

            var request = jQuery.ajax({
                url: "/chatbot/continue-chatting.php",
                method: "POST",
                data: {msg: msg},
                success: function (data) {                
                    var str_array = data.split('<!-|||-->');

                    setTimeout(function(){
                        $("#chatbot-typing").css("display", "block");
                        scrollToBottom();
                    }, 1000);

                    if(str_array.length == 1){
                        setTimeout(function(){
                            $(".c-content .chats").append(str_array[0]);
                            $("#chatbot-typing").css("display", "none");
                            scrollToBottom();
                        }, 3000);
                    }

                    if(str_array.length == 2){                    
                        setTimeout(function(){
                            $(".c-content .chats").append(str_array[0]);
                            scrollToBottom();
                        }, 3000);

                        setTimeout(function(){
                            $(".c-content .chats").append(str_array[1]);
                            $("#chatbot-typing").css("display", "none");
                            scrollToBottom();
                        }, 5000);
                    }
                    //enable_disable("disable");
                }
            });
        }
    });
}

function scrollToBottom (){
    var objDiv = document.getElementById("c_div");
    objDiv.scrollTop = objDiv.scrollHeight;
}

function enable_disable(attr){
    if(attr == "enable"){
        document.getElementById("message").disabled = false;
        document.getElementById("ms_btn").disabled = false;
    }
    else{
        document.getElementById("message").disabled = true;
        document.getElementById("ms_btn").disabled = true;
    }
}

$('#message').keypress(function (e) {
    var key = e.which;
    if(key == 13)
        continue_chat();
}); 

function show_chat(){
    jQuery(document).ready(function () {

        $(".c-content .chats").html("");
        $("#chatbot-typing").css("display", "none");
        var request = jQuery.ajax({
            url: "/chatbot/continue-chatting.php",
            method: "POST",
            data: {show: "show"},
            success: function (data) {           
                var str_array = data.split('<!-|||-->');
                for(var i = 0; i < str_array.length; i++) {
                   $(".c-content .chats").append(str_array[i]);
                   scrollToBottom();                    
                }
                enable_disable("enable");
            }
        });
    });
}

function refresh(){
    jQuery(document).ready(function () {

        var request = jQuery.ajax({
            url: "/chatbot/start-chatting.php",
            method: "POST",
            data: {refresh: "refresh"},
            success: function (data) {
                $(".c-content .chats").html("");
                enable_disable("disable");
                $("#chatbot-typing").css("display", "block");
                start_chat();
            }
        });
    });
}

function selectO(op){

    var option = op.innerHTML;
    $("#chatbot-typing").css("display", "block");
    scrollToBottom();
    enable_disable("enable");

    var request = jQuery.ajax({
        url: "/chatbot/continue-chatting.php",
        method: "POST",
        data: {option: option},
        success: function (data) {
            setTimeout(function(){
                $("#chatbot-typing").css("display", "none");
                $(".c-content .chats").append(data);
                scrollToBottom();
            }, 2000);
        }
    });
}

if ($(window).width() < 480)
{
    $(".chat-screen .c-header p").html("SmartBot");
}