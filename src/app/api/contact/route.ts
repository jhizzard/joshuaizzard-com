import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  return new Resend(key);
}

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
  website: z.string().optional(),
});

// Rate limiting: IP -> timestamps[]
const rateMap = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, email, message, website } = parsed.data;

    // Honeypot — bots fill this in, humans don't
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Rate limiting by IP
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();
    const timestamps = (rateMap.get(ip) ?? []).filter(
      (t) => now - t < RATE_WINDOW
    );

    if (timestamps.length >= RATE_LIMIT) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    timestamps.push(now);
    rateMap.set(ip, timestamps);

    // Send email via Resend
    await getResend().emails.send({
      from: '"joshuaizzard.com" <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL!,
      subject: `[joshuaizzard.com] ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
