import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import weddingConfig, { type WeddingSide } from "@/config/wedding";

const APP_MAIL = process.env.APP_MAIL;
const APP_MAIL_PASSWORD = process.env.APP_MAIL_PASSWORD;

const transporter =
  APP_MAIL && APP_MAIL_PASSWORD
    ? nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: APP_MAIL,
          pass: APP_MAIL_PASSWORD,
        },
      })
    : null;

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, guests, attending, note, side } = body;

    if (!name || !attending) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Try Supabase first, fallback to console logging
    try {
      if (!supabase) {
        throw new Error("Supabase client is not configured");
      }

      const { error } = await supabase.from("rsvp").insert({
        name,
        email: email || null,
        guests: guests || 1,
        attending,
        note: note || "",
        side: side || "unknown",
        created_at: new Date().toISOString(),
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Supabase insert failed", error);
      console.log("RSVP received (no DB):", {
        name,
        email,
        guests,
        attending,
        note,
        side,
        timestamp: new Date().toISOString(),
      });
    }

    // Send confirmation email via Resend (best-effort)
    try {
      const nhaTrai = weddingConfig.sides["nha-trai"];
      const nhaGai = weddingConfig.sides["nha-gai"];

      const attendingText =
        attending === "yes"
          ? "Cảm ơn bạn đã xác nhận tham dự lễ cưới của chúng mình. Dưới đây là thông tin địa điểm và hướng dẫn di chuyển."
          : "Cảm ơn bạn đã phản hồi RSVP. Dù không thể tham dự, chúng mình vẫn rất trân trọng tình cảm của bạn. Nếu kế hoạch thay đổi, bạn luôn có thể liên hệ với gia đình hai bên.";

      const subject = `Thông tin lễ cưới ${weddingConfig.groom.name} & ${weddingConfig.bride.name}`;

      const preferredSide =
        (side as WeddingSide | undefined) &&
        weddingConfig.sides[side as WeddingSide]
          ? (side as WeddingSide)
          : undefined;

      const preferredVenue = preferredSide
        ? weddingConfig.sides[preferredSide].venue
        : undefined;

      const html = `
        <div style="background-color:#f5f5f7;padding:32px 16px;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;box-shadow:0 10px 30px rgba(15,23,42,0.08);overflow:hidden;border:1px solid #e5e7eb;">
            <div style="background:linear-gradient(135deg,#c38b8b,#e8c9a8);padding:20px 24px 18px;color:#fdfdfd;text-align:left;">
              <div style="font-size:12px;letter-spacing:0.28em;text-transform:uppercase;opacity:0.9;margin-bottom:6px;">Wedding RSVP</div>
              <div style="font-size:20px;font-weight:600;">Thiệp cảm ơn tham dự lễ cưới</div>
              <div style="font-size:13px;opacity:0.9;margin-top:4px;">${weddingConfig.groom.name} &amp; ${weddingConfig.bride.name}</div>
            </div>

            <div style="padding:20px 24px 24px;color:#111827;font-size:14px;line-height:1.7;">
              <p style="margin:0 0 10px 0;">Xin chào <strong>${name}</strong>,</p>
              <p style="margin:0 0 14px 0;">${attendingText}</p>

              <div style="margin:18px 0 16px 0;padding:12px 14px;border-radius:10px;background:#fef3c7;border:1px solid #fde68a;">
                <div style="font-size:12px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;color:#92400e;margin-bottom:4px;">Thời gian</div>
                <div style="font-size:14px;color:#78350f;">
                  ${weddingConfig.date.dayOfWeek}, ngày ${weddingConfig.date.full}<br/>
                  (Âm lịch: ${weddingConfig.date.lunarDate})
                </div>
              </div>

              ${preferredVenue ? `
                <div style="margin:18px 0 8px 0;">
                  <div style="font-size:13px;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:0.16em;margin-bottom:6px;">Địa điểm bạn dự kiến tham dự</div>
                  <div style="padding:12px 14px;border-radius:10px;background:#eff6ff;border:1px solid #bfdbfe;">
                    <p style="margin:0 0 4px 0;"><strong>${preferredVenue.name}</strong></p>
                    <p style="margin:0 0 4px 0;font-size:13px;color:#4b5563;">Địa chỉ: ${preferredVenue.address}</p>
                    ${preferredVenue.description ? `<p style="margin:0 0 4px 0;font-size:13px;color:#6b7280;">${preferredVenue.description}</p>` : ""}
                    <a href="${preferredVenue.mapUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:4px;font-size:13px;color:#1d4ed8;text-decoration:none;">➜ Xem bản đồ trên Google Maps</a>
                  </div>
                </div>
              ` : ""}

              <div style="margin:20px 0 10px 0;">
                <div style="font-size:13px;font-weight:600;color:#4b5563;text-transform:uppercase;letter-spacing:0.16em;margin-bottom:6px;">Thông tin hai bên gia đình</div>

                <div style="display:flex;flex-wrap:wrap;gap:10px;">
                  <div style="flex:1 1 220px;padding:10px 12px;border-radius:10px;background:#f9fafb;border:1px solid #e5e7eb;margin-right:10px;">
                    <p style="margin:0 0 4px 0;font-weight:600;color:#111827;">Nhà Trai – ${nhaTrai.venue.name}</p>
                    <p style="margin:0 0 4px 0;font-size:13px;color:#4b5563;">Địa chỉ: ${nhaTrai.venue.address}</p>
                    ${nhaTrai.venue.description ? `<p style="margin:0 0 4px 0;font-size:13px;color:#6b7280;">${nhaTrai.venue.description}</p>` : ""}
                    <a href="${nhaTrai.venue.mapUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:4px;font-size:13px;color:#1d4ed8;text-decoration:none;">➜ Bản đồ nhà trai</a>
                  </div>

                  <div style="flex:1 1 220px;padding:10px 12px;border-radius:10px;background:#f9fafb;border:1px solid #e5e7eb;">
                    <p style="margin:0 0 4px 0;font-weight:600;color:#111827;">Nhà Gái – ${nhaGai.venue.name}</p>
                    <p style="margin:0 0 4px 0;font-size:13px;color:#4b5563;">Địa chỉ: ${nhaGai.venue.address}</p>
                    ${nhaGai.venue.description ? `<p style="margin:0 0 4px 0;font-size:13px;color:#6b7280;">${nhaGai.venue.description}</p>` : ""}
                    <a href="${nhaGai.venue.mapUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:4px;font-size:13px;color:#1d4ed8;text-decoration:none;">➜ Bản đồ nhà gái</a>
                  </div>
                </div>
              </div>

              <div style="margin:20px 0 12px 0;padding:12px 14px;border-radius:10px;background:#ecfdf5;border:1px solid #bbf7d0;">
                <div style="font-size:13px;font-weight:600;color:#166534;margin-bottom:6px;">Thông tin liên hệ</div>
                <p style="margin:0 0 4px 0;font-size:13px;color:#14532d;">Chú rể: <strong>${weddingConfig.groom.fullName}</strong> – <a href="tel:${weddingConfig.groom.phone}" style="color:#16a34a;text-decoration:none;">${weddingConfig.groom.phone}</a></p>
                <p style="margin:0 0 0 0;font-size:13px;color:#14532d;">Cô dâu: <strong>${weddingConfig.bride.fullName}</strong> – <a href="tel:${weddingConfig.bride.phone}" style="color:#16a34a;text-decoration:none;">${weddingConfig.bride.phone}</a></p>
              </div>

              <p style="margin:14px 0 8px 0;font-size:13px;color:#4b5563;">
                Nếu cần hỗ trợ thêm về đường đi hoặc sắp xếp thời gian, bạn có thể trả lời trực tiếp email này hoặc liên hệ số điện thoại bên trên.
              </p>

              <p style="margin:10px 0 0 0;">Rất mong được gặp bạn trong ngày vui! 💕</p>

              <p style="margin:6px 0 0 0;">Thân mến,<br/>
              ${weddingConfig.groom.fullName} &amp; ${weddingConfig.bride.fullName}</p>
            </div>

            <div style="padding:10px 16px 12px 16px;border-top:1px solid #e5e7eb;background:#f9fafb;text-align:center;font-size:11px;color:#9ca3af;">
              <div>${weddingConfig.footer.thanks}</div>
              <div style="margin-top:2px;">${weddingConfig.footer.hashtag}</div>
            </div>
          </div>
        </div>
      `;

      if (!email) {
        // no email provided, skip sending
      } else if (!transporter) {
        console.warn(
          "APP_MAIL or APP_MAIL_PASSWORD is not set; skipping SMTP email send."
        );
      } else {
        await transporter.sendMail({
          from: `Tuấn Nga Wedding <${APP_MAIL}>`,
          to: email,
          subject,
          html,
        });
      }
    } catch (error) {
      console.error("Failed to send RSVP email via Resend", error);
      // Do not fail the RSVP just because email failed
    }

    return NextResponse.json(
      { message: "RSVP saved successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
