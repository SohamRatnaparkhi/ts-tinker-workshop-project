async function fetchQuote() {
    try{
        const response = await fetch('http://localhost:3000/api/prompt/level/1');
        const data = await response.json();

        const referPromptElement = document.getElementById('referPrompt');

        if(referPromptElement)
            referPromptElement.innerText = data.prompts[0].quote;
            
    } catch (error) {
        console.log(`Cannot fetch quote: ${error}!`);
    }
}

fetchQuote();