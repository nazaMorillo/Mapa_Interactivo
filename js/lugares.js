lugaresModulo = (function () {
  //var servicioLugares; // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

    // Completa las direcciones ingresadas por el usuario a y establece los límites
    // con un círculo cuyo radio es de 20000 metros.
  function autocompletar () {
        /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
        página (las direcciones ingresables por el usuario).
        Para esto creá un círculo con radio de 20000 metros y usalo para fijar
        los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */
  }

    // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar () {
    //servicioLugares = new google.maps.places.PlacesService(mapa);
    autocompletar()
  }

    // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca (posicion, tipoDelugar) {
        /* Completar la función buscarCerca  que realice la búsqueda de los lugares
    del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
    pasado como parámetro y llame a la función marcarLugares. */
    var radio = new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
            map: mapa,
            center: posicion,
            radius: 1500
          });
    var request = {
      location: posicion,
      radius: radio,
      types: tipoDelugar
    };
    var servicioLugares = new google.maps.places.PlacesService(mapa);
    //servicioLugares = new google.maps.places.PlacesService(mapa);
    alert(servicioLugares);
    servicioLugares.nearbySearch(request, marcadorModulo.marcarLugares(results, status));

  }
  return {
    inicializar,
    buscarCerca
  }
})()
