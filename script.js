let inputSlider=document.querySelector("[datalengthSlider]");
let lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector(".display");
const copybtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const indictor = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generatepass");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = "";
let passwordLength=10;
let checkcount =0;
//lengthDisplay.innerText = passwordLength;

handleslider();
setIndicator('#fcc')

function handleslider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indictor.style.backgroundColor = color;


}

function getRanIntger(min,max){
    return Math.floor(Math.random() * (max-min))+min;
}

function generateRandomNumber(){
    return getRanIntger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRanIntger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRanIntger(65,91));
}

function generateSymbol(){
    const randNum = getRanIntger(0,symbols.length);
    return symbols.charAt(randNum);

    //return String.fromCharCode(getRanIntger(33,48));
}

// console.log("Number: ", generateRandomNumber());
// console.log("Lowercase: ", generateLowerCase());
// console.log("Uppercase: ", generateUpperCase());
// console.log("Symbols: ", generateSymbol());

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        document.querySelector('.textstatus').textContent= 'Strong';
        document.querySelector('.textstatus').style.color ='#0f0';
        setIndicator("#0f0");
    }
     else if (
      (hasLower || hasUpper) &&(hasNum || hasSym) && passwordLength >= 6)
       {
        document.querySelector('.textstatus').textContent= 'Medium';
        document.querySelector('.textstatus').style.color ='yellow';
        setIndicator("#ff0");
    } 
    else {
        document.querySelector('.textstatus').textContent= 'Low'
        document.querySelector('.textstatus').style.color ='#f00';

         setIndicator("#f00");
    }
  }

  async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e)
    {
        copyMsg.innerText = "Failed";
    }
    //to make copy bala visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
  }

  function handleCheckBoxChange(){
    checkcount = 0;
    allcheckbox.forEach( (checkbox) =>{
        if(checkbox.checked)
            checkcount++;
            //console.log(checkcount);
    })
    // speccial case:
    if(passwordLength < checkcount){
        passwordLength = checkcount;
        handleslider();
    }
  }

  allcheckbox.forEach( (checkbox) =>{
        checkbox.addEventListener('change',handleCheckBoxChange);
  })

  inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleslider();
  })

  copybtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
  })



// Shuffle the array randomly - Fisher Yates Method
function shufflepassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
  }
  
  generateBtn.addEventListener('click',() =>{
    //none of the checkbox are selected than no password
    if(checkcount <= 0) return;

    if(passwordLength < checkcount){
        passwordLength = checkcount;
        handleslider();
    }

    if(password.length)
        password="";
    // let's full fill the condation of checkbox.
    // if(uppercaseCheck.checked){
    // password += generateUpperCase();
    // }

    // if(uppercaseCheck.checked){
    //     password += generateLowerCase();
    //     }

    // if(uppercaseCheck.checked){
    //     password += generateRandomNumber();
    // }

    // if(uppercaseCheck.checked){
    //     password += generateSymbol();
    //     }

    let funcArr=[];
    if (uppercaseCheck.checked) 
        funcArr.push(generateUpperCase);

    if (lowercaseCheck.checked) 
        funcArr.push(generateLowerCase);

    if (numbersCheck.checked) 
        funcArr.push(generateRandomNumber);

    if (symbolsCheck.checked)
        funcArr.push(generateSymbol);

    // compulsory function:
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
        //console.log(password);
      }
      //console.log(password);

    // remanning password:
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex= getRanIntger(0,funcArr.length);
        //console.log(randIndex);
        password += funcArr[randIndex]();
       // console.log(password);
    }

    //shufal password:
    password = shufflepassword(Array.from(password));
    console.log(password);
    //show in UI:
    passwordDisplay.value = password;
    calcStrength();

    copyMsg.innerText = "";

  })

