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

function pillar_datos() {
    getJSON('https://opentdb.com/api.php?amount=2&category=9&difficulty=easy&type=multiple',
        function(err, data) {
            if (err !== null) {
                alert('Something went wrong: ' + err);
            } else {
                datos = data['results']
                    //console.log(datos)
                return datos
            }
        }
    )
}
var xhReq = new XMLHttpRequest();
xhReq.open("GET", 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple', false);
xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);
datos = jsonObject['results']
    //console.log(datos)
var numero_pregunta = 0
var pregunta = document.getElementById('pregunta')
var respuestas = document.getElementsByClassName('respuestas')




function insertar_respuesta_correcta(numero_pregunta, datos) {
    document.getElementById('showpreguntas').innerHTML = 'Pregunta Nº: ' + (numero_pregunta + 1)
        //console.log(datos)
    var posiciones_disponibles = [0, 1, 2, 3]
    random = Math.floor(Math.random() * 4);
    pregunta.innerHTML = datos[numero_pregunta]['question']
    respuestas[random].innerHTML = datos[numero_pregunta]['correct_answer']
        //console.log(respuestas[random])
    posiciones_disponibles.splice(random, 1);
    console.log("He metido en la posicon " + random + " la repsuesta correcta que es " + datos[numero_pregunta]['correct_answer'])
        //console.log("Quedan las repsuestas " + posiciones_disponibles)
    rellenar_respuestas_incorrectas(posiciones_disponibles, numero_pregunta)
}

function rellenar_respuestas_incorrectas(posiciones_disponibles, numero_pregunta) {
    for (let i = 0; i < 3; i++) {
        posicion = posiciones_disponibles[i]
        respuestas[posicion].innerHTML = datos[numero_pregunta]['incorrect_answers'][i]
    }
}

function seleccionarRespuesta(id, numero_pregunta) {
    respuesta_seleccionada = document.getElementById(id)
    respuestas_correctas = document.getElementById('num_correctas')
    if (respuesta_seleccionada.innerHTML == datos[numero_pregunta]['correct_answer']) {
        respuesta_seleccionada.style.backgroundColor = "lightgreen"
        if (numero_pregunta < 9) {
            respuestas_correctas.innerHTML += '&#9989; | '
        } else {
            respuestas_correctas.innerHTML += '&#9989;'
        }


    } else {
        respuesta_seleccionada.style.backgroundColor = "lightcoral"
        if (numero_pregunta < 9) {
            respuestas_correctas.innerHTML += '&#10060; | '
        } else {
            respuestas_correctas.innerHTML += '&#10060;'
        }
    }
    var respuestas = document.getElementsByClassName('respuestas')
        //document.getElementById('cmdt_1_1i').removeAttribute("onclick");
    for (let i = 0; i < 4; i++) {
        //respuestas[i].removeAttribute("onclick")
        respuestas[i].onclick = function() {
            return false;
        }
    }
}

function siguientePregunta() {
    for (let i = 0; i < 4; i++) {
        //elem.setAttribute("onclick", "alert('blah');");
        //respuestas[i].setAttribute('onclick', 'seleccionarRespuesta(respuesta' + (i + 1) + ',' + numero_pregunta + ')')
        respuestas[i].onclick = function() { seleccionarRespuesta(this.id, numero_pregunta) };

        respuestas[i].style.backgroundColor = "lightgray"

    }
    numero_pregunta.value = document.getElementById('next')

    numero_pregunta += 1

    if (numero_pregunta < 10) {
        insertar_respuesta_correcta(numero_pregunta, datos)
    } else {
        stop()
        numero_pregunta = document.getElementById('next')
        numero_pregunta.innerHTML = "REINICIAR QUIZZ"
        numero_pregunta.style.backgroundColor = "rgb(231, 132, 235)"
        numero_pregunta.onclick = function() {
            location.reload();
        };
    }
}

function start_again() {
    alert("hi")
}

function empezarQuiz() {

    startCrono()
    insertar_respuesta_correcta(numero_pregunta, datos)

}