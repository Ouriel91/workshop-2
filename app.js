const endGameData = [{
    name: "space-stone", avengers: ["captain-america", "iron-man"]
}, {
    name: "mind-stone", avengers: ["ant-man", "captain-america"]
}, {
    name: "reality-stone", avengers: ["rocket-raccoon", "thor"]
}, {
    name: "power-stone", avengers: ["war-machine", "nebula"]
}, {
    name: "time-stone", avengers: [{name: "hulk"}]
}, {
    name: "soul-stone", avengers: ["black-widow", "hawkeye"]
}];

const stones = document.querySelectorAll('.stone');
const avengers = document.querySelectorAll('.avenger');
const glove = document.querySelector('.infinity_glove');

const objCheck = {name: "", avengers:[]}

function handleAnswer(name, avengersArr, answer){
    if(answer){
        cleanUpUiAfterAnswer(name, avengersArr, true)
        winnigCheck()
    }
    else{
        alert("wrong answer")
        cleanUpUiAfterAnswer(name, avengersArr, false)
    }
}

function cleanUpUiAfterAnswer(name, avengers, answer) {

    if(!answer){ 
        document.getElementById(name).style.backgroundColor = "transparent"
    }
    else{
        document.getElementById(name).style.display = "none"
    } 

    avengers.forEach((avenger) => {
        document.getElementById(avenger).style.backgroundColor = "transparent"
    }) 

    prepareForReCheck()
}

function prepareForReCheck() {
    objCheck.name = ""
    objCheck.avengers = []
}

function winnigCheck() {
    
    const displayStones = document.querySelectorAll(".stone")
    for (let i = 0; i < displayStones.length; i++) {
        if (!(displayStones[i].style.display === "none")){
            return
        }
    }

    alert("you win")
    displayStones.forEach(stone => {
        stone.style.display = "block"
        stone.style.backgroundColor = "transparent"
    })
}

function changeBackgroundItem(item) {
    item.style.backgroundColor = 'blue'
}

//need some another work for user experience
function storeData (item) {

    if(item.includes('stone')){
        objCheck.name = item
    }
    else {
        objCheck.avengers.push(item)
    }  
}

//events
stones.forEach(stone => {
    stone.addEventListener('click', () => {
        changeBackgroundItem(stone)
        storeData(stone.id)
    })
})

avengers.forEach(avenger => {
    avenger.addEventListener('click', () => {
        storeData(avenger.id)
        changeBackgroundItem(avenger)
    })
})

glove.addEventListener('click', () => {
    endGameData.forEach((item) => {

        const avengersArr = objCheck.avengers
        const itemsArr = item.avengers
        //lexical sort
        avengersArr.sort()
        itemsArr.sort()

        if(avengersArr.length !== itemsArr.length){
            return
        }

        //special case for this stone because data for that build different
        if(objCheck.name === "time-stone"){
            if(avengersArr.length === 1 && avengersArr[0] === item.avengers[0].name){
                handleAnswer(objCheck.name, avengersArr, true)
                return
            }
            else{
                handleAnswer(objCheck.name, avengersArr, false)
                return
            }
        }

        if(objCheck.name === item.name){
            
            for(let i = 0; i < avengersArr.length; i++){
                if((avengersArr[i]) !== itemsArr[i]){
                    handleAnswer(objCheck.name, avengersArr, false)
                    return
                }
            }

            handleAnswer(objCheck.name, avengersArr, true)
        }
    })
})