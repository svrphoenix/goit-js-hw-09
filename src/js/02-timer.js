import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
}

let userTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (isDateValid(selectedDates[0])) {
      refs.btnStart.disabled = false;
      userTime = selectedDates[0];
    }
  },
}

const isDateValid = function (selectedDate) {
  if (selectedDate < Date.now()) {
    Notify.failure('Please choose a date in the future');
    return false;
  }
  return true;
}

const convertMs = function (ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const runTimer = function () {
  const remainingTime = userTime - Date.now();

  if (remainingTime < 0) {
    clearInterval(intervalId);
    Notify.warning('Time is up!');
    refs.seconds.style.color = "initial";
    return;
  }

  updateTimerContent(convertMs(remainingTime));
}

const updateTimerContent = function (timeObject) {
  const { days, hours, minutes, seconds } = timeObject;
  if (seconds < 10) {
    refs.seconds.style.color = "red";
  };
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

const addLeadingZero = function (value) {
  return String(value).padStart(2, '0');
}

const onBtnStart = function () {
  refs.btnStart.disabled = true;
  runTimer();
  intervalId = setInterval(runTimer, 1000);
}

refs.btnStart.disabled = true;
flatpickr('#datetime-picker', options);
refs.btnStart.addEventListener('click', onBtnStart);