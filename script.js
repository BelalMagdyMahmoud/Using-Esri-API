require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",

    "esri/Basemap",
    "esri/layers/VectorTileLayer",
    "esri/layers/TileLayer",

    "esri/Graphic",
    "esri/layers/GraphicsLayer",

    "esri/layers/FeatureLayer"

    ], function(esriConfig,Map, MapView, Basemap, VectorTileLayer, TileLayer, Graphic, GraphicsLayer, FeatureLayer) {

  esriConfig.apiKey = "AAPK4f58534cd23e48d485d0490fff4eb1cahojRZg1hNi9ZPRJomA9EHHq6T9tpBha8cuCTWpguCILE839JocGoQ2UTO_QdpjsL";

//   const map = new Map({
//     basemap: "arcgis-topographic" //Basemap layer service
//   });

//   const view = new MapView({
//     map: map,
//     center: [-118.80500,34.02700], //Longitude, latitude
//     zoom: 13,
//     container: "myMap"
//  });

 const vectorTileLayer = new VectorTileLayer({
    portalItem: {
      id: "6976148c11bd497d8624206f9ee03e30" // Forest and Parks Canvas
    },
    opacity: .75
  });

  const imageTileLayer = new TileLayer({
    portalItem: {
      id: "1b243539f4514b6ba35e7d995890db1d" // World Hillshade
    }
  });

  const basemap = new Basemap({
    baseLayers: [

      imageTileLayer,
      vectorTileLayer

    ]
  });

  const map = new Map({
    basemap: basemap,
  });

  const view = new MapView({
    container: "myMap",
    map: map,

    center: [-118.80500,34.02700],
    zoom: 13
  });

 const graphicsLayer = new GraphicsLayer();
 map.add(graphicsLayer);

 const point = { //Create a point
    type: "point",
    longitude: -118.80657463861,
    latitude: 34.0005930608889
 };
 const simpleMarkerSymbol = {
    type: "simple-marker",
    color: [226, 119, 40],  // Orange
    outline: {
        color: [255, 255, 255], // White
        width: 1
    }
 };

 const pointGraphic = new Graphic({
    geometry: point,
    symbol: simpleMarkerSymbol
 });
 graphicsLayer.add(pointGraphic);

    // Create a line geometry
 const polyline = {
    type: "polyline",
    paths: [
        [-118.821527826096, 34.0139576938577], //Longitude, latitude
        [-118.814893761649, 34.0080602407843], //Longitude, latitude
        [-118.808878330345, 34.0016642996246]  //Longitude, latitude
    ]
 };
 const simpleLineSymbol = {
    type: "simple-line",
    color: [226, 119, 40], // Orange
    width: 2
 };

 const polylineGraphic = new Graphic({
    geometry: polyline,
    symbol: simpleLineSymbol
 });
 graphicsLayer.add(polylineGraphic);

 // Create a polygon geometry
 const polygon = {
    type: "polygon",
    rings: [
        [-118.818984489994, 34.0137559967283], //Longitude, latitude
        [-118.806796597377, 34.0215816298725], //Longitude, latitude
        [-118.791432890735, 34.0163883241613], //Longitude, latitude
        [-118.79596686535, 34.008564864635],   //Longitude, latitude
        [-118.808558110679, 34.0035027131376]  //Longitude, latitude
    ]
 };

 const simpleFillSymbol = {
    type: "simple-fill",
    color: [227, 139, 79, 0.8],  // Orange, opacity 80%
    outline: {
        color: [255, 255, 255],
        width: 1
    }
 };

 const popupTemplate = {
    title: "{Name}",
    content: "{Description}"
 }
 const attributes = {
    Name: "Graphic",
    Description: "I am a polygon"
 }

 const polygonGraphic = new Graphic({
    geometry: polygon,
    symbol: simpleFillSymbol,

    attributes: attributes,
    popupTemplate: popupTemplate

 });
 graphicsLayer.add(polygonGraphic);

//  //Trailheads feature layer (points)
//  const trailheadsLayer = new FeatureLayer({
//     url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0"
//   });

//   map.add(trailheadsLayer);

// //Trails feature layer (lines)
//   const trailsLayer = new FeatureLayer({
//     url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0"
//   });

//   map.add(trailsLayer, 0);

// // Parks and open spaces (polygons)
//   const parksLayer = new FeatureLayer({
//     url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0"
//   });

//   map.add(parksLayer, 0);

  // Define a pop-up for Trailheads
  const popupTrailheads = {
    "title": "Trailhead",
    "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
  }

const trailheads = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
    outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
    popupTemplate: popupTrailheads
  });

  map.add(trailheads);

  // Define a popup for Trails
  const popupTrails = {
    title: "Trail Information",
    content: [{
     type: "media",
      mediaInfos: [{
        type: "column-chart",
        caption: "",
        value: {
          fields: [ "ELEV_MIN","ELEV_MAX" ],
          normalizeField: null,
          tooltipField: "Min and max elevation values"
          }
        }]
    }]
  }

  const trails = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
    outFields: ["TRL_NAME","ELEV_GAIN"],
    popupTemplate: popupTrails
  });

  map.add(trails,0);

  // Define popup for Parks and Open Spaces
  const popupOpenspaces = {
    "title": "{PARK_NAME}",
    "content": [{
      "type": "fields",
      "fieldInfos": [
        {
          "fieldName": "AGNCY_NAME",
          "label": "Agency",
          "isEditable": true,
          "tooltip": "",
          "visible": true,
          "format": null,
          "stringFieldOption": "text-box"
        },
        {
          "fieldName": "TYPE",
          "label": "Type",
          "isEditable": true,
          "tooltip": "",
          "visible": true,
          "format": null,
          "stringFieldOption": "text-box"
        },
        {
          "fieldName": "ACCESS_TYP",
          "label": "Access",
          "isEditable": true,
          "tooltip": "",
          "visible": true,
          "format": null,
          "stringFieldOption": "text-box"
        },

        {
          "fieldName": "GIS_ACRES",
          "label": "Acres",
          "isEditable": true,
          "tooltip": "",
          "visible": true,
          "format": {
            "places": 2,
            "digitSeparator": true
          },

          "stringFieldOption": "text-box"
        }
      ]
    }]
  }

  const openspaces = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
    outFields: ["TYPE","PARK_NAME", "AGNCY_NAME","ACCESS_TYP","GIS_ACRES","TRLS_MI","TOTAL_GOOD","TOTAL_FAIR", "TOTAL_POOR"],
    popupTemplate: popupOpenspaces
  });

  map.add(openspaces,0);


  // SQL query array
  const parcelLayerSQL = ["Choose a SQL where clause...", "UseType = 'Residential'",  "UseType = 'Government'", "UseType = 'Irrigated Farm'", "TaxRateArea = 10853", "TaxRateArea = 10860", "TaxRateArea = 08637", "Roll_LandValue > 1000000", "Roll_LandValue < 1000000"];
  let whereClause = parcelLayerSQL[0];

  // Add SQL UI
  const select = document.createElement("select","");
  select.setAttribute("class", "esri-widget esri-select");
  select.setAttribute("style", "width: 200px; font-family: 'Avenir Next'; font-size: 1em");
  parcelLayerSQL.forEach(function(query){
    let option = document.createElement("option");
    option.innerHTML = query;
    option.value = query;
    select.appendChild(option);
  });

  view.ui.add(select, "top-right");

  // Listen for changes
  select.addEventListener('change', (event) => {
    whereClause = event.target.value;

    queryFeatureLayer(view.extent);

  });

  // Get query layer and set up query
const parcelLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
  });

  function queryFeatureLayer(extent) {

    const parcelQuery = {
     where: whereClause,  // Set by select element
     spatialRelationship: "intersects", // Relationship operation to apply
     geometry: extent, // Restricted to visible extent of the map
     outFields: ["APN","UseType","TaxRateCity","Roll_LandValue"], // Attributes to return
     returnGeometry: true
    };

    parcelLayer.queryFeatures(parcelQuery)

    .then((results) => {

      console.log("Feature count: " + results.features.length)

      displayResults(results);

    }).catch((error) => {
      console.log(error.error);
    });

  }

  function displayResults(results) {
    // Create a blue polygon
    const symbol = {
      type: "simple-fill",
      color: [ 20, 130, 200, 0.5 ],
      outline: {
        color: "white",
        width: .5
      },
    };

    const popupTemplate = {
      title: "Parcel {APN}",
      content: "Type: {UseType} <br> Land value: {Roll_LandValue} <br> Tax Rate City: {TaxRateCity}"
    };

    // Assign styles and popup to features
    results.features.map((feature) => {
      feature.symbol = symbol;
      feature.popupTemplate = popupTemplate;
      return feature;
    });

    // Clear display
    view.popup.close();
    view.graphics.removeAll();
    // Add features to graphics layer
    view.graphics.addMany(results.features);
  }
 });