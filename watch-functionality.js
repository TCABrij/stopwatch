const hourElement = document.getElementById('hours')
const minuteElement = document.getElementById('minutes')
const secondElement = document.getElementById('seconds')
const div = document.querySelector('.laps')


const watch = {
    started: false,
    paused: false,
    hours: 0,
    minutes: 0,
    seconds: 0,
    reset(){
        watch.seconds = 0;
        watch.minutes = 0;
        watch.hours = 0;
        this.updateWatch();
        div.innerHTML = ""
        div.style.border = "none"
    },

    updateWatch(){
        hourElement.textContent = watch.hours;
        minuteElement.textContent = watch.minutes;
        secondElement.textContent = watch.seconds;
    },
    updateSecs(){
        secondElement.textContent = watch.seconds;
    },
    updateMins(){
        minuteElement.textContent = watch.minutes;
    },
    updateHours(){
        hourElement.textContent = watch.hours;
    },
}

const buttons = document.querySelectorAll('.button');
buttons.forEach( button => {
     button.addEventListener('click', function doSomething(){
       
        setInterval(function(){

            if(button.classList.contains('start-btn')){
                watch.started = true;
    
                if(watch.started){
                   watch.seconds = watch.seconds + 1; 
                   watch.updateSecs();
    
                   if(watch.seconds > 59){
                       watch.minutes = watch.minutes + 1;
                       watch.seconds = 0;
                       watch.updateMins()
                       watch.updateSecs()
    
                       if(watch.minutes > 59){
                           watch.hours = watch.hours + 1;
                           watch.minutes = 0;
                           watch.updateMins()
                           watch.updateHours()
                       }
                   }
                }
            }
            else if(button.classList.contains('reset-btn')){
                watch.reset();
            }
            else if(button.classList.contains('lap-btn')){
                createLap();
            }

        },1000)
        
     });
})


function createLap(){
    div.innerHTML += `<p class="lap"> 
    ${watch.hours} : ${watch.minutes} : ${watch.seconds}</p>`

    div.style.border = "1px solid white"
}