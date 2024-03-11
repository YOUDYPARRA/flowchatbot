const { OpenAI } = require("openai");

export default async function Message (ObjetoJson){
try{
    const openai = new OpenAI({
      apiKey: process.env.OPEN_AI_KEY,
    });
    const texto_procesar= ObjetoJson || ""

    if(texto_procesar){
        const chatCompletion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          temperature: 0,
          messages: [{ role: 'user', content: texto_procesar}],
        });
    }
    console.log(chatCompletion.choices[0].message.content); // There's no "data" property
    const msg = chatCompletion.choices[0].message.content || ""
    return msg
}catch(err){
  console.log(err)
    return "ERROR:-> "+err;
}
}