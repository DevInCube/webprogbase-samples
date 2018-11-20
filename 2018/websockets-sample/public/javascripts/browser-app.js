console.log('Browser JS loaded!');

const newMessageFormEl = document.getElementById('new-message-form');
const allMessagesListEl = document.getElementById('messages');

newMessageFormEl.addEventListener('submit', function (e) {
    e.preventDefault(); // do not reload page on form submit
    const formData = new FormData(newMessageFormEl);
    const data = getFormDataAsJSON(formData);
    onFormDataReady(data);
});

addNewMessage('Initial test message');

const connection = new WebSocket('ws://localhost:3000');
connection.addEventListener('open', () => console.log(`Connected to ws server`));
connection.addEventListener('error', (err) => console.error(`ws error: ${err}`));
connection.addEventListener('message', (message) => {
    console.log(`ws message: ${message.data}`);
    addNewMessage(message.data);
});

function onFormDataReady(dataObject) {
    console.log(`ws sending: ${dataObject.payload}`);
    connection.send(dataObject.payload);
}

// use for new incoming message
function addNewMessage(text) {
    const item = document.createElement('LI');
    item.innerText = text;
    allMessagesListEl.appendChild(item);
}

function getFormDataAsJSON(formData) {
    const jsonObject = {};
    for (const [key, value] of formData.entries()) {
        jsonObject[key] = value;
    }
    return jsonObject;
}