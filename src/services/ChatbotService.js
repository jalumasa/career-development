import axios from 'axios';

export const getChatbotResponse = async (message) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Updated endpoint for chat completion

  const data = {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a career development assistant.' },
      { role: 'user', content: message }
    ],
    max_tokens: 150,
    temperature: 0.7
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  try {
    const response = await axios.post(apiUrl, data, { headers });
    console.log('OpenAI Response:', response.data); // Log the response data for debugging
    const botResponse = response.data.choices[0].message.content.trim();
    return { text: botResponse, user: 'bot' };
  } catch (error) {
    console.error('Error fetching response from OpenAI:', error.response ? error.response.data : error.message);
    return { text: 'Sorry, I encountered an error. Please try again later.', user: 'bot' };
  }
};
