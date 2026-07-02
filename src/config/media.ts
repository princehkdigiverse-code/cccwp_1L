const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const getMediaUrl = (localPath: string, type: "video" | "image" = "video") => {
  if (!cloudName) return localPath;
  const baseName = localPath.split("/").pop()?.split(".")[0];
  if (!baseName) return localPath;
  return `https://res.cloudinary.com/${cloudName}/${type}/upload/cccwp/${baseName}`;
};

export const MEDIA_CONFIG = {
  videos: {
    hero: {
      url: getMediaUrl("/videos/hero-full.mp4", "video"),
      folder: "hero",
      frameCount: 120,
    },
    slides: {
      url: getMediaUrl("/videos/slides.mp4", "video"),
      folder: "slides",
      frameCount: 120,
    },
    child: {
      url: getMediaUrl("/videos/child.mp4", "video"),
      folder: "child",
      frameCount: 120,
    },
    splash: {
      url: getMediaUrl("/videos/splash.mp4", "video"),
      folder: "splash",
      frameCount: 120,
    },
    wave: {
      url: getMediaUrl("/videos/wave.mp4", "video"),
      folder: "wave",
      frameCount: 120,
    },
    sunset: {
      url: getMediaUrl("/videos/sunset.mp4", "video"),
      folder: "sunset",
      frameCount: 120,
    },
  },
  images: {
    slides: {
      slide1: getMediaUrl("/images/slide1.png", "image"),
      slide2: getMediaUrl("/images/slide2.png", "image"),
      slide3: getMediaUrl("/images/slide3.png", "image"),
      slide4: getMediaUrl("/images/slide4.png", "image"),
    },
    placeholders: {
      aerial: getMediaUrl("/images/slide1.png", "image"),
      cyclone: getMediaUrl("/images/slide2.png", "image"),
      kidsSplash: getMediaUrl("/images/slide3.png", "image"),
      lazyRiver: getMediaUrl("/images/slide4.png", "image"),
    },
  },
};

