let referPromptInnerText;

const referPromptElement = document.getElementById('referPrompt');
const inputPromptElement = document.getElementById('promptField') as HTMLInputElement;
const timerElement = document.getElementById('timer');

const wpmElement = document.getElementById('wordsPerMin');


const PROMT_API_ENDPOINT:string = 'http://localhost:3000/api/prompt/level/1'


// Type check:
inputPromptElement?.addEventListener('input', () => {

    // console.log('Event listener started:')

    // if(referPromptElement && inputPromptElement.textContent){
        const promptArray = referPromptElement?.querySelectorAll('span');
        const arrayValue = inputPromptElement.value.split('');
        console.log(inputPromptElement.textContent)

        let correct: boolean = true;
        
        if(promptArray){
            promptArray.forEach((characterSpan, index) => {


                const char = arrayValue[index];
                // console.log(char);

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
        if(correct){
            console.log("Good! Proceed!");
            console.log(`WPM: ${wpm()}`)
            if(wpmElement) wpmElement.innerText = wpm().toString();
        }
    
})
// ----------------------------------------------------------------------------------------
let wordLength: number = 0;

// Fetching quote from the API:
async function fetchQuote() {
    try{
        const response = await fetch(PROMT_API_ENDPOINT);
        const data = await response.json();

        // console.log(wordLength)

        if(referPromptElement){
            // referPromptElement.innerText = data.prompts[0].quote;
            // console.log("DATA: "+ data.prompts[0].quote);
         
            referPromptInnerText = data.prompts[0].quote;
            
            const wordArray = data.prompts[0].quote.split(" ");
            wordLength = wordArray.length;
            // console.log(wordLength)
        }

    } catch (error) {
        console.log(`Cannot fetch quote: ${error}!`);
    }
}

// Using quote or prompt in the game:
async function useFetchedData() {
    await fetchQuote();
    if (referPromptInnerText && referPromptElement){
        //   console.log('Fetched Quote:', referPromptInnerText );
        referPromptElement.innerText = '';

        referPromptInnerText.split('').forEach(character => {
            const characterSpan = document.createElement('span');
        //    characterSpan.classList.add('correct');
            characterSpan.innerText = character;
            referPromptElement.appendChild(characterSpan)
        });
        if(inputPromptElement) inputPromptElement.value = "";
        startTimer();
        
    } else {
      console.log('No fetched quote available');
    }
  }

useFetchedData();

// Timer: -------------------------------------------------------------------------------------
let startTime: any;

function startTimer() {
    if(timerElement)
        timerElement.innerText = '0';
        startTime = new Date();

        setInterval(() => {
            if(timerElement) timerElement.innerText = getTimerTime().toString();
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