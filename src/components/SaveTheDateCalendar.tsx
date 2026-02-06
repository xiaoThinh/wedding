"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

interface SaveTheDateCalendarProps {
  /** ISO date string or parseable date, e.g. "2026-03-15" */
  isoDate: string;
}

const DAY_HEADERS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

const MONTH_NAMES = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export default function SaveTheDateCalendar({
  isoDate,
}: SaveTheDateCalendarProps) {
  const { year, month, targetDay, weeks } = useMemo(() => {
    const d = new Date(isoDate);
    const y = d.getFullYear();
    const m = d.getMonth(); // 0-based
    const day = d.getDate();

    // First day of the month (0=Sun → convert to Mon-based)
    const firstDow = new Date(y, m, 1).getDay(); // 0=Sun
    const startOffset = firstDow === 0 ? 6 : firstDow - 1; // Mon=0
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    // Build 2D grid of weeks
    const grid: (number | null)[][] = [];
    let week: (number | null)[] = Array(startOffset).fill(null);

    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d);
      if (week.length === 7) {
        grid.push(week);
        week = [];
      }
    }
    if (week.length > 0) {
      while (week.length < 7) week.push(null);
      grid.push(week);
    }

    return { year: y, month: m, targetDay: day, weeks: grid };
  }, [isoDate]);

  return (
    <motion.div
      className="w-full max-w-xs mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
        {/* Header */}
        <div className="bg-text-primary px-5 py-4 text-center">
          <p className="text-white font-heading text-lg sm:text-xl tracking-[0.15em] uppercase">
            Save The Date
          </p>
          <p className="text-white/70 font-caption text-xs sm:text-sm tracking-[0.1em] mt-1">
            {MONTH_NAMES[month]} - {year}
          </p>
        </div>

        {/* Calendar grid */}
        <div className="px-3 sm:px-5 py-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_HEADERS.map((d, i) => (
              <div
                key={d}
                className={`text-center text-xs font-body font-semibold py-1.5 ${
                  i === 6 ? "text-red-500" : "text-text-primary"
                }`}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Separator */}
          <div className="h-[1px] bg-primary/20 mb-2" />

          {/* Weeks */}
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7">
              {week.map((day, di) => {
                const isSunday = di === 6;
                const isTarget = day === targetDay;

                return (
                  <div
                    key={di}
                    className="relative flex items-center justify-center py-2"
                  >
                    {isTarget ? (
                      /* Heart highlight for the wedding day */
                      <div className="relative flex items-center justify-center">
                        <svg
                          className="absolute w-9 h-9 sm:w-10 sm:h-10 text-red-500"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="relative z-10 text-white text-xs sm:text-sm font-body font-bold">
                          {day}
                        </span>
                      </div>
                    ) : day ? (
                      <span
                        className={`text-xs sm:text-sm font-body ${
                          isSunday
                            ? "font-bold text-text-primary"
                            : "text-text-secondary"
                        }`}
                      >
                        {day}
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
