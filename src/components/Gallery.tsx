"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import { fadeInUp } from "@/lib/motion";

interface GalleryProps {
  images: string[];
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}

/* ─── Individual image card with blur-up loading + scroll-triggered slide ─── */
function GalleryImage({
  src,
  index,
  aspect,
  onOpen,
  scrollYProgress,
  isMobile,
  onImageLoaded,
}: {
  src: string;
  index: number;
  aspect: string;
  onOpen: (i: number) => void;
  scrollYProgress: MotionValue<number>;
  isMobile: boolean;
  onImageLoaded: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  // 7 kiểu chuyển động khác nhau cho từng ảnh
  const motionPatterns = [
    { fromX: -140, fromY: 80, fromRotate: -10 }, // bay từ trái dưới lên
    { fromX: 140, fromY: -80, fromRotate: 10 },  // bay từ phải trên xuống
    { fromX: -90, fromY: -140, fromRotate: 6 },  // bay từ trái trên chéo vào
    { fromX: 90, fromY: 140, fromRotate: -6 },   // bay từ phải dưới chéo vào
    { fromX: 0, fromY: 160, fromRotate: 12 },    // bay từ dưới lên
    { fromX: 0, fromY: -160, fromRotate: -12 },  // bay từ trên xuống
    { fromX: 180, fromY: 0, fromRotate: 4 },     // bay từ phải sang
  ];

  const pattern = motionPatterns[index % motionPatterns.length];
  const factor = isMobile ? 0.6 : 1;

  const x = useTransform(
    scrollYProgress,
    [0, 0.7],
    [pattern.fromX * factor, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.7],
    [pattern.fromY * factor, 0]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.7],
    [pattern.fromRotate, 0]
  );

  const opacity = useTransform(scrollYProgress, [0.05, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <motion.div
      className={`relative ${aspect} rounded-2xl overflow-hidden cursor-pointer group`}
      style={{ x, y, rotate, opacity, scale }}
      transition={{ type: "spring", stiffness: 80, damping: 18 }}
      onClick={() => onOpen(index)}
    >
      {/* Shimmer skeleton – visible while image loads */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="absolute inset-0 bg-secondary"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skeleton-shimmer" />
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        src={src}
        alt={`Ảnh cưới ${index + 1}`}
        fill
        className={`object-cover transition-all duration-700 group-hover:scale-105 ${
          loaded ? "blur-0 opacity-100" : "blur-md opacity-0"
        }`}
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        loading="eager"
        onLoad={() => {
          setLoaded(true);
          onImageLoaded();
        }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
    </motion.div>
  );
}

export default function Gallery({ images }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center 60%"],
  });
  const isMobile = useMediaQuery("(max-width: 768px)");

  const allLoaded = images.length > 0 && loadedCount >= images.length;

  const handleImageLoaded = useCallback(() => {
    setLoadedCount((prev) => prev + 1);
  }, []);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (lightboxIndex !== null) {
        setLightboxIndex((lightboxIndex + 1) % images.length);
      }
    },
    [lightboxIndex, images.length]
  );

  const goPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (lightboxIndex !== null) {
        setLightboxIndex(
          (lightboxIndex - 1 + images.length) % images.length
        );
      }
    },
    [lightboxIndex, images.length]
  );

  const aspects = [
    "aspect-[3/4]",
    "aspect-[4/5]",
    "aspect-square",
    "aspect-[3/4]",
    "aspect-[4/3]",
    "aspect-[3/4]",
    "aspect-square",
    "aspect-[4/5]",
    "aspect-[3/4]",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-white"
      id="gallery"
    >
      <div className="w-full max-w-6xl mx-auto relative">
        {/* Global gallery loading overlay */}
        <AnimatePresence>
          {!allLoaded && (
            <motion.div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-sm sm:text-base text-text-secondary font-body">
                Đang tải album... {images.length > 0 ? Math.round((loadedCount / images.length) * 100) : 0}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Section heading */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <p className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 font-body">
            Gallery
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-text-primary mb-4">
            Album Ảnh Cưới
          </h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4 sm:mt-6" />
        </motion.div>

        {/* Gallery grid – each image triggers on scroll */}
        <motion.div
          className="gallery-grid"
          initial={{ opacity: 0, y: 24 }}
          animate={allLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {images.map((src, index) => (
            <GalleryImage
              key={index}
              src={src}
              index={index}
              aspect={aspects[index % aspects.length]}
              onOpen={openLightbox}
              scrollYProgress={scrollYProgress}
              isMobile={isMobile}
              onImageLoaded={handleImageLoaded}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white text-2xl sm:text-3xl z-10 transition-colors"
              onClick={closeLightbox}
              aria-label="Đóng"
            >
              ✕
            </button>

            <button
              className="absolute left-2 sm:left-4 md:left-8 text-white/70 hover:text-white text-3xl sm:text-4xl z-10 transition-colors"
              onClick={goPrev}
              aria-label="Trước"
            >
              ‹
            </button>

            <motion.div
              className="relative w-[92vw] h-[75vh] sm:w-[85vw] sm:h-[80vh] md:w-[70vw]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightboxIndex]}
                alt={`Ảnh cưới ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            <button
              className="absolute right-2 sm:right-4 md:right-8 text-white/70 hover:text-white text-3xl sm:text-4xl z-10 transition-colors"
              onClick={goNext}
              aria-label="Sau"
            >
              ›
            </button>

            <p className="absolute bottom-4 sm:bottom-6 text-white/50 text-xs sm:text-sm font-body">
              {lightboxIndex + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
