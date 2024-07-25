const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
console.log('API Key:', API_KEY); // This should log your API key to the console

const systemMessage = {
  role: "system",
  content: "You are a career development expert."
};

const fetchWithExponentialBackoff = async (url, options, retries = 5, backoff = 300) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok && response.status === 429 && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithExponentialBackoff(url, options, retries - 1, backoff * 2);
    }
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getChatbotResponse = async (message) => {
  const apiMessages = [
    { role: "user", content: message }
  ];

  const apiRequestBody = {
    model: "gpt-4o-mini",
    messages: [
      systemMessage,
      ...apiMessages
    ]
  };

  console.log('API Request:', JSON.stringify(apiRequestBody, null, 2)); // Log the API request body

  try {
    const response = await fetchWithExponentialBackoff("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    });

    const data = await response.json();

    console.log('API Response:', JSON.stringify(data, null, 2)); // Log the API response

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('API response:', data);
      throw new Error('Invalid response from ChatGPT API');
    }

    return { text: data.choices[0].message.content, user: "ChatGPT" };
  } catch (error) {
    console.error('Error in getChatbotResponse:', error);
    throw error;
  }
};
