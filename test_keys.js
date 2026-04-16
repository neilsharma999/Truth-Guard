const axios = require('axios');
require('dotenv').config();

const keys = [
  process.env.OPENROUTER_API_KEY,
  process.env.BACKUP_API_KEY
].filter(Boolean);

const model = 'mistralai/mistral-7b-instruct:free';

async function test() {
  for (const key of keys) {
    console.log(`Testing key: ${key.substring(0, 15)}...`);
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: model,
          messages: [{ role: 'user', content: 'hello' }],
        },
        {
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json'
          },
          timeout: 5000
        }
      );
      console.log(`Success: ${key.substring(0, 15)}... -> ${response.data.choices[0].message.content}`);
    } catch (error) {
      console.error(`Failure: ${key.substring(0, 15)}... -> ${error.response?.data?.error?.message || error.message}`);
    }
  }
}

test();
