require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const imagesDir = path.join(__dirname, '../public/images');
const videosDir = path.join(__dirname, '../public/videos');

async function uploadFile(filePath, resourceType) {
  const fileName = path.basename(filePath);
  const publicId = path.parse(fileName).name; // e.g., 'slide1' or '0222'
  console.log(`Uploading ${fileName} as ${resourceType}...`);
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: resourceType,
      folder: 'cccwp'
    });
    console.log(`✓ Uploaded ${fileName}: ${result.secure_url}`);
    return { name: fileName, url: result.secure_url };
  } catch (error) {
    console.error(`✗ Failed to upload ${fileName}:`, error);
    return null;
  }
}

async function main() {
  console.log('Starting Cloudinary Upload...');
  console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  
  const uploads = [];
  
  // Upload Images
  if (fs.existsSync(imagesDir)) {
    const imageFiles = fs.readdirSync(imagesDir).filter(f => fs.lstatSync(path.join(imagesDir, f)).isFile());
    for (const file of imageFiles) {
      const filePath = path.join(imagesDir, file);
      const res = await uploadFile(filePath, 'image');
      if (res) uploads.push(res);
    }
  }
  
  // Upload Videos
  if (fs.existsSync(videosDir)) {
    const videoFiles = fs.readdirSync(videosDir).filter(f => fs.lstatSync(path.join(videosDir, f)).isFile() && f.endsWith('.mp4'));
    for (const file of videoFiles) {
      const filePath = path.join(videosDir, file);
      const res = await uploadFile(filePath, 'video');
      if (res) uploads.push(res);
    }
  }
  
  console.log('\n--- UPLOAD SUMMARY ---');
  console.log(JSON.stringify(uploads, null, 2));
}

main();
