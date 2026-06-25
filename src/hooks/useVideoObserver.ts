"use client";

import { useEffect, useRef } from "react";

export function useVideoObserver() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play video when in viewport
            video.play().catch(() => {
              // Ignore browser policy autoplay block
            });
          } else {
            // Pause video when out of viewport
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  return videoRef;
}
