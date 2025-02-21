import axios from 'axios';

const API_KEY = 'AIzaSyDkma_-23SOOFT86C4sfDZ_GCLFzM_NQao';
const api_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const pixabayPrompt = search => {
  return `
    <instruction>
Task: Analyze the prompt within the "prompt" tag and generate a URL to invoke the Pixabay API.
Context:
If keywords are present in the prompt, attempt to utilize them as search query parameters.
Consider the remaining portion of the prompt as the image search query text ("q" parameter).
The "q" parameter is mandatory, so even if the entire prompt resembles other parameters, identify a section to employ as the query text.
The input prompt can be in any language (detect the language), consistently translating it into English initially.
The "q" parameter must be URL encoded, while other parameters are optional and, if discovered, should be separated using the "&" symbol.
Provide the result in a format that can be directly appended to a URL string (excluding the URL itself).
Disregard additional words such as "please", "could you", "would you", etc.
</instruction>
<examples>
mountaing lake as vertical - should be converted to q=mountain+lake&orientation=vertical
vertical illustration of cat - should be converted to q=cat&orientation=vertical&image_type=illustration
</examples>
<apidoc>
Available options:

q: (str) A URL encoded search term. If omitted, all images are returned. This value may not exceed 100 characters. Example: "yellow+flower"

id: (str) Retrieve individual images by ID.

image_type: (str) Filter results by image type. Accepted values: "all", "photo", "illustration", "vector"

orientation: (str) Whether an image is wider than it is tall, or taller than it is wide. Accepted values: "all", "horizontal", "vertical"

category: (str) Filter results by category. Accepted values: backgrounds, fashion, nature, science, education, feelings, health, people, religion, places, animals, industry, computer, food, sports, transportation, travel, buildings, business, music

min_width: (int) Minimum image width.

min_height: (int) Minimum image height.

colors: (str) Filter images by color properties. A comma separated list of values may be used to select multiple properties. Accepted values: "grayscale", "transparent", "red", "orange", "yellow", "green", "turquoise", "blue", "lilac", "pink", "white", "gray", "black", "brown"

editors_choice: (bool) Select images that have received an Editor's Choice award. Accepted values: "true", "false"

safesearch: (bool) A flag indicating that only images suitable for all ages should be returned. Accepted values: "true", "false"

order: (str) How the results should be ordered. Accepted values: "popular", "latest"
</apidoc>
<prompt>${search}</prompt>
    `;
};
export const askAI = prompt => {
  let data = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };
  return axios.post(`${api_URL}?key=${API_KEY}`, data);
};
