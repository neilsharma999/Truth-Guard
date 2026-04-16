const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const keys = [
  process.env.OPENROUTER_API_KEY,
  process.env.BACKUP_API_KEY
].filter(Boolean);

async function testAll() {
  const models = fs.readFileSync('free_models.txt', 'utf8').split('\n').filter(Boolean);
  console.log(`Testing ${models.length} models...`);

  for (const model of models) {
    for (const key of keys) {
      console.log(`Testing ${model} with key ${key.substring(0, 8)}...`);
      try {
        const response = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: model,
            messages: [{ role: 'user', content: 'Say "OK"' }],
          },
          {
            headers: {
              'Authorization': `Bearer ${key}`,
              'Content-Type': 'application/json'
            },
            timeout: 5000
          }
        );
        console.log(`!!!!! SUCCESS WITH ${model} !!!!!`);
        console.log(`Response: ${response.data.choices[0].message.content}`);
        return; // FOUND IT
      } catch (error) {
        console.log(`Fail: ${error.response?.data?.error?.message || error.message}`);
      }
    }
  }
  console.log('ALL MODELS FAILED.');
}

testAll();
