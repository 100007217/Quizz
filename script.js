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
getJSON('https://opentdb.com/api.php?amount=2&category=9&difficulty=easy&type=multiple',
    function(err, data) {
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            datos = data['results']
            console.log(datos)
            var pregunta = document.getElementById('pregunta')
            pregunta.innerHTML = datos[0]['question']
            var respuestas = document.getElementsByClassName('respuestas')
            var posiciones_disponibles = [0, 1, 2, 3]

            function insertar_respuesta_correcta() {
                random = Math.floor(Math.random() * 4);
                respuestas[random].innerHTML = datos[0]['correct_answer']
                posiciones_disponibles.splice(random, 1);
                console.log("He metido en la posicon " + random + " la repsuesta correcta que es " + datos[0]['correct_answer'])
                console.log("Quedan las repsuestas " + posiciones_disponibles)
            }
            insertar_respuesta_correcta();

            function rellenar_respuestas_incorrectas(posiciones_disponibles) {
                for (let i = 0; i < 3; i++) {
                    posicion = posiciones_disponibles[i]
                    respuestas[posicion].innerHTML = datos[0]['incorrect_answers'][i]
                }
            }
        }
        rellenar_respuestas_incorrectas(posiciones_disponibles)
    }
);