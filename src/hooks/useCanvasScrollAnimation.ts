"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseCanvasScrollAnimationProps {
  folderName: string;
  frameCount: number;
  fallbackVideoUrl: string;
  triggerSelector: string;
  startTrigger?: string;
  endTrigger?: string;
  pin?: boolean | string;
  scrub?: boolean | number;
  extension?: string;
  framePrefix?: string;
  autoplay?: boolean;
}

const toggleScrollLock = (lock: boolean) => {
  if (typeof window === "undefined") return;

  const lenis = (window as any).lenis;
  if (lenis) {
    if (lock) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }

  if (lock) {
    document.documentElement.classList.add("scroll-locked");
    document.body.classList.add("scroll-locked");
  } else {
    document.documentElement.classList.remove("scroll-locked");
    document.body.classList.remove("scroll-locked");
  }
};

export function useCanvasScrollAnimation({
  folderName,
  frameCount,
  fallbackVideoUrl,
  triggerSelector,
  startTrigger = "top top",
  endTrigger = "bottom bottom",
  pin = true,
  scrub = true,
  extension = "webp",
  framePrefix = "",
  autoplay = false,
}: UseCanvasScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isUsingFrames, setIsUsingFrames] = useState<boolean | null>(null);
  const [isAutoplayComplete, setIsAutoplayComplete] = useState(!autoplay);

  // Cache of loaded Images to prevent reloading
  const imagesCache = useRef<Map<number, HTMLImageElement>>(new Map());
  // Track active image loading promises to prevent duplicate requests
  const loadingPromises = useRef<Map<number, Promise<HTMLImageElement>>>(new Map());

  // Helper to format frame numbers (e.g. 1 -> "0001")
  const getFrameUrl = (index: number) => {
    const formatted = String(index).padStart(4, "0");
    return `https://res.cloudinary.com/dr3vva4uq/image/upload/f_auto,q_auto/cccwp/frames/${folderName}/${framePrefix}${formatted}`;
  };

  // Preload a specific frame index
  const preloadFrame = (index: number): Promise<HTMLImageElement> => {
    // Clamp frame index to valid bounds
    const clampedIndex = Math.max(1, Math.min(frameCount, index));
    if (imagesCache.current.has(clampedIndex)) {
      return Promise.resolve(imagesCache.current.get(clampedIndex)!);
    }
    if (loadingPromises.current.has(clampedIndex)) {
      return loadingPromises.current.get(clampedIndex)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = getFrameUrl(clampedIndex);
      img.onload = () => {
        imagesCache.current.set(clampedIndex, img);
        loadingPromises.current.delete(clampedIndex);
        resolve(img);
      };
      img.onerror = () => {
        loadingPromises.current.delete(clampedIndex);
        reject();
      };
    });

    loadingPromises.current.set(clampedIndex, promise);
    return promise;
  };

  // Clear memory cache when folderName changes to prevent cross-page visual leaks
  useEffect(() => {
    imagesCache.current.clear();
  }, [folderName]);

  // Check if frames actually exist with mount protection
  useEffect(() => {
    let isMounted = true;
    const checkFramesExist = async () => {
      try {
        const firstFrameUrl = getFrameUrl(1);
        const img = new Image();
        img.src = firstFrameUrl;
        img.onload = () => {
          if (isMounted) setIsUsingFrames(true);
        };
        img.onerror = () => {
          if (isMounted) setIsUsingFrames(false);
        };
      } catch {
        if (isMounted) setIsUsingFrames(false);
      }
    };

    checkFramesExist();
    return () => {
      isMounted = false;
    };
  }, [folderName, fallbackVideoUrl]);

  // Main scroll animation setup
  useEffect(() => {
    if (isUsingFrames === null) return;

    let isMounted = true;
    let handleVideoEnded: (() => void) | null = null;
    let safetyTimeout: NodeJS.Timeout | null = null;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const video = videoRef.current;
    const triggerElement = document.querySelector(triggerSelector);

    if (!triggerElement) return;

    let ctx2d: CanvasRenderingContext2D | null = null;
    if (isUsingFrames && canvas && ctx) {
      ctx2d = ctx;
    }

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (!canvas || !isMounted) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawCurrentFrame();
    };

    const currentFrameObj = { val: 1 };

    // Draw frame helper
    const drawCurrentFrame = () => {
      if (!canvas || !ctx2d || !isMounted) return;
      
      // Clamp frame selection within bounds to prevent empty frame loading
      const frameIdx = Math.max(1, Math.min(frameCount, Math.round(currentFrameObj.val)));
      let img = imagesCache.current.get(frameIdx);

      if (!img) {
        // Find closest loaded frame in cache to prevent flickering
        let closestKey = 1;
        let minDiff = Infinity;
        for (const key of imagesCache.current.keys()) {
          const diff = Math.abs(key - frameIdx);
          if (diff < minDiff) {
            minDiff = diff;
            closestKey = key;
          }
        }
        img = imagesCache.current.get(closestKey);

        // Preload missing frame in background
        preloadFrame(frameIdx).then(() => {
          if (isMounted && Math.round(currentFrameObj.val) === frameIdx) {
            drawCurrentFrame();
          }
        }).catch(() => {});
      }

      if (img) {
        ctx2d.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw image keeping aspect ratio (cover style)
        const imgWidth = img.width;
        const imgHeight = img.height;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
        const newWidth = imgWidth * ratio;
        const newHeight = imgHeight * ratio;
        const x = (canvasWidth - newWidth) / 2;
        const y = (canvasHeight - newHeight) / 2;

        ctx2d.drawImage(img, x, y, newWidth, newHeight);
      }
    };

    // Preload dynamic window of frames
    const handleFrameChange = (index: number) => {
      if (!isMounted) return;
      
      const currentIdx = Math.max(1, Math.min(frameCount, Math.round(index)));
      drawCurrentFrame();

      // Smart preloading: load 25 frames ahead, 10 frames behind
      const startPreload = Math.max(1, currentIdx - 10);
      const endPreload = Math.min(frameCount, currentIdx + 25);

      for (let i = startPreload; i <= endPreload; i++) {
        preloadFrame(i).catch(() => {});
      }

      // Memory cleanup: delete frames that are far away
      if (imagesCache.current.size > 150) {
        for (const [key] of imagesCache.current.entries()) {
          if (key < currentIdx - 30 || key > currentIdx + 50) {
            imagesCache.current.delete(key);
          }
        }
      }
    };

    // Initialize preloading and canvas resizing
    if (isUsingFrames) {
      // Preload first frame immediately to draw canvas without flash
      preloadFrame(1).then(() => {
        if (!isMounted) return;
        resizeCanvas();
        drawCurrentFrame();
      }).catch(() => {});

      // Preload remaining frames in background
      const initialPreloads = [];
      const preloadsCount = Math.min(30, frameCount);
      for (let i = 2; i <= preloadsCount; i++) {
        initialPreloads.push(preloadFrame(i));
      }

      Promise.all(initialPreloads.map(p => p.catch(() => {}))).then(() => {
        if (!isMounted) return;
        window.addEventListener("resize", resizeCanvas);
        ScrollTrigger.refresh();
      });
    }

    // Handle video metadata triggers to prevent NaN seeking duration errors
    const handleVideoMetadata = () => {
      if (isMounted) {
        ScrollTrigger.refresh();
      }
    };

    if (!isUsingFrames && video) {
      if (video.readyState >= 1) {
        ScrollTrigger.refresh();
      } else {
        video.addEventListener("loadedmetadata", handleVideoMetadata);
      }
    }

    // Wrap GSAP animations in context for 100% clean React cleanup
    const gsapCtx = gsap.context(() => {
      if (autoplay) {
        // Autoplay & Lock Scroll Flow
        toggleScrollLock(true);

        // Safety timeout to prevent permanent lock if errors occur
        safetyTimeout = setTimeout(() => {
          toggleScrollLock(false);
          setIsAutoplayComplete(true);
        }, 15000);

        if (isUsingFrames) {
          gsap.to(currentFrameObj, {
            val: frameCount,
            duration: frameCount / 24, // 24 frames per second
            ease: "none",
            onUpdate: () => {
              handleFrameChange(currentFrameObj.val);
            },
            onComplete: () => {
              toggleScrollLock(false);
              setIsAutoplayComplete(true);
              if (safetyTimeout) clearTimeout(safetyTimeout);
            },
          });
        } else if (video) {
          video.currentTime = 0;
          handleVideoEnded = () => {
            toggleScrollLock(false);
            setIsAutoplayComplete(true);
            if (safetyTimeout) clearTimeout(safetyTimeout);
          };
          video.addEventListener("ended", handleVideoEnded);

          video.play().catch(() => {
            // Autoplay blocked fallback
            toggleScrollLock(false);
            setIsAutoplayComplete(true);
            if (safetyTimeout) clearTimeout(safetyTimeout);
          });
        }
      } else {
        // Standard Scroll-scrubbing Flow
        const scrollTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: startTrigger,
            end: endTrigger,
            pin: pin,
            scrub: scrub,
            onUpdate: (self) => {
              if (!isUsingFrames && video && video.duration) {
                // Clamp progress between [0, 1] to prevent OOB seek jumps
                const clampedProgress = Math.max(0, Math.min(1, self.progress));
                gsap.to(video, {
                  currentTime: clampedProgress * video.duration,
                  duration: 0.1, // Faster tween for closer scroll head alignment
                  ease: "none",
                  overwrite: "auto",
                });
              }
            },
          },
        });

        if (isUsingFrames) {
          scrollTimeline.to(currentFrameObj, {
            val: frameCount,
            ease: "none",
            onUpdate: () => {
              // Draw synchronously inside the GSAP loop to maintain absolute 60fps synchrony
              handleFrameChange(currentFrameObj.val);
            },
          });
        }
      }
    });

    return () => {
      isMounted = false;
      window.removeEventListener("resize", resizeCanvas);
      if (video) {
        if (handleVideoEnded) {
          video.removeEventListener("ended", handleVideoEnded);
        }
        video.removeEventListener("loadedmetadata", handleVideoMetadata);
      }
      if (safetyTimeout) {
        clearTimeout(safetyTimeout);
      }
      toggleScrollLock(false); // ALWAYS release scroll lock on unmount!
      gsapCtx.revert(); // Reverts DOM layout modifications and spacer wrappers
    };
  }, [isUsingFrames, frameCount, triggerSelector, startTrigger, endTrigger, pin, scrub, folderName, autoplay]);

  return {
    canvasRef,
    containerRef,
    videoRef,
    isUsingFrames,
    isAutoplayComplete,
  };
}
