const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');

const token = '';
const bot = new TelegramApi(token, { polling: true });
const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, `Try to gas a number from 0 to 9.`);

  chats[chatId] = Math.floor(Math.random() * 10);

  await bot.sendMessage(chatId, `Try.`, gameOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: '/start', description:'Welcome' },
    { command: '/info', description:'Info about user' },
    { command: '/game', description:'Start a game' }
  ]);

  bot.on('message', async (message) => {
    const text = message.text;
    const chatId = message.chat.id;

    if (text === '/start') {
      await bot.sendSticker(chatId, `https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/3.jpg`);
      return bot.sendMessage(chatId, `Welcome to the bot.`);
    }

    if (text === '/info') {
      return bot.sendMessage(chatId, `Your name is ${message.from.first_name}`);
    }

    if (text === '/game') {
      return startGame(chatId);
    }

    return bot.sendMessage(chatId, `I can't understand. Please try again.`);
  });

  bot.on('callback_query', async (message) => {
    const data = message.data;
    const chatId = message.message.chat.id;

    if (data === '/again') {
      return startGame(chatId);
    }

    if (data === chats[chatId]) {
      return await bot.sendMessage(chatId, `You are right, it was ${chats[chatId]}`, againOptions);
    } else {
      return bot.sendMessage(chatId, `You chose number ${data}, but it was ${chats[chatId]}`, againOptions);
    }
  });
};

start();
