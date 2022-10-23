const TelegramApi = require('node-telegram-bot-api');

const token = '5673654601:AAF4x8JsPaJXUj6Ab7iDbZhxF6JCPop6r64';
const bot = new TelegramApi(token, { polling: true });

bot.setMyCommands([
  { command: '/start', description:'Welcome' },
  { command: '/info', description:'Info about user' }
]);

bot.on('message', async (message) => {
  const text = message.text;
  const chatId = message.chat.id;

  if (text === '/start') {
    await bot.sendSticker(chatId, `https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/3.jpg`);
    await bot.sendMessage(chatId, `Welcome to the bot.`);
  }

  if (text === '/info') {
    await bot.sendMessage(chatId, `Your name is ${message.from.first_name}`);
  }
});
