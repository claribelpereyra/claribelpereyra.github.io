/* selecciona los siguientes elementos y almacénalos en una variable:
    - header
    - etiqueta h1
    - #intro
    - #nudo
    - #fin
    */

// header: agregarle un elemento div con la clase .overlay como último elemento hijo
// -- append()

// a la etiqueta h1 agregarle el atributo class cuyo valor sea .titular
// -- addClass()

//intro: antes del párrafo, agregar un elemento con la clase .line
// -- before()

// nudo: agrega, luego del contenido, un objeto con la clase .overlay

// fin: agrega luego de él un objeto con la clase .divisor guardado en la siguiente variable
// -- after()

// a este último elemento (.divisor) agregale un párrafo con tu nombre y apellido
// -- html()

var header = $("header");
var h1 = $("h1");
var intro = $("#intro");
var documento = $("html");

var nudo = $("#nudo");
var fin = $("#fin");

header.append(`<div class="overlay"></div>`);
h1.addClass("titular");
intro.find("p").before(`<div class="line"></div>`);
nudo.append(`<div class="overlay"></div>`);
fin.after(`<div class="divisor"></div>`);
$(".divisor").html(`<p>Claribel Pereyra</p>`);
