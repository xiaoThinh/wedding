"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { fadeInUp } from "@/lib/motion";
import weddingConfig, { type SideConfig } from "@/config/wedding";
import { playfair } from "@/lib/font";

interface GalleryProps {
  images: string[];
  side?: SideConfig;
}

export default function Gallery({ images, side }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  const allLoaded = images.length > 0 && loadedCount >= 4;

  const { groom, bride } = weddingConfig;

  // Main image + 3 small images (hero layout)
  const mainImage = images[0];
  const smallImages = [
    images[1] || images[0],
    images[2] || images[0], 
    images[3] || images[0]
  ];
  
  // Additional gallery images (after the main 4)
  const galleryImages = images.slice(4);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-16 px-4 sm:px-6"
      id="gallery"
    >
      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto">
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
                Đang tải album... {images.length > 0 ? Math.round((loadedCount / 4) * 100) : 0}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Couple Names */}
        <motion.div
          className="mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`text-3xl sm:text-4xl md:text-5xl text-text-primary font-script leading-tight mb-2 ${playfair.className}`}>
            {groom.fullName}
          </h1>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="w-12 sm:w-16 h-[1px] bg-text-secondary" />
            <span className="text-text-secondary text-2xl font-script">&</span>
            <span className="w-12 sm:w-16 h-[1px] bg-text-secondary" />
          </div>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl text-text-primary font-script leading-tight ${playfair.className}`}>
            {bride.fullName}
          </h1>
        </motion.div>

        {/* Main Image with Border */}
        <motion.div
          className="relative w-full max-w-sm sm:max-w-md mb-6 sm:mb-8 cursor-pointer group"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => openLightbox(0)}
        >
          <motion.div 
            className="relative w-[95%] aspect-[4/5] sm:aspect-[3/4] border-[4px] sm:border-6 border-[#4A5F4E] overflow-hidden px-6 h-[80%] m-auto -translate-y-4 sm:-translate-y-6"
            style={{ scale }}
          >
            {mainImage && (
              <Image
                src={mainImage}
                alt={`${groom.name} & ${bride.name}`}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
                priority
                sizes="(max-width: 640px) 80vw, 448px"
                onLoad={handleImageLoaded}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className={`text-xl sm:text-2xl md:text-3xl text-text-primary font-script mb-6 sm:mb-8 italic ${playfair.className}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Trân Trọng Kính Mời
        </motion.p>

        {/* Three Small Images */}
        <motion.div
          className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full max-w-2xl mb-8 sm:mb-10 items-end"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {smallImages.map((img, idx) => (
            <motion.div
              key={idx}
              className={`relative border-[3px] sm:border-4 border-[#4A5F4E] overflow-hidden cursor-pointer group ${
                idx === 1 
                  ? 'aspect-[3/5] -translate-y-4 sm:-translate-y-6' 
                  : 'aspect-[3/5]'
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(idx + 1)}
            >
              <Image
                src={img}
                alt={`Wedding photo ${idx + 1}`}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 180px"
                onLoad={handleImageLoaded}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Music Icon */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-text-primary flex items-center justify-center">
            <span className="text-lg sm:text-xl">🎵</span>
          </div>
        </motion.div>

        {/* Event Title */}
        <motion.div
          className="border-t-2 border-b-2 border-text-primary py-3 sm:py-4 w-full max-w-md mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.3em] text-text-primary uppercase">
            {side?.heroTitle || "LỄ THÀNH HÔN"}
          </h2>
        </motion.div>

        {/* Additional Gallery Images Grid */}
        {galleryImages.length > 0 && (
          <motion.div
            className="w-full max-w-5xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading text-text-primary mb-8 sm:mb-12 text-center">
              Album Ảnh Cưới
            </h3>
            <motion.div
                className="relative aspect-square md:col-span-2 md:row-span-2 overflow-hidden rounded-lg cursor-pointer group shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 mb-4 border-2 m-auto border-[#4A5F4E]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openLightbox(4)}
              >
                <Image
                  src={galleryImages[0]}
                  alt="Featured wedding photo"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 66vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {/* Large Feature Image */}
              

              {/* Four Small Images */}
              {galleryImages.slice(1, 5).map((img, idx) => (
                <motion.div
                  key={idx}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group shadow-md hover:shadow-xl transition-shadow duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (idx + 1) * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => openLightbox(idx + 5)}
                >
                  <Image
                    src={img}
                    alt={`Wedding gallery ${idx + 6}`}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
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
