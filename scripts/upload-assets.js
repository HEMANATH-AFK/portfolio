const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// Manual .env.local loader to avoid extra dependencies
const loadEnv = () => {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('.env.local file not found at ' + envPath);
    return false;
  }
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      let value = parts.slice(1).join('=').trim();
      // Remove wrapping quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
  return true;
};

if (!loadEnv()) {
  console.log('Please create .env.local with Cloudinary credentials.');
  process.exit(1);
}

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Missing Cloudinary environment variables in .env.local.');
  console.error('Required: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET');
  process.exit(1);
}

// Configure Cloudinary SDK
cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true
});

const picsDir = path.resolve(__dirname, '../public/animation-pics');
if (!fs.existsSync(picsDir)) {
  console.error('Source directory ' + picsDir + ' does not exist.');
  process.exit(1);
}

// Find all frame files
const files = fs.readdirSync(picsDir)
  .filter(f => f.startsWith('ezgif-frame-') && f.endsWith('.jpg'))
  .sort();

console.log(`Found ${files.length} frames in ${picsDir}. Starting upload to Cloudinary...`);

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const uploadFile = async (file, index) => {
  const filePath = path.join(picsDir, file);
  // Get public ID without file extension
  const baseName = path.basename(file, path.extname(file));
  const publicId = `portfolio/animation-pics/${baseName}`;

  let retries = 3;
  while (retries > 0) {
    try {
      await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        overwrite: true,
        resource_type: 'image'
      });
      console.log(`[${index + 1}/${files.length}] Uploaded: ${file} -> ${publicId}`);
      return;
    } catch (err) {
      retries--;
      console.error(`Error uploading ${file} (Retries left: ${retries}):`, err.message || err);
      if (retries === 0) {
        throw err;
      }
      await delay(1000);
    }
  }
};

const run = async () => {
  const startTime = Date.now();
  for (let i = 0; i < files.length; i++) {
    try {
      await uploadFile(files[i], i);
      // Small throttle delay between requests
      await delay(100);
    } catch (e) {
      console.error('Fatal: Upload failed. Exiting process.');
      process.exit(1);
    }
  }
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nSuccess! All ${files.length} frames uploaded successfully in ${duration}s.`);
};

run();
