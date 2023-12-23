let startTimer=document.querySelector("#startTimer");
const activeTimers = document.getElementById("activeTimers");
displayNoTimersText();
startTimer.addEventListener("click",()=>{
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    let isTimerActive = false;
    let totalsec=hours*3600+minutes*60+seconds;

    if(totalsec>0){
        
        createTimer(totalsec);
        isTimerActive = true;
        removeNoTimersText();
    }else{
        alert("Please enter a valid timer");
    }
})
function displayNoTimersText() {
    const noTimersText = document.createElement('p');
    noTimersText.classList.add('no-timers-text');
    noTimersText.textContent = 'You have no timers currently!';
    noTimersText.style.fontSize = "14px";
    activeTimers.appendChild(noTimersText);
}
function removeNoTimersText() {
    // Find and remove the "You have no timers currently!" text
    const noTimersText = activeTimers.querySelector('.no-timers-text');
    if (noTimersText) {
        noTimersText.remove();
    }
}
function createTimer(totalsec){
    const timerContainer = document.createElement('div');
    timerContainer.classList.add('timer-container');

    //create an element to show display "time-left"
    const timeLeftElement = document.createElement('div');
    timeLeftElement.classList.add('time-left');
    timeLeftElement.textContent = 'Time Left :';

     // Create an element to display the timer value
     const timerElement = document.createElement('div');
     timerElement.classList.add('timer');
     

      // Create a container for timer control buttons
    const timerControls = document.createElement('div');
    timerControls.classList.add('timer-controls');
  

    // Create the 'Stop Timer' button
    const stopButton = document.createElement('button');
    stopButton.classList.add('control-button', 'stop-button');
    stopButton.textContent = 'Delete';

    const deleteButton = document.createElement('button');
     deleteButton.classList.add('control-button', 'delete-button');
     deleteButton.textContent = 'Stop';
     deleteButton.style.display = 'none';

     deleteButton.addEventListener('click', () => {
        // Remove the timer container
        timerContainer.remove();
        // Check if there are no timers, then display "You have no timers currently!" text
        if (activeTimers.children.length === 0) {
            displayNoTimersText();
        }
    });
    stopButton.addEventListener('click', () => {
        // Stop the timer and remove the timer container
        
        timerContainer.remove();
         // Reset the active timer flag
         isTimerActive = false;
        // Check if there are no timers, then display "You have no timers currently!" text
        if (activeTimers.children.length === 0) {
            displayNoTimersText();
        }
    });

    let timerInterval = setInterval(updateTimerDisplay, 1000);
    function updateTimerDisplay(){
        totalsec--;
        if(totalsec<=0){
            clearInterval(timerInterval);
            timerElement.classList.add('timer-en/ded');
            timerElement.textContent = "Time is up!";
            stopButton.style.display = 'none'; // Hide the Stop Timer button
            deleteButton.style.display = 'inline'; // Show the delete button
            timeLeftElement.style.display = 'none';
            timerContainer.style.backgroundColor = '#f0f757'
        }else{
            timerElement.textContent = formatTime(totalsec);
        }
    }
     timerControls.appendChild(stopButton);
     timerControls.appendChild(deleteButton);
 
     // Append timer elements to the timer container
     timerContainer.appendChild(timeLeftElement);
     timerContainer.appendChild(timerElement);
     timerContainer.appendChild(timerControls);
 
     // Append the timer container to the 'activeTimers' element
     activeTimers.appendChild(timerContainer);
}
function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')} hr : ${m.toString().padStart(2, '0')} min : ${s.toString().padStart(2, '0')} sec`;
}