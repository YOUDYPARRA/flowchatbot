const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const Message =  require('./src/components/gpt')
//const ChatCompletionMessageParam =require('openai/resources')




const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])
const msg="hola, realment eres un asistente";

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

// const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
//     .addAnswer('🙌 Hola bienvenido a este *Chatbot*',{delay:2000})
//     .addAnswer(
//         [
//             'te comparto los siguientes links de interes sobre el proyecto',
//             '👉 *doc* para ver la documentación',
//             '👉 *gracias*  para ver la lista de videos',
//             '👉 *discord* unirte al discord',
//         ],
//         {delay:3000},
//         null,
//         [flowDocs, flowGracias, flowTuto, flowDiscord]
//     )

// const flowPrincipal=addKeyword(['Hola', 'holi', 'buenas', 'Buenas tardes'])
//  .addAnswer('🙌 Hola bienvenido a este *Chatbot*',{delay:2000})
// .addAction(
    //     async (ctx,ctxFn)=>{
        //         await ctx.flowDynamic("Dame un momento enseguida de contesto...")
        //         console.log("enviar mensaje a chat")
        
        //     }
        //     )
        // const flowPrincipal=addKeyword(EVENTS.WELCOME)
        const flowPrincipal=addKeyword(['holi', 'hola', 'buenas', 'quetal', 'ola', 'que tal'])
        .addAnswer('🙌 Hola bienvenido este es el mensaje de biienvenida *Chatbot* CON BIENVENIDA DE LA INSTRUCCION EVENT WELCOME',
          {delay:2000}
          ).addAction(async (ctx, {flowDynamic, state})=>{
            console.log(ctx)
            //const history= (state.getMyState()?.history?? [])as ChatCompletionMessageParam[]
            msg `Me llamo, ${ctx.pushName} y quiero saber que piensas de ${ctx.text}!`;
            await flowDynamic(`claro que sí ${ctx.pushName}`)
          })

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    Message(msg)

    QRPortalWeb()
}

main()
