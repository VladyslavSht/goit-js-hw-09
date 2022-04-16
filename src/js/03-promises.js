import Notiflix from 'notiflix';
Notiflix.Notify.init({
  borderRadius: '25px',
  backOverlay: true,
  plainText: false,
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay})
      }
    }, delay);
   
  });  
}

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  const {
    elements: { delay, step, amount }
  } = e.currentTarget;

    for(let i = 1; i <= amount.value; i += 1) {
    const dataObject = {
      position: i,
      delay: Number(delay.value) + Number(step.value) * (i - 1)
    };

    createPromise(dataObject.position, dataObject.delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
}
