const regUserName = document.getElementById('regUserName') as HTMLInputElement;
const regPassword = document.getElementById('regPassword') as HTMLInputElement;
const regConfirm = document.getElementById('regConfirmPassword') as HTMLInputElement;
const pwdUnmatchWarning = document.getElementById('pwdUnmatch') as HTMLParagraphElement;

const regButton = document.getElementById('registerBtn') as HTMLButtonElement;

const USERC_API_ENDPOINT: string = 'http://localhost:3000/api/user';



const confirmPwdArray = regConfirm.value.split('');

// regConfirm.addEventListener('input', () => {

//     const passwordArray = regPassword.value.split('');

//     if(passwordArray){
//         passwordArray.forEach((char: string, index: number) => {
//             const confirmChar = confirmPwdArray[index];
//             console.log(confirmChar)
//             if(char == confirmChar){
//                 pwdUnmatchWarning.style.display = 'none';
//             } else{
//                 pwdUnmatchWarning.innerText = 'passwords do not match!'
//             }
//         })
//     }
    
// })

// console.log(regUserName)
// console.log(regPassword)
// console.log(regConfirm)
console.log(USERC_API_ENDPOINT)

regButton?.addEventListener('click', async () => {
    console.log('register click!')
    if(regUserName  || regPassword || regConfirm){

        if(regUserName.value == '' || regPassword.value == '' || regConfirm.value == ''){
            alert('please fill in all fields');
            return;
        }
    
        const userId : string= regUserName.value + regPassword.value;
        
        if(regPassword.value === regConfirm.value){
            
            const createUser = await fetch(USERC_API_ENDPOINT + '/create', {
                method: 'POST',
                body: JSON.stringify({
                    "username": regUserName.value,
                    "password": regPassword.value,
                    "id": userId
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const responseMessage = await createUser.json();
            console.log(responseMessage);

            window.location.href = 'login.html'
        } else {
            pwdUnmatchWarning.innerHTML = 'passwords do not match!!!';
        }
    }
})

