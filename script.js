/* ***************** JSON ***************** */
let JSONreplies = {
    'bots': 
        listaBots = ['Ulises', 'Nana', 'Gualter Guait', 'Estefi', 'Ciri', 'Kortano', 'Champi Vaca', 'Brayatan Esneider'],
    'haciendo': 
        listaHaciendo = ['Hablar con tigo', '¿Que no es obvio?', 'Perder mi tiempo'],
    'saludos': 
        listaSaludos = ['Hola ¿Como estás?', '¿Que hay de nuevo?', '¿Todo bien? ¿Todo correcto? y yo que me alegro','¿Que tal?'],
    'nombre':
        listaNombres = ['¿Que no ves? soy ', 'Mi nombre es ', 'Soy ', 'Arriba dice, soy '],
    'random':
        listaRandom = ['¿De que me hablas viejo?', 'Vaya... que complejo', 'No se que es eso', 'Saaaape',
            '¿Como te llamas?', 'Aqui dentro todos flotan', '¿En que ciudad vives?', 'Ya me estoy aburriendo...', '¿Que musica escuchas?',
            '¿Como te sientes?', '¿Como estás?', '¿Que tienes?', 'Dime más 🤨', 'Espera, ya vuelvo', 'Sin palabras 🤐', 'No sé que decir'],
    'risas':
        listaRisas = ['Si, si, muy gracioso', 'Lo sé soy un chiste andante u.u', '¡Hey no te me burles!'],
    'chistes':
        listaChistes = ['- Señor oficial ¿por que me detuvo? <br>- Sople aquí <br>- Pero es una empanada <br>- Si, es que está muy caliente', 
            '- Buenas! Me vende un cuarto de pollo <br>- Usted lo que quiere es una jaula!!',
            '- Quiero ser billonario, como mi tío <br>- ¿Tu tío es billonario? <br>- El tambien quiere ser billonario'],
    'creador': 
        listaCreador = ['Mi creador es Arley Castro', 'Estoy siendo desarrollado por Arleyhson', 'El amante de DLS'],
    'despedidas':
        listaDespedida = ['Adios, cuidate', 'Arrivederchi!', 'Nos vemos!', 'Vemola!', 'Ciyuleirer'],
    'ciudades':
        listaCiudades = ['¿Allá hace calor?', 'He escuchado que es peligroso', 'Excelente clima!', '¡Quiero ir allá!', '¿Y roban mucho allá?'],
    'insultos':
        listaInsultos = ['Con ese trato, mejor ya ni hablemos', 'Mirate primero al espejo', 'No oigo, no oigo soy de palo 🙉', '¿Con esa boca besas a tu madrecita?'],
    'quemas':
        listaQuemas = ['No, yo no quemo', 'Vientos y mareas', 'Nada más', 'Aquí, lidiando con un proyecto en Angular T_T, maldito carrito']
    }

/* Estas son las opciones de las posibles palabras que puede enviar el usuario */
let JSONuser = {
    'chistes':
        listaChistesU = ['un chiste', 'una broma'],
    'ciudades':
        listaCiudadesU = ['bogota', 'cali', 'medellin', 'medallo', 'pasto', 'bucaramanga', 'cartagena', 'cucuta'],
    'creador':
        listaCreadorU = ['quien te creo', 'quien te hizo', 'tu creador'],
    'despedidas':
        listaDespedidaU = ['adios', 'chao', 'nos vemos', 'me voy'],
    'insultos':
        listaInsultosU = ['tont', 'bob', 'idiot', 'imbecil', 'gonorre', 'pirob', 'hp', 'marico'],
    'nombre': 
        listaNombresU = ['te llamas', 'tu nombre', 'quien eres'],
    'saludos':
        listaSaludosU = ['hola', 'que mas'],
    'haciendo':
        listaSaludosU = ['que haces', 'que te dedicas']
}

/* ***************** Obtención Elementos DOM ***************** */

let chatView = document.getElementById('chatView');
let chatSheet = document.getElementById('chatSheet'); /* Es como una capa metida dentro de chat View */
let inputWrite = document.getElementById('inputWrite');
let btnSend = document.getElementById('btnSend');
let isWriting = document.getElementById('isWriting');

/* ***************** Variables ***************** */
let nombreBot = JSONreplies.bots[getRandomN(JSONreplies.bots)];
document.getElementById('botName').innerHTML = nombreBot;

/* ***************** Funciones ***************** */

function processWord(text) {
    if(text.trim() == '') {
        return false;
    } else {
        /* 1. Poner el texto de usuario en el el view del chat */
        showMessage(text, 'user');
        /* 2. Se le quitan las tildes */
        let rawWord = getWithoutTilde(text).toLowerCase();
        /* 3. Buscar palabra y reponder */
        if(matchInclude(JSONuser.saludos, rawWord)) {
            showMessage(JSONreplies.saludos, 'bot');
        } else if(matchInclude(JSONuser.nombre, rawWord)){
            showMessage(JSONreplies.nombre, 'bot', nombreBot);
        } else if(matchInclude(JSONuser.creador, rawWord)) {
            showMessage(JSONreplies.creador, 'bot');
        } else if(matchInclude(JSONuser.despedidas, rawWord)) {
            showMessage(JSONreplies.despedidas, 'bot');
        } else if(matchInclude(JSONuser.chistes, rawWord)) {
            showMessage(JSONreplies.chistes, 'bot');
        } else if(rawWord.includes('jaj')) {
            showMessage(JSONreplies.risas, 'bot');
        } else if(matchInclude(JSONuser.haciendo, rawWord)) {
            showMessage(JSONreplies.haciendo, 'bot');
        } else if(matchInclude(JSONuser.ciudades, rawWord)) {
            showMessage(JSONreplies.ciudades, 'bot');
        } else if(matchInclude(JSONuser.insultos, rawWord)){
            showMessage(JSONreplies.insultos, 'bot');
        } else if(rawWord.includes('que mas')) {
            showMessage(JSONreplies.quemas, 'bot');
        } else{
            showMessage(JSONreplies.random, 'bot');
        }
    }
}

function showMessage(message, type, extra) {
    /* 1. Crear div bloque de mensaje (padre) */
    let contCard = document.createElement('div');
    /* 2. Crear div tarjeta */
    let card = document.createElement('div');

    if(type == 'bot') {
        /* a(bot). Decir que está escribiendo */
        isWriting.innerHTML = ' Está escribiendo...';

        /* b(bot). Ponerle la clase bot al contenedor */
        contCard.className = 'block block--' + type;

        /* c(bot). Ponerle la clase bot al contenedor */
        card.className = 'block__card block__card--' + type; 

        /* d(bot). Meter tarjeta dentro de bloque */
        contCard.appendChild(card);

        /* e.(bot). Meterle el mensaje a la tarjeta. Como lo que envia el bot es 
        un JSON con arrays, aquí se procesa como tal */
        setTimeout(function(){
            if(extra != undefined) {
                card.innerHTML = message[getRandomN(message)] + extra;
            } else {
                card.innerHTML = message[getRandomN(message)];
            }

        /* f.(bot). Limpiar el estado de escritura del bot */
        isWriting.innerHTML = '';

        /* g.(bot). Ultimo: Meter el bloque con todo su contenido dentro de la chat Sheet */
        chatSheet.appendChild(contCard);

        /* h(bot). Baja el scroll para mostar el ultimo chat */
        chatSheet.scrollIntoView({behavior: 'smooth', block: 'end'});

    }, Math.random() * (4000 - 1000) + 1000); /* Demora de 1 a 4 segs en responder */

    } else if(type == 'user') {
        /* a(user). Ponerle la clase user al contenedor */
        contCard.className = 'block block--' + type;

        /* b(user). Ponerle la clase user al contenedor */
        card.className = 'block__card block__card--' + type; 

        /* c(user). Meter tarjeta dentro de bloque */
        contCard.appendChild(card);
    
        /* d(user). Meter el mesanje dentro de la tarjeta */
        card.innerHTML = message;

        /* e(user). Ultimo: Meter el bloque con todo su contenido dentro de la chat Sheet */
        chatSheet.appendChild(contCard);

        /* f(user). Baja el scroll para mostar el ultimo chat */
        chatSheet.scrollIntoView({behavior: 'smooth', block: 'end'});

        /* g(user). Limpiar input */
        resetInput();
    }
}

function getRandomN(arrayLista) {
    /* 1. Tamaño del array */
    let lenghtLista = arrayLista.length
    /* 2. Arroja número random 
        - Math.trunc: Devuelve el número sin sus decimales ej: 1.24, devuelve 1
        - Lo que está dentro de trunch(): es la formula para sacar números aleatorios en un determinado rango*/
    let randomNumber = Math.trunc(Math.random() * (lenghtLista - 0) + 0);

    return randomNumber;
}

function resetInput() {
    inputWrite.value = '';
    inputWrite.focus();
}

/* Le quita las tildes a la palabras entrantes */
function getWithoutTilde(text) {
    let word = '';

    for (let i = 0; i < text.length; i++) {
        switch (text[i]) {
            case 'á':
                word += 'a';
                break;
            
            case 'é':
                word += 'e';
                break;  
                
            case 'í':
                word += 'i';
                break;

            case 'ó':
                word += 'o';
                break;

            case 'ú':
                word += 'u';
                break;
                
            default:
                word += text[i];
                break;
        }
    }

    return word;
}

/* A esta función se le debe pasar como argumentos el JSONuser con clave */
function matchInclude(elJSON, texto) {

    let siono = false;
    
    for (let i = 0; i < elJSON.length; i++) {
        if(texto.includes(elJSON[i])) {
            console.log(elJSON[i]);
            siono = true;
        }
    }

    return siono;
}

/* ***************** Listeners ***************** */

btnSend.addEventListener('click', function(){processWord(inputWrite.value)});

/* Función para enviar el mensaje mediante la tecla enter */
document.addEventListener('keypress', function(e){
    /* 1. Si la tecla presionada es 'Enter'*/
    if(e.keyCode === 13) {
        /* 2. Si el input está focuseado */
        if(inputWrite === document.activeElement) {
            processWord(inputWrite.value);
        }
    }
});

window.addEventListener('load', resetInput());

