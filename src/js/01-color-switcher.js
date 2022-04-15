const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
  };

refs.startBtn.addEventListener('click', handleStart);
refs.stopBtn.addEventListener('click', handleStop)

let timerId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  function handleStart() {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
    refs.startBtn.disabled = true;
}

function handleStop() {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
}