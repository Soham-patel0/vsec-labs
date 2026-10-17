document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    document.querySelector('#message').textContent = 'Interest recorded for this demonstration. Thank you!';
    e.target.reset();
});
