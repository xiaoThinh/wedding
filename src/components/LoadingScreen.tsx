"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import weddingConfig from "@/config/wedding";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  const { groom, bride, date, loadingBg } = weddingConfig;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background image with blur */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${loadingBg}')`,
              filter: "blur(25px) brightness(0.6)",
              transform: "scale(1.1)",
            }}
          />

          {/* Fallback gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary-dark/60 to-primary/80" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 text-center px-6">
            <motion.p
              className="text-white/80 text-sm tracking-[0.3em] uppercase font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            >
              Save The Date
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl text-white font-script"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            >
              {groom.name}
            </motion.h1>

            <motion.div
              className="w-12 h-[1px] bg-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease: "easeOut" }}
            />

            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl text-white font-script"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
            >
              {bride.name}
            </motion.h1>

            <motion.p
              className="text-accent text-base sm:text-lg tracking-[0.2em] mt-4 font-caption"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {date.full}
            </motion.p>

            {/* Decorative dots */}
            <motion.div
              className="flex gap-2 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/50"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
