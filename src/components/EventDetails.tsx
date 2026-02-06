"use client";

import { motion } from "framer-motion";
import weddingConfig, { type SideConfig } from "@/config/wedding";
import { fadeInUp } from "@/lib/motion";
import SaveTheDateCalendar from "@/components/SaveTheDateCalendar";
import { allura, playfair } from "@/lib/font";

interface EventDetailsProps {
  side: SideConfig;
}

export default function EventDetails({ side }: EventDetailsProps) {
  const { groom, bride, date } = weddingConfig;

  // Parse venue ISO datetime → day, month, year, time
  const venueISO = side.venue.time; // e.g. "2026-04-04T17:30:00+07:00"
  const venueObj = new Date(venueISO);
  const venueDay = String(venueObj.getDate()).padStart(2, "0");
  const venueMonth = String(venueObj.getMonth() + 1).padStart(2, "0");
  const venueYear = String(venueObj.getFullYear());
  const venueTime = `${String(venueObj.getHours()).padStart(2, "0")}:${String(venueObj.getMinutes()).padStart(2, "0")}`;
  const venueLunar = side.venue.timeLunar;
  // Get Vietnamese day of week
  const daysVN = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const venueDayOfWeek = daysVN[venueObj.getDay()];

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-white" id="event-details">
      <div className="w-full max-w-2xl mx-auto">
        {/* Couple info */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Chú rể */}
            <div className="text-center">
              <p className="text-text-secondary text-xs sm:text-sm tracking-[0.15em] uppercase font-body mb-2">
                Trưởng nam
              </p>
              <h3 className={`text-3xl sm:text-4xl text-text-primary mb-4 ${allura.className}`}>
                {groom.fullName}
              </h3>
              <div>
                <p className={`text-text-primary text-sm sm:text-base ${playfair.className}`}>
                  {groom.parent1}
                </p>
                <p className={`text-text-primary text-sm sm:text-base ${playfair.className}`}>
                  {groom.parent2}
                </p>
              </div>
            </div>
            {/* Cô dâu */}
            <div className="text-center">
              <p className="text-text-secondary text-xs sm:text-sm tracking-[0.15em] uppercase font-body mb-2">
                Trưởng nữ
              </p>
              <h3 className={`text-3xl sm:text-4xl text-text-primary mb-4 ${allura.className}`}>
                {bride.fullName}
              </h3>
              <p className={`text-text-primary text-sm sm:text-base ${playfair.className}`}>
                {bride.parent1}
              </p>
              <p className={`text-text-primary text-sm sm:text-base ${playfair.className}`}>
                {bride.parent2}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Save The Date calendar */}
        <div className="mb-14">
          <SaveTheDateCalendar isoDate={date.iso} />
        </div>

        {/* ── Invitation card (thiệp mời style) ── */}
        <motion.div
          className="w-full max-w-md mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
        >
          {/* Decorative top */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-12 h-[1px] bg-accent" />
            <span className="text-accent text-2xl">♥</span>
            <span className="w-12 h-[1px] bg-accent" />
          </div>

          {/* Heading */}
          <h3 className={`text-3xl sm:text-4xl md:text-5xl tracking-[0.20em] uppercase text-text-primary mb-8 ${playfair.className}`}>
            Trân Trọng Kính Mời
          </h3>

          {/* Description */}
          <p className="text-text-secondary font-body text-sm sm:text-base mb-8 leading-relaxed max-w-sm mx-auto">
            {side.venue.description ||
              "Đến dự bữa tiệc thân mật chung vui cùng gia đình chúng tôi"}
          </p>

          {/* Time + Day */}
          <p className="text-text-secondary font-body text-sm sm:text-base mb-8">
            Được tổ chức vào hồi{" "}
            <span className="text-text-primary font-semibold">{venueTime}</span>
            {" "}•{" "}
            <span className={`text-text-primary ${playfair.className}`}>{venueDayOfWeek}</span>
          </p>

          {/* Big date display: DD | MM | YYYY */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-4">
            <span className={`text-5xl sm:text-6xl md:text-7xl text-text-primary ${playfair.className}`}>
              {venueDay}
            </span>
            <span className="text-3xl sm:text-4xl text-accent font-light">|</span>
            <span className={`text-5xl sm:text-6xl md:text-7xl text-text-primary ${playfair.className}`}>
              {venueMonth}
            </span>
            <span className="text-3xl sm:text-4xl text-accent font-light">|</span>
            <span className={`text-5xl sm:text-6xl md:text-7xl text-text-primary ${playfair.className}`}>
              {venueYear}
            </span>
          </div>

          {/* Lunar date */}
          <p className="text-text-secondary font-body text-xs sm:text-sm mb-8 italic">
            (Nhằm ngày {venueLunar?.split("-").pop()} tháng {venueLunar?.split("-")[1]} Âm lịch)
          </p>

          {/* Venue info */}
          <div className="mb-8">
            <h4 className={`text-lg sm:text-xl tracking-[0.15em] uppercase text-text-primary mb-3 ${playfair.className}`}>
              Tại {side.venue.name}
            </h4>
            <p className="text-text-secondary font-body text-xs sm:text-sm leading-relaxed">
              {side.venue.address}
            </p>
          </div>

          {/* Map link */}
          <a
            href={side.venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white bg-primary hover:bg-primary-dark px-6 py-3 rounded-full font-body font-medium transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Xem bản đồ
          </a>

          {/* Closing line */}
          <div className="w-10 h-[1px] bg-accent mx-auto mb-5" />
          <p className="text-text-secondary font-body text-xs sm:text-sm italic leading-relaxed max-w-xs mx-auto">
            Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi!
          </p>

          {/* Decorative bottom */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="w-8 h-[1px] bg-accent/50" />
            <span className="text-accent text-lg">♥</span>
            <span className="w-8 h-[1px] bg-accent/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
