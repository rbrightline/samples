import { ClientOptions, OpenAI } from 'openai';
import { weatherData } from './weather-data';

const openAIOptions: ClientOptions = {
  // The base URL of the OpenAI API
  baseURL: 'http://localhost:11434/v1',

  // You can get the API key from the OpenAI dashboard
  apiKey: '',
};

const openai = new OpenAI(openAIOptions);

async function main() {
  const streamResponse = await openai.chat.completions.create({
    stream: true,
    messages: [
      // The first message is always from the system to direct the ai to the correct role
      {
        role: 'system',
        content: `
            You are a weather forecast analyst 
            with an excellent ability to summurize weather data and make predictions
            `,
      },
      // The second message is about feeding and response format
      {
        role: 'assistant',
        content: `
            Answer the question by using the following data set.
            Data: 
            ${weatherData}
            `,
      },
      // The third message is from the user
      {
        role: 'user',
        content: 'What is the weather like in chicago? ',
      },
    ],
    model: 'deepseek-r1:1.5b',
  });

  let messages = [];
  for await (const chunk of streamResponse) {
    const content = chunk.choices[0]?.delta?.content || '';
    messages.push(content);

    if (messages.length > 10) {
      process.stdout.write(messages.join(''));
      messages = [];
    }
  }
}

main();
