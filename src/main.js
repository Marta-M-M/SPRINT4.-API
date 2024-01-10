var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c, _d;
var _this = this;
// Variable para almacenar el chiste actual
var jokeActual;
// Creamos función para poder llamar a la API de los chistes
//Declaramos función asincrónica que devuelve una promesa de tipo Chiste
function fetchChiste() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('https://icanhazdadjoke.com/', {
                        headers: {
                            'Accept': 'application/json'
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    console.log('chiste obtenido:', data);
                    return [2 /*return*/, { id: data.id, texto: data.joke }];
            }
        });
    });
}
// Creamos función para mostrar el chiste por pantalla con parámetro joke que será de tipo Chiste definido previamente
function mostrarChiste(joke) {
    //Elemento del DOM donde se mostrara el chiste por pantalla 
    var jokeTextElement = document.getElementById('texto-chistes');
    if (jokeTextElement) {
        //Si el elemento existe (dif de null o undefined), aparecera el texto del chiste en el contenido
        jokeTextElement.textContent = joke.texto;
    }
}
// Event listener per al botó de "Següent Acudit"
(_a = document.getElementById('siguiente-chiste')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
    var joke, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetchChiste()];
            case 1:
                joke = _a.sent();
                jokeActual = joke;
                mostrarChiste(joke);
                console.log(joke);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('Error al obtener el chiste:', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//Llamamos a fetchChiste para mostrar un chiste inicial por pantalla
window.addEventListener('DOMContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {
    var initialJoke, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetchChiste()];
            case 1:
                initialJoke = _a.sent();
                jokeActual = initialJoke;
                mostrarChiste(initialJoke);
                votarChiste(initialJoke, 2);
                console.log(initialJoke);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error al obtener el chiste inicial:', error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Array para almacenar los chistes y sus puntuaciones
var reportJokes = [];
// Función para manejar la votación del chiste
function votarChiste(joke, score) {
    // Buscar si el chiste ya ha sido votado
    var index = reportJokes.findIndex(function (item) { return item.joke === joke.texto; });
    if (index !== -1) {
        // Si ya ha sido votado, actualizar la puntuación
        reportJokes[index].score = score;
        reportJokes[index].date = new Date().toISOString();
    }
    else {
        // Si no ha sido votado, agregarlo al array
        var report = {
            joke: joke.texto,
            score: score,
            date: new Date().toISOString(),
        };
        reportJokes.push(report);
    }
    // Mostrar el array en la consola
    console.log('puntuación hecha', reportJokes);
}
// Event listeners para los botones de votación
(_b = document.getElementById('votar-1')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () { return votarChiste(jokeActual, 1); });
(_c = document.getElementById('votar-2')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', function () { return votarChiste(jokeActual, 2); });
(_d = document.getElementById('votar-3')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', function () { return votarChiste(jokeActual, 3); });
