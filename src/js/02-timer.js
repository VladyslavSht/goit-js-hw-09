import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  borderRadius: '25px',
  backOverlay: true,
  plainText: false,
});

const start = document.querySelector('button[data-start]');
const myInput = document.querySelector("#datetime-picker");
const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

let intervalId = null;
start.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if(selectedDates[0].getTime() < options.defaultDate.getTime()) {
          Notiflix.Report.warning('WARNING', 'Please choose a date in the future', 'TRY AGAIN');
          selectedDates[0] = options.defaultDate;
          return;
      }
      start.disabled = false;
    },

    handleStart() {
        start.disabled = true;
        myInput.disabled = true;
        

        intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = Date.parse(myInput.value) - currentTime;
            if(deltaTime < 5){
                Notiflix.Report.info('Too late', 'Time is OUT', 'Try next time');
                clearInterval(intervalId);
                myInput.disabled = false;
    
                return;
            }

            const time = convertMs(deltaTime);
            const timeWithZero = addLeadingZero(time);
            updateClock(timeWithZero);

            const textColor = getRandomHexColor();
            refs.days.style.color = textColor;
            refs.hours.style.color = textColor;
            refs.minutes.style.color = textColor;
            refs.seconds.style.color = textColor;
          }, 1000);
    }
  }

start.addEventListener('click', options.handleStart);

const fp = flatpickr(myInput, options);

function addLeadingZero({ days, hours, minutes, seconds }) {
   
    days = String(days).padStart(2, '0');
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    return { days, hours, minutes, seconds };
  }

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function updateClock({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }