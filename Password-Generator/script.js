const resultEl = document.querySelector(".result");
const clipboard = document.querySelector("#clipboard");
const lengthEl = document.querySelector(".length");
const uppercaseEl = document.querySelector(".uppercase");
const lowercaseEl = document.querySelector(".lowercase");
const numbersEl = document.querySelector(".numbers");
const symbolsEl = document.querySelector(".symbols");
const generateEl = document.querySelector("#generate");

const randomFun = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};
console.log(randomFun)

function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random()*26) + 97); //a=97 in UTF-16
};

function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random()*26) + 65); //A=65 in UTF-16
};

function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random()*10) + 48) //0-48
};

function getRandomSymbol(){
    const symbols = '!@#$%^&*(){}[]=<>,.';
    return symbols[Math.floor(Math.random()*symbols.length)];
};

generateEl.onclick = () => {
    const psLength = +lengthEl.value;
    const isLower = lowercaseEl.checked;
    const isUpper = uppercaseEl.checked;
    const isNumber = numbersEl.checked;
    const isSymbol = symbolsEl.checked;

    resultEl.innerHTML = generatePassword(isLower,isNumber, isSymbol, isUpper, psLength)
};

function generatePassword(lower, number, symbol, upper, length){
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    console.log(typesCount);

    //Only True objects move to Object.value
    const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0]);
    console.log(typesArray)

    if (typesCount === 0){
        return alert("Please Select any Checkbox!"); 
    }
    
    for (let i = 0; i < length; i += typesCount) {
        typesArray.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFun[funcName]();
        })
    }
    const finalPassword = generatedPassword.slice(0, length);
    // console.log(finalPassword);
    return finalPassword;
};

clipboard.onclick = () =>{
    const textArea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) return alert("Please generate password to copy!");

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select()
    document.execCommand('copy');
    textArea.remove();
    alert("Password Copied to Clipboard!");
};