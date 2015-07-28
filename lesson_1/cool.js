/**
 * Created by Jianing on 15-7-21.
 */


window.onload = init;
function init(){

    var img=0;
    document.getElementById("button1").addEventListener("click", function(e){
        //alert("fatboyfriend is so cool");
        if(img==0){
            document.getElementById("img").setAttribute("src","cool1.JPG");
            img++;
        }
        else{
            document.getElementById("img").setAttribute("src","cool2.JPG");
            img--;
        }
    });
    document.getElementById("text1").addEventListener("input",function(e){
        document.getElementById("p1").innerHTML=document.getElementById("text1").value;
    });
    $("#text2").bind("input", function(e){
        $("#p2").html($("#text2").val());
    });
    $("#button2").bind("click",function(e){
        if(img==0){
        $("#img").attr("src","cool1.JPG");
        img++;
        }
        else{
            $("#img").attr("src","cool2.JPG");
            img--;
        }
    });


}
