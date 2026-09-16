import { API_URL } from "./config"

export const checkGrammar = async (text) => {
  const response = await fetch(`${API_URL}/grammar/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sentence: text,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to check grammar");
  }

  return await response.json();
};

export const paraphrase = async (text) => {
  const response = await fetch(`${API_URL}/paraphrase/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to translate");
  }

  return await response.json();
};

export const translator = async (text, target_language) => {
  const response = await fetch(`${API_URL}/translator/translate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      target_language,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to translate");
  }

  return await response.json();
};