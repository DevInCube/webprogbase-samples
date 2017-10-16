const prompt = require('promptly');

const exitCommand = 'q';
const availableCommands = ['all', 'add', exitCommand];

void async function () {
    let array = [];
    let command;
    do {
        command = await prompt.choose('Your command: ', availableCommands);
        console.log('You\'ve chosen: ', command);
        switch (command) {
            case 'all': 
                console.log('All: ', array);
                break;
            case 'add':
                let value = await prompt.prompt('Value: ');
                array.push(value);
                console.log(`Value ${value} added`);
                break;
        }
    } while (command !== exitCommand);
    console.log('Bye.');
}();