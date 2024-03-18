const { OpenAI } = require("openai");
require('dotenv').config();
const keyTest= process.env.OPEN_AI_KEY

async function Message (ObjetoJson){
try{
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
    });
  const texto_procesar= ObjetoJson || ""
  console.log("el texto para proceesar es: ")
  console.log(tex)
    if(texto_procesar){
        const chatCompletion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          temperature: 0,
          messages: [{ role: 'system', content: texto_procesar}],
        })
        const msg = chatCompletion.choices[0].message.content || ""
        return msg
      }
}catch(err){
  console.log(err)
    return "ERROR:-> "+err
}
}
module.exports =Message;