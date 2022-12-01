const TelegramBot = require('node-telegram-bot-api');


const token = process.env.NODE_TG_TOKEN
const webAppUrl = process.env.NODE_TG_URL
const adminName = process.env.NODE_TG_ADMIN
const adminChatId = process.env.NODE_TG_ADMIN_CHAT


const bot = new TelegramBot(token, {polling: true});

bot.on('message', async(msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const button = 'Магазин'
  const admin = 'admin' 


  if(text === '/start') {
    await bot.sendMessage(chatId, 'Добро пожаловать, ' + msg.chat.first_name + ' ' + msg.chat.last_name + '.\n' + 'Нажмите на кнопку "' + button + '" что-бы продолжить', {
        reply_markup: {
          resize_keyboard: true,
            keyboard: [
                [{text: button, web_app: {url: webAppUrl + '/1'}}]   
            ]
        }
    })
  }


  if(msg.chat.username === adminName && text === '/admin') {
    await bot.sendMessage(chatId, 'Добро пожаловать, ' + msg.chat.first_name + ' ' + msg.chat.last_name + '.\n' + 'Нажмите на кнопку "' + admin + '" что-бы переидти на админку', {
      reply_markup: {
        resize_keyboard: true,
        keyboard: [
              [{text: admin, web_app: {url: webAppUrl + '/login'}}]
          ]
      }
    })
  }

  // if(msg?.web_app_data?.data) {
  //   try {
  //     const data = JSON.parse(msg?.web_app_data?.data)
  //     await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country)
  //     await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street)
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  if(msg?.web_app_data?.data) {  
    try {
      const data = JSON.parse(msg?.web_app_data?.data)
      await bot.sendMessage(adminChatId, `ФИО: ${msg.chat.first_name, msg.chat.username, msg.chat.last_name} \n Наименование: ${data?.name}; \n Цена: ${data?.price}; \n Память: ${data?.memory}; \n Способ оплаты и доставки: ${data?.delivery} \n`)
    } catch (e) {
      console.log(e);
    }
  }
});

