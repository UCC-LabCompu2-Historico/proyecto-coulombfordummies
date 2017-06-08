/**
 * Created by Alumno on 07/06/2017.
 */
function draw_2arcs(){
    var r = 60;
    var x = 150;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var ctx2 = c.getContext("2d");

    ctx.lineWidth=8;
    ctx.strokeStyle="blue";

    ctx.beginPath();
    ctx.arc(x, 300, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx2.lineWidth=8;
    ctx2.strokeStyle="red";

    ctx2.beginPath();
    ctx2.arc(600-x, 300, r, 0, 2 * Math.PI);
    ctx2.stroke();
}