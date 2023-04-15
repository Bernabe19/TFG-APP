importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs');
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-layers');

addEventListener('message', function( data ) {
    var result =  tf.loadLayersModel("./modelos/modelo_vgg16/model.json");
    console.log("Este el el result")
    console.log(result)
    result = JSON.parse(JSON.stringify(result));
    postMessage(result);
  });
