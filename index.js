const TelegramBot = require('node-telegram-bot-api');

    const token = process.env.NODE_TG_TOKEN || '5748637215:AAEFqBa5IZ85ueq37ogrW1PkbETmoCCEbHA'
    const webAppUrl = process.env.NODE_TG_URL || 'https://polite-toffee-de0e59.netlify.app'
    const adminName = process.env.NODE_TG_ADMIN || 'tstore_support'
    const adminChatId = process.env.NODE_TG_ADMIN_CHAT || 5454605344
    
     
    const bot = new TelegramBot(token, {polling: true});

    let messageNum = true

    bot.on('message', async(msg) => { 
      const chatId = msg.chat.id;
      const text = msg.text;
      const button = 'Магазин'
      const admin = 'admin' 
  
    
      if(text === '/start' || text === 'Магазин' || text === 'Начать' || text === 'старт') {
        if (messageNum) {
          await bot.sendMessage(chatId, 'Приветствуем всех, этот бот создан для удобной покупки техники. Кликнув на кнопку “магазин” вы можете ознакомиться с текущим ассортиментом. Если же вы не нашли, то что искали, вы можете написать интересующий Вас вопрос напрямую нашему <b><a href="https://t.me/${adminName}">менеджеру</a></b>. Список товаров будет пополняться. Будем рады видеть Вас в числе наших клиентов.  \nУдачных покупок!', { parse_mode: 'HTML' })
          await bot.sendMessage(chatId, 'В связи с экономической ситуацией, а именно с нестабильным курсом доллара. Актуальные цены и наличие устройств может предоставить менеджер, цены которые вы видите могут измениться как в большую степень / так и в меньшую. \nСпасибо за понимание')
          messageNum = false
        }
        await bot.sendMessage(chatId, 'Нажмите на кнопку "' + button + '" чтобы продолжить', {
            reply_markup: {
              resize_keyboard: true,
                keyboard: [
                    [
                      {
                        text: button,
                        web_app: {url: webAppUrl + '/1'},
                      }
                  ]   
                ]
            }
        })
      }
    
    
      if(msg.chat.username === adminName && text === '/admin') {
        await bot.sendMessage(chatId, 'Добро пожаловать, нажмите на кнопку "' + admin + '" чтобы переидти на админку', {
          reply_markup: {
            resize_keyboard: true,
            keyboard: [
                  [{text: admin, web_app: {url: webAppUrl + '/login'}}]
              ]
          }
        })
      }
      

      if(msg?.web_app_data?.data) {  
        try {
          await bot.sendMessage(chatId, `Ваш заказ принят. \nСкоро с вами свяжется <b><a href="https://t.me/${adminName}">менеджер</a></b> для подтверждения заказа`, { parse_mode: 'HTML' })

          const data = JSON.parse(msg?.web_app_data?.data)

          await bot.sendMessage(adminChatId, `Username: @${msg?.from?.username} \n Наименование: ${data?.name}; \n Цена: ${data?.price}; \n Способ оплаты и доставки: ${data?.delivery}`)
        } catch (e) {
          console.log(e);
        }
      }
    });

