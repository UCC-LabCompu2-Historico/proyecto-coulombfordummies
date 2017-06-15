/**
 * Dibuja las cargas para la pagina de 2cargas de acuerdo a los valores ingresados por el usuario
 */
function draw_2arcs() {
    var r = 60;
    var x = 150;
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    var ctx2 = c.getContext("2d");

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

    ctx2.lineWidth = 8;
    if (color2 == 1) {
        ctx2.strokeStyle = "blue";
    }
    if (color2 == 0) {
        ctx2.strokeStyle = "red";
    }

    ctx2.beginPath();
    ctx2.arc(600 - x, 300, r, 0, 2 * Math.PI);
    ctx2.stroke();
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