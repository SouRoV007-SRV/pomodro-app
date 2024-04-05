let isTimerRunning = false;
let timeInterval;
let workDuration = 25 * 60; 
let breakDuration = 5 * 60; 
let currentTime = workDuration;

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(currentTime);
}

function startTimer() {
    if (!isTimerRunning) {
        workDuration = parseInt(workDurationInput.value) * 60;
        breakDuration = parseInt(breakDurationInput.value) * 60;
        currentTime = workDuration;
        isTimerRunning = true;
        startButton.textContent = 'Pause';
        timeInterval = setInterval(() => {
            if (currentTime > 0) {
                currentTime--;
                updateDisplay();
            } else {
                
                clearInterval(timeInterval);
                isTimerRunning = false;
                startButton.textContent = 'Start';
                
            }
        }, 1000);
    } else {
        
        clearInterval(timeInterval);
        isTimerRunning = false;
        startButton.textContent = 'Resume';
    }
}

function resetTimer() {
    clearInterval(timeInterval);
    isTimerRunning = false;
    workDurationInput.value = workDuration / 60;
    breakDurationInput.value = breakDuration / 60;
    currentTime = workDuration;
    updateDisplay();
    startButton.textContent = 'Start';
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
