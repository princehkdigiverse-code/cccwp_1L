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

const FRAMES_DIR = path.join(__dirname, '../public/videos/frames');
const CONCURRENCY_LIMIT = 15; // Number of concurrent uploads

async function uploadFrame(filePath, folderName) {
  const fileName = path.basename(filePath);
  const publicId = path.parse(fileName).name; // e.g. "0001"
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: 'image',
      folder: `cccwp/frames/${folderName}`,
      overwrite: true,
      invalidate: true
    });
    return true;
  } catch (error) {
    console.error(`✗ Failed to upload ${folderName}/${fileName}:`, error.message || error);
    return false;
  }
}

// Simple async queue helper to manage concurrency
async function runWithConcurrency(tasks, limit) {
  const results = [];
  const executing = new Set();
  
  for (const task of tasks) {
    const p = task().then(res => {
      executing.delete(p);
      return res;
    });
    results.push(p);
    executing.add(p);
    
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

async function main() {
  console.log('=== Starting Cloudinary Frame Upload ===');
  console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);

  if (!fs.existsSync(FRAMES_DIR)) {
    console.error(`Frames directory not found: ${FRAMES_DIR}`);
    process.exit(1);
  }

  const subdirs = fs.readdirSync(FRAMES_DIR).filter(f => fs.lstatSync(path.join(FRAMES_DIR, f)).isDirectory());
  console.log(`Found folders: ${subdirs.join(', ')}`);

  const allTasks = [];
  let totalFiles = 0;

  for (const dir of subdirs) {
    const dirPath = path.join(FRAMES_DIR, dir);
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.webp'));
    totalFiles += files.length;
    console.log(`Folder "${dir}": found ${files.length} frames.`);

    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      allTasks.push(() => uploadFrame(filePath, dir));
    });
  }

  console.log(`\nTotal frames to upload: ${totalFiles}`);
  console.log(`Uploading with concurrency limit of ${CONCURRENCY_LIMIT}...`);

  let completed = 0;
  const tasksWithProgress = allTasks.map(taskFn => {
    return async () => {
      const success = await taskFn();
      completed++;
      if (completed % 50 === 0 || completed === totalFiles) {
        console.log(`Progress: ${completed}/${totalFiles} (${((completed / totalFiles) * 100).toFixed(1)}%) completed.`);
      }
      return success;
    };
  });

  const startTime = Date.now();
  const results = await runWithConcurrency(tasksWithProgress, CONCURRENCY_LIMIT);
  const endTime = Date.now();

  const successCount = results.filter(Boolean).length;
  console.log(`\n=== Upload Completed ===`);
  console.log(`Successful uploads: ${successCount}/${totalFiles}`);
  console.log(`Time taken: ${((endTime - startTime) / 1000).toFixed(1)} seconds`);
}

main().catch(err => {
  console.error('Fatal error during upload:', err);
});
