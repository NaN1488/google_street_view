//Google Street View
var initPosPanoID, streetView;

var max_pitch = 20;
var min_pitch = 6;

function initialize() {
  //
  var initPos = new google.maps.LatLng(37.55631,-122.051153);  

  // Set StreetView provider.
  var streetViewOptions = {
    zoom: 1,
    panoProvider:  getCustomPanorama,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL
    },
    pov : {
      heading : 0,
      pitch : 6,
      zoom : 1,
    },
     mapTypeId: google.maps.MapTypeId.ROADMAP,
    pano : "entrada_al_parque_industrial"
  };
  
  // Create a StreetView object.
  var streetViewDiv = document.getElementById('streetview_canvas');
  streetViewDiv.style.fontSize = "15px";
  streetView = new google.maps.StreetViewPanorama(streetViewDiv, streetViewOptions);

  // Add links when it happens "links_change" event.
  google.maps.event.addListener(streetView, "links_changed", createCustomLink);
  //limit pitch
  google.maps.event.addListener(streetView, "pov_changed", function() { 
    var panoInfo   = streetView.getPov();
    //zoom limitations controls
    if (panoInfo.zoom  < 1){
        //max_pitch = 10;
        //min_pitch = 6;
    }else if (panoInfo.zoom  < 2){
        max_pitch = 20;
        min_pitch = -3;
    }else if (panoInfo.zoom  < 3){
        max_pitch = 30;
        min_pitch = -10;
    }else if (panoInfo.zoom  < 3){
        max_pitch = 40;
        min_pitch = -20;
    }else if (panoInfo.zoom  < 4){
        max_pitch = 43;
        min_pitch = -26;
    }
    else if (panoInfo.zoom  < 5){
        max_pitch = 50;
        min_pitch = -30;
    }
    else if (panoInfo.zoom  < 6){
        max_pitch = 54;
        min_pitch = -34;
    }
    if (panoInfo.zoom < 1){
      $('.gmnoprint[controlwidth="22"] div:eq(0)').trigger('click');
       panoInfo.zoom = 1;
      streetView.setPov(panoInfo);
    }else if (panoInfo.zoom > 3){
       $('.gmnoprint[controlwidth="22"] div:eq(1)').trigger('click');
      panoInfo.zoom = 3;
       streetView.setPov(panoInfo);
    }
    if (panoInfo.pitch > max_pitch){
      panoInfo.pitch = max_pitch;
      streetView.setPov(panoInfo);

    }else if (panoInfo.pitch < min_pitch){
      panoInfo.pitch = min_pitch;
      streetView.setPov(panoInfo);
    }


  });
  // Create a StreetViewService object.
  var streetviewService = new google.maps.StreetViewService();
  
  // Get panorama ID of initPos
  var radius = 50;
  streetviewService.getPanoramaByLocation(initPos, radius, function(result, status) {
    if (status == google.maps.StreetViewStatus.OK) {
      initPosPanoID = result.location.pano;
      //streetView.setPosition(result.location.latLng);
    }
  });
  


}

function getCustomPanoramaTileUrl(panoID, zoom, tilex, tiley) {

   return "todas_1/" + panoID + '/' + panoID + '_'  + tilex + '_' + tiley + '.jpg';
}

function getCustomPanorama(panoID) {
  var streetViewPanoramaData = {
    links: [],
    copyright: 'Imagery (c) Orquidea Mapping',
    tiles: {
        //tileSize: new google.maps.Size(18696, 5548),
        tileSize: new google.maps.Size(512,512),
        //worldSize: new google.maps.Size(256, 256),
        worldSize: new google.maps.Size(4096, 2048),
        //tileSize: new google.maps.Size(20696, 9000), × 2268
        //worldSize: new google.maps.Size(20696, 9000),
        getTileUrl: getCustomPanoramaTileUrl
     }
  };
  switch(panoID) {

    case "entrada_al_parque_industrial":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Entrada al Parque Industrial",
        latLng: new google.maps.LatLng(37.556373,-122.050921),
        
      };
      streetViewPanoramaData["tiles"]["centerHeading"] = 237;
      return streetViewPanoramaData;
      
    case "ingreso":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Ingreso",
        latLng: new google.maps.LatLng(37.556373,-122.050921)
      };
       streetViewPanoramaData["tiles"]["centerHeading"] = 60;
      return streetViewPanoramaData;
     

    case "explanada":
      // Description of the point.
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Explanada",
        latLng: new google.maps.LatLng(37.556373,-122.050921)
      };
      streetViewPanoramaData["tiles"]["centerHeading"] = 290;
      return streetViewPanoramaData;
      
    case "corredor_principal":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Calle 1",
        latLng: new google.maps.LatLng(37.556429,-122.050745)
      };
       streetViewPanoramaData["tiles"]["centerHeading"] = 220;
      return streetViewPanoramaData;
      
    case "dosificaciones_de_materiales_minoritarios_1":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Automático",
        latLng: new google.maps.LatLng(37.556457,-122.050678)
      };
      streetViewPanoramaData["tiles"]["centerHeading"] = 190;
      return streetViewPanoramaData;
      
    case "dosificaciones_de_materiales_minoritarios_2":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Semi Automático",
        latLng: new google.maps.LatLng(37.556527,-122.050723)
      };
      streetViewPanoramaData["tiles"]["centerHeading"] = 250;
      return streetViewPanoramaData;
    case "linea_siliconas":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Silicona Línea 4.1",
        latLng: new google.maps.LatLng(37.556733,-122.050167)
      };
      streetViewPanoramaData["tiles"]["centerHeading"] = 190;
      return streetViewPanoramaData;
      

    case "administracion":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Administración",
        latLng: new google.maps.LatLng(37.557015,-122.049702)
      };
      streetViewPanoramaData["tiles"]["centerHeading"] = 120;
      return streetViewPanoramaData;
    case "camino_quimica_del_caucho":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: 'Camino Quimica del Caucho',
        latLng: new google.maps.LatLng(37.557945,-122.048876)
      };
      streetViewPanoramaData["tiles"]["centerHeading"] = 260;
      return streetViewPanoramaData;
      
    case "quimica_del_caucho":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Quimica del Caucho",
        latLng: new google.maps.LatLng(37.557815,-122.048849)
      };
      streetViewPanoramaData["tiles"]["centerHeading"] = 260;
      return streetViewPanoramaData;
      
    case "deposito":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Centro Logístico",
        latLng: new google.maps.LatLng(37.557837,-122.048671)
      };
      streetViewPanoramaData["tiles"]["centerHeading"] = 100;
      return streetViewPanoramaData;
      
    case "corredor_secundario":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Calle 2",
        latLng: new google.maps.LatLng(37.557976,-122.04853)
      };
      streetViewPanoramaData["tiles"]["centerHeading"] = 0;
      return streetViewPanoramaData;
      
    case "linea_negro_de_humo_3":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Línea 3.1 = Kim 250: Mezcladores abiertos y salida Batch Off",
        latLng: new google.maps.LatLng(37.558131,-122.048558)
      };
       streetViewPanoramaData["tiles"]["centerHeading"] = 130;
      return streetViewPanoramaData;
      
    case "linea_negro_de_humo_2":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Línea 3.1 = Kim 250: Mezcladores abiertos y salida Batch Off",
        latLng: new google.maps.LatLng(37.558131,-122.048558)
      };
       streetViewPanoramaData["tiles"]["centerHeading"] = 30;
      return streetViewPanoramaData;

    case "linea_negro_de_humo_1":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Línea 3.1 = Kim 250: Zona De carga - Mezclador interno.",
        latLng: new google.maps.LatLng(37.558131,-122.048558)
      };
       streetViewPanoramaData["tiles"]["centerHeading"] = 200;
      return streetViewPanoramaData;
    case "linea_color_1":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Línea 6.2 = Gk 250: Zona de carga - Mezclador Interno",
        latLng: new google.maps.LatLng(37.558131,-122.048558)
      };
       streetViewPanoramaData["tiles"]["centerHeading"] = 200;
      return streetViewPanoramaData;
    case "linea_color_2":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Línea 6.2 = Gk 250: Mezclador Abierto",
        latLng: new google.maps.LatLng(37.558131,-122.048558)
      };
       streetViewPanoramaData["tiles"]["centerHeading"] = 200;
      return streetViewPanoramaData;
    case "linea_color_3":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Línea 6.2 = Gk 250: Salida Batch Off",
        latLng: new google.maps.LatLng(37.558131,-122.048558)
      };
       streetViewPanoramaData["tiles"]["centerHeading"] = 200;
      return streetViewPanoramaData;
    case "laboratorio_listo_copia":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: "Laboratorio de Producto Terminado",
        latLng: new google.maps.LatLng(37.558131,-122.048558)
      };
       streetViewPanoramaData["tiles"]["centerHeading"] = 70;
      return streetViewPanoramaData;

      case "siliconas_1":
      streetViewPanoramaData["location"] = {
        pano: panoID,
        description: " Silicona Línea 4.1",
        latLng: new google.maps.LatLng(37.558131,-122.048558)
      };
       streetViewPanoramaData["tiles"]["centerHeading"] = 70;
      return streetViewPanoramaData;
      


  }
}

function createCustomLink() {
  /*
   * add links
   */
   //return;
  var links = streetView.getLinks();
  var panoID = streetView.getPano();
  switch(panoID) {
    case "entrada_al_parque_industrial":
      links.push({
        description : "Ingreso",
        pano : "camino_quimica_del_caucho",
        heading : 5
      });

      break;

    case 'ingreso':
      // Add a link to dining room
      links.push({
        description : "Explanada",
        pano : "explanada",
        heading : 0
      });
      links.push({
        description : "Camino Quimica del Caucho",
        pano : "camino_quimica_del_caucho",
        heading : 130
      });
      break;
      
    case "explanada":
      links.push({
        description : "Ingreso",
        pano : "ingreso",
        heading : 190
      });
      links.push({
        description : "Calle 1",
        pano : "corredor_principal",
        heading : 350
      });
      links.push({
        description : "Administración",
        pano : "administracion",
        heading : 100
      });

      break;
    case "corredor_principal":
      links.push({
        description : "Explanada",
        pano : "explanada",
        heading : 160
      });
      links.push({
        description : "Automático",
        pano : "dosificaciones_de_materiales_minoritarios_1",
        heading : 0
      });
      break;
      
    case "dosificaciones_de_materiales_minoritarios_1":
      links.push({
        description : "Calle 1",
        pano : "corredor_principal",
        heading : 260
      });
      links.push({
        description : "Semi Automático",
        pano : "dosificaciones_de_materiales_minoritarios_2",
        heading : 70
      });
      break;
      

    case "dosificaciones_de_materiales_minoritarios_2":
      links.push({
        description : "Automático",
        pano : "dosificaciones_de_materiales_minoritarios_1",
        heading : 310
      });
      links.push({
        description : "Línea 3.1 = Kim 250",
        pano : "linea_negro_de_humo_1",
        heading : 225
      });
      links.push({
        description : "Línea 6.2 = Gk 250",
        pano : "linea_color_1",
        heading : 180
      });
      links.push({
        description : "Silicona Línea 4.1",
        pano : "siliconas_1",
        heading : 130
      });
      break;

    case "linea_siliconas":
      links.push({
        description : " Silicona Línea 4.1",
        pano : "siliconas_1",
        heading : 230
      });
      break;
      
    case "administracion":
      links.push({
        description : "Explanada",
        pano : "explanada",
        heading : 260
      });
      links.push({
        description : "Calle 2",
        pano : "corredor_secundario",
        heading : 340
      });
      break;
    case "camino_quimica_del_caucho":
      links.push({
        description : "Ingreso a Causer",
        pano : "ingreso",
        heading : 270
      });
      links.push({
        description : "Ingreso a Quimica del Caucho",
        pano : "quimica_del_caucho",
        heading : 360
      });
       links.push({
        description : "Entrada al Parque Industrial",
        pano : "entrada_al_parque_industrial",
        heading : 100
      });

      break;
    case "quimica_del_caucho":
      links.push({
        description : "Centro Logístico",
        pano : "deposito",
        heading : 350
      });
      links.push({
        description : "Camino a Causer",
        pano : "camino_quimica_del_caucho",
        heading : 180
      });
      break;
      
    case "deposito":
      links.push({
        description : "Exterior Quimica del Caucho",
        pano : "quimica_del_caucho",
        heading : 190
      });
      break;
      
    case "corredor_secundario":
      links.push({
        description : "Administración",
        pano : "administracion",
        heading : 160
      });
      links.push({
        description : "Línea 3.1 = Kim 250",
        pano : "linea_negro_de_humo_3",
        heading : 220
      });
      links.push({
        description : "Silicona Línea 4.1",
        pano : "siliconas_1",
        heading : 350
      });
      links.push({
        description : "Línea 6.2 = Gk 250",
        pano : "linea_color_1",
        heading : 290
      });
      break;
      
    case "linea_negro_de_humo_3":
      links.push({
        description : "Laboratorio de Producto Terminado",
        pano : "laboratorio_listo_copia",
        heading : 350
      });
      links.push({
        description : "Calle 2",
        pano : "corredor_secundario",
        heading : 170
      });
      links.push({
        description : "Línea 3.1 = Kim 250: Mezcladores abiertos y salida Batch Off",
        pano : "linea_negro_de_humo_2",
        heading : 90
      });
      break;

      case "linea_negro_de_humo_2":
      links.push({
        description : "Línea 3.1 = Kim 250: Mezcladores abiertos y salida Batch Off",
        pano : "linea_negro_de_humo_3",
        heading : 280
      });
      links.push({
        description : "Línea 3.1 = Kim 250: Zona De carga - Mezclador interno.",
        pano : "linea_negro_de_humo_1",
        heading : 70
      });
      break;

      case "linea_negro_de_humo_1":
      links.push({
        description : "Línea 3.1 = Kim 250: Mezcladores abiertos y salida Batch Off",
        pano : "linea_negro_de_humo_2",
        heading : 20
      });
      links.push({
        description : "Semi Automático",
        pano : "dosificaciones_de_materiales_minoritarios_2",
        heading : 260
      });
      break;

      case "linea_color_1":
       links.push({
        description : "Semi Automático",
        pano : "dosificaciones_de_materiales_minoritarios_2",
        heading : 350
      });
      links.push({
        description : "Línea 6.2 = Gk 250: Mezclador Abierto",
        pano : "linea_color_2",
        heading : 120
      });
      break;

      case "linea_color_2":
      links.push({
        description : "Línea 6.2 = Gk 250: Salida Batch Off",
        pano : "linea_color_3",
        heading : 130
      });
      links.push({
        description : "Línea 6.2 = Gk 250: Zona de carga - Mezclador Interno",
        pano : "linea_color_1",
        heading : 280
      });
      break;

      case "linea_color_3":
      links.push({
        description : "Laboratorio de Producto Terminado",
        pano : "laboratorio_listo_copia",
        heading : 120
      });
      links.push({
        description : "Línea 6.2 = Gk 250: Mezclador Abierto",
        pano : "linea_color_2",
        heading : 360
      });
      break;

      case "laboratorio_listo_copia":
      links.push({
        description : "Línea 6.2 = Gk 250: Salida Batch Off",
        pano : "linea_color_3",
        heading : 0
      });
      links.push({
        description : "Explanada",
        pano : "explanada",
        heading : 160
      });
      links.push({
        description : "Línea 3.1 = Kim 250: Mezcladores abiertos y salida Batch Off",
        pano : "linea_negro_de_humo_3",
        heading : 70
      });
      break;

      case "siliconas_1":
       links.push({
        description : "Semi Automático",
        pano : "dosificaciones_de_materiales_minoritarios_2",
        heading : 200
      });
      links.push({
        description : "Silicona Línea 4.1",
        pano : "linea_siliconas",
        heading : 310
      });
       break;
  }
  
}

google.maps.event.addDomListener(window, 'load', initialize);