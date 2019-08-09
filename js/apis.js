var mapa; // Mapa que vamos a modificar
var cordLat = -34.6037389
var cordLong = -58.3815704;

/* Crear la variable posicionCentral con las coordenadas donde se va a centrar el mapa */
var posicionCentral = {lat: cordLat, lng: cordLong};
// Inicializa el mapa con un valor de zoom y una locación en el medio
function inicializarMapa () {
    /* Modificá la variable mapa con el constructor Map().
    Tendrás que asignarle un valor de zoom y
    un centro igual a la variable posicionCentral. */
    mapa = new google.maps.Map(document.getElementById('map'), {
    	center: posicionCentral,
    	zoom: 10
    });

  geocodificadorModulo.inicializar()
  marcadorModulo.inicializar()
  direccionesModulo.inicializar()
  lugaresModulo.inicializar()
  streetViewModulo.inicializar()
}
