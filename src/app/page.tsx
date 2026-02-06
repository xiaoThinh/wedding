"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import weddingConfig from "@/config/wedding";

export default function Home() {
  const { groom, bride, date, loadingBg } = weddingConfig;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${loadingBg}')`,
          filter: "blur(20px) brightness(0.5)",
          transform: "scale(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary-dark/50 to-primary/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 w-full max-w-lg mx-auto">
        <motion.p
          className="text-white/70 text-xs sm:text-sm tracking-[0.3em] uppercase mb-6 font-body"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          We&apos;re getting married
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl text-white font-script leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {groom.name}
        </motion.h1>

        <motion.div
          className="flex items-center gap-3 my-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <span className="w-10 sm:w-14 h-[1px] bg-accent" />
          <span className="text-accent text-xl font-script">&</span>
          <span className="w-10 sm:w-14 h-[1px] bg-accent" />
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl text-white font-script leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {bride.name}
        </motion.h1>

        <motion.p
          className="text-accent text-sm sm:text-base tracking-[0.2em] mt-6 mb-10 font-caption"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {date.dayOfWeek} | {date.full}
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-12 h-[1px] bg-white/30 mb-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        />

        <motion.p
          className="text-white/60 text-xs sm:text-sm font-body mb-6 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          Bạn được mời dự bên nào?
        </motion.p>

        {/* Two buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <Link
            href="/nha-trai"
            className="flex-1 py-4 px-6 bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-2xl font-body font-medium text-sm sm:text-base text-center hover:bg-white/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            🤵 Nhà Trai
          </Link>
          <Link
            href="/nha-gai"
            className="flex-1 py-4 px-6 bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-2xl font-body font-medium text-sm sm:text-base text-center hover:bg-white/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            👰 Nhà Gái
          </Link>
        </motion.div>

        {/* Bottom decorative */}
        <motion.div
          className="flex items-center gap-3 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span className="w-6 h-[1px] bg-accent/40" />
          <span className="text-accent/60 text-sm">♥</span>
          <span className="w-6 h-[1px] bg-accent/40" />
        </motion.div>
      </div>
    </div>
  );
}
