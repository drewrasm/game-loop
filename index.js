var addButton = document.getElementById('add');
var errorMessage = document.getElementById('error-message')
var eventDisplay = document.getElementById('events')

const validateInput = () => {
    var name = document.getElementById('name').value;
    var interval = document.getElementById('interval').value;
    var times = document.getElementById('times').value;

    if (!name || name === '') {
        return 'name cannot be empty'
    }
    if (isNaN(interval) || interval <= 0) {
        return 'interval must be a positive integer'
    }
    if (isNaN(times) || times <= 0) {
        return 'times must be a positive integer'
    }

    return {
        name: name,
        interval: interval,
        times: times
    }
}

const pasteEvent = (eventName, count) => {
    let event = document.createElement('div');
    event.innerHTML = `Event: ${eventName} (${count} remaining)`;
    eventDisplay.appendChild(event);
}

addButton.addEventListener('click', (e) => {
    errorMessage.innerHTML = '';
    var input = validateInput();
    if (typeof input === 'string') {
        errorMessage.innerHTML = input;
    } else {
        console.log(input)
    }
})