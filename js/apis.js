var mapa; // Mapa que vamos a modificar
// var geolocation;
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     geolocation = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };    
//   });
// }

var cordLat = -32.9477
var cordLong = -60.6305;
/* Crear la variable posicionCentral con las coordenadas donde se va a centrar el mapa */
var posicionCentral = {lat: cordLat, lng: cordLong};

// Inicializa el mapa con un valor de zoom y una locación en el medio
function inicializarMapa () {
    /* Modificá la variable mapa con el constructor Map().
    Tendrás que asignarle un valor de zoom y
    un centro igual a la variable posicionCentral. */
    mapa = new google.maps.Map(document.getElementById('map'), {
    	center: posicionCentral,
    	zoom: 15
    });
    

  geocodificadorModulo.inicializar()
  marcadorModulo.inicializar()
  direccionesModulo.inicializar()
  lugaresModulo.inicializar()
  streetViewModulo.inicializar()
}
