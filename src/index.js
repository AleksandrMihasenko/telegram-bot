const TelegramApi = require('node-telegram-bot-api');

const token = '5673654601:AAF4x8JsPaJXUj6Ab7iDbZhxF6JCPop6r64';
const bot = new TelegramApi(token, { polling: true });

bot.on('message', (message) => {
  const text = message.text;
  const chatId = message.chat.id;

  if (text === '/start') {
    bot.sendMessage(chatId, `Welcome to the bot.`);
  }

  if (text === '/info') {
    bot.sendMessage(chatId, `Your name is ${message.from.first_name}`);
  }
});
