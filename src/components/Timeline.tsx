"use client";

import { motion } from "framer-motion";
import { type SideConfig } from "@/config/wedding";
import { fadeInUp } from "@/lib/motion";

interface TimelineProps {
  side: SideConfig;
}

/* ─── Slide-in variants ─── */
const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Timeline({ side }: TimelineProps) {
  const { timeline } = side;

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-8" id="timeline">
      <div className="w-full max-w-3xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <p className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 font-body">
            Lịch Trình
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-text-primary mb-4">
            Chương Trình {side.label}
          </h2>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4 sm:mt-6" />
        </motion.div>

        {/* Timeline – alternating two-sided layout */}
        <div className="relative">
          {/* Continuous center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-primary/15" />

          <div className="flex flex-col gap-6 sm:gap-8">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="relative flex items-center">
                  {/* ── Left side content ── */}
                  <div className="w-[calc(50%-24px)] sm:w-[calc(50%-28px)]">
                    {isLeft ? (
                      <motion.div
                        className="flex items-center justify-end gap-3 sm:gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={slideFromLeft}
                      >
                        <div className="text-right">
                          <h3 className="text-sm sm:text-base font-heading text-text-primary leading-snug">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-primary font-caption text-sm sm:text-base font-semibold shrink-0">
                          {item.time}
                        </p>
                      </motion.div>
                    ) : (
                      <div />
                    )}
                  </div>

                  {/* ── Center icon ── */}
                  <div className="relative z-10 mx-2 sm:mx-3 shrink-0">
                    <motion.div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-primary flex items-center justify-center text-lg sm:text-xl shadow-md"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      variants={scaleIn}
                    >
                      {item.icon}
                    </motion.div>
                  </div>

                  {/* ── Right side content ── */}
                  <div className="w-[calc(50%-24px)] sm:w-[calc(50%-28px)]">
                    {!isLeft ? (
                      <motion.div
                        className="flex items-center gap-3 sm:gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={slideFromRight}
                      >
                        <p className="text-primary font-caption text-sm sm:text-base font-semibold shrink-0">
                          {item.time}
                        </p>
                        <div className="text-left">
                          <h3 className="text-sm sm:text-base font-heading text-text-primary leading-snug">
                            {item.title}
                          </h3>
                        </div>
                      </motion.div>
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
