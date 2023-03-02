const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
}

const defaultBackgroundColor = refs.body.style.backgroundColor;
let timerId = null;

refs.btnStop.disabled = true;

refs.btnStart.addEventListener('click', onStartBtnClick);
refs.btnStop.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  const { btnStart, btnStop, body } = refs;
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor()
  }, 1000);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

function onStopBtnClick() {
  const { btnStart, btnStop, body } = refs;
  clearInterval(timerId);
  body.style.backgroundColor = defaultBackgroundColor;
  btnStop.disabled = true;
  btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

