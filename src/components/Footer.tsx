"use client";

import { motion } from "framer-motion";
import weddingConfig from "@/config/wedding";
import { fadeInUp } from "@/lib/motion";

export default function Footer() {
  const { footer, groom, bride, date } = weddingConfig;

  return (
    <footer className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-primary/5" id="footer">
      <motion.div
        className="w-full max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={fadeInUp}
      >
        {/* Decorative line */}
        <div className="w-16 h-[1px] bg-accent mx-auto mb-8" />

        {/* Thank you */}
        <p className="text-text-secondary font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-6">
          {footer.thanks}
        </p>

        {/* Couple names */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-script text-text-primary mb-2">
          {groom.name} & {bride.name}
        </h2>

        {/* Date */}
        <p className="text-primary font-caption text-base sm:text-lg tracking-[0.15em] mb-8">
          {date.full}
        </p>

        {/* Quote */}
        <p className="text-text-secondary font-quote text-base sm:text-lg max-w-md mx-auto mb-6">
          &quot;{footer.quote}&quot;
        </p>

        {/* Hashtag */}
        <p className="text-primary font-body text-xs sm:text-sm tracking-[0.1em] font-medium">
          {footer.hashtag}
        </p>

        {/* Bottom decorative */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <span className="w-8 h-[1px] bg-accent/50" />
          <span className="text-accent text-lg">♥</span>
          <span className="w-8 h-[1px] bg-accent/50" />
        </div>

        <p className="text-text-secondary/40 font-body text-xs mt-8">
          Made with love
        </p>
      </motion.div>
    </footer>
  );
}
