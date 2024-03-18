require('dotenv').config();
const { createBot, MemoryDB, createProvider } = require('@bot-whatsapp/bot');
const { BaileysProvider } = require('@bot-whatsapp/provider-baileys');

const AIClass = require('./services/ai');
const flows = require('./flows');

const ai = new AIClass(process.env.OPEN_API_KEY, 'gpt-3.5-turbo-16k');

const main = async () => {
    const provider = createProvider(BaileysProvider);
    // const provider = createProvider(TelegramProvider, { token: process.env.TELEGRAM_API || '' });

    await createBot({
        database: new MemoryDB(),
        provider,
        flow: flows,
    }, { extensions: { ai } });
};

main();
