import { auth } from '../firebase';

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

// Streams the assistant's reply as plain text chunks. `onChunk` is called
// with each incremental piece of text as it arrives so the UI can render a
// live typing effect; resolves with the full accumulated text at the end.
export const streamChatbotResponse = async (message, history, onChunk) => {
  // The endpoint spends API credits, so it verifies this token server-side
  // rather than trusting that the caller came from the signed-in UI.
  // getIdToken() refreshes it automatically when it is close to expiring.
  const user = auth.currentUser;
  if (!user) {
    throw new Error('You need to be signed in to use Compass AI.');
  }
  const token = await user.getIdToken();

  const response = await fetchWithExponentialBackoff('/api/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ message, history })
  });

  if (!response.ok || !response.body) {
    let errorMessage = 'Failed to get a response from the chatbot';
    try {
      const data = await response.json();
      if (data.error) errorMessage = data.error;
    } catch {
      // Response wasn't JSON (e.g. a partial stream failure) — use the default message.
    }
    throw new Error(errorMessage);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    fullText += chunk;
    onChunk?.(chunk, fullText);
  }

  if (!fullText.trim()) {
    throw new Error('Empty response from the chatbot');
  }

  return fullText;
};
