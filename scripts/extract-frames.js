/* eslint-disable */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const VIDEOS_DIR = path.join(__dirname, "..", "public", "videos");
const FRAMES_DIR = path.join(VIDEOS_DIR, "frames");

// Ensure newly installed FFmpeg path is available in the current Node process on Windows
if (process.platform === "win32") {
  const wingetPath = path.join(process.env.USERPROFILE || "", "AppData", "Local", "Microsoft", "WinGet", "Links");
  process.env.PATH = `${wingetPath};${process.env.PATH}`;
}

function ensureDirectoryExistence(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function checkFFmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
}

function main() {
  console.log("=== Start Frame Extraction ===");

  if (!checkFFmpeg()) {
    console.error("Error: ffmpeg is not installed or not in PATH.");
    console.error("Please install ffmpeg to extract frames. Falling back to video files.");
    process.exit(1);
  }

  ensureDirectoryExistence(FRAMES_DIR);

  // Read all mp4 files
  const files = fs.readdirSync(VIDEOS_DIR).filter(file => file.endsWith(".mp4"));

  files.forEach(file => {
    const videoName = path.basename(file, ".mp4");
    
    // Ignore hero-full unless it's the one we want to map. Let's map both or just hero.
    // Let's create folders for all found videos.
    let folderName = videoName;
    if (videoName === "hero-full") {
      folderName = "hero"; // Map hero-full to hero folder
    }

    const outputDir = path.join(FRAMES_DIR, folderName);
    ensureDirectoryExistence(outputDir);

    console.log(`Processing: ${file} -> public/videos/frames/${folderName}/`);

    const videoPath = path.join(VIDEOS_DIR, file);
    const outputPathPattern = path.join(outputDir, "%04d.webp");

    // Clear existing frames if any
    const existingFrames = fs.readdirSync(outputDir).filter(f => f.endsWith(".webp"));
    if (existingFrames.length > 0) {
      console.log(`Clearing existing ${existingFrames.length} frames in ${folderName}...`);
      existingFrames.forEach(f => fs.unlinkSync(path.join(outputDir, f)));
    }

    // Extract frames using FFmpeg
    // -vf fps=15 (to keep size smaller if needed, but let's keep all frames or limit fps to 24 for smoother animations)
    // -q:v 75 for decent quality/size WebP
    // -vf scale=1280:-1 for performance
    try {
      const ffmpegCmd = `ffmpeg -i "${videoPath}" -f image2 -c:v libwebp -vf "scale=1280:-1,fps=24" -q:v 75 "${outputPathPattern}"`;
      console.log(`Executing: ${ffmpegCmd}`);
      execSync(ffmpegCmd, { stdio: "inherit" });
      console.log(`Successfully extracted frames for ${videoName}!`);
    } catch (err) {
      console.error(`Failed to extract frames for ${videoName}:`, err.message);
    }
  });

  console.log("=== Frame Extraction Completed ===");
}

main();
