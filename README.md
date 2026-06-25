# Chhab Chhaba Chhab Waterpark — Premium Web Experience

A high-end, cinematic, and responsive digital experience built for **Chhab Chhaba Chhab Waterpark**, Surat. Engineered using **Next.js**, **TypeScript**, **Tailwind CSS**, **GSAP**, **Framer Motion**, and **Lenis Smooth Scroll** to deliver a luxurious, immersive product showcase.

---

## 🌟 Key Features

* **Apple-Style Scroll Animations**: Renders frame-by-frame WebP sequences using HTML5 Canvas mapped directly to the user's scroll progression.
* **Smart Preloading & Caching**: Preloads surrounding frames dynamically and evicts distant frames from memory to maintain a low garbage collector/heap footprint.
* **Resilient Video Fallback**: If frames are not generated, the system automatically falls back to utilizing raw `.mp4` video files, scrubbing their playheads via GSAP scroll trigger values.
* **Video Intersection Observer**: Automatically plays background videos only when visible in the viewport and pauses them when scrolled out of view to maximize performance.
* **Modern Form Validation & States**: Contact and booking calculators with state loaders, validation rules, success modals, and input focus indicator rings.
* **Custom Error Handling**: Custom designed premium 404 (NotFound) and error boundary pages keeping guests immersed even when paths go wrong.
* **Responsive & Fluid Typography**: Meticulously designed viewport scaling supporting Large TVs down to mobile screens.
* **Next.js Metadata SEO**: Unique metadata tags, Open Graph card bindings, Twitter cards, canonical tags, and structured JSON-LD schemas on every page.
* **Accessibility Focused**: High contrast themes, screen-reader friendly `aria-label` tags, semantic page structures, and support for `prefers-reduced-motion` settings.

---

## 🛠️ Tech Stack

* **Core Framework**: Next.js 16 (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS v4 (Vanilla-injected config)
* **Animation Engines**: GSAP, Framer Motion
* **Smooth Scrolling**: Lenis Smooth Scroll
* **Icons**: Lucide React

---

## 📂 Project Folder Structure

```text
cccwp/
├── public/                 # Static Assets
│   ├── images/             # Optimised photos (slide1.png, etc.)
│   └── videos/             # MP4 sources & extracted frames
│       └── frames/         # Frame sequences grouped by folder (hero, slides, child, splash, wave, sunset)
├── src/
│   ├── app/                # Next.js App Router (Server-side Entrypoints & SEO metadata)
│   │   ├── about/          # About page files (page.tsx, AboutClient.tsx)
│   │   ├── attractions/    # Attractions page files (page.tsx, AttractionsClient.tsx)
│   │   ├── booking/        # Booking page files (page.tsx, BookingClient.tsx)
│   │   ├── contact/        # Contact page files (page.tsx, ContactClient.tsx)
│   │   ├── facilities/     # Facilities page files (page.tsx, FacilitiesClient.tsx)
│   │   ├── gallery/        # Gallery page files (page.tsx, GalleryClient.tsx)
│   │   ├── error.tsx       # Custom runtime error page
│   │   ├── globals.css     # Global styles & Tailwind layers
│   │   ├── layout.tsx      # Main layout (Font configuration, white flash prevention)
│   │   ├── not-found.tsx   # Custom 404 page
│   │   └── page.tsx        # Homepage Server Component (Metadata & JSON-LD schema)
│   ├── components/         # Modular Components
│   │   ├── About/          # Home about block
│   │   ├── Attractions/    # Home attractions showcase
│   │   ├── Booking/        # Cost calculator & booking form
│   │   ├── Contact/        # Contact form & location information
│   │   ├── Facilities/     # Conveniences listing
│   │   ├── Footer/         # Footer with ambient animations
│   │   ├── Gallery/        # Grid preview of moments
│   │   ├── Hero/           # Pinned canvas/video hero
│   │   ├── Loader/         # Water ripple loading screen
│   │   ├── Navbar/         # Fixed blur header navigation
│   │   └── PageTransition/ # Exit-Entry frame motion animations
│   ├── hooks/              # Custom React Hooks
│   │   ├── useCanvasScrollAnimation.ts # Handles HTML5 Canvas scroll rendering
│   │   ├── useGsapScroll.ts            # Animates heading reveals & staggered cards
│   │   └── useVideoObserver.ts         # Viewport tracking for videos
│   └── types/              # TS custom type bindings
├── scripts/
│   └── extract-frames.js   # Node/FFmpeg automatic frame generator
├── tsconfig.json           # Type Configuration
├── package.json            # Dependencies and scripts
└── README.md               # Documentation
```

---

## 🚀 Setup & Installation

### 1. Prerequisites
Verify that `ffmpeg` is installed on your local computer's environment path. (Optional: If `ffmpeg` is not present, the website automatically falls back to standard scroll-scrubbed MP4 video streaming).

### 2. Install Dependencies
Run the install command in the project directory:
```bash
npm install
```

### 3. Generate Scroll Frames
To generate the high-performance frame sequences, run the extraction script:
```bash
npm run extract-frames
```
This script reads the MP4 video sources located inside `public/videos/` and exports optimized WebP frame sequences into `public/videos/frames/<folder_name>/`.

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 5. Production Build
Compile and verify the TypeScript build output:
```bash
npm run build
npm run start
```

---

## 🎬 How to Add or Customize Videos

To add or customize scroll-animation videos:

1. **Upload Asset**: Save your optimized `.mp4` video into the `public/videos/` directory.
2. **Setup Script Config**: Open the `scripts/extract-frames.js` script and add your video configuration in the targets array, specifying the source path and target folder name.
3. **Run Extraction**: Execute `npm run extract-frames` to slice the video into frames.
4. **Wire Hook**: Import and call the `useCanvasScrollAnimation` hook inside your React component, specifying your parameters:
   ```typescript
   const { canvasRef, videoRef, isUsingFrames } = useCanvasScrollAnimation({
     folderName: "your-folder-name",
     frameCount: 120, // number of extracted webp images
     fallbackVideoUrl: "/videos/your-video.mp4",
     triggerSelector: "#your-scroll-section",
   });
   ```

---

## 🖼️ How to Replace Images

1. **Locate Path**: Put your replacement image in the `public/images/` directory.
2. **Size Recommendations**:
   * Hero Background / Banner Images: `1920x1080` (landscape aspect ratios).
   * Feature / Grid Cards: `800x600` (aspect ratios of `4:3` or `16:10`).
3. **Implementation**: Ensure you use Next.js `<Image>` component for automatic sizing, compression, and lazy loading:
   ```tsx
   import Image from "next/image";

   <Image
     src="/images/your-new-image.png"
     alt="Descriptive accessibility label text"
     fill
     sizes="(max-width: 768px) 100vw, 50vw"
     className="object-cover"
     loading="lazy"
   />
   ```

---

## 🌐 Production Deployment Guidelines

The project is built to support serverless deployment targets (such as Vercel, Netlify, or AWS Amplify):

1. **Environment Config**: If you host on platforms like Vercel, note that the frame extraction script requires `ffmpeg` which is typically not pre-installed on build containers.
2. **Recommended Workflow**:
   * Generate and test your frame sequences locally by running `npm run extract-frames`.
   * Commit the generated WebP images inside `public/videos/frames/` to your Git repository (ensure they are pushed).
   * Deploy the pre-rendered frames as static public assets. This ensures zero-dependency build tasks and speeds up deploy times.
