const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const systemMessage = {
  role: "system",
  content: "You are a career development expert."
};

export const getChatbotResponse = async (message) => {
  const apiMessages = [
    { role: "user", content: message }
  ];

  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      systemMessage,
      ...apiMessages
    ]
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    });

    const data = await response.json();

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
