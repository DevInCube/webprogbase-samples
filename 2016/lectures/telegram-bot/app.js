let express = require('express');
let bodyParser = require('body-parser')
let config = require('./config');
const TelegramBotApi = require('telegram-bot-api');

const telegramBotApi = new TelegramBotApi({
    token: config.bot_token,
    updates: {
        enabled: true  // do message pull
    }
});

let subscribers = [

];

let app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/subscribers',
    (req, res) => res.json(subscribers));

app.post('/broadcast',
    (req, res) => {
        let message = req.body.message;
        if (message) {
            for (let s of subscribers) {
                telegramBotApi.sendMessage({
                    chat_id: s.id,
                    text: message,
                    parse_mode: 'Markdown'
                });
            }
            res.sendStatus(200);
        } else {
            res.sendStatus(422);
        }
    });

telegramBotApi.on('message',
    (message) => {
        console.log(message);

        if (message.entities) {
            let startCommand = message.entities
                .filter(x => x.type === 'bot_command')
                .map(x => message.text.substr(x.offset, x.length))
                .find(x => x === '/start');
            let subscriber = subscribers.find(x => x.id === message.chat.id);
            if (startCommand && !subscriber) {
                subscribers.push(message.chat);
                telegramBotApi.sendMessage({
                    chat_id: message.chat.id,
                    text: `I got you, ${message.chat.first_name || ''} ${message.chat.last_name || ''}`,
                    parse_mode: 'Markdown'
                });
            }
        }

        telegramBotApi.sendMessage({
            chat_id: message.chat.id,
            text: 'Go **away** !',
            parse_mode: 'Markdown'
        });
    });


app.get('/',
    (req, res) => {
        res.send('Index page');
    });

// config.bot_token;

app.listen(config.port,
    () => console.log(`Server started on ${config.port}`));