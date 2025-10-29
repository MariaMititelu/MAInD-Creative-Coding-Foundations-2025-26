
// let greetings = "hi!"
// let numberA = 4
// let numberB = 2
// let myNumber = "1"

// let greetNumber = greetings + numberA

// let sum = numberA / numberB
// let sumB = numberB + myNumber

// console.log(greetings)
// console.log(numberA)
// console.log(greetNumber)
// console.log(sum)

// console.log(sumB)

// let number = 0

// console.log(number)

// number += 1

// console.log(number)

// number += 1

// console.log(number)

const BUTTON = document.getElementById("button");
const BOX = document.getElementById("result");
const INPUT = document.getElementById("userInput");

let number = 0;

BUTTON.addEventListener("click", () => {

    let userInput = INPUT.value;

    console.log(userInput)

    let boxinput = document.createElement("p")
    boxinput.textConstent=userInput

    BOX.appendChild(userInput);

    // BOX.innerHTML = number;

})


