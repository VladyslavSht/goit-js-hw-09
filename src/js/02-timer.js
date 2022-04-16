const refs = {
    date: document.querySelector('#datetime-picker')
}

const currentDate = new Date();
console.log(refs.date);
refs.date.value = currentDate.toISOString();
console.log(refs.date.value = currentDate.toISOString());