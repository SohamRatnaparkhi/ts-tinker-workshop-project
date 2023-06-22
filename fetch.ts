let referPromptInnerText;

const referPromptElement = document.getElementById('referPrompt');
const inputPromptElement = document.getElementById('promptField')
const PROMT_API_ENDPOINT:string = 'http://localhost:3000/api/prompt/level/1'

inputPromptElement?.addEventListener('input', () => {

    // console.log('Event listener started:')

    // if(referPromptElement && inputPromptElement.textContent){
        const promptArray = referPromptElement?.querySelectorAll('span');
        const arrayValue = inputPromptElement.value.split('');
        console.log(inputPromptElement.textContent)

        let correct: boolean = false;
        
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
        }
    
})

async function fetchQuote() {
    try{
        const response = await fetch(PROMT_API_ENDPOINT);
        const data = await response.json();

        if(referPromptElement){
            // referPromptElement.innerText = data.prompts[0].quote;
            // console.log("DATA: "+ data.prompts[0].quote);
         
            referPromptInnerText = data.prompts[0].quote;
        }

    } catch (error) {
        console.log(`Cannot fetch quote: ${error}!`);
    }
}

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
        
    } else {
      console.log('No fetched quote available');
    }
  }

useFetchedData();