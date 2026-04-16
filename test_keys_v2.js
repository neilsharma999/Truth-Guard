const axios = require('axios');
require('dotenv').config();

const keys = [
  process.env.OPENROUTER_API_KEY,
  process.env.BACKUP_API_KEY
].filter(Boolean);

// Test with gemma-3-12b which showed up in the list
const model = 'google/gemma-3-12b-it:free';

async function test() {
  for (const key of keys) {
    console.log(`Testing key: ${key.substring(0, 15)}...`);
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: model,
          messages: [{ role: 'user', content: 'Say "Success" if you read this.' }],
        },
        {
          headers: {
            'Authorization': `Bearer ${key}`,
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );
      console.log(`Success: -> ${response.data.choices[0].message.content}`);
    } catch (error) {
      console.error(`Failure: -> ${error.response?.data?.error?.message || error.message}`);
    }
  }
}

test();
