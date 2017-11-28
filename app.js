var inquirer = require("inquirer");
var BasicCard = require("./BasicCard");
var ClozeCard = require("./ClozeCard");

// prompt user to create a basic flashcard

inquirer.prompt([
    {
        type: "list",
        message: "What flashcard do you want to create?",
        choices: ["Basic", "Cloze-Deleted"],
        name: "cardType"
    }
]).then(function (userChoice) {
    userChoice.cardType === "Cloze-Deleted" ? createCdFlashcard() : createBasicFlashCard();

})

function createBasicFlashCard() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "front",
                message: "what question do you like to put on the front of the card?"
            },
            {
                type: "input",
                name: "back",
                message: "what answer do you like to put on the back of the card?"
            }
        ]).then(function (response) {
            var firstPresident = new BasicCard(response.front, response.back);
            console.log(firstPresident.front);
            inquirer.prompt([
                {
                    type: "confirm",
                    message: "Do you like to see the answer?",
                    name: "confirm",
                    default: false
                }
            ]).then(function(userConfirm){
                if(userConfirm.confirm){
                    console.log(firstPresident.back);
                }
            })

            
        });
}

function createCdFlashcard() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "text",
                message: "what question do you like to put on the front of the card?"
            },
            {
                type: "input",
                name: "cloze",
                message: "what answer do you like to put on the back of the card?"
            }
        ]).then(function (response) {
            var firstPresident = new ClozeCard(response.text, response.cloze);
            if (response.text.includes(response.cloze)) {

                console.log(firstPresident.partial());
                inquirer.prompt([
                    {
                        type: "confirm",
                        message: "Do you want to know the answer?",
                        name: "confirm",
                        default: false
                    }
                ]).then(function (secondResponse) {
                    if (secondResponse.confirm) {
                        console.log(firstPresident.fullText());
                    }
                });
            } else {
                firstPresident.error();
            }
        });
}