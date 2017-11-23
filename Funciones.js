/**
 * Dibuja una flecha con las coordenadas indicadas
 * @method drawArrow
 *
 * @param fromx coordenada en x donde se empieza la flecha
 * @param fromy coordenada en y donde se empieza la flecha
 * @param tox coordenada en x donde se termina la flecha
 * @param toy coordenada en y donde se termina la flecha
 */
function drawArrow(fromx, fromy, tox, toy){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var headlen = 10;

    var angle = Math.atan2(toy-fromy,tox-fromx);

    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fill();
}

/**
 * Dibuja las cargas para la pagina de 2cargas de acuerdo a los valores ingresados por el usuario
 * @method draw_2circ
 *
 * NOTA: la funcion toma los valores de las cargas y evalua cual es el mas grande para poder realizar el dibujo a escala.
 * NOTA: la funcion toma los valores de las cargas y evalua si son mayores o menores a cero para dibujar las cargas
 * rojas o azules respectivamente.
 */
var inter;
function draw_2circ() {
    var r = 60;
    var x = 150;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var Q1 = Number(document.getElementById("carga1").value) * convertir_unidades("medidacarga1");
    var Q2 = Number(document.getElementById("carga2").value) * convertir_unidades("medidacarga2");
    if (Q1 < 0) {
        Q1 = Q1 * (-1);
    }
    if (Q2 < 0) {
        Q2 = Q2 * (-1);
    }

    console.log("Q1 " + Q1 + "   Q2 " + Q2);

    if (Q1 > Q2) {
        Q1 = 1;
        if (Q2 < 1 && Q2 > 0) {
            Q2 = Q2;
        }
        else {
            Q2 = 1 / Q2;
        }
    }
    else if (Q2 > Q1) {
        Q2 = 1;
        if (Q1 < 1 && Q1 > 0) {
            Q1 = Q1;
        }
        else {
            Q1 = 1 / Q1;
        }
    }
    else if (Q1 == Q2) {
        Q2 = 1;
        Q1 = 1;
    }

    console.log("Q1 " + Q1 + "   Q2 " + Q2);

    var r1 = r * Q1;
    var r2 = r * Q2;

    console.log("R1 " + r1 + "   R2 " + r2);

    if (r1 < 17) {
        r1 = 17;
    }
    if (r2 < 17) {
        r2 = 17;
    }

    var color;
    var color2;

    color = colorcarga("carga1");
    color2 = colorcarga("carga2");

    ctx.clearRect(0, 0, c.width, c.height);

    clearInterval(inter);

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

    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(x, 420);
    ctx.lineTo(600 - x, 420);
    ctx.stroke();

    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x, 308 + r1);
    ctx.lineTo(x, 420);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(600 - x, 308 + r2);
    ctx.lineTo(600 - x, 420);
    ctx.stroke();

    var l = document.getElementById("distancia").value;
    var m = document.getElementById("tipodistancia").value;
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(Number(l) + " " + m, 300, 450);

    var q1 = document.getElementById("carga1").value;
    var q2 = document.getElementById("carga2").value;
    var t1 = document.getElementById("medidacarga1").value;
    var t2 = document.getElementById("medidacarga2").value;
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Q1= " + Number(q1) + " " + t1, x, 225);
    ctx.fillText("Q2= " + Number(q2) + " " + t2, 600 - x, 225);

    var h = 0;

    inter = setInterval(function () {
        if(color == color2){
            if((x-r1-7-h) > 15){
                h++;
                ctx.beginPath();
                ctx.rect(0, 290, x-r1-5, 20);
                ctx.fillStyle = "#d4eaff";
                ctx.fill();
                drawArrow(x-r1-15,300,x-r1-15-h,300);
            }
            else{
                clearInterval(inter);
            }
        }
        else{
            if((x+r1+7+h) < 285){
                h++;
                ctx.beginPath();
                ctx.rect(x+r1+5, 290, 150, 20);
                ctx.fillStyle = "#d4eaff";
                ctx.fill();
                drawArrow(x+r1+15,300,x+r1+15+h,300);
            }
            else{
                clearInterval(inter);
            }
        }
    }, 1000 / 35);
}

/**
 * Dibuja las cargas para la pagina de 3cargas de acuerdo a los valores ingresados por el usuario
 * @method draw_3circ
 *
 * NOTA: la funcion toma los valores de las cargas y evalua si son mayores o menores a cero para dibujar las cargas
 * rojas o azules respectivamente.
 */
function draw_3circ() {
    var r = 60;
    var x = 150;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var color;
    var color2;
    var color3;

    color = colorcarga("carga1");
    color2 = colorcarga("carga2");
    color3 = colorcarga("carga3");

    ctx.clearRect(0, 0, c.width, c.height);

    ctx.lineWidth = 8;
    if (color == 1) {
        ctx.strokeStyle = "blue";
    }
    if (color == 0) {
        ctx.strokeStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(x * 2, 175, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 8;
    if (color2 == 1) {
        ctx.strokeStyle = "blue";
    }
    if (color2 == 0) {
        ctx.strokeStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(x, 375, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 8;
    if (color3 == 1) {
        ctx.strokeStyle = "blue";
    }
    if (color3 == 0) {
        ctx.strokeStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(600 - x, 375, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(x, 495);
    ctx.lineTo(600 - x, 495);
    ctx.stroke();

    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x, 383 + r);
    ctx.lineTo(x, 495);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(600 - x, 383 + r);
    ctx.lineTo(600 - x, 495);
    ctx.stroke();

    var l = document.getElementById("distancia").value;
    var m = document.getElementById("tipodistancia").value;
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(Number(l) + " " + m, 300, 525);

    var q1 = document.getElementById("carga1").value;
    var q2 = document.getElementById("carga2").value;
    var q3 = document.getElementById("carga3").value;
    var t1 = document.getElementById("medidacarga1").value;
    var t2 = document.getElementById("medidacarga2").value;
    var t3 = document.getElementById("medidacarga3").value;
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Q1= " + Number(q1) + " " + t1, x * 2, 100);
    ctx.fillText("Q2= " + Number(q2) + " " + t2, x, 300);
    ctx.fillText("Q3= " + Number(q3) + " " + t3, 600 - x, 300);
}

/**
 * Dibuja las cargas para la pagina de 4cargas de acuerdo a los valores ingresados por el usuario
 * @method draw_4circ
 *
 * NOTA: la funcion toma los valores de las cargas y evalua si son mayores o menores a cero para dibujar las cargas
 * rojas o azules respectivamente.
 */
function draw_4circ() {
    var r = 60;
    var x = 150;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    var color;
    var color2;
    var color3;
    var color4;

    color = colorcarga("carga1");
    color2 = colorcarga("carga2");
    color3 = colorcarga("carga3");
    color4 = colorcarga("carga4");

    ctx.clearRect(0, 0, c.width, c.height);

    ctx.lineWidth = 8;
    if (color == 1) {
        ctx.strokeStyle = "blue";
    }
    if (color == 0) {
        ctx.strokeStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(x, 150, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 8;
    if (color2 == 1) {
        ctx.strokeStyle = "blue";
    }
    if (color2 == 0) {
        ctx.strokeStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(600 - x, 150, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 8;
    if (color3 == 1) {
        ctx.strokeStyle = "blue";
    }
    if (color3 == 0) {
        ctx.strokeStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(x, 450, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 8;
    if (color4 == 1) {
        ctx.strokeStyle = "blue";
    }
    if (color4 == 0) {
        ctx.strokeStyle = "red";
    }

    ctx.beginPath();
    ctx.arc(600 - x, 450, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(x, 540);
    ctx.lineTo(600 - x, 540);
    ctx.stroke();

    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x, 458 + r);
    ctx.lineTo(x, 540);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(600 - x, 458 + r);
    ctx.lineTo(600 - x, 540);
    ctx.stroke();

    var l = document.getElementById("distancia").value;
    var m = document.getElementById("tipodistancia").value;
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(Number(l) + " " + m, 300, 525);

    var q1 = document.getElementById("carga1").value;
    var q2 = document.getElementById("carga2").value;
    var q3 = document.getElementById("carga3").value;
    var q4 = document.getElementById("carga4").value;
    var t1 = document.getElementById("medidacarga1").value;
    var t2 = document.getElementById("medidacarga2").value;
    var t3 = document.getElementById("medidacarga3").value;
    var t4 = document.getElementById("medidacarga4").value;
    ctx.font = "28px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Q1= " + Number(q1) + " " + t1, x, 75);
    ctx.fillText("Q2= " + Number(q2) + " " + t2, 600 - x, 75);
    ctx.fillText("Q3= " + Number(q3) + " " + t3, x, 375);
    ctx.fillText("Q4= " + Number(q4) + " " + t4, 600 - x, 375);
}

/**
 * Realiza los calculos con las variables convertidas a metros y coulombs para dar como resultado la fuerza
 * entre las cargas para la pagina de 2 cargas
 * @method calculos2
 */
function calculos2() {
    var q1 = Number(document.getElementById("carga1").value) * convertir_unidades("medidacarga1");
    var q2 = Number(document.getElementById("carga2").value) * convertir_unidades("medidacarga2");
    var dist = Number(document.getElementById("distancia").value) * convertir_unidades("tipodistancia");

    if (q1 < 0) {
        q1 = q1 * (-1);
    }
    if (q2 < 0) {
        q2 = q2 * (-1);
    }

    var ke = 9 * 1000000000;

    draw_2circ();

    var fuerza = ke * ((q1 * q2) / (dist * dist));

    var k = Math.round(fuerza*10000);

    k=k/10000;

    document.getElementById("resultado").innerHTML = "F1 = " + k + " N";
}

/**
 * Realiza los calculos con las variables convertidas a metros y coulombs para dar como resultado la fuerza neta
 * en la carga 1 para la pagina de 3 cargas
 * @method calculos3
 *
 * NOTA: la funcion compara los signos de todas las cargas para poder determinar la situacion planteada
 * y asi calcular la fuerza
 */
function calculos3() {
    var q1 = Number(document.getElementById("carga1").value) * convertir_unidades("medidacarga1");
    var q2 = Number(document.getElementById("carga2").value) * convertir_unidades("medidacarga2");
    var q3 = Number(document.getElementById("carga3").value) * convertir_unidades("medidacarga3");
    var dist = Number(document.getElementById("distancia").value) * convertir_unidades("tipodistancia");

    var ke = 9 * 1000000000;

    var f12, f13, f1x, f2x, f1y, f2y, fx, fy, fuerza;

    if ((q1 > 0 && q2 > 0 && q3 > 0) || (q1 < 0 && q2 < 0 && q3 < 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }

        f1x = f12 * Math.cos(60);
        f2x = f13 * Math.cos(60);

        f1y = f12 * Math.sin(60);
        f2y = f13 * Math.sin(60);

        fx = f1x - f2x;
        fy = f1y + f2y;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }
    else if ((q1 > 0 && q2 > 0 && q3 < 0) || (q1 < 0 && q2 < 0 && q3 > 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }

        f1x = f12 * Math.cos(60);
        f2x = f13 * Math.sin(30);

        f1y = f12 * Math.sin(60);
        f2y = f13 * Math.cos(30);

        fx = f1x + f2x;
        fy = f1y - f2y;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }
    else if ((q1 > 0 && q2 < 0 && q3 > 0) || (q1 < 0 && q2 > 0 && q3 < 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }

        f1x = f12 * Math.sin(30);
        f2x = f13 * Math.cos(60);

        f1y = f12 * Math.cos(30);
        f2y = f13 * Math.sin(60);

        fx = f1x + f2x;
        fy = f2y - f1y;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }
    else if ((q1 > 0 && q2 < 0 && q3 < 0) || (q1 < 0 && q2 > 0 && q3 > 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }

        f1x = f12 * Math.sin(30);
        f2x = f13 * Math.sin(30);

        f1y = f12 * Math.cos(30);
        f2y = f13 * Math.cos(30);

        fx = f2x - f1x;
        fy = f1y + f2y;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }

    if (q1 < 0) {
        q1 = q1 * (-1);
    }
    if (q2 < 0) {
        q2 = q2 * (-1);
    }
    if (q3 < 0) {
        q3 = q3 * (-1);
    }

    draw_3circ();

    var k = Math.round(fuerza*10000);

    k=k/10000;

    document.getElementById("resultado").innerHTML = "F1 = " + k + " N";
}

/**
 * Realiza los calculos con las variables convertidas a metros y coulombs para dar como resultado la fuerza neta
 * en la carga 1 para la pagina de 4 cargas
 * @method calculos4
 *
 * NOTA: la funcion compara los signos de todas las cargas para poder determinar la situacion planteada
 * y asi calcular la fuerza
 */
function calculos4() {
    var q1 = Number(document.getElementById("carga1").value) * convertir_unidades("medidacarga1");
    var q2 = Number(document.getElementById("carga2").value) * convertir_unidades("medidacarga2");
    var q3 = Number(document.getElementById("carga3").value) * convertir_unidades("medidacarga3");
    var q4 = Number(document.getElementById("carga4").value) * convertir_unidades("medidacarga3");
    var dist = Number(document.getElementById("distancia").value) * convertir_unidades("tipodistancia");

    var ke = 9 * 1000000000;

    var f12, f13, f14, f3x, f3y, fx, fy, h, fuerza;

    h = Math.sqrt((dist * dist) + (dist * dist));

    if ((q1 > 0 && q2 > 0 && q3 > 0 && q4 > 0) || (q1 < 0 && q2 < 0 && q3 < 0 && q4 < 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));
        f14 = ke * ((q1 * q4) / (h * h));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }
        if (f14 < 0) {
            f14 = f14 * (-1);
        }

        f3x = f14 * Math.cos(45);

        f3y = f14 * Math.sin(45);

        fx = f12 + f3x;
        fy = f13 + f3y;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }
    else if ((q1 > 0 && q2 > 0 && q3 > 0 && q4 < 0) || (q1 < 0 && q2 < 0 && q3 < 0 && q4 > 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));
        f14 = ke * ((q1 * q4) / (h * h));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }
        if (f14 < 0) {
            f14 = f14 * (-1);
        }

        f3x = f14 * Math.sin(45);

        f3y = f14 * Math.cos(45);

        fx = f3x - f12;
        fy = f13 - f3y;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }
    else if ((q1 > 0 && q2 > 0 && q3 < 0 && q4 > 0) || (q1 < 0 && q2 < 0 && q3 > 0 && q4 < 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));
        f14 = ke * ((q1 * q4) / (h * h));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }
        if (f14 < 0) {
            f14 = f14 * (-1);
        }

        f3x = f14 * Math.cos(45);

        f3y = f14 * Math.sin(45);

        fx = f12 + f3x;
        fy = f3y - f13;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }
    else if ((q1 > 0 && q2 < 0 && q3 < 0 && q4 > 0) || (q1 < 0 && q2 > 0 && q3 > 0 && q4 < 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));
        f14 = ke * ((q1 * q4) / (h * h));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }
        if (f14 < 0) {
            f14 = f14 * (-1);
        }

        f3x = f14 * Math.cos(45);

        f3y = f14 * Math.sin(45);

        fx = f12 - f3x;
        fy = f3y - f13;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }
    else if ((q1 > 0 && q2 < 0 && q3 > 0 && q4 > 0) || (q1 < 0 && q2 > 0 && q3 < 0 && q4 < 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));
        f14 = ke * ((q1 * q4) / (h * h));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }
        if (f14 < 0) {
            f14 = f14 * (-1);
        }

        f3x = f14 * Math.cos(45);

        f3y = f14 * Math.sin(45);

        fx = f12 - f3x;
        fy = f3y + f13;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }
    else if ((q1 > 0 && q2 < 0 && q3 > 0 && q4 < 0) || (q1 < 0 && q2 > 0 && q3 < 0 && q4 > 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));
        f14 = ke * ((q1 * q4) / (h * h));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }
        if (f14 < 0) {
            f14 = f14 * (-1);
        }

        f3x = f14 * Math.cos(45);

        f3y = f14 * Math.sin(45);

        fx = f12 + f3x;
        fy = f13 - f3y;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }
    else if ((q1 > 0 && q2 > 0 && q3 < 0 && q4 < 0) || (q1 < 0 && q2 < 0 && q3 > 0 && q4 > 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));
        f14 = ke * ((q1 * q4) / (h * h));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }
        if (f14 < 0) {
            f14 = f14 * (-1);
        }

        f3x = f14 * Math.cos(45);

        f3y = f14 * Math.sin(45);

        fx = f3x - f12;
        fy = f13 + f3y;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }
    else if ((q1 > 0 && q2 < 0 && q3 < 0 && q4 < 0) || (q1 < 0 && q2 > 0 && q3 > 0 && q4 > 0)) {
        f12 = ke * ((q1 * q2) / (dist * dist));
        f13 = ke * ((q1 * q3) / (dist * dist));
        f14 = ke * ((q1 * q4) / (h * h));

        if (f12 < 0) {
            f12 = f12 * (-1);
        }
        if (f13 < 0) {
            f13 = f13 * (-1);
        }
        if (f14 < 0) {
            f14 = f14 * (-1);
        }

        f3x = f14 * Math.cos(45);

        f3y = f14 * Math.sin(45);

        fx = f12 + f3x;
        fy = f13 + f3y;

        fuerza = Math.sqrt((fx * fx) + (fy * fy));
    }
    if (q1 < 0) {
        q1 = q1 * (-1);
    }
    if (q2 < 0) {
        q2 = q2 * (-1);
    }
    if (q3 < 0) {
        q3 = q3 * (-1);
    }
    if (q4 < 0) {
        q4 = q4 * (-1);
    }

    draw_4circ();

    var k = Math.round(fuerza*10000);

    k=k/10000;

    document.getElementById("resultado").innerHTML = "F1 = " + k + " N";
}

/**
 * Verifica si el usuario ingreso un numero negativo o positivo y devuelve 1 o 0 respectivamente
 * @method colorcarga
 * @param id
 * @return 1, 0;
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
 * Verifica que el dato ingresado no sea un caracter o 0, siendo ese el caso borra el dato ingresado y avisa al usuario
 * del error cometido
 * @method verificarinput
 * @param id
 */
function verificarinput(id) {
    var v = document.getElementById(id).value;
    if (isNaN(v)) {
        alert("Se ingreso un valor invalido en " + id);
        document.getElementById(id).value = "";
    }
    else if (v == 0) {
        alert("Las cargas/distancias no deben ser iguales a cero");
        document.getElementById(id).value = "";
    }
}

/**
 * Se ingresa el id del tipo de unidad y devuelve el numero a multiplicar la variable para obtener el valor
 * en metros o coulombs
 * @method convertir_unidades
 * @param id (tipo de unidad)
 * @return {number} numero a multiplicar la variable
 */
function convertir_unidades(id) {
    id = document.getElementById(id).value;
    if (id == "cm") {
        return (1 / 100);
    }
    if (id == "mC") {
        return (1 / 1000);
    }
    if (id == "uC") {
        return (1 / 1000000);
    }
    return 1;
}

/**
 * Resetea canvas e inputs para la pagina de 2 cargas
 * @method reset2
 */
function reset2() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    clearInterval(inter);
    ctx.clearRect(0, 0, c.width, c.height);

    document.getElementById("carga1").value = "";
    document.getElementById("carga2").value = "";
    document.getElementById("distancia").value = "";
    document.getElementById("resultado").value = "";
}

/**
 * Resetea canvas e inputs para la pagina de 3 cargas
 * @method reset3
 */
function reset3() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    document.getElementById("carga1").value = "";
    document.getElementById("carga2").value = "";
    document.getElementById("carga3").value = "";
    document.getElementById("distancia").value = "";
    document.getElementById("resultado").value = "";
}

/**
 * Resetea canvas e inputs para la pagina de 4 cargas
 * @method reset4
 */
function reset4() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    document.getElementById("carga1").value = "";
    document.getElementById("carga2").value = "";
    document.getElementById("carga3").value = "";
    document.getElementById("carga4").value = "";
    document.getElementById("distancia").value = "";
    document.getElementById("resultado").value = "";
}