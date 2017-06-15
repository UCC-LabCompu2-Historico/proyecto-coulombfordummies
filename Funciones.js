/**
 * Dibuja las cargas para la pagina de 2cargas de acuerdo a los valores ingresados por el usuario
 */
function draw_2circ() {
    var r=60;
    /**
    var r1=Number(document.getElementById("carga1").value);
    var r2=Number(document.getElementById("carga2").value);
    */
    var x = 150;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    /**
    if(r1>r2){
        r1=1;
        r2=1/r2;
    }
    else{
        r2=1;
        r1=1/r2;
    }

    r1=r*r1;
    r2=r*r2;
    */

    var color;
    var color2;

    color =colorcarga("carga1");
    color2 =colorcarga("carga2");

    ctx.lineWidth = 8;
    if (color == 1) {
        ctx.strokeStyle = "blue";
    }
    if (color == 0) {
        ctx.strokeStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(x, 300, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 8;
    if (color2 == 1) {
        ctx.strokeStyle = "blue";
    }
    if (color2 == 0) {
        ctx.strokeStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(600 - x, 300, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth= 5;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(x,420);
    ctx.lineTo(450,420);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([7, 5]);
    ctx.moveTo(x, 368);
    ctx.lineTo(x, 420);
    ctx.stroke();

    ctx.beginPath();
    ctx.setLineDash([7, 5]);
    ctx.moveTo(600-x, 368);
    ctx.lineTo(600-x, 420);
    ctx.stroke();

    var l=document.getElementById("distancia").value;
    var m=document.getElementById("tipodistancia").value;
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(Number(l)+ " " +m,300,450);

    var q1=document.getElementById("carga1").value;
    var q2=document.getElementById("carga2").value;
    var t1=document.getElementById("medidacarga1").value;
    var t2=document.getElementById("medidacarga2").value;
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(Number(q1)+" "+t1,x,225);
    ctx.fillText(Number(q2)+" "+t2,600-x,225);
}

/**
 * Verifica si el usuario ingreso un numero negativo o positivo y devuelvo 1 o 0 respectivamente
 * @param id
 */

function colorcarga(id) {
    var d1;
    var c1 = document.getElementById(id).value;
    if (Number(c1) < 0) {
        d1 = 1;
    }
    else {
        d1 = 0;
    }
    return d1;
}

/**
 * Verifica que el dato ingresado no sea un caracter o 0, siendo ese el caso borra el dato ingresado
 * @param id
 */

function verificarinput(id) {
    var v=document.getElementById(id).value;
    if(isNaN(v)){
        alert("Se ingreso un valor invalido en " + id);
        document.getElementById(id).value="";
    }
    else if(v==0) {
        alert("Las cargas/distancias no deben ser iguales a cero");
        document.getElementById(id).value="";
    }
    if(id="tipodistancia"){

    }
}

/**
function escala2(c1,c2){
    if(c1>c2){
        c1=1;
        c2=1/c2;
    }
    else{
        c2=1;
        c1=1/c1;
    }
}
 */

