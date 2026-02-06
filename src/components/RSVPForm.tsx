"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { type WeddingSide, type SideConfig } from "@/config/wedding";
import { playfair } from "@/lib/font";

interface RSVPFormProps {
  side: WeddingSide;
  sideConfig: SideConfig;
}

interface RSVPFormData {
  name: string;
  email?: string;
  guests: number;
  attending: string;
  note: string;
}

export default function RSVPForm({ side, sideConfig }: RSVPFormProps) {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    email: undefined,
    guests: 1,
    attending: "yes",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const { qrInfo } = sideConfig;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, side }),
      });

      if (res.ok) {
        toast.success("Cảm ơn bạn đã xác nhận! Hẹn gặp bạn tại lễ cưới 💕", {
          duration: 5000,
          style: {
            background: "#F3F7F6",
            color: "#2E3A3A",
            border: "1px solid #8FB9B3",
          },
        });
        setFormData({ name: "", email: "", guests: 1, attending: "yes", note: "" });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch {
      toast.error("Không thể gửi. Vui lòng kiểm tra kết nối.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-8" id="rsvp">
      <Toaster position="top-center" />
      <div className="w-full max-w-lg mx-auto">
        {/* Section heading */}
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <p className="text-primary text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 font-body">
            RSVP
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-text-primary mb-4">
            Xác Nhận Tham Dự
          </h2>
          <p className="text-text-secondary font-body text-sm sm:text-base max-w-md mx-auto">
            Sự hiện diện của bạn là niềm vui lớn nhất của chúng mình
          </p>
          <div className="w-16 h-[1px] bg-accent mx-auto mt-4 sm:mt-6" />
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-[24px] p-6 sm:p-8 md:p-12 shadow-[var(--shadow-card)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {/* Name */}
          <motion.div className="mb-5 sm:mb-6" variants={fadeInUp}>
            <label
              htmlFor="name"
              className="block text-text-primary font-body text-sm font-medium mb-2"
            >
              Họ và tên <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 font-body text-text-primary bg-secondary/50 transition-all text-sm sm:text-base"
              placeholder="Nhập họ và tên"
            />
          </motion.div>

          {/* Email */}
          <motion.div className="mb-5 sm:mb-6" variants={fadeInUp}>
            <label
              htmlFor="email"
              className="block text-text-primary font-body text-sm font-medium mb-2"
            >
              Email nhận thông tin (không bắt buộc)
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 font-body text-text-primary bg-secondary/50 transition-all text-sm sm:text-base"
              placeholder="Nhập email để nhận hướng dẫn"
            />
          </motion.div>

          {/* Number of guests */}
          <motion.div className="mb-5 sm:mb-6" variants={fadeInUp}>
            <label
              htmlFor="guests"
              className="block text-text-primary font-body text-sm font-medium mb-2"
            >
              Số người tham dự
            </label>
            <select
              id="guests"
              value={formData.guests}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  guests: parseInt(e.target.value),
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 font-body text-text-primary bg-secondary/50 transition-all text-sm sm:text-base"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} người
                </option>
              ))}
            </select>
          </motion.div>

          {/* Attending */}
          <motion.div className="mb-5 sm:mb-6" variants={fadeInUp}>
            <label className="block text-text-primary font-body text-sm font-medium mb-3">
              Bạn có tham dự không? <span className="text-primary">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {[
                { value: "yes", label: "Có, mình sẽ đến 💕" },
                { value: "no", label: "Rất tiếc, không thể 😢" },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex-1 text-center py-3 px-4 rounded-xl border-2 cursor-pointer font-body text-sm transition-all ${
                    formData.attending === option.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-primary/10 text-text-secondary hover:border-primary/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="attending"
                    value={option.value}
                    checked={formData.attending === option.value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        attending: e.target.value,
                      })
                    }
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </motion.div>

          {/* "Chúc phúc online" button – only when not attending */}
          <AnimatePresence>
            {formData.attending === "no" && !showQR && (
              <motion.div
                className="mb-5 sm:mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={() => setShowQR(true)}
                  className="w-full py-3 px-4 bg-accent/20 hover:bg-accent/30 text-text-primary rounded-xl font-body text-sm font-medium transition-all border-2 border-accent/40 hover:border-accent/60"
                >
                  🎁 Chúc phúc online
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* QR popup – shown when clicking "Chúc phúc online" */}
          <AnimatePresence>
            {formData.attending === "no" && showQR && (
              <motion.div
                className="mb-5 sm:mb-6 bg-secondary rounded-2xl p-5 sm:p-6 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-text-secondary font-body text-xs tracking-[0.15em] uppercase mb-3">
                  Chúc phúc online
                </p>
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-xl overflow-hidden bg-white shadow-sm">
                  <Image
                    src={qrInfo.imageUrl}
                    alt="QR chuyển khoản"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <p className={`text-text-primary text-lg mb-1 ${playfair.className}`}>
                  {qrInfo.accountName}
                </p>
                <p className="text-text-secondary font-body text-sm">
                  {qrInfo.bankName}
                </p>
                <p className="text-primary font-body text-sm font-semibold tracking-wider mt-1">
                  {qrInfo.accountNumber}
                </p>
                <button
                  type="button"
                  onClick={() => setShowQR(false)}
                  className="mt-4 text-text-secondary hover:text-text-primary font-body text-xs transition-colors"
                >
                  Đóng
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Note */}
          <motion.div className="mb-6 sm:mb-8" variants={fadeInUp}>
            <label
              htmlFor="note"
              className="block text-text-primary font-body text-sm font-medium mb-2"
            >
              Lời nhắn
            </label>
            <textarea
              id="note"
              rows={3}
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 font-body text-text-primary bg-secondary/50 transition-all resize-none text-sm sm:text-base"
              placeholder="Gửi lời chúc đến cô dâu chú rể..."
            />
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeInUp}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 sm:py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-body font-medium text-sm sm:text-base tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi xác nhận"}
            </button>
          </motion.div>
        </motion.form>

        {/* QR section below form – always visible when attending */}
        <AnimatePresence>
          {formData.attending === "yes" && (
            <motion.div
              className="mt-8 bg-white rounded-[24px] p-6 sm:p-8 text-center shadow-[var(--shadow-card)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-text-secondary font-body text-xs tracking-[0.2em] uppercase mb-2">
                Mừng cưới
              </p>
              <h3 className="text-xl sm:text-2xl font-heading text-text-primary mb-4">
                Hộp Mừng Cưới
              </h3>
              <div className="w-10 h-[1px] bg-accent mx-auto mb-5" />

              <div className="relative w-52 h-52 mx-auto mb-4 rounded-xl overflow-hidden bg-secondary shadow-sm">
                <Image
                  src={qrInfo.imageUrl}
                  alt="QR chuyển khoản"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <p className={`text-text-primary text-lg sm:text-xl mb-1 ${playfair.className}`}>
                {qrInfo.accountName}
              </p>
              <p className="text-text-secondary font-body text-sm">
                {qrInfo.bankName}
              </p>
              <p className="text-primary font-body text-base font-semibold tracking-wider mt-1">
                {qrInfo.accountNumber}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
