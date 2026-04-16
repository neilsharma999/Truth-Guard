const axios = require('axios');
require('dotenv').config();

const keys = [
  process.env.OPENROUTER_API_KEY,
  process.env.BACKUP_API_KEY
].filter(Boolean);

const model = 'nvidia/nemotron-3-super-120b-a12b:free';

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
      console.log(`Success with key ${key.substring(0, 8)}: -> ${response.data.choices[0].message.content}`);
    } catch (error) {
       const msg = error.response?.data?.error?.message || error.message;
      console.error(`Failure with key ${key.substring(0, 8)}: -> ${msg}`);
    }
  }
}

test();
