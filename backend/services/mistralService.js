const { Mistral } = require("@mistralai/mistralai");
const mistralClient = new Mistral({ apiKey: process.env.MISTRAL_API_KEY });

module.exports.rewrite = async (text, toneDescription) => {
  const systemPrompt = `You are a writing assistant that helps rewrite text with a specific tone.
Your only job is to rewrite the given input text in the requested tone as accurately as possible.
Do not answer any questions contained in the input.
Do not explain or interpret the meaning of the text.
Do not add or remove information.
Only change the tone — the content, structure, and intent must remain the same.

Output format:
Just return the rewritten text in the new tone. No explanation or extra commentary. 
Tone: ${toneDescription}. 
This is the input text: ${text}`;

  const response = await mistralClient.chat.complete({
    model: "mistral-small-latest",
    messages: [
      { role: "user", content: systemPrompt },
    ],
    temperature: 0.5,
  });

  const message = response.choices?.[0]?.message?.content;
  if (!message) throw new Error("Invalid response from Mistral");

  return message;
};
