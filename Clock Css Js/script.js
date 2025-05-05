const hourHand = document.querySelector('[data-hour-hand]');
const minuteHand = document.querySelector('[data-minute-hand]');
const secondHand = document.querySelector('[data-second-hand]');

let secondTurns = 0
let lastSecond = 0

function setClock(){
    const currentDate = new Date();
    const seconds = currentDate.getSeconds()
    const minutes = currentDate.getMinutes()
    const hours = currentDate.getHours()

    if(seconds === 0 && lastSecond === 59){
        secondTurns++
    }
    lastSecond = seconds

    const secondRetio = (seconds / 60) ;
    const minuteRetio = ((minutes + secondRetio) / 60);
    const hourRetio = ((hours % 12) + minuteRetio) / 12;



    setRotation(secondHand,secondRetio * 360 + (360 * secondTurns))
    setRotation(minuteHand,minuteRetio * 360)
    setRotation(hourHand,hourRetio * 360)
    
}

function setRotation(element, rotationRatio){

   element.style.transform = `rotate(${rotationRatio}deg)` 
}

setInterval(setClock, 1000);
setClock()
