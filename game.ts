// import axios from 'axios'
// import { referPromptInnerText } from "./fetch";

// console.log(referPromptInnerText)

console.log("check")
const USER_API_ENDPOINT: string = 'http://localhost:3000/api/user'
const loginBtn = document.getElementById('loginBtn') as HTMLDivElement
console.log(loginBtn)
const username = document.getElementById('loginUsername') as HTMLInputElement
const password = document.getElementById('loginPassword') as HTMLInputElement

loginBtn?.addEventListener("click", async () => {
    console.log("clicked")
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


async function getUserById () {
    console.log("object")
    console.log(localStorage.getItem('userId'));
    const user = await fetch(USER_API_ENDPOINT + "/" + localStorage.getItem('userId'));
    const userData = await user.json();
    console.log(userData)

}

const profileBtn = document.getElementById('get-profile') as HTMLButtonElement;

console.log(profileBtn)

profileBtn.addEventListener('click', async () => {

    console.log("object")
    console.log(localStorage.getItem('userId'));
    const user = await fetch(USER_API_ENDPOINT + localStorage.getItem('userId'));
    const userData = await user.json();
    console.log(userData[0])

})

getUserById();

