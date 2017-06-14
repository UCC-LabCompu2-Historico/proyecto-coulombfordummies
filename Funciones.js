/**
 * Created by Alumno on 07/06/2017.
 */
function draw_2arcs(){
    var r = 60;
    var x = 150;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var ctx2 = c.getContext("2d");

    var color = calcular(color);

    ctx.lineWidth=8;
    if(color==1){
        ctx.strokeStyle="blue";
    }
    if(color==0){
        ctx.strokeStyle="red";
    }

    ctx.beginPath();
    ctx.arc(x, 300, r, 0, 2 * Math.PI);
    ctx.stroke();

    var color2 = calcular(color2);

    ctx2.lineWidth=8;
    if(color2==1){
        ctx2.strokeStyle="blue";
    }
    if(color2==0){
        ctx2.strokeStyle="red";
    }

    ctx2.beginPath();
    ctx2.arc(600-x, 300, r, 0, 2 * Math.PI);
    ctx2.stroke();
}

function calcular(color,color2){
    var c1 = document.getElementById("carga1").value;
    var c2 = document.getElementById("carga2").value;
    if(Number(c1)<0){color=1;}
    else{color=0;}
    if(Number(c2)<0){color2=1;}
    else{color2=0;}
}

