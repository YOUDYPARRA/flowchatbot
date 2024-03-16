const { OpenAI } = require("openai");

async function Message (ObjetoJson){
try{
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
    });
    const texto_procesar= ObjetoJson || ""

    if(texto_procesar){
      console.log(texto_procesar)
        const chatCompletion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          temperature: 0,
          messages: [{ role: 'system', content: texto_procesar}],
        })
    }
    console.log('se realiza el envio de la respuesta de chatgpt y se debe de ver un resultado: ')
    console.log(chatCompletion.choices[0].message.content) // There's no "data" property
    const msg = chatCompletion.choices[0].message.content || ""
    console.log(msg)
    return msg
}catch(err){
  console.log(err)
    return "ERROR:-> "+err
}
}
module.exports =Message;