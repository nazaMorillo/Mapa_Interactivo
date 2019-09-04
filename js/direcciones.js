direccionesModulo = (function () {
  var servicioDirecciones // Servicio que calcula las direcciones
  var mostradorDirecciones // Servicio muestra las direcciones
  var originInput = document.getElementById('desde');
  var destinationInput = document.getElementById('hasta');
  var agregarInput = document.getElementById('agregar');

    // Calcula las rutas cuando se cambian los lugares de desde, hasta o algun punto intermedio
  function calcularRutasConClic () {
    var selector = document.getElementById('comoIr');
    selector.addEventListener('change', function () {
      console.log('%c Selector: ',' color: red; font-weight: bold;');
      console.log(selector.value);
      direccionesModulo.calcularYMostrarRutas()
    })

    document.getElementById('calcularMuchos').addEventListener('click', function () {
      direccionesModulo.calcularYMostrarRutas()
    })

    var listasLugares = document.getElementsByClassName('lugares')
    for (var j = 0; j < listasLugares.length; j++) {
      listasLugares[j].addEventListener('change', function () {
        if (document.getElementById('desde').value != '' && document.getElementById('desde').value != '') {
          direccionesModulo.calcularYMostrarRutas()
        }
      })
    }
  }

    // Agrega la dirección en las lista de Lugares Intermedios en caso de que no estén
  function agregarDireccionEnLista (direccion, coord) {
    var lugaresIntermedios = document.getElementById('puntosIntermedios')

    var haceFaltaAgregar = true
    for (i = 0; i < lugaresIntermedios.length; ++i) {
      if (lugaresIntermedios.options[i].text.replace(/\r?\n|\r/g, ' ') === direccion.replace(/\r?\n|\r/g, ' ')) {
        haceFaltaAgregar = false
      }
    }
    if (haceFaltaAgregar) {
      var opt = document.createElement('option')
      opt.value = coord
      opt.innerHTML = direccion
      lugaresIntermedios.appendChild(opt)
    }
  }

    // Agrega la dirección en las listas de puntos intermedios y lo muestra con el street view
  function agregarDireccionYMostrarEnMapa (direccion, ubicacion) {
    that = this
    var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng();
    agregarDireccionEnLista(direccion, ubicacionTexto);
    mapa.setCenter(ubicacion);
    streetViewModulo.fijarStreetView(ubicacion);
    marcadorModulo.mostrarMiMarcador(direccion, ubicacion);
  }

  function agregarDireccion (direccion, ubicacion) {
    that = this
    var ubicacionTexto = ubicacion.lat() + ',' + ubicacion.lng()
    agregarDireccionEnLista(direccion, ubicacionTexto)
    mapa.setCenter(ubicacion)
  }
    // Inicializo las variables que muestra el panel y el que calcula las rutas//
  function inicializar () {
    calcularRutasConClic();
        // Agrega la direccion cuando se presioná enter en el campo agregar
    $('#agregar').keypress(function (e) {
      if (e.keyCode == 13) {
        var direccion = document.getElementById('agregar').value;
        var geocodificador = new google.maps.Geocoder();
        geocodificadorModulo.usaDireccion(geocodificador, direccion, direccionesModulo.agregarDireccion)
      }
    })    
     new autocompletarDesdeYHasta();
    
  }

  function autocompletarDesdeYHasta(){

    var originAutocomplete = autocompletar(this, originInput);
    var destinationAutocomplete = autocompletar(this, destinationInput);
    var agregarAutocomplete = autocompletar(this, agregarInput);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circulo = crearCirculo(geolocation,20000);
        originAutocomplete.setBounds(circulo.getBounds());
        destinationAutocomplete.setBounds(circulo.getBounds());
        agregarAutocomplete.setBounds(circulo.getBounds());
      });
    }
  }

  function autocompletar(variable, campo){
      variable = new google.maps.places.Autocomplete(campo);
      variable.setFields(['place_id']);
    return variable;
  }

    // Calcula la ruta entre los puntos Desde y Hasta con los puntosIntermedios
    // dependiendo de la formaDeIr que puede ser Caminando, Auto o Bus/Subterraneo/Tren
  function calcularYMostrarRutas () {

        /* Completar la función calcularYMostrarRutas , que dependiendo de la forma en que el
         usuario quiere ir de un camino al otro, calcula la ruta entre esas dos posiciones
         y luego muestra la ruta. */
    this.mapa = mapa;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'DRIVING';
    servicioDirecciones = new google.maps.DirectionsService();
    mostradorDirecciones = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.mapa,
      panel: document.getElementById('directions-panel-summary'),
      suppressMarkers: false
    });

    var direccionesRender = mostradorDirecciones;
    console.log(direccionesRender);
    
    var originInput = document.getElementById('desde').value;
    var destinationInput = document.getElementById('hasta').value;
   
    var modeSelector = document.getElementById('comoIr');
    var travelMode = modeSelector.value;
    switch(travelMode){
      case "Auto":
          travelMode="DRIVING";
          //console.log(travelMode);
        break;
      case "Caminando":
          travelMode="WALKING";
          console.log(travelMode);
          break;
      case "Bus/Subterraneo/Tren":
          travelMode="TRANSIT";
          console.log(travelMode);
          break;
      default:
        alert("Opción inválida!");
    }
    
    var waypts = [];
    var directionesWaypts=[];
    //var markerCounter = 65;
    var checkboxArray = document.getElementById('puntosIntermedios');
    for (var i = 0; i < checkboxArray.length; i++) {
     
      if (checkboxArray.options[i].selected) {
        directionesWaypts.push(checkboxArray[i].text);
        waypts.push({
          location: checkboxArray[i].text,
          stopover: true
        });
        // var direccion = checkboxArray[i].text;
        // var ubicacion = checkboxArray[i].value;
        
      }
    }

    var request = {
      origin: originInput,
      destination: destinationInput,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: travelMode
    };
    servicioDirecciones.route(request, function(result, status) {
      if (status == 'OK') {        
        mostradorDirecciones.setDirections(result);
        var ruta = result.routes[0].legs[0].steps[0];
        var markerCounter = 65;
        for (let i = 0; i < ruta.path.length; i++) {
            var direccion = directionesWaypts[0];
            console.log(direccion); 
            var ubicacion = ruta.path[i];
            var texto = ruta.instructions[i];            
            var letra = String.fromCharCode(markerCounter);
            // console.log('Direccion, Ubicación, texto, letra:');
            // console.log({direccion, latitud: ubicacion, texto, letra}); 
                       
            marcadorModulo.agregarMarcadorRuta(direccion, ubicacion, letra, true);
            
            markerCounter++;
            //console.log(texto);    
      } 
      }else {
        window.alert('Fallo en dirección de respuesta: ' + status);
      }
    });    
  }
  
  return {
    inicializar,
    agregarDireccion,
    agregarDireccionEnLista,
    agregarDireccionYMostrarEnMapa,
    calcularYMostrarRutas
  }
}())
