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
}

export function useCanvasScrollAnimation({
  folderName,
  frameCount,
  fallbackVideoUrl,
  triggerSelector,
  startTrigger = "top top",
  endTrigger = "bottom bottom",
  pin = true,
  scrub = true,
}: UseCanvasScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isUsingFrames, setIsUsingFrames] = useState<boolean | null>(null);

  // Cache of loaded Images to prevent reloading
  const imagesCache = useRef<Map<number, HTMLImageElement>>(new Map());

  // Helper to format frame numbers (e.g. 1 -> "0001")
  const getFrameUrl = (index: number) => {
    const formatted = String(index).padStart(4, "0");
    return `/videos/frames/${folderName}/${formatted}.webp`;
  };

  // Preload a specific frame index
  const preloadFrame = (index: number): Promise<HTMLImageElement> => {
    if (imagesCache.current.has(index)) {
      return Promise.resolve(imagesCache.current.get(index)!);
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = getFrameUrl(index);
      img.onload = () => {
        imagesCache.current.set(index, img);
        resolve(img);
      };
      img.onerror = () => reject();
    });
  };

  // Check if frames actually exist
  useEffect(() => {
    const checkFramesExist = async () => {
      try {
        const firstFrameUrl = getFrameUrl(1);
        const img = new Image();
        img.src = firstFrameUrl;
        img.onload = () => {
          setIsUsingFrames(true);
        };
        img.onerror = () => {
          console.warn(`Frames not found for ${folderName}. Falling back to video: ${fallbackVideoUrl}`);
          setIsUsingFrames(false);
        };
      } catch {
        setIsUsingFrames(false);
      }
    };

    checkFramesExist();
  }, [folderName, fallbackVideoUrl]);

  // Main scroll animation setup
  useEffect(() => {
    if (isUsingFrames === null) return;

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
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      drawCurrentFrame();
    };

    const currentFrameObj = { val: 1 };

    // Draw frame helper
    const drawCurrentFrame = () => {
      if (!canvas || !ctx2d) return;
      const frameIdx = Math.round(currentFrameObj.val);
      let img = imagesCache.current.get(frameIdx);

      if (!img) {
        // Find the closest loaded frame in cache to prevent flickering/resetting to frame 1
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

        // Trigger load of the missing frame in background
        preloadFrame(frameIdx).then(() => {
          if (Math.round(currentFrameObj.val) === frameIdx) {
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
      const currentIdx = Math.round(index);
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

    // Initialize and preload first 30 frames for smooth start
    if (isUsingFrames) {
      const initialPreloads = [];
      const preloadsCount = Math.min(30, frameCount);
      for (let i = 1; i <= preloadsCount; i++) {
        initialPreloads.push(preloadFrame(i));
      }

      Promise.all(initialPreloads.map(p => p.catch(() => {}))).then(() => {
        resizeCanvas();
        drawCurrentFrame();
        window.addEventListener("resize", resizeCanvas);
      });
    }

    // Create GSAP ScrollTrigger timeline
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: startTrigger,
        end: endTrigger,
        pin: pin,
        scrub: scrub,
        onUpdate: (self) => {
          if (!isUsingFrames && video) {
            // Control video playhead frame progression via scroll
            if (video.duration) {
              // smooth transition of time
              gsap.to(video, {
                currentTime: self.progress * video.duration,
                duration: 0.2,
                ease: "power1.out",
                overwrite: "auto",
              });
            }
          }
        },
      },
    });

    if (isUsingFrames) {
      scrollTimeline.to(currentFrameObj, {
        val: frameCount,
        ease: "none",
        onUpdate: () => {
          requestAnimationFrame(() => handleFrameChange(currentFrameObj.val));
        },
      });
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      scrollTimeline.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === triggerElement) {
          trigger.kill();
        }
      });
    };
  }, [isUsingFrames, frameCount, triggerSelector, startTrigger, endTrigger, pin, scrub, folderName]);

  return {
    canvasRef,
    containerRef,
    videoRef,
    isUsingFrames,
  };
}
