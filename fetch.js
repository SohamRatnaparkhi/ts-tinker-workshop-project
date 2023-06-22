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
var referPromptInnerText;
var referPromptElement = document.getElementById('referPrompt');
var inputPromptElement = document.getElementById('promptField');
var timerElement = document.getElementById('timer');
var wpmElement = document.getElementById('wordsPerMin');
var PROMT_API_ENDPOINT = 'http://localhost:3000/api/prompt/level/1';
// Type check:
inputPromptElement === null || inputPromptElement === void 0 ? void 0 : inputPromptElement.addEventListener('input', function () {
    // console.log('Event listener started:')
    // if(referPromptElement && inputPromptElement.textContent){
    var promptArray = referPromptElement === null || referPromptElement === void 0 ? void 0 : referPromptElement.querySelectorAll('span');
    var arrayValue = inputPromptElement.value.split('');
    console.log(inputPromptElement.textContent);
    var correct = true;
    if (promptArray) {
        promptArray.forEach(function (characterSpan, index) {
            var char = arrayValue[index];
            // console.log(char);
            if (char == null) {
                characterSpan.classList.remove('correct');
                characterSpan.classList.remove('incorrect');
                correct = false;
            }
            else if (char == characterSpan.innerText) {
                characterSpan.classList.add('correct');
                characterSpan.classList.remove('incorrect');
            }
            else {
                characterSpan.classList.remove('correct');
                characterSpan.classList.add('incorrect');
                correct = false;
            }
        });
    }
    if (correct) {
        console.log("Good! Proceed!");
        console.log("WPM: ".concat(wpm()));
        if (wpmElement)
            wpmElement.innerText = wpm().toString();
    }
});
// ----------------------------------------------------------------------------------------
var wordLength = 0;
// Fetching quote from the API:
function fetchQuote() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, wordArray, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(PROMT_API_ENDPOINT)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    // console.log(wordLength)
                    if (referPromptElement) {
                        // referPromptElement.innerText = data.prompts[0].quote;
                        // console.log("DATA: "+ data.prompts[0].quote);
                        referPromptInnerText = data.prompts[0].quote;
                        wordArray = data.prompts[0].quote.split(" ");
                        wordLength = wordArray.length;
                        // console.log(wordLength)
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log("Cannot fetch quote: ".concat(error_1, "!"));
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Using quote or prompt in the game:
function useFetchedData() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchQuote()];
                case 1:
                    _a.sent();
                    if (referPromptInnerText && referPromptElement) {
                        //   console.log('Fetched Quote:', referPromptInnerText );
                        referPromptElement.innerText = '';
                        referPromptInnerText.split('').forEach(function (character) {
                            var characterSpan = document.createElement('span');
                            //    characterSpan.classList.add('correct');
                            characterSpan.innerText = character;
                            referPromptElement.appendChild(characterSpan);
                        });
                        if (inputPromptElement)
                            inputPromptElement.value = "";
                        startTimer();
                    }
                    else {
                        console.log('No fetched quote available');
                    }
                    return [2 /*return*/];
            }
        });
    });
}
useFetchedData();
// Timer: -------------------------------------------------------------------------------------
var startTime;
function startTimer() {
    if (timerElement)
        timerElement.innerText = '0';
    startTime = new Date();
    setInterval(function () {
        if (timerElement)
            timerElement.innerText = getTimerTime().toString();
    }, 1000);
}
function getTimerTime() {
    return Math.floor((new Date().getTime() - startTime) / 1000);
}
//WPM --------------------------------------------------------------------------------------------
function wpm() {
    var wordsPerSecond = wordLength / getTimerTime();
    var wordsPerMinute = Math.floor(wordsPerSecond * 60);
    return wordsPerMinute;
}
