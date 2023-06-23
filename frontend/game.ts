// import axios from 'axios'
// import { referPromptInnerText } from "./fetch";

// console.log(referPromptInnerText)

// console.log("check")
const USER_API_ENDPOINT: string = 'http://localhost:3000/api/user'
const loginBtn = document.getElementById('loginBtn') as HTMLDivElement
console.log(loginBtn)
const username = document.getElementById('loginUsername') as HTMLInputElement
const password = document.getElementById('loginPassword') as HTMLInputElement

const logoutbtn = document.getElementById('logout-btn') as HTMLButtonElement;

logoutbtn?.addEventListener('click', () => {
    localStorage.removeItem('userId');
    window.location.href = "login.html";
});

loginBtn?.addEventListener("click", async () => {
    // console.log("clicked")
    // const userData = await axios.post(USER_API_ENDPOINT + '/login', {
        // "username": username.value,
        // "password": password.value
    // })
    const userData = await fetch(USER_API_ENDPOINT + '/login', {
        method: 'POST',
        body: JSON.stringify({
            "username": username.value,
            "password": password.value
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const responseData = await userData.json();
    const user :UserDetails = responseData.user;
    localStorage.setItem('userId', user.user.id);
    // go to index.html
    window.location.href = "index.html";
})


const user_name = document.getElementById('user_name') as HTMLElement;
const user_level = document.getElementById('user_level') as HTMLElement;
const user_wpm = document.getElementById('user_wpm');
const user_accuracy = document.getElementById('user_accuracy');
const user_attempts = document.getElementById('user_attempts') as HTMLElement;
const user_scores = document.getElementById('user_scores') as HTMLElement;


async function getUserById () {
    // console.log("object")
    // console.log(localStorage.getItem('userId'));
    const user = await fetch(USER_API_ENDPOINT + "/" + localStorage.getItem('userId'));
    const userData = await user.json();
    
    let userFetch: UserDetails;
    userFetch = userData.user[0];
    // console.log(userData.user[0])

    if(user_name && user_level && user_wpm && user_accuracy && user_attempts && user_scores){
        user_name.innerText = userFetch.user.username;
        user_level.innerText = userFetch.level.toString();
        user_accuracy.innerText = userFetch.accuracy.toString();
        user_attempts.innerText = userFetch.attempts.toString();
        user_wpm.innerText = userFetch.wpm.toString();
        user_scores.innerText = userFetch.scores.toString();
    }
}




const profileBtn = document.getElementById('get-profile') as HTMLButtonElement;

// console.log(profileBtn)

// profileBtn.addEventListener('click', async () => {

//     console.log("object")
//     console.log(localStorage.getItem('userId'));
//     const user = await fetch(USER_API_ENDPOINT + localStorage.getItem('userId'));
//     const userData = await user.json();
//     console.log(userData[0])

// })

getUserById();

