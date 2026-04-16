const axios = require('axios');
require('dotenv').config();

const keys = [
  process.env.OPENROUTER_API_KEY,
  process.env.BACKUP_API_KEY
].filter(Boolean);

async function checkKeys() {
  for (const key of keys) {
    console.log(`Checking key: ${key.substring(0, 15)}...`);
    try {
      const response = await axios.get('https://openrouter.ai/api/v1/auth/key', {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      console.log(`Success: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      console.error(`Failure: ${error.response?.data?.error?.message || error.message}`);
    }
  }
}

checkKeys();
