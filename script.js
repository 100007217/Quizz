//alert("enlazado")

window.json_concurso = "hi"
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};
var numero_pregunta = 0

getJSON('https://opentdb.com/api.php?amount=2&category=9&difficulty=easy&type=multiple',
    function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            datos = data['results']
            //console.log(datos)
            
            var numero_pregunta = 0
            var pregunta = document.getElementById('pregunta')
            pregunta.innerHTML = datos[numero_pregunta]['question']
            var respuestas = document.getElementsByClassName('respuestas')
            var posiciones_disponibles = [0, 1, 2, 3]
            
            function insertar_respuesta_correcta(numero_pregunta) {
                random = Math.floor(Math.random() * 4);
                respuestas[random].innerHTML = datos[numero_pregunta]['correct_answer']
                //console.log(respuestas[random])
                posiciones_disponibles.splice(random, 1);
                console.log("He metido en la posicon " + random + " la repsuesta correcta que es " + datos[numero_pregunta]['correct_answer'])
                //console.log("Quedan las repsuestas " + posiciones_disponibles)
                rellenar_respuestas_incorrectas(posiciones_disponibles,numero_pregunta)
            }

            function rellenar_respuestas_incorrectas(posiciones_disponibles,numero_pregunta) {
                for (let i = 0; i < 3; i++) {
                    posicion = posiciones_disponibles[i]
                    respuestas[posicion].innerHTML = datos[numero_pregunta]['incorrect_answers'][i]
                }
            }
            insertar_respuesta_correcta(numero_pregunta)
        }
        
    }
)

function seleccionarRespuesta(id,numero_pregunta) {
    respuesta_seleccionada = document.getElementById(id)
    respuestas_correctas = document.getElementById('num_correctas')
    if (respuesta_seleccionada.innerHTML == datos[numero_pregunta]['correct_answer']) {
        respuesta_seleccionada.style.backgroundColor = "lightgreen"
        setTimeout(() => { console.log("Correcto!"); }, 2000);
        
    } else {
        respuesta_seleccionada.style.backgroundColor = "lightcoral"
        setTimeout(() => { console.log("Error!"); }, 2000);
    }
    var respuestas = document.getElementsByClassName('respuestas')
    //document.getElementById('cmdt_1_1i').removeAttribute("onclick");
    for (let i = 0; i < 4; i++) {
    	respuestas[i].removeAttribute("onclick")
    }
}
