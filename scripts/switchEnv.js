const fs = require('fs');
const path = require('path');

const env = process.argv[2];
const validEnvs = ['development', 'staging', 'production'];

if (!env || !validEnvs.includes(env)) {
  console.error(`Please specify a valid environment: ${validEnvs.join(', ')}`);
  process.exit(1);
}

const sourceEnvFile = path.join(process.cwd(), `.env.${env}`);
const targetEnvFile = path.join(process.cwd(), '.env');

try {
  if (!fs.existsSync(sourceEnvFile)) {
    console.error(`Environment file .env.${env} does not exist`);
    process.exit(1);
  }

  fs.copyFileSync(sourceEnvFile, targetEnvFile);
  console.log(`Successfully switched to ${env} environment`);
} catch (error) {
  console.error('Error switching environment:', error);
  process.exit(1);
} 