/**
 * Dibuja las cargas para la pagina de 2cargas de acuerdo a los valores ingresados por el usuario
 */
function draw_2circ(r1,r2) {
    var r=60;
    var x = 150;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var Q1=Number(document.getElementById("carga1").value) * convertir_unidades("medidacarga1");
    var Q2=Number(document.getElementById("carga2").value) * convertir_unidades("medidacarga2");
    if(Q1<0){Q1=Q1*(-1);}
    if(Q2<0){Q2=Q2*(-1);}

    console.log("Q1 " + Q1 + "   Q2 " + Q2);

    if(Q1>Q2){
        Q1=1;
        if(Q2<1 && Q2>0){
            Q2=Q2;
        }
        else{
            Q2=1/Q2;
        }
    }
    else if(Q2>Q1){
        Q2=1;
        if(Q1<1 && Q1>0){
            Q1=Q1;
        }
        else{
            Q1=1/Q1;
        }
    }
    else if(Q1==Q2){
        Q2=1;
        Q1=1;
    }

    console.log("Q1 " + Q1 + "   Q2 " + Q2);

    r1=r*Q1;
    r2=r*Q2;

    console.log("R1 " + r1 + "   R2 " + r2);

    if(r1<17) {r1=17;}
    if(r2<17) {r2=17;}

    var color;
    var color2;

    color =colorcarga("carga1");
    color2 =colorcarga("carga2");

    ctx.clearRect(0, 0, c.width, c.height);

    ctx.lineWidth = 8;
    if (color == 1) {
        ctx.strokeStyle = "blue";
    }
    if (color == 0) {
        ctx.strokeStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(x, 300, r1, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 8;
    if (color2 == 1) {
        ctx.strokeStyle = "blue";
    }
    if (color2 == 0) {
        ctx.strokeStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(600 - x, 300, r2, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth= 5;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(x,420);
    ctx.lineTo(600-x,420);
    ctx.stroke();

    ctx.lineWidth= 2;

    ctx.beginPath();
    ctx.moveTo(x, 308 + r1);
    ctx.lineTo(x, 420);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(600-x, 308 + r2);
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
 * Realiza los calculos con las variables convertidas a metros y coulombs para
 * dar como resultado la fuerza entre las cargas
 */
function calculos2() {
    var q1=Number(document.getElementById("carga1").value) * convertir_unidades("medidacarga1");
    var q2=Number(document.getElementById("carga2").value) * convertir_unidades("medidacarga2");
    var dist=Number(document.getElementById("distancia").value) * convertir_unidades("tipodistancia");

    if(q1<0){q1=q1*(-1);}
    if(q2<0){q2=q2*(-1);}

    var ke = 9*1000000000;

    draw_2circ(q1,q2);

    var fuerza = ke*((q1*q2)/(dist*dist));

    document.getElementById("resultado").innerHTML ="Resultado = " + fuerza + "N";
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
}
/**
 * Se ingresa el id del tipo de unidad y devuelve el numero a multiplicar la variable para obtener la variable
 * en metros o coulombs
 * @param id (tipo de unidad)
 * @returns {number} numero a multiplicar la variable
 */
function convertir_unidades(id) {
    id=document.getElementById(id).value;
    if(id=="cm") {
        return (1/100);
    }
    if(id=="mC") {
        return (1/1000);
    }
    if(id=="uC") {
        return (1/1000000);
    }
    return 1;
}

/**
 * Resetea canvas e inputs
 */
function reset() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    document.getElementById("carga1").value="";
    document.getElementById("carga2").value="";
    document.getElementById("distancia").value="";
    document.getElementById("resultado").value="";
}

