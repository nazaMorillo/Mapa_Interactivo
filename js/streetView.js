streetViewModulo = (function () {
  var paronama; // 'Visor' de StreetView

  function inicializar () {
        /* Completar la función inicializar()  que crea un panorama
        en una posición y lo muestra en la página. */
        panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
          position: mapa.center,
          pov: {
            heading: 0,
            pitch: 0
          }
        });
        //fijarStreetView (panorama)
        mapa.setStreetView(panorama);        
  }

    // Actualiza la ubicación del Panorama
  function fijarStreetView (ubicacion) {
        /* Completar la función fijarStreetView que actualiza la posición
         de la variable panorama y cambia el mapa de modo tal que se vea
         el streetView de la posición actual. */
         panorama = mapa.getStreetView();
         panorama.setPosition(ubicacion);
         panorama.setPov(/** @type {google.maps.StreetViewPov} */({
           heading: 265,
           pitch: 0
         }));
  }

  return {
    inicializar,
    fijarStreetView
  }
})()
