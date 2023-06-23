let referPromptInnerText: any;

const referPromptElement = document.getElementById('referPrompt') as HTMLDivElement;
const inputPromptElement = document.getElementById('promptField') as HTMLInputElement;
const timerElement = document.getElementById('timer');

const wpmElement = document.getElementById('wordsPerMin');
const accuracyElment = document.getElementById('accuracy');

const PROMT_API_ENDPOINT:string = 'http://localhost:3000/api/prompt/'
const USER_API_ENDPOINT_MATCH: string = 'http://localhost:3000/api/user'

let continueNext: boolean = false;

setTimeout(() => {
    referPromptElement!.innerText = `Loading... Starting in ${(5 - getTimerTime()).toString()} seconds`;
    continueNext = true;
    useFetchedData();
}, 5000);

// Type check:
inputPromptElement?.addEventListener('input',  async () => {

    // console.log('Event listener started:')

    // if(referPromptElement && inputPromptElement.textContent){
        const promptArray = referPromptElement?.querySelectorAll('span');
        const arrayValue = inputPromptElement.value.split('');
        // console.log(inputPromptElement.value)

        let correct: boolean = true;

        
        if(promptArray){
            promptArray.forEach((characterSpan, index) => {


                const char = arrayValue[index];
                // console.log(char);

                if(arrayValue.length === promptArray.length){
                    correct = true;
                    return;
                }

                if(char == null){
                    characterSpan.classList.remove('correct');
                    characterSpan.classList.remove('incorrect');
                    correct = false;
                } else if (char == characterSpan.innerText){
                    characterSpan.classList.add('correct');
                    characterSpan.classList.remove('incorrect');
                } else {
                    characterSpan.classList.remove('correct');
                    characterSpan.classList.add('incorrect');
                    correct = false;
                }


            })
        }

        
        if(correct || countDown === 0){
            const userWPM = wpm();
            timerElement!.innerText = '0';

            console.log("Good! Proceed!");
            console.log(`WPM: ${userWPM}`)

            wpmElement!.innerText = userWPM.toString();
            accuracyElment!.innerText = getAccuracy(referPromptInnerText, inputPromptElement.value).toString() + " %"

            const data = await postGameData();
            console.log(data); 
            
            setTimeout(async () => {

                console.log("This will be delayed!")
                const userChoice = prompt("Do you want to continue? y/n");
                console.log(userChoice)
                if(userChoice == 'n') window.location.href = "profile.html";
                else {
                    console.log(data);
                }
            }, 5000);

            // console.log('Match data:'+data);
        }
    
})
// ----------------------------------------------------------------------------------------
let wordLength: number = 0;

// Fetching from the API: -----------------------------------------------------------------
async function fetchQuote() {
    try{
        const response = await fetch(PROMT_API_ENDPOINT+ 'level/1');
        const data = await response.json();

        // console.log(wordLength)

        if(referPromptElement){
            // referPromptElement.innerText = data.prompts[0].quote;
            console.log("DATA: "+ data.prompts[0].quote);
        
            referPromptInnerText = data.prompts[0].quote;
            
            const wordArray = data.prompts[0].quote.split(" ");
            wordLength = wordArray.length;
            // console.log(wordLength)
        }

    } catch (error) {
        console.log(`Cannot fetch quote: ${error}!`);
    }
}


async function fetchUser() {
    console.log("Fetching user");
    const user = await fetch(USER_API_ENDPOINT + "/" + localStorage.getItem('userId'));
    const userData = await user.json();
    
    let userFetch: UserDetails;
    userFetch = userData.user[0].accuracy;

    console.log("Accuracy:" + userFetch);

    return userFetch.accuracy;
}



// Using quote or prompt in the game:------------------------------------------------------
async function useFetchedData() {
    await fetchQuote();
    if (referPromptInnerText && referPromptElement){
        //   console.log('Fetched Quote:', referPromptInnerText );
        referPromptElement.innerText = '';

        referPromptInnerText.split('').forEach((character: string) => {
            const characterSpan = document.createElement('span');
        //    characterSpan.classList.add('correct');
            characterSpan.innerText = character;
            referPromptElement.appendChild(characterSpan)
        });
        if(inputPromptElement) inputPromptElement.value = "";
        startTimer(100);
        
    } else {
        console.log('No fetched quote available');
    }
}

if(continueNext)
    useFetchedData();

// Timer: -------------------------------------------------------------------------------------
let startTime: any;

let countDown: any = (300 - getTimerTime());

function startTimer(setTo: number) {
    if(timerElement)
        timerElement.innerText = setTo.toString();
        startTime = new Date();

        setInterval(() => {
            if(getTimerTime() <= setTo)
            timerElement!.innerText = (setTo - getTimerTime()).toString();
        }, 1000);
}

function getTimerTime(): number {
    return Math.floor((new Date().getTime() - startTime) / 1000)
}

//WPM --------------------------------------------------------------------------------------------

function wpm() {
    const wordsPerSecond = wordLength/getTimerTime();
    const wordsPerMinute = Math.floor(wordsPerSecond*60);
    return wordsPerMinute;
} 

//Accuracy ----------------------------------------------------------------------------------------

function getAccuracy(prompt:string, input:string):number{

    const promptArr = prompt.split("")
    const inputArr = input.split("");

    let matchedChars: number = 0;

    for(let i = 0; i < promptArr.length; i++){
        if(promptArr[i] === inputArr[i]){
            matchedChars!++;
        }
    }

    console.log(matchedChars);

    const accuracy = matchedChars!/promptArr.length * 100;

    console.log('Accuracy: ' + accuracy);

    return Math.round(accuracy);
}

// send gameData to backend: ------------------------------------------------------------------------------

async function postGameData () {

    console.log('post game request')
    
    const gameData = await fetch(PROMT_API_ENDPOINT + '/match', {
        method: 'POST',
        body: JSON.stringify({
            "prompt": referPromptInnerText,
            "text": inputPromptElement.value,
            "userId": localStorage.getItem('userId'),
            "wpm": wpm()
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }

    });

    const responseGameData = await gameData.json();
    console.log(responseGameData);

    return responseGameData;
}

// 