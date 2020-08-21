console.log('Client side JS file has loaded');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})




const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'Hello world';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    const url = 'http://localhost:3000/weather?address=' + location;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(url).then((response) => {
        console.log(response);
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                messageOne.textContent = data.error;

            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.foreCast;
                console.log(data.location);
                console.log(data.foreCast);
            }
        })
    });
    console.log('Testing!', location);
})




