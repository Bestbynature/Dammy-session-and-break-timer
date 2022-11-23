let myTimeOut2;     let myTimeOut;         let myInterval;
let myInterval2;    let secCount = 0;       let count = 1;
let audio = document.getElementById('beep');
let breakTime = document.getElementById('break-length');
let sessionTime = document.getElementById('session-length');
let timeLeft = document.getElementById('time-left');
let timerLabel = document.getElementById('timer-label');
let start_stop = document.getElementById('start_stop');
let breakCount = parseInt(breakTime.innerText);
let minCount = parseInt(sessionTime.innerText);

const breakIncrement = () =>{
    if(breakTime.innerText < 60){
        breakTime.innerText = parseInt(breakTime.innerText) + 1;
        breakCount = parseInt(breakTime.innerText) -  1;
    }else return;
}
   
const breakDecrement = () =>{
    if(breakTime.innerText > 1){
        breakTime.innerText = parseInt(breakTime.innerText) - 1;
        breakCount = breakTime.innerText - 1;
    }else return;    
}

const sessionIncrement = () =>{
    if(sessionTime.innerText < 60){
        sessionTime.innerText = parseInt(sessionTime.innerText) + 1;
        minCount = sessionTime.innerText -1;
        if(minCount >= 10){
            timeLeft.innerText = `${sessionTime.innerText}:00`;
        }else{
            timeLeft.innerText = `0${sessionTime.innerText}:00`;
        }
    }else return;
}

const sessionDecrement = () =>{    
    if(sessionTime.innerText > 1){
        sessionTime.innerText = parseInt(sessionTime.innerText) - 1;
        minCount = sessionTime.innerText - 1;
        if(minCount >= 10){
            timeLeft.innerText = `${sessionTime.innerText}:00`;
        }else{
            timeLeft.innerText = `0${sessionTime.innerText}:00`;
        }
    }else return;
}


function stopTimer2(){
    audio.play();
    clearTimeout(myTimeOut);
    timerLabel.innerText = "Ongoing Session";
    minCount = sessionTime.innerText
    secCount = 0;
    startTimerCaller()
}

function breakTimer(){
    document.getElementById('session-increment').disabled = true;
    document.getElementById('session-decrement').disabled = true;
    document.getElementById('break-increment').disabled = true;
    document.getElementById('break-decrement').disabled = true;

    if (breakCount >= 10 && secCount >= 10){
        timeLeft.innerText = `${breakCount}:${secCount}`;
    }else if(breakCount < 10 && secCount >= 10) {
        timeLeft.innerText = `0${breakCount}:${secCount}`;
    }else if (breakCount >= 10 && secCount < 10){
        timeLeft.innerText = `${breakCount}:0${secCount}`;
    }else{
        timeLeft.innerText = `0${breakCount}:0${secCount}`;
    }
    
    if(breakCount == 0){
        if(secCount == 0){
            clearInterval(myInterval2);
            myTimeOut2 = setTimeout(stopTimer2, 2000);
        }else{
            secCount = secCount - 1;
        }
    }else{
        if(secCount !== 0){
            secCount = secCount - 1;
        }else{
            breakCount = parseInt(breakCount - 1);
            secCount = 59;
        }
    }
}



const breakTimerCaller = () =>{
    breakCount = breakTime.innerText;
    myInterval2 = setInterval(breakTimer, 1000);
}

function stopTimer(){
    audio.play();
    clearTimeout(myTimeOut);
    timerLabel.innerText = "Ongoing Break";
    secCount = 0;
    breakTimerCaller();
}

const startTimer = () =>{
    document.getElementById('session-increment').disabled = true;
    document.getElementById('session-decrement').disabled = true;
    document.getElementById('break-increment').disabled = true;
    document.getElementById('break-decrement').disabled = true;
    
    if (minCount >= 10 && secCount >= 10){
        timeLeft.innerText = `${minCount}:${secCount}`;
    }else if(minCount < 10 && secCount >= 10) {
        timeLeft.innerText = `0${minCount}:${secCount}`;
    }else if (minCount >= 10 && secCount < 10){
        timeLeft.innerText = `${minCount}:0${secCount}`;
    }else{
        timeLeft.innerText = `0${minCount}:0${secCount}`;
    }
    
    if(minCount == 0){
        if(secCount == 0){
            clearInterval(myInterval);
            myTimeOut = setTimeout(stopTimer, 2000);
        }else{
            secCount = secCount - 1;
        }
    }else{
        if(secCount!== 0){
            secCount = secCount - 1;
        }else{
            minCount = minCount - 1;
            secCount = 59;
        }
    }
}

const startTimerCaller = () =>{
    myInterval = setInterval(startTimer, 1000);
}

const startStopChecker = () =>{
    count++;
    if (count == 2){
            startTimerCaller()
    }else{
        if(count%2 === 1){
            if(timerLabel.innerText === "Ongoing Break"){
                clearInterval(myInterval2);
            }else{
                clearInterval(myInterval);
            }
        }else{
            if(timerLabel.innerText === "Ongoing Break"){
                breakTimerCaller();
            }else{
                startTimerCaller();
            }
        }
    }
}

start_stop.addEventListener("click", startStopChecker);

const reset = () =>{
    clearInterval(myInterval);
    clearInterval(myInterval2);
    if(audio.play()){
        audio.pause();
        audio.currentTime = 0;
    }
    sessionTime.innerText = 25;
    breakTime.innerText = 5;
    timeLeft.innerText = `${sessionTime.innerText}:00`;
    timerLabel.innerText = "Ongoing Session";
    minCount = sessionTime.innerText - 1;
    secCount = 59;
    count = 1;
    breakCount = breakTime.innerText - 1;

    document.getElementById('session-increment').disabled = false;
    document.getElementById('session-decrement').disabled = false;
    document.getElementById('break-increment').disabled = false;
    document.getElementById('break-decrement').disabled = false;
}
