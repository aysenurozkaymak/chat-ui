// src/ollamaService.js
export async function askOllama(prompt) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3:latest", // senin terminalde gördüğün model
      prompt: prompt,
      stream: false
    }),
  });

  const data = await response.json();
  return data.response;
}
