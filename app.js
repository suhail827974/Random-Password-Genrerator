const passwordDisplay = document.querySelector('.password-display')
const display = document.querySelector('.display')
const copyData = document.querySelector('.copy-data')
const passwordSetting = document.querySelector('.password-setting')
const lengthContainer = document.querySelector('.length-container')
const lengthNumber = document.querySelector(".lengthNumber")
const lenghtSlider = document.querySelector("[data-lenghtSlider]")
const allCheckboxes = document.querySelectorAll('checkbox')
const uppercaseCheck = document.querySelector('#UPPERCASE')
const lowercaseCheck = document.querySelector('#lowercase')
const numbersCheck = document.querySelector('#numbers')
const symbolsCheck = document.querySelector('#special-characters')
const strengthContainer = document.querySelector('.strenght-container')
const dataIndicator = document.querySelector('.data-indicator')
const generateButton = document.querySelector('.generate-button')

// To get the random symbol creating a string 
const symbols = '!@#$%^&*(){}":[]';


let password = "";
let passwordLength = 10;
let checkboxCount = 0;
handleSlider();

setIndicator("#ff0000");
function handleSlider(){
    lenghtSlider.value = passwordLength;
    lengthNumber.innerText = passwordLength;
    if(passwordLength<=4){
        dataIndicator.style.backgroundColor = "red";
    }else if(passwordLength>4 && passwordLength<10){
        dataIndicator.style.backgroundColor = "yellow";
    }
    else{
        dataIndicator.style.backgroundColor = "green";
    }
}

function setIndicator(color){
    dataIndicator.style.backgroundColor = color;

    // by using style -> camalcase
    // dataIndicator.style.backgroundColor = "green";

    // by using cssText in the backticks syle like css -> cababcase 
    // dataIndicator.style.cssText =`
    //                         background-color: red;
    //                         border:2px solid yellow;
    //                         `
    // shadow 
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max-min))+ min;
}

function generateRandomNumber(){
    return getRandomInt(0,9);
}

function generateUppercase(){
    return String.fromCharCode(getRandomInt(65, 90)); 
}

function generateLowercase(){
    return String.fromCharCode(getRandomInt(97,122)); 
}

function generateSymbol(){
    const ranSymbol = getRandomInt(0, symbols.length);
    return symbols.charAt(ranSymbol)
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(uppercaseCheck.checked){
        hasUpper = true;
    }
    if(lowercaseCheck.checked){
        hasLower = true;
    }
    if(numbersCheck.checked){
        hasUpper = true;
    }
    if(symbolsCheck.checked){
        hasUpper = true;
    }

    // if(hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8){
    //     setIndicator("yellow")
    // }
    // else if(   (hasLower || hasUpper) &&
 
    //          (hasSymbol || hasNumber)&&
    //             passwordLength >=6){
    //                 setIndicator("blue")
    //             }

    // else{
    //     setIndicator("black")
    // }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(display.value);
        copyData.innerText = "copied";
    }
    catch(e){
        copyData.innerText = "failed"
    }
    // To make copy Data visible
    copyData.classList.add("active")

    setTimeout(() => {
        copyData.classList.remove("active")
        copyData.innerText = ""
    }, 2000);
}

function sufflepassword(Array){
    // fisher yates algo
    for(let i = Array.lenght-1; i>0; i--){
        const j = math.floor(math.random() * (i+1));
        const temp = Array[i];
        Array[i] = Array[j];
        Array[j] = temp;
    }
    let str = "";
    Array.forEach( (el) =>(str += el))
    return str;
}

function checkboxChangeHandler(){
    checkboxCount=0;
   allCheckboxes.forEach( (checkbox) =>{
    if(checkbox.checked){
        checkboxCount++;
    }
   });
//    special condition 
   if(passwordLength < checkboxCount){
    passwordLength = checkboxCount;
    handleSlider();
   }
}

allCheckboxes.forEach(   (checkbox)=>{
    allCheckboxes.addEventListener('change', checkboxChangeHandler);


})

lenghtSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copyData.addEventListener('click', ()=>{
    if(display.value)
    copyContent();
}) 

generateButton.addEventListener('click', ()=>{

    if(passwordLength <= 0) 
    return;

    if(passwordLength< checkboxCount){
        passwordLength = checkboxCount;
        handleSlider();
    }

    password= "";

    // if(uppercaseCheck.checked){
    //     password+= generateUppercase();
    // }
    // if(lowercaseCheck.checked){
    //     password+= generateLowercase();
    // }
    // if(numbersCheck.checked){
    //     password+= generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password+= generateSymbol();
    // }
    

    let funArr = [];

    if(uppercaseCheck.checked){
        funArr.push(generateUppercase)
    }
    if(lowercaseCheck.checked){
        funArr.push(generateLowercase)
    }
    if(numbersCheck.checked){
        funArr.push(generateRandomNumber)
    }
    if(symbolsCheck.checked){
        funArr.push(generateSymbol)
    }
    for(let i =0; i<funArr.length; i++){
        password += funArr[i]();
    }
    for(let i =0; i<passwordLength-funArr.length; i++){
        let rndIndex = getRandomInt(0, funArr.length)
        password += funArr[rndIndex]();
    }

    password = sufflepassword(Array.from(password));

    display.value= password;

    calcStrength();

})