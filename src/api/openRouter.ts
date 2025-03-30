
import axios from 'axios';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Using a placeholder API key - this should be replaced with a proper way to handle API keys
// For demo purposes, we'll use a state variable in the component
export const getOpenRouterResponse = async (messages: any[], apiKey: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "openai/gpt-3.5-turbo", // Change model as needed
        messages: messages,
        max_tokens: 500
      },
      {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.href, // Required by OpenRouter
          "X-Title": "OSCPETS AI Assistant" // Optional for analytics
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching OpenRouter response:", error);
    throw error;
  }
};
