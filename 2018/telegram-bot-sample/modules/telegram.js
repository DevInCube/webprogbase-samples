const config = require('../config');

const TelegramBotApi = require('telegram-bot-api');

const User = require('../models/user');

const telegramBotApi = new TelegramBotApi({
    token: config.bot_token,
    updates: {
        enabled: true // do message pull
    }
});

telegramBotApi.on('message', onMessage);

async function registerTgUser(chatId) {
    const user = await User.getById(chatId);
    if (typeof user === 'undefined') {
        await User.insert(chatId);
    }
}

function onMessage(message) {
    processRequest(message)
        .catch(err => telegramBotApi.sendMessage({
            chat_id: message.chat.id,
            text: `Something went wrong. Try again later. Error: ${err.toString()}`,
        }));
}

async function processRequest(message) {
    const chatId = message.chat.id;
    if (message.text === '/start') {
        await registerTgUser(chatId);
        console.log(`User ${chatId} registered`);
    }
    console.log(message.from.username, message.text);
    return telegramBotApi.sendMessage({
        chat_id: chatId,
        text: "Hello!",
    });
}

module.exports = {
    async sendNotification(text) {
        const users = await User.getAll();
        console.log(`Notify ${users.length} users`);
        for (const userId of users) {
            await telegramBotApi.sendMessage({
                chat_id: userId,
                text: text,
            });
        }
    }
};