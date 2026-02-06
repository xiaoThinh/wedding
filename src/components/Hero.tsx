"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import weddingConfig, { type SideConfig } from "@/config/wedding";
import { playfair } from "@/lib/font";

interface HeroProps {
  side: SideConfig;
}

export default function Hero({ side }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { groom, bride, date } = weddingConfig;

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      id="hero"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${side.heroImage}')`,
          y: imageY,
        }}
      />

      {/* Overlay gradients – stronger for text contrast */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-3xl mx-auto"
        style={{ opacity: textOpacity }}
      >
        {/* Side label */}
        <motion.p
          className={`text-accent text-md sm:text-sm tracking-[0.4em] uppercase mb-3  drop-shadow-md ${playfair.className}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.8 }}
        >
          {side.heroTitle}
        </motion.p>

        <motion.p
          className="text-white text-xs sm:text-sm tracking-[0.35em] uppercase mb-6 font-body drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.8 }}
        >
          Trân trọng kính mời
        </motion.p>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-script leading-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.5),_0_0_40px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 1.0, ease: "easeOut" }}
        >
          {groom.name}
        </motion.h1>

        <motion.div
          className="flex items-center gap-4 my-3 sm:my-4"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 3.5, duration: 0.6 }}
        >
          <span className="w-10 sm:w-16 h-[1px] bg-accent" />
          <span className="text-accent text-xl sm:text-2xl font-script">
            &
          </span>
          <span className="w-10 sm:w-16 h-[1px] bg-accent" />
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-script leading-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.5),_0_0_40px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 1.0, ease: "easeOut" }}
        >
          {bride.name}
        </motion.h1>

        <motion.div
          className="mt-8 sm:mt-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 0.8 }}
        >
          <p className="text-white text-base sm:text-lg tracking-[0.2em] font-caption drop-shadow-lg">
            {date.dayOfWeek} | {date.full}
          </p>
          <p className="text-white/80 text-xs sm:text-sm tracking-[0.15em] font-caption mt-1 drop-shadow-md">
            (Nhằm ngày {date.lunarDate} Âm lịch)
          </p>
          <p className="text-white/90 text-xs sm:text-sm tracking-[0.15em] font-caption mt-1 drop-shadow-md">
            📍 {side.venue.name}
          </p>
        </motion.div>

        {/* Scroll indicator */}
        
      </motion.div>
    </section>
  );
}
